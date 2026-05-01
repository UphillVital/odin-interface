const state = {
  lang: localStorage.getItem('odin.lang') || 'uk',
  theme: localStorage.getItem('odin.theme') || 'light',
  zone: 'command',
  project: null,
  systemState: 'READY',
};

const dictionary = {
  uk: {
    title: 'Інтерфейс ОДІН',
    subtitle: 'Робоче середовище керування системою',
    masterStart: 'ODIN SYSTEM — MASTER START',
    themeToDark: 'Темна тема',
    themeToLight: 'Світла тема',
    treeTitle: 'Навігація',
    zoneCommand: 'Command Center',
    zoneMap: 'System Map',
    zoneProjects: 'Projects',
    zoneFiles: 'File Workspace',
    zoneManual: 'Manual',
    assistTitle: 'Пояснення',
    modeLabel: 'MODE',
    stateLabel: 'STATE',
    projectLabel: 'PROJECT',
    none: 'Не вибрано',
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
    filesBody: 'Робота з файлами: редактор, зміни, diff, approve/reject, історія, package.',
    filesAssist: '<strong>File Workspace</strong> працює в контексті вибраного проєкту. Якщо проєкт не вибрано — спочатку відкрий Projects.',
    manualTitle: 'Manual / Help',
    manualBody: 'Інструкції, пояснення можливостей ODIN, словник і правила роботи.',
    manualAssist: '<strong>Manual</strong> — місце навчання й самопояснення системи. Тут має бути докладний HTML-довідник.',
    masterAssist: '<strong>MASTER START</strong> активовано. Наступний етап: вибір продукту → сценарій → pipeline preview → запуск.',
    mapToProjects: 'Projects → робочий контекст',
    mapToFiles: 'File Workspace → зміни',
    mapToCommand: 'OIS → Command Center',
    mapToManual: 'Manual → пояснення',
    productDT: 'Deutsch Trainer',
    productISSU: 'DT / ІССУ',
    productSSUDT: 'DT / ССУДТ',
    newProject1: 'Новий проєкт 1',
    noProject: 'Проєкт ще не вибрано. Відкрий Projects.',
    editor: 'Редактор',
    changesDiff: 'Зміни / Diff',
    approveReject: 'Затвердити / Відхилити',
    packageBuild: 'Пакет',
    odinCapabilities: 'Можливості ODIN',
    oisLexicon: 'Словник OIS',
    howToWork: 'Як працювати',
    qualityRules: 'Правила якості',
    projectSelected: '<strong>Проєкт вибрано:</strong> {project}. Тепер File Workspace може працювати в правильному контексті.',
    zoneHint: 'Це локальна підказка для поточної робочої зони.',
    helpMasterStart: 'Запускає головний системний сценарій для вибраного продукту або проєкту.',
    helpTree: 'Дерево показує основні рівні ODIN. Клік відкриває відповідну робочу зону.',
    helpCommand: 'Головна зона керування: режим, стан, запуск сценаріїв.',
    helpMap: 'Жива карта системи: звʼязки, залежності, переходи до зон.',
    helpProjects: 'Місце вибору продуктів і проєктів: DT, ІССУ, ССУДТ, нові проєкти.',
    helpFiles: 'Робота з файлами у контексті вибраного проєкту: зміни, diff, approve/reject.',
    helpManual: 'Інструкції, пояснення можливостей ODIN і правила роботи.',
    helpAssist: 'Ця панель пояснює, де ти зараз і що логічно робити далі.',
    helpScenario: 'Запуск керованого сценарію ODIN.',
  },
  en: {
    title: 'ODIN Interface',
    subtitle: 'System control workspace',
    masterStart: 'ODIN SYSTEM — MASTER START',
    themeToDark: 'Dark theme',
    themeToLight: 'Light theme',
    treeTitle: 'Navigation',
    zoneCommand: 'Command Center',
    zoneMap: 'System Map',
    zoneProjects: 'Projects',
    zoneFiles: 'File Workspace',
    zoneManual: 'Manual',
    assistTitle: 'Explanation',
    modeLabel: 'MODE',
    stateLabel: 'STATE',
    projectLabel: 'PROJECT',
    none: 'None selected',
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
    mapToProjects: 'Projects → work context',
    mapToFiles: 'File Workspace → changes',
    mapToCommand: 'OIS → Command Center',
    mapToManual: 'Manual → explanation',
    productDT: 'Deutsch Trainer',
    productISSU: 'DT / ISSU',
    productSSUDT: 'DT / SSUDT',
    newProject1: 'New Project 1',
    noProject: 'No project selected yet. Open Projects.',
    editor: 'Editor',
    changesDiff: 'Changes / Diff',
    approveReject: 'Approve / Reject',
    packageBuild: 'Package',
    odinCapabilities: 'ODIN Capabilities',
    oisLexicon: 'OIS Lexicon',
    howToWork: 'How to work',
    qualityRules: 'Quality rules',
    projectSelected: '<strong>Project selected:</strong> {project}. File Workspace can now work in the correct context.',
    zoneHint: 'This is a local hint for the current work zone.',
    helpMasterStart: 'Starts the main system scenario for the selected product or project.',
    helpTree: 'The tree shows core ODIN layers. Click to open the related work zone.',
    helpCommand: 'Main control zone: mode, state, scenario launch.',
    helpMap: 'Live system map: links, dependencies, navigation to zones.',
    helpProjects: 'Select products and projects: DT, ISSU, SSUDT, new projects.',
    helpFiles: 'Work with files in the selected project context: changes, diff, approve/reject.',
    helpManual: 'Instructions, ODIN capabilities, and operating rules.',
    helpAssist: 'This panel explains where you are and what the next logical step is.',
    helpScenario: 'Launch a controlled ODIN scenario.',
  }
};

const workZone = document.getElementById('workZone');
const assistContent = document.getElementById('assistContent');
const stateValue = document.getElementById('stateValue');
const projectValue = document.getElementById('projectValue');

function t(key, params = {}) {
  let value = dictionary[state.lang][key] || key;
  Object.entries(params).forEach(([param, replacement]) => {
    value = value.replace(`{${param}}`, replacement);
  });
  return value;
}

function setTheme(theme) {
  state.theme = theme;
  document.body.classList.toggle('theme-light', theme === 'light');
  document.body.classList.toggle('theme-dark', theme === 'dark');
  document.body.dataset.theme = theme;
  localStorage.setItem('odin.theme', theme);
}

function applyI18n() {
  document.documentElement.lang = state.lang;
  document.body.dataset.lang = state.lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-help-key]').forEach(el => {
    el.setAttribute('data-help', t(el.dataset.helpKey));
  });

  document.getElementById('langToggle').textContent = state.lang === 'uk' ? 'EN' : 'UA';
  document.getElementById('themeToggle').textContent = state.theme === 'light' ? t('themeToDark') : t('themeToLight');
  projectValue.textContent = state.project || t('none');
  stateValue.textContent = state.systemState;
}

function setActiveTree(zone) {
  document.querySelectorAll('.tree-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.zone === zone);
  });
}

function hint(key) {
  return `<span class="hint" tabindex="0" data-help-key="${key}" data-help="${t(key)}">?</span>`;
}

function zoneTemplate(title, body, cards = '') {
  return `
    <section class="zone-card">
      <h2 class="zone-title">${title}${hint('zoneHint')}</h2>
      <p>${body}</p>
      ${cards}
    </section>
  `;
}

function renderZone(zone) {
  state.zone = zone;
  setActiveTree(zone);
  state.systemState = 'READY';

  if (zone === 'command') {
    workZone.innerHTML = zoneTemplate(t('commandTitle'), t('commandBody'), `
      <div class="action-row">
        <button class="primary-action" onclick="masterStart()">${t('masterStart')} ${hint('helpScenario')}</button>
        <div class="input-like">INPUT → INTENT → MODE → STATE → ACTION</div>
      </div>
    `);
    assistContent.innerHTML = t('commandAssist');
  }

  if (zone === 'map') {
    workZone.innerHTML = zoneTemplate(t('mapTitle'), t('mapBody'), `
      <div class="zone-grid">
        <button class="mini-card" onclick="renderZone('projects')">${t('mapToProjects')}</button>
        <button class="mini-card" onclick="renderZone('files')">${t('mapToFiles')}</button>
        <button class="mini-card" onclick="renderZone('command')">${t('mapToCommand')}</button>
        <button class="mini-card" onclick="renderZone('manual')">${t('mapToManual')}</button>
      </div>
    `);
    assistContent.innerHTML = t('mapAssist');
  }

  if (zone === 'projects') {
    workZone.innerHTML = zoneTemplate(t('projectsTitle'), t('projectsBody'), `
      <div class="zone-grid">
        <button class="mini-card" onclick="selectProject('${t('productDT')}')">${t('productDT')}</button>
        <button class="mini-card" onclick="selectProject('${t('productISSU')}')">${t('productISSU')}</button>
        <button class="mini-card" onclick="selectProject('${t('productSSUDT')}')">${t('productSSUDT')}</button>
        <button class="mini-card" onclick="selectProject('${t('newProject1')}')">${t('newProject1')}</button>
      </div>
    `);
    assistContent.innerHTML = t('projectsAssist');
  }

  if (zone === 'files') {
    const projectNote = state.project
      ? `<p><strong>${state.project}</strong></p>`
      : `<p>${t('noProject')}</p>`;
    workZone.innerHTML = zoneTemplate(t('filesTitle'), t('filesBody'), `
      ${projectNote}
      <div class="zone-grid">
        <div class="mini-card">${t('editor')}</div>
        <div class="mini-card">${t('changesDiff')}</div>
        <div class="mini-card">${t('approveReject')}</div>
        <div class="mini-card">${t('packageBuild')}</div>
      </div>
    `);
    assistContent.innerHTML = t('filesAssist');
  }

  if (zone === 'manual') {
    workZone.innerHTML = zoneTemplate(t('manualTitle'), t('manualBody'), `
      <div class="zone-grid">
        <div class="mini-card">${t('odinCapabilities')}</div>
        <div class="mini-card">${t('oisLexicon')}</div>
        <div class="mini-card">${t('howToWork')}</div>
        <div class="mini-card">${t('qualityRules')}</div>
      </div>
    `);
    assistContent.innerHTML = t('manualAssist');
  }

  applyI18n();
}

function selectProject(projectName) {
  state.project = projectName;
  projectValue.textContent = projectName;
  assistContent.innerHTML = t('projectSelected', { project: projectName });
}

function masterStart() {
  state.systemState = 'MASTER_START_READY';
  renderZone('projects');
  state.systemState = 'MASTER_START_READY';
  stateValue.textContent = state.systemState;
  assistContent.innerHTML = t('masterAssist');
}

document.querySelectorAll('.tree-item').forEach(btn => {
  btn.addEventListener('click', () => renderZone(btn.dataset.zone));
});

document.getElementById('masterStart').addEventListener('click', masterStart);

document.getElementById('themeToggle').addEventListener('click', () => {
  setTheme(state.theme === 'light' ? 'dark' : 'light');
  applyI18n();
});

document.getElementById('langToggle').addEventListener('click', () => {
  state.lang = state.lang === 'uk' ? 'en' : 'uk';
  localStorage.setItem('odin.lang', state.lang);
  renderZone(state.zone);
});

setTheme(state.theme);
renderZone(state.zone);
