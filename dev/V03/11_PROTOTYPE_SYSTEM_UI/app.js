const translations = {
  uk: {
    brandTitle: "ODIN Interface V03",
    brandSubtitle: "Робоче середовище керування системою",
    masterStart: "ODIN SYSTEM — MASTER START",
    light: "Світла",
    dark: "Темна",
    mode: "Режим",
    state: "Стан",
    activeZone: "Активна зона",
    navigation: "Навігація ODIN",
    zoneCommand: "Command Center",
    zoneMap: "System Map",
    zoneFiles: "File Workspace",
    zoneManual: "Manual / Help",
    howUse: "Як користуватись?",
    assistTitle: "Assisted Mode",
    assistIntro: "ODIN підказує наступний крок, пояснює звʼязки та допомагає не губитися.",
    explainCurrent: "Пояснити поточну зону",
    commandTitle: "Command Center",
    commandDesc: "Головне місце для запуску сценаріїв, вибору режиму та роботи з MASTER START.",
    mapTitle: "System Map",
    mapDesc: "Жива карта системи: модулі, залежності, звʼязки та перехід у потрібну робочу зону.",
    filesTitle: "File Workspace",
    filesDesc: "Git-подібна зона: редактор, зміни, diff, approve/reject, history та package.",
    manualTitle: "Manual / Help",
    manualDesc: "Інструкції, пояснення можливостей ODIN, словник термінів і підказки для роботи.",
    nextStep: "Наступний крок",
    currentGoal: "Поточна ціль",
    statusMeaning: "Що означає стан",
    commandNext: "Обери продукт або запусти MASTER START.",
    mapNext: "Вибери модуль, щоб побачити залежності.",
    filesNext: "Переглянь зміни перед затвердженням.",
    manualNext: "Відкрий пояснення або словник.",
    modalHelpTitle: "Пояснення",
    generalHelp: "Цей прототип показує базову логіку ODIN: зліва навігація, по центру активна робоча зона, справа підказки Assisted Mode. Мета — не загубитись і бачити наступну дію.",
    masterStarted: "MASTER START активовано. Наступний розвиток: вибір продукту, сценарію та запуск pipeline.",
  },
  en: {
    brandTitle: "ODIN Interface V03",
    brandSubtitle: "System control workspace",
    masterStart: "ODIN SYSTEM — MASTER START",
    light: "Light",
    dark: "Dark",
    mode: "Mode",
    state: "State",
    activeZone: "Active zone",
    navigation: "ODIN Navigation",
    zoneCommand: "Command Center",
    zoneMap: "System Map",
    zoneFiles: "File Workspace",
    zoneManual: "Manual / Help",
    howUse: "How to use?",
    assistTitle: "Assisted Mode",
    assistIntro: "ODIN suggests the next step, explains connections, and helps you stay oriented.",
    explainCurrent: "Explain current zone",
    commandTitle: "Command Center",
    commandDesc: "Main place for scenarios, mode selection, and MASTER START workflows.",
    mapTitle: "System Map",
    mapDesc: "Live system map: modules, dependencies, connections, and entry into the right work zone.",
    filesTitle: "File Workspace",
    filesDesc: "Git-like zone: editor, changes, diff, approve/reject, history, and package.",
    manualTitle: "Manual / Help",
    manualDesc: "Instructions, ODIN capabilities, lexicon, and contextual help.",
    nextStep: "Next step",
    currentGoal: "Current goal",
    statusMeaning: "State meaning",
    commandNext: "Select a product or run MASTER START.",
    mapNext: "Select a module to inspect dependencies.",
    filesNext: "Review changes before approval.",
    manualNext: "Open explanations or lexicon.",
    modalHelpTitle: "Explanation",
    generalHelp: "This prototype shows ODIN’s base logic: navigation on the left, active work zone in the center, Assisted Mode on the right. The goal is to stay oriented and see the next action.",
    masterStarted: "MASTER START activated. Next evolution: product selector, scenario selection, and pipeline launch.",
  }
};

const zoneMeta = {
  command: { title: "commandTitle", desc: "commandDesc", next: "commandNext", state: "READY", mode: "DISCUSSION", name: "COMMAND_CENTER" },
  map: { title: "mapTitle", desc: "mapDesc", next: "mapNext", state: "MAP_VIEW", mode: "CONTROL", name: "SYSTEM_MAP" },
  files: { title: "filesTitle", desc: "filesDesc", next: "filesNext", state: "FILE_REVIEW", mode: "CONTROL", name: "FILE_WORKSPACE" },
  manual: { title: "manualTitle", desc: "manualDesc", next: "manualNext", state: "HELP", mode: "DISCUSSION", name: "MANUAL" }
};

let lang = "uk";
let currentZone = "command";

function t(key) { return translations[lang][key] || key; }

function applyI18n() {
  document.documentElement.lang = lang;
  document.body.dataset.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  renderZone(currentZone);
}

function renderZone(zone) {
  currentZone = zone;
  const meta = zoneMeta[zone];
  document.getElementById("modeValue").textContent = meta.mode;
  document.getElementById("stateValue").textContent = meta.state;
  document.getElementById("zoneValue").textContent = meta.name;

  document.querySelectorAll(".tree-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.zone === zone);
  });

  document.getElementById("assistText").textContent = t(meta.next);

  document.getElementById("workZone").innerHTML = `
    <h1 class="zone-title">${t(meta.title)}</h1>
    <p class="zone-desc">${t(meta.desc)}</p>
    <div class="grid">
      <div class="mini-card"><strong>${t("currentGoal")}</strong><span>${t(meta.desc)}</span></div>
      <div class="mini-card"><strong>${t("nextStep")}</strong><span>${t(meta.next)}</span></div>
      <div class="mini-card"><strong>${t("statusMeaning")}</strong><span>${meta.state}</span></div>
    </div>
    <div class="zone-card">
      <strong>${meta.name}</strong>
      <p class="zone-desc">${t("generalHelp")}</p>
    </div>
  `;
}

function openModal(title, body) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").textContent = body;
  document.getElementById("modal").classList.remove("hidden");
}

document.querySelectorAll(".tree-item").forEach(btn => {
  btn.addEventListener("click", () => renderZone(btn.dataset.zone));
});

document.getElementById("langUk").addEventListener("click", () => {
  lang = "uk";
  document.getElementById("langUk").classList.add("active");
  document.getElementById("langEn").classList.remove("active");
  applyI18n();
});

document.getElementById("langEn").addEventListener("click", () => {
  lang = "en";
  document.getElementById("langEn").classList.add("active");
  document.getElementById("langUk").classList.remove("active");
  applyI18n();
});

document.getElementById("themeLight").addEventListener("click", () => {
  document.body.className = "theme-light";
  document.getElementById("themeLight").classList.add("active");
  document.getElementById("themeDark").classList.remove("active");
});

document.getElementById("themeDark").addEventListener("click", () => {
  document.body.className = "theme-dark";
  document.getElementById("themeDark").classList.add("active");
  document.getElementById("themeLight").classList.remove("active");
});

document.getElementById("masterStart").addEventListener("click", () => {
  document.getElementById("modeValue").textContent = "CONTROL";
  document.getElementById("stateValue").textContent = "MASTER_START_READY";
  openModal("ODIN SYSTEM — MASTER START", t("masterStarted"));
});

document.getElementById("openHelp").addEventListener("click", () => {
  openModal(t("modalHelpTitle"), t("generalHelp"));
});

document.getElementById("explainCurrent").addEventListener("click", () => {
  const meta = zoneMeta[currentZone];
  openModal(t(meta.title), `${t(meta.desc)} ${t(meta.next)}`);
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

document.querySelectorAll(".hint-dot").forEach(dot => {
  dot.addEventListener("click", (event) => {
    event.stopPropagation();
    const zone = dot.dataset.help === "command" ? "command" : dot.dataset.help === "map" ? "map" : dot.dataset.help === "files" ? "files" : "manual";
    const meta = zoneMeta[zone];
    openModal(t(meta.title), `${t(meta.desc)} ${t(meta.next)}`);
  });
});

applyI18n();
