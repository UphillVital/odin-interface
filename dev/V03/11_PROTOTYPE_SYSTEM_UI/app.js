const state = {
  lang: 'uk',
  theme: 'light',
  zone: 'command',
  project: null,
};

const i18n = {
  uk: {
    title: 'Інтерфейс ОДІН',
    subtitle: 'Робоче середовище керування системою',
    masterStart: 'ODIN SYSTEM — MASTER START',
    themeToggle: 'Темна тема',
    treeTitle: 'Навігація',
    zoneCommand: 'Command Center',
    zoneMap: 'System Map',
    zoneProjects: 'Projects',
    zoneFiles: 'File Workspace',
    zoneManual: 'Manual',
    assistTitle: 'Пояснення',
    none: 'Не вибрано',
  },
  en: {
    title: 'ODIN Interface',
    subtitle: 'System control workspace',
    masterStart: 'ODIN SYSTEM — MASTER START',
    themeToggle: 'Dark theme',
    treeTitle: 'Navigation',
    zoneCommand: 'Command Center',
    zoneMap: 'System Map',
    zoneProjects: 'Projects',
    zoneFiles: 'File Workspace',
    zoneManual: 'Manual',
    assistTitle: 'Explanation',
    none: 'None selected',
  }
};

const zoneText = {
  uk: {
    commandTitle: 'Command Center',
    commandBody: 'Це головна зона керування ODIN: режим, стан, запуск сценаріїв і MASTER START.',
    commandAssist: '<strong>Command Center</strong> — стартова зона. Тут ти бачиш стан системи й запускаєш головні сценарії. Наступний логічний крок: вибрати продукт або відкрити System Map.',
    mapTitle: 'Жива карта системи',
    mapBody: 'Карта показує звʼязки між OIS, Work Zones, Projects, File Workspace і QA.',
    mapAssist: '<strong>System Map</strong> пояснює, як частини ODIN повʼязані. Клікай вузли, щоб переходити до потрібної робочої зони.',
    projectsTitle: 'Projects Workspace',
    projectsBody: 'Тут обираються продукти та проєкти: Deutsch Trainer, ІССУ, ССУДТ, нові проєкти.',
    projectsAssist: '<strong>Projects</strong> задає контекст роботи. File Workspace має працювати тільки після вибору проєкту.',
    filesTitle: 'File Workspace',
    filesBody: 'Робота з файлами: editor, changes, diff, approve/reject, history, package.',
    filesAssist: '<strong>File Workspace</strong> працює в контексті вибраного проєкту. Якщо проєкт не вибрано — спочатку відкрий Projects.',
    manualTitle: 'Manual / Help',
    manualBody: 'Інструкції, пояснення можливостей ODIN, словник і правила роботи.',
    manualAssist: '<strong>Manual</strong> — місце навчання й самопояснення системи. Тут має бути докладний HTML-довідник.',
    masterAssist: '<strong>MASTER START</strong> активовано. Наступний етап: вибір продукту → сценарій → pipeline preview → запуск.',
  },
  en: {
    commandTitle: 'Command Center',
    commandBody: 'Main ODIN control zone: mode, state, scenario launch, and MASTER START.',
    commandAssist: '<strong>Command Center</strong> is the starting zone. You see system state and launch main scenarios. Next step: select a product or open System Map.',
    mapTitle: 'Live System Map',
    mapBody: 'The map shows links between OIS, Work Zones, Projects, File Workspace, and QA.',
    mapAssist: '<strong>System Map</strong> explains how ODIN parts are connected. Click nodes to navigate to work zones.',
    projectsTitle: 'Projects Workspace',
    projectsBody: 'Select products and projects: Deutsch Trainer, ISSU, SSUDT, new projects.',
    projectsAssist: '<strong>Projects</strong> sets the working context. File Workspace should work only after a project is selected.',
    filesTitle: 'File Workspace',
    filesBody: 'Work with files: editor, changes, diff, approve/reject, history, package.',
    filesAssist: '<strong>File Workspace</strong> works in the selected project context. If no project is selected, open Projects first.',
    manualTitle: 'Manual / Help',
    manualBody: 'Instructions, ODIN capabilities, lexicon, and working rules.',
    manualAssist: '<strong>Manual</strong> is the system learning and self-explanation area. It should contain a detailed editable HTML guide.',
    masterAssist: '<strong>MASTER START</strong> activated. Next stage: product selection → scenario → pipeline preview → launch.',
  }
};

const workZone = document.getElementById('workZone');
const assistContent = document.getElementById('assistContent');
const modeValue = document.getElementById('modeValue');
const stateValue = document.getElementById('stateValue');
const projectValue = document.getElementById('projectValue');

function t(key) { return i18n[state.lang][key] || key; }
function z(key) { return zoneText[state.lang][key] || key; }

function applyI18n() {
  document.body.dataset.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.getElementById('langToggle').textContent = state.lang === 'uk' ? 'EN' : 'UA';
  document.getElementById('themeToggle').textContent = state.theme === 'light'
    ? (state.lang === 'uk' ? 'Темна тема' : 'Dark theme')
    : (state.lang === 'uk' ? 'Світла тема' : 'Light theme');
  projectValue.textContent = state.project || t('none');
}

function setActiveTree(zone) {
  document.querySelectorAll('.tree-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.zone === zone);
  });
}

function zoneTemplate(title, body, cards = '') {
  return `
    <section class="zone-card">
      <h2 class="zone-title">${title}<span class="hint" tabindex="0" data-help-uk="Це локальна підказка для поточної робочої зони." data-help-en="This is a local hint for the current work zone.">?</span></h2>
      <p>${body}</p>
      ${cards}
    </section>
  `;
}

function renderZone(zone) {
  state.zone = zone;
  setActiveTree(zone);
  stateValue.textContent = 'READY';

  if (zone === 'command') {
    workZone.innerHTML = zoneTemplate(z('commandTitle'), z('commandBody'), `
      <div class="action-row">
        <button class="primary-action" onclick="masterStart()">${t('masterStart')} <span class="hint" tabindex="0" data-help-uk="Запуск керованого сценарію ODIN." data-help-en="Launch a controlled ODIN scenario.">?</span></button>
        <div class="input-like">INPUT → INTENT → MODE → STATE → ACTION</div>
      </div>
    `);
    assistContent.innerHTML = z('commandAssist');
  }

  if (zone === 'map') {
    workZone.innerHTML = zoneTemplate(z('mapTitle'), z('mapBody'), `
      <div class="zone-grid">
        <button class="mini-card" onclick="renderZone('projects')">Projects → Work Context</button>
        <button class="mini-card" onclick="renderZone('files')">File Workspace → Changes</button>
        <button class="mini-card" onclick="renderZone('command')">OIS → Command Center</button>
        <button class="mini-card" onclick="renderZone('manual')">Manual → Explanation</button>
      </div>
    `);
    assistContent.innerHTML = z('mapAssist');
  }

  if (zone === 'projects') {
    workZone.innerHTML = zoneTemplate(z('projectsTitle'), z('projectsBody'), `
      <div class="zone-grid">
        <button class="mini-card" onclick="selectProject('Deutsch Trainer / DT')">Deutsch Trainer</button>
        <button class="mini-card" onclick="selectProject('DT / ІССУ')">ІССУ</button>
        <button class="mini-card" onclick="selectProject('DT / ССУДТ')">ССУДТ</button>
        <button class="mini-card" onclick="selectProject('New Project 1')">New Project 1</button>
      </div>
    `);
    assistContent.innerHTML = z('projectsAssist');
  }

  if (zone === 'files') {
    const projectNote = state.project
      ? `<p><strong>${state.project}</strong></p>`
      : `<p>${state.lang === 'uk' ? 'Проєкт ще не вибрано. Відкрий Projects.' : 'No project selected yet. Open Projects.'}</p>`;
    workZone.innerHTML = zoneTemplate(z('filesTitle'), z('filesBody'), `
      ${projectNote}
      <div class="zone-grid">
        <div class="mini-card">Editor</div>
        <div class="mini-card">Changes / Diff</div>
        <div class="mini-card">Approve / Reject</div>
        <div class="mini-card">Package</div>
      </div>
    `);
    assistContent.innerHTML = z('filesAssist');
  }

  if (zone === 'manual') {
    workZone.innerHTML = zoneTemplate(z('manualTitle'), z('manualBody'), `
      <div class="zone-grid">
        <div class="mini-card">ODIN Capabilities</div>
        <div class="mini-card">OIS Lexicon</div>
        <div class="mini-card">How to work</div>
        <div class="mini-card">Quality rules</div>
      </div>
    `);
    assistContent.innerHTML = z('manualAssist');
  }
}

function selectProject(projectName) {
  state.project = projectName;
  projectValue.textContent = projectName;
  assistContent.innerHTML = state.lang === 'uk'
    ? `<strong>Проєкт вибрано:</strong> ${projectName}. Тепер File Workspace може працювати в правильному контексті.`
    : `<strong>Project selected:</strong> ${projectName}. File Workspace can now work in the correct context.`;
}

function masterStart() {
  stateValue.textContent = 'MASTER_START_READY';
  renderZone('projects');
  assistContent.innerHTML = z('masterAssist');
}

document.querySelectorAll('.tree-item').forEach(btn => {
  btn.addEventListener('click', () => renderZone(btn.dataset.zone));
});

document.getElementById('masterStart').addEventListener('click', masterStart);

document.getElementById('themeToggle').addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.body.className = state.theme === 'light' ? 'theme-light' : 'theme-dark';
  applyI18n();
});

document.getElementById('langToggle').addEventListener('click', () => {
  state.lang = state.lang === 'uk' ? 'en' : 'uk';
  document.documentElement.lang = state.lang;
  applyI18n();
  renderZone(state.zone);
});

applyI18n();
renderZone('command');
