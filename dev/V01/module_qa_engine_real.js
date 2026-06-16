// ODIN v3.24 — REAL QA ENGINE MODULE
// Куди класти: dev/module_qa_engine_real.js
// Підключати після: dev/odin_modules.js

(function () {
  if (!window.ODIN_MODULES) {
    console.error("ODIN_MODULES registry not found. Load odin_modules.js first.");
    return;
  }

  const REQUIRED_BLOCKS = [
    { label: "Мета / Після уроку", patterns: ["Після уроку", "Мета уроку", "що ти маєш зрозуміти"] },
    { label: "Основні приклади", patterns: ["Основні приклади", "Приклади", "РН:"] },
    { label: "Дослівний переклад", patterns: ["ДП:", "Дослівний", "дослівний"] },
    { label: "Смисловий переклад", patterns: ["СД:", "Смисловий", "смисловий", "👉"] },
    { label: "Словник", patterns: ["Словник", "Нові слова", "Wortschatz"] },
    { label: "Практика", patterns: ["Практика", "Тренування", "Вправа"] },
    { label: "QA Report / Status", patterns: ["QA Report", "Status", "QA_PASSED", "EXPORT_READY"] }
  ];

  const MARKUP_PATTERNS = ["highlight", "mark", "data-rule", "grammar", "підсвіт", "lamp", "case-"];
  const AUDIO_PATTERNS = ["audio", "🔊", "playAudio", "speak", "tts"];
  const BUTTON_PATTERNS = ["button", "onclick", "toggle", "btn"];

  function hasAny(text, arr) {
    const t = String(text || "").toLowerCase();
    return arr.some(p => t.includes(String(p).toLowerCase()));
  }

  function createState() {
    return { result: "RUNNING", errors: [], warnings: [], passed: [], details: [], report: "" };
  }

  function addDetail(state, level, title, note) {
    state.details.push({ level, title, note });
    if (level === "ok") state.passed.push(title);
    if (level === "warn") state.warnings.push(title);
    if (level === "bad") state.errors.push(title);
  }

  function finalizeQA(state) {
    if (state.errors.length) state.result = "QA_FAILED";
    else if (state.warnings.length) state.result = "QA_PASSED_WITH_WARNINGS";
    else state.result = "QA_PASSED";

    state.report = [
      "ODIN QA ENGINE v2 REPORT",
      "========================",
      `Result: ${state.result}`,
      `Errors: ${state.errors.length}`,
      `Warnings: ${state.warnings.length}`,
      `Passed: ${state.passed.length}`,
      "",
      "DETAILS:",
      ...state.details.map(d => `[${d.level.toUpperCase()}] ${d.title} — ${d.note}`)
    ].join("\n");

    return state;
  }

  function runLessonQA(text) {
    const source = String(text || "").trim();
    const state = createState();

    if (!source) {
      addDetail(state, "bad", "LESSON_INPUT_EMPTY", "Немає вхідного тексту/HTML уроку.");
      return finalizeQA(state);
    }

    addDetail(state, "ok", "LESSON_INPUT_LOADED", `Завантажено символів: ${source.length}.`);

    REQUIRED_BLOCKS.forEach(block => {
      if (hasAny(source, block.patterns)) addDetail(state, "ok", `BLOCK_OK: ${block.label}`, "Блок або його еквівалент знайдено.");
      else addDetail(state, "bad", `BLOCK_MISSING: ${block.label}`, "Критичний блок відсутній або не розпізнаний.");
    });

    const germanLike = (source.match(/[A-ZÄÖÜ][a-zäöüß]+|ich|du|wir|Sie|nicht|haben|sein|müssen|können|wollen/gi) || []).length;
    if (germanLike >= 10) addDetail(state, "ok", "GERMAN_TEXT_DETECTED", "Німецький навчальний контент присутній.");
    else addDetail(state, "warn", "GERMAN_TEXT_WEAK", "Німецького тексту мало або він не розпізнаний.");

    const literalCount = (source.match(/ДП:|Дослівн/gi) || []).length;
    const semanticCount = (source.match(/СД:|Смислов|👉/gi) || []).length;
    if (literalCount > 0 && semanticCount > 0) addDetail(state, "ok", "TRANSLATION_STANDARD_v2_DETECTED", `ДП: ${literalCount}, СД/👉: ${semanticCount}.`);
    else addDetail(state, "bad", "TRANSLATION_STANDARD_v2_MISSING", "Потрібні обидві лінії: дослівний + смисловий переклад.");

    if (hasAny(source, MARKUP_PATTERNS)) addDetail(state, "ok", "HIGHLIGHT_MARKUP_PRESENT", "Ознаки підсвітки/grammar markup знайдено.");
    else addDetail(state, "warn", "HIGHLIGHT_MARKUP_NOT_DETECTED", "Не знайдено явних ознак підсвітки граматики.");

    if (hasAny(source, AUDIO_PATTERNS)) addDetail(state, "ok", "AUDIO_LAYER_PRESENT", "Ознаки аудіо-шару знайдено.");
    else addDetail(state, "warn", "AUDIO_LAYER_NOT_DETECTED", "Аудіо-шар не знайдено. Для повного DT стандарту бажано додати.");

    if (hasAny(source, BUTTON_PATTERNS)) addDetail(state, "ok", "INTERACTIVE_CONTROLS_PRESENT", "Кнопки/інтерактивність знайдено.");
    else addDetail(state, "warn", "INTERACTIVE_CONTROLS_NOT_DETECTED", "Не знайдено інтерактивних контролів.");

    if (source.includes("QA_PASSED_WITH_WARNINGS") && source.includes("EXPORT_READY")) {
      addDetail(state, "ok", "ODIN_STATUS_STACK_PRESENT", "Status stack містить QA та EXPORT.");
    } else {
      addDetail(state, "warn", "ODIN_STATUS_STACK_INCOMPLETE", "Status stack неповний або відсутній.");
    }

    return finalizeQA(state);
  }

  window.ODIN_MODULES.register("QA_ENGINE", {
    version: "v3.24_REAL_QA_ENGINE_MODULE",
    runQA(text) {
      return runLessonQA(text);
    },
    runFromSelector(selector) {
      const el = document.querySelector(selector);
      if (!el) return runLessonQA("");
      return runLessonQA(el.value || el.textContent || el.innerHTML || "");
    }
  });

  console.log("ODIN v3.24 REAL QA_ENGINE module loaded.");
})();
