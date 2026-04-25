function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function log(message) {
  const box = document.getElementById("log");
  if (box.textContent === "WAITING") box.textContent = "";
  box.textContent += message + "\n";
}

function parseRows(raw, expectedParts) {
  return String(raw || "")
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.split("|").map(part => part.trim()))
    .filter(parts => parts.length >= expectedParts);
}

function normalizeModel() {
  return {
    title: getValue("title"),
    goal: getValue("goal"),
    examples: parseRows(getValue("examples"), 3),
    vocab: parseRows(getValue("vocab"), 2)
  };
}

function findDuplicates(list, getKey) {
  const seen = new Set();
  const duplicates = [];
  list.forEach(item => {
    const key = getKey(item).toLowerCase().trim();
    if (seen.has(key)) duplicates.push(key);
    seen.add(key);
  });
  return duplicates;
}

function hardQaCheck(model, html) {
  const messages = [];

  function error(text) {
    messages.push({ level: "ERROR", text });
  }

  function warning(text) {
    messages.push({ level: "WARNING", text });
  }

  function info(text) {
    messages.push({ level: "INFO", text });
  }

  if (model.title.length < 3) error("Назва уроку занадто коротка або відсутня.");
  if (model.goal.length < 40) error("Ціль уроку має бути розширеною: мінімум 40 символів.");
  if (model.examples.length < 5) error("Потрібно мінімум 5 прикладів для HARD QA.");
  if (model.vocab.length < 5) error("Потрібно мінімум 5 слів у словнику.");

  model.examples.forEach((example, index) => {
    const n = index + 1;
    if (!example[0] || example[0].length < 4) error("Приклад " + n + ": DE речення відсутнє або занадто коротке.");
    if (!example[1] || example[1].length < 4) error("Приклад " + n + ": ДП відсутній або занадто короткий.");
    if (!example[2] || example[2].length < 4) error("Приклад " + n + ": СД відсутній або занадто короткий.");

    if (example[0] && !/[.!?]$/.test(example[0])) {
      warning("Приклад " + n + ": DE речення бажано завершувати крапкою, ! або ?.");
    }

    if (example[1] === example[2]) {
      warning("Приклад " + n + ": ДП і СД однакові. Можливо, смисловий переклад треба зробити природнішим.");
    }
  });

  model.vocab.forEach((word, index) => {
    const n = index + 1;
    if (!word[0] || word[0].length < 2) error("Словник " + n + ": DE слово відсутнє.");
    if (!word[1] || word[1].length < 2) error("Словник " + n + ": UA переклад відсутній.");
  });

  const duplicateExamples = findDuplicates(model.examples, item => item[0] || "");
  if (duplicateExamples.length > 0) error("Є дублікати прикладів DE: " + duplicateExamples.join(", "));

  const duplicateVocab = findDuplicates(model.vocab, item => item[0] || "");
  if (duplicateVocab.length > 0) warning("Є дублікати у словнику: " + duplicateVocab.join(", "));

  if (!html.includes("QA marker")) error("HTML не містить QA marker.");
  if (!html.includes("5. Практика")) error("HTML не містить блок практики.");
  if (!html.includes("3. Приклади")) error("HTML не містить блок прикладів.");
  if (!html.includes("4. Словник")) error("HTML не містить блок словника.");

  info("Авто-нормалізація: порожні рядки прибрано, пробіли обрізано.");

  const hasErrors = messages.some(m => m.level === "ERROR");
  const hasWarnings = messages.some(m => m.level === "WARNING");

  return {
    passed: !hasErrors,
    hasWarnings,
    messages
  };
}

function buildLesson(model) {
  const examplesHtml = model.examples.map((example, index) => {
    return [
      '<div class="ex">',
      '<h3>' + (index + 1) + '. ' + esc(example[0]) + '</h3>',
      '<p><b>ДП:</b> ' + esc(example[1]) + '</p>',
      '<p><b>СД:</b> ' + esc(example[2]) + '</p>',
      '</div>'
    ].join("");
  }).join("");

  const vocabHtml = model.vocab.map((item, index) => {
    return [
      '<tr>',
      '<td>' + (index + 1) + '</td>',
      '<td><b>' + esc(item[0]) + '</b></td>',
      '<td>' + esc(item[1]) + '</td>',
      '</tr>'
    ].join("");
  }).join("");

  return [
    '<!DOCTYPE html>',
    '<html lang="uk">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<title>' + esc(model.title) + '</title>',
    '<style>',
    'body{font-family:system-ui;line-height:1.6;padding:20px;max-width:900px;margin:auto;background:#f8fafc;color:#0f172a}',
    'section{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px;margin:14px 0}',
    '.ex{border-left:5px solid #0284c7;padding-left:12px;margin:12px 0}',
    'table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #e2e8f0;padding:8px;text-align:left}',
    '.badge{display:inline-block;background:#e0f2fe;color:#075985;border-radius:999px;padding:5px 9px;font-weight:800}',
    '</style>',
    '</head>',
    '<body>',
    '<h1>' + esc(model.title) + '</h1>',
    '<span class="badge">ODIN v3.8.2 HARD QA</span>',
    '<section id="goal"><h2>1. Ціль уроку</h2><p>' + esc(model.goal) + '</p></section>',
    '<section id="rule"><h2>2. Основне правило</h2><p>Відокремлювана частка у простому реченні часто переходить у кінець.</p></section>',
    '<section id="examples"><h2>3. Приклади з ДП і СД</h2>' + examplesHtml + '</section>',
    '<section id="vocab"><h2>4. Словник</h2><table><thead><tr><th>№</th><th>DE</th><th>UA</th></tr></thead><tbody>' + vocabHtml + '</tbody></table></section>',
    '<section id="practice"><h2>5. Практика</h2><p>Закрий переклади і відтвори німецькі речення самостійно.</p></section>',
    '<section id="qa-marker"><h2>QA marker</h2><p>Урок пройшов ODIN HARD QA SYSTEM.</p></section>',
    '</body>',
    '</html>'
  ].join("");
}

function renderQaReport(report) {
  const rows = report.messages.map(message => {
    const cssClass =
      message.level === "ERROR" ? "qa-error" :
      message.level === "WARNING" ? "qa-warning" :
      "qa-info";

    return '<div class="qa-item ' + cssClass + '"><b>' + message.level + ':</b> ' + esc(message.text) + '</div>';
  }).join("");

  const summaryClass = report.passed ? "qa-pass" : "qa-error";
  const summaryText = report.passed
    ? (report.hasWarnings ? "QA_PASSED_WITH_WARNINGS" : "QA_PASSED")
    : "QA_FAILED_EXPORT_BLOCKED";

  document.getElementById("qaBox").innerHTML =
    rows + '<div class="qa-item summary ' + summaryClass + '">' + summaryText + '</div>';
}

function renderDownload(html) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  document.getElementById("download").innerHTML =
    '<a class="download" href="' + url + '" download="odin_lesson_v3_8_2.html">Завантажити урок</a>';
}

function clearAll() {
  document.getElementById("log").textContent = "";
  document.getElementById("qaBox").innerHTML = '<p class="muted">QA зʼявиться після запуску.</p>';
  document.getElementById("download").innerHTML = "";
  document.getElementById("preview").srcdoc = "";
}

function runOdin() {
  clearAll();

  log("RUNNING");
  const model = normalizeModel();

  log("PLAN_DONE");
  log("PIPELINE_DONE");

  const html = buildLesson(model);
  document.getElementById("preview").srcdoc = html;
  log("LESSON_DONE");

  const report = hardQaCheck(model, html);
  renderQaReport(report);
  log(report.passed ? (report.hasWarnings ? "QA_PASSED_WITH_WARNINGS" : "QA_PASSED") : "QA_FAILED");

  if (!report.passed) {
    document.getElementById("download").innerHTML =
      '<div class="qa-item qa-error">EXPORT BLOCKED: HARD QA FAILED</div>';
    log("EXPORT_BLOCKED");
    return;
  }

  renderDownload(html);
  log("EXPORT_DONE");
  log("DONE");
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("runBtn").addEventListener("click", runOdin);
  document.getElementById("clearBtn").addEventListener("click", clearAll);
});
