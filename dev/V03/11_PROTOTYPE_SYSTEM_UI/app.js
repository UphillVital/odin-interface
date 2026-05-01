const state = {
  lang: "uk",
  theme: "light",
  zone: "command"
};

const t = {
  uk: {
    appTitle: "Інтерфейс ОДІН",
    appSubtitle: "Робоче середовище керування системою",
    themeToggle: "Темна тема",
    themeToggleDark: "Світла тема",
    treeTitle: "Карта системи",
    assistTitle: "Assisted Mode",
    explainCurrent: "Пояснити поточну зону",
    commandTitle: "Command Center",
    commandText: "Головна зона керування: режим, стан, старт системи та наступні дії.",
    projectsTitle: "Projects / Products",
    projectsText: "Тут обирається продукт або проєкт: Deutsch Trainer, ІССУ, ССУДТ або нові проєкти.",
    mapTitle: "System Map Live",
    mapText: "Жива карта системи показує звʼязки між OIS, Work Zones, File Workspace, QA та Projects.",
    filesTitle: "File Workspace",
    filesText: "Робота з файлами відбувається тільки в контексті вибраного проєкту: зміни, diff, approval, package.",
    manualTitle: "Manual / Help",
    manualText: "Це зона інструкцій, пояснень, словника ODIN і правил роботи.",
    masterTitle: "MASTER START",
    masterText: "MASTER START відкриває системний запуск: вибір продукту, сценарій, перевірка стану і виконання workflow.",
    helpTitle: "Пояснення",
    defaultHelp: "ODIN пояснює, що означає поточний елемент і що робити далі. Help більше не відкривається автоматично при оновленні сторінки."
  },
  en: {
    appTitle: "ODIN Interface",
    appSubtitle: "System control workspace",
    themeToggle: "Dark theme",
    themeToggleDark: "Light theme",
    treeTitle: "System Map",
    assistTitle: "Assisted Mode",
    explainCurrent: "Explain current zone",
    commandTitle: "Command Center",
    commandText: "Primary control zone: mode, state, system start, and next actions.",
    projectsTitle: "Projects / Products",
    projectsText: "This is where products or projects are selected: Deutsch Trainer, ISSU, SSUDT, or new projects.",
    mapTitle: "System Map Live",
    mapText: "The live system map shows connections between OIS, Work Zones, File Workspace, QA, and Projects.",
    filesTitle: "File Workspace",
    filesText: "File operations happen only inside a selected project context: changes, diff, approval, package.",
    manualTitle: "Manual / Help",
    manualText: "This zone contains instructions, explanations, ODIN lexicon, and work rules.",
    masterTitle: "MASTER START",
    masterText: "MASTER START opens system launch: product selection, scenario, state check, and workflow execution.",
    helpTitle: "Explanation",
    defaultHelp: "ODIN explains what the current element means and what to do next. Help no longer opens automatically after page reload."
  }
};

const zoneData = {
  command: ["commandTitle", "commandText"],
  projects: ["projectsTitle", "projectsText"],
  map: ["mapTitle", "mapText"],
  files: ["filesTitle", "filesText"],
  manual: ["manualTitle", "manualText"]
};

const workZone = document.getElementById("workZone");
const assistText = document.getElementById("assistText");
const helpModal = document.getElementById("helpModal");
const helpTitle = document.getElementById("helpTitle");
const helpBody = document.getElementById("helpBody");

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t[state.lang][key] || key;
  });
  document.getElementById("themeToggle").textContent = state.theme === "light" ? t[state.lang].themeToggle : t[state.lang].themeToggleDark;
}

function renderZone(zone) {
  state.zone = zone;
  document.querySelectorAll(".tree-item").forEach(btn => btn.classList.toggle("active", btn.dataset.zone === zone));
  const [titleKey, textKey] = zoneData[zone];
  const title = t[state.lang][titleKey];
  const text = t[state.lang][textKey];

  workZone.innerHTML = `
    <h1>${title}</h1>
    <p>${text}</p>
    <div class="zone-card">
      <strong>STATE</strong>
      <p>ACTIVE_ZONE: ${zone.toUpperCase()}</p>
    </div>
    <div class="zone-grid">
      <div class="kpi"><strong>OIS</strong><span>INPUT → INTENT → MODE → STATE → ACTION</span></div>
      <div class="kpi"><strong>QA</strong><span>Core Lock active</span></div>
      <div class="kpi"><strong>I18N</strong><span>UA / EN ready</span></div>
      <div class="kpi"><strong>Theme</strong><span>Light default / Dark optional</span></div>
    </div>
  `;
  assistText.textContent = text;
}

function openHelp(text) {
  helpTitle.textContent = t[state.lang].helpTitle;
  helpBody.textContent = text || t[state.lang].defaultHelp;
  helpModal.classList.add("is-open");
  helpModal.setAttribute("aria-hidden", "false");
}

function closeHelp() {
  helpModal.classList.remove("is-open");
  helpModal.setAttribute("aria-hidden", "true");
}

function init() {
  // FIX: always close help on load/reload.
  closeHelp();
  document.body.dataset.theme = state.theme;
  document.body.dataset.lang = state.lang;
  translatePage();
  renderZone(state.zone);
}

document.querySelectorAll(".tree-item").forEach(btn => {
  btn.addEventListener("click", () => renderZone(btn.dataset.zone));
});

document.getElementById("masterStart").addEventListener("click", () => {
  renderZone("projects");
  openHelp(t[state.lang].masterText);
});

document.getElementById("globalHelpBtn").addEventListener("click", () => openHelp());
document.getElementById("explainCurrent").addEventListener("click", () => {
  const [, textKey] = zoneData[state.zone];
  openHelp(t[state.lang][textKey]);
});
document.getElementById("closeHelp").addEventListener("click", closeHelp);
helpModal.addEventListener("click", (e) => {
  if (e.target === helpModal) closeHelp();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeHelp();
});

document.getElementById("langToggle").addEventListener("click", () => {
  state.lang = state.lang === "uk" ? "en" : "uk";
  document.body.dataset.lang = state.lang;
  translatePage();
  renderZone(state.zone);
});

document.getElementById("themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "light" ? "dark" : "light";
  document.body.dataset.theme = state.theme;
  translatePage();
});

init();
