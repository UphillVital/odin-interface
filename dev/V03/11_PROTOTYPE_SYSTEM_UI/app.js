const workZone = document.getElementById('workZone');
const contextText = document.getElementById('contextText');
const zoneValue = document.getElementById('zoneValue');
const modeValue = document.getElementById('modeValue');
const stateValue = document.getElementById('stateValue');
const themeToggle = document.getElementById('themeToggle');
const masterStart = document.getElementById('masterStart');
const treeItems = document.querySelectorAll('.tree-item');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

let lang = 'uk';
let currentZone = 'command';

const i18n = {
  uk: {
    eyebrow: 'System Control Workspace',
    title: 'ODIN Interface V03',
    themeToDark: 'Темна тема',
    themeToLight: 'Світла тема',
    masterStart: 'ODIN SYSTEM — MASTER START',
    modeLabel: 'РЕЖИМ', stateLabel: 'СТАН', zoneLabel: 'ЗОНА',
    liveMap: 'Жива карта системи', command: 'Command Center', map: 'System Map', files: 'File Workspace', ois: 'OIS Core', manual: 'Manual / Help',
    assistedMode: 'Assisted Mode', assistedIntro: 'ODIN підказує наступний крок, якщо звʼязки або дії неочевидні.', howUse: 'Як користуватись?', context: 'Context', explainCurrent: 'Пояснити поточну зону',
    generalHelpTitle: 'Як користуватись ODIN',
    generalHelp: 'Зліва — жива карта системи. По центру — активна робоча зона. Справа — пояснення контексту. Натискай ? біля пунктів дерева, щоб отримати коротке пояснення. MASTER START — головна системна дія.',
    masterTitle: 'ODIN SYSTEM — MASTER START',
    masterContext: 'MASTER START — головна системна дія, яка повинна запускати керований сценарій за правилами ODIN.',
    masterDesc: 'Primary system action activated. Наступна версія має містити product selector, scenario selector і pipeline preview.',
    productSelector: 'Product Selector', productSelectorDesc: 'ODIN Core / Deutsch Trainer / Future Product.',
    scenario: 'Scenario', scenarioDesc: 'Start package, restore, build, QA, export.',
    pipelinePreview: 'Pipeline Preview', pipelinePreviewDesc: 'TASK → BUILD → QA → PACKAGE.',
    status: 'Status',
    commandContext: 'Центральна зона для введення наміру, перевірки режиму та запуску керованих сценаріїв.',
    commandDesc: 'ODIN приймає запит, визначає intent, режим, стан і наступну робочу зону.',
    analyzeIntent: 'Analyze Intent',
    mapContext: 'Жива карта системи має бути навігацією, а не декоративним деревом.',
    mapDesc: 'Карта показує звʼязки між OIS, Work Zones, File Workspace, Design DNA та продуктами ODIN.',
    filesContext: 'Файлова зона має показувати зміни, diff, затвердження та підготовку пакетів.',
    filesDesc: 'Це окремий світ всередині ODIN: робота з файлами без сліпих змін.',
    oisContext: 'OIS — шар, який перетворює спілкування на керовану системну дію.',
    oisDesc: 'Гібридна модель: DEFAULT = Smart System, OVERRIDE = Commands.',
    manualContext: 'Manual повинен навчати користувача працювати з ODIN і пояснювати звʼязки.',
    manualDesc: 'Ця зона буде містити докладну інструкцію, словник ODIN, правила роботи та приклади складних задач.',
    intentDetected: 'ODIN визначив намір і готовий активувати відповідну Work Zone.',
    editor: 'Editor', diff: 'Changes / Diff', approve: 'Approve / Reject', package: 'Package',
    editorDesc: 'Редагування змісту майбутнього модуля.', diffDesc: 'Порівняння перед затвердженням.', approveDesc: 'Жодна зміна не проходить без контролю.', packageDesc: 'Готовий plug & play пакет без порожніх папок.'
  },
  en: {
    eyebrow: 'System Control Workspace',
    title: 'ODIN Interface V03',
    themeToDark: 'Dark Theme',
    themeToLight: 'Light Theme',
    masterStart: 'ODIN SYSTEM — MASTER START',
    modeLabel: 'MODE', stateLabel: 'STATE', zoneLabel: 'ZONE',
    liveMap: 'Live System Map', command: 'Command Center', map: 'System Map', files: 'File Workspace', ois: 'OIS Core', manual: 'Manual / Help',
    assistedMode: 'Assisted Mode', assistedIntro: 'ODIN suggests the next step when connections or actions are not obvious.', howUse: 'How to use?', context: 'Context', explainCurrent: 'Explain current zone',
    generalHelpTitle: 'How to use ODIN',
    generalHelp: 'Left side is the live system map. Center is the active work zone. Right side explains the context. Click ? near tree items for a short explanation. MASTER START is the primary system action.',
    masterTitle: 'ODIN SYSTEM — MASTER START',
    masterContext: 'MASTER START is the primary system action that should launch a controlled ODIN scenario by rules.',
    masterDesc: 'Primary system action activated. The next version should include product selector, scenario selector, and pipeline preview.',
    productSelector: 'Product Selector', productSelectorDesc: 'ODIN Core / Deutsch Trainer / Future Product.',
    scenario: 'Scenario', scenarioDesc: 'Start package, restore, build, QA, export.',
    pipelinePreview: 'Pipeline Preview', pipelinePreviewDesc: 'TASK → BUILD → QA → PACKAGE.',
    status: 'Status',
    commandContext: 'Central zone for entering intent, checking mode, and launching controlled scenarios.',
    commandDesc: 'ODIN receives the input, detects intent, mode, state, and the next work zone.',
    analyzeIntent: 'Analyze Intent',
    mapContext: 'The live system map must be navigation, not a decorative tree.',
    mapDesc: 'The map shows connections between OIS, Work Zones, File Workspace, Design DNA, and ODIN products.',
    filesContext: 'The file zone must show changes, diff, approval, and package preparation.',
    filesDesc: 'A separate world inside ODIN: file work without blind changes.',
    oisContext: 'OIS turns conversation into controlled system action.',
    oisDesc: 'Hybrid model: DEFAULT = Smart System, OVERRIDE = Commands.',
    manualContext: 'Manual should teach how to work with ODIN and explain connections.',
    manualDesc: 'This zone will contain detailed instructions, ODIN lexicon, work rules, and examples of complex tasks.',
    intentDetected: 'ODIN detected the intent and is ready to activate the relevant Work Zone.',
    editor: 'Editor', diff: 'Changes / Diff', approve: 'Approve / Reject', package: 'Package',
    editorDesc: 'Editing future module content.', diffDesc: 'Compare before approval.', approveDesc: 'No change passes without control.', packageDesc: 'Ready plug & play package without empty folders.'
  }
};

function t(key) { return i18n[lang][key] || key; }

function card(title, text) {
  return `<article class="zone-card"><h3>${title}</h3><p>${text}</p></article>`;
}

const zones = {
  command: {
    titleKey: 'command', mode: 'DISCUSSION', state: 'READY', contextKey: 'commandContext',
    html: () => `
      <h2>${t('command')}</h2>
      <p>${t('commandDesc')}</p>
      <textarea class="command-box" placeholder="ODIN\nMODE: DISCUSSION\nTASK: ..."></textarea>
      <button class="primary-action" type="button" onclick="simulateIntent()">${t('analyzeIntent')}</button>
      <div class="flow"><span>INPUT</span><span>INTENT</span><span>MODE</span><span>STATE</span><span>ACTION</span></div>
    `
  },
  map: {
    titleKey: 'map', mode: 'CONTROL', state: 'MAP_ACTIVE', contextKey: 'mapContext',
    html: () => `
      <h2>${t('map')}</h2>
      <p>${t('mapDesc')}</p>
      <div class="zone-grid">
        ${card('OIS Core', 'INPUT → INTENT → MODE → STATE → ACTION.')}
        ${card('Work Zones', lang === 'uk' ? 'Динамічні робочі області, що активуються наміром і станом.' : 'Dynamic work areas activated by intent and state.')}
        ${card('File Workspace', lang === 'uk' ? 'Git-подібна модель: editor, diff, approve/reject, history, package.' : 'Git-like model: editor, diff, approve/reject, history, package.')}
        ${card('Design DNA', lang === 'uk' ? 'Спокій, ясність, контроль, впевненість, якість.' : 'Calm, clarity, control, confidence, quality.')}
      </div>
    `
  },
  files: {
    titleKey: 'files', mode: 'CONTROL', state: 'FILES_READY', contextKey: 'filesContext',
    html: () => `
      <h2>${t('files')}</h2>
      <p>${t('filesDesc')}</p>
      <div class="zone-grid">
        ${card(t('editor'), t('editorDesc'))}
        ${card(t('diff'), t('diffDesc'))}
        ${card(t('approve'), t('approveDesc'))}
        ${card(t('package'), t('packageDesc'))}
      </div>
    `
  },
  ois: {
    titleKey: 'ois', mode: 'SYSTEM', state: 'OIS_VISIBLE', contextKey: 'oisContext',
    html: () => `
      <h2>${t('ois')}</h2>
      <p>${t('oisDesc')}</p>
      <div class="flow"><span>Smart Intent</span><span>Command Override</span><span>Mode Engine</span><span>State Engine</span><span>Decision Engine</span></div>
    `
  },
  manual: {
    titleKey: 'manual', mode: 'ASSISTED', state: 'HELP_ACTIVE', contextKey: 'manualContext',
    html: () => `
      <h2>${t('manual')}</h2>
      <p>${t('manualDesc')}</p>
      <div class="zone-grid">
        ${card('ODIN Lexicon', lang === 'uk' ? 'Терміни, команди, стани, режими, правила спілкування.' : 'Terms, commands, states, modes, and communication rules.')}
        ${card('Assisted Mode', lang === 'uk' ? 'Підказки, наступні кроки, пояснення залежностей.' : 'Hints, next steps, and dependency explanations.')}
      </div>
    `
  }
};

function applyI18n() {
  document.documentElement.lang = lang;
  document.body.dataset.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  themeToggle.textContent = document.body.dataset.theme === 'dark' ? t('themeToLight') : t('themeToDark');
}

function setZone(zoneKey) {
  currentZone = zoneKey;
  const zone = zones[zoneKey] || zones.command;
  workZone.innerHTML = zone.html();
  contextText.textContent = t(zone.contextKey);
  zoneValue.textContent = t(zone.titleKey).toUpperCase();
  modeValue.textContent = zone.mode;
  stateValue.textContent = zone.state;
  treeItems.forEach((item) => item.classList.toggle('active', item.dataset.zone === zoneKey));
}

function simulateIntent() {
  modeValue.textContent = 'ANALYSIS';
  stateValue.textContent = 'INTENT_DETECTED';
  contextText.textContent = t('intentDetected');
}

function openModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.remove('hidden');
}

function renderMasterStart() {
  workZone.innerHTML = `
    <h2>${t('masterTitle')}</h2>
    <p>${t('masterDesc')}</p>
    <div class="zone-grid">
      ${card(t('productSelector'), t('productSelectorDesc'))}
      ${card(t('scenario'), t('scenarioDesc'))}
      ${card(t('pipelinePreview'), t('pipelinePreviewDesc'))}
      ${card(t('status'), 'MASTER_START_READY')}
    </div>
  `;
  modeValue.textContent = 'CONTROL';
  stateValue.textContent = 'MASTER_START_READY';
  zoneValue.textContent = 'MASTER START';
  contextText.textContent = t('masterContext');
  treeItems.forEach((item) => item.classList.remove('active'));
}

masterStart.addEventListener('click', renderMasterStart);

themeToggle.addEventListener('click', () => {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  themeToggle.textContent = next === 'dark' ? t('themeToLight') : t('themeToDark');
});

document.getElementById('langUk').addEventListener('click', () => {
  lang = 'uk';
  document.getElementById('langUk').classList.add('active');
  document.getElementById('langEn').classList.remove('active');
  applyI18n();
  setZone(currentZone);
});

document.getElementById('langEn').addEventListener('click', () => {
  lang = 'en';
  document.getElementById('langEn').classList.add('active');
  document.getElementById('langUk').classList.remove('active');
  applyI18n();
  setZone(currentZone);
});

treeItems.forEach((item) => {
  item.addEventListener('click', () => setZone(item.dataset.zone));
});

document.querySelectorAll('.help-dot').forEach((dot) => {
  dot.addEventListener('click', (event) => {
    event.stopPropagation();
    const key = dot.dataset.help;
    const zone = zones[key] || zones.command;
    openModal(t(zone.titleKey), t(zone.contextKey));
  });
});

document.getElementById('openGeneralHelp').addEventListener('click', () => openModal(t('generalHelpTitle'), t('generalHelp')));
document.getElementById('explainCurrent').addEventListener('click', () => {
  const zone = zones[currentZone] || zones.command;
  openModal(t(zone.titleKey), t(zone.contextKey));
});
document.getElementById('modalClose').addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.add('hidden'); });

applyI18n();
setZone('command');
