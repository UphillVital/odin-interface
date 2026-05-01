const workZone = document.getElementById('workZone');
const contextText = document.getElementById('contextText');
const zoneValue = document.getElementById('zoneValue');
const modeValue = document.getElementById('modeValue');
const stateValue = document.getElementById('stateValue');
const themeToggle = document.getElementById('themeToggle');
const masterStart = document.getElementById('masterStart');
const treeItems = document.querySelectorAll('.tree-item');

const zones = {
  command: {
    title: 'Command Center',
    mode: 'DISCUSSION',
    state: 'READY',
    context: 'Центральна зона для введення наміру, перевірки режиму та запуску керованих сценаріїв.',
    html: `
      <h2>Command Center</h2>
      <p>ODIN приймає запит, визначає intent, режим, стан і наступну робочу зону.</p>
      <textarea class="command-box" placeholder="ODIN\nMODE: DISCUSSION\nTASK: ..."></textarea>
      <button class="primary-action" type="button" onclick="simulateIntent()">Analyze Intent</button>
      <div class="flow"><span>INPUT</span><span>INTENT</span><span>MODE</span><span>STATE</span><span>ACTION</span></div>
    `
  },
  map: {
    title: 'System Map',
    mode: 'CONTROL',
    state: 'MAP_ACTIVE',
    context: 'Жива карта системи має бути навігацією, а не декоративним деревом.',
    html: `
      <h2>System Map</h2>
      <p>Карта показує звʼязки між OIS, Work Zones, File Workspace, Design DNA та продуктами ODIN.</p>
      <div class="zone-grid">
        <article class="zone-card"><h3>OIS Core</h3><p>INPUT → INTENT → MODE → STATE → ACTION.</p></article>
        <article class="zone-card"><h3>Work Zones</h3><p>Динамічні робочі області, що активуються наміром і станом.</p></article>
        <article class="zone-card"><h3>File Workspace</h3><p>Git-подібна модель: editor, diff, approve/reject, history, package.</p></article>
        <article class="zone-card"><h3>Design DNA</h3><p>Спокій, ясність, контроль, впевненість, якість.</p></article>
      </div>
    `
  },
  files: {
    title: 'File Workspace',
    mode: 'CONTROL',
    state: 'FILES_READY',
    context: 'Файлова зона має показувати зміни, diff, затвердження та підготовку пакетів.',
    html: `
      <h2>File Workspace</h2>
      <p>Це окремий світ всередині ODIN: робота з файлами без сліпих змін.</p>
      <div class="zone-grid">
        <article class="zone-card"><h3>Editor</h3><p>Редагування змісту майбутнього модуля.</p></article>
        <article class="zone-card"><h3>Changes / Diff</h3><p>Порівняння перед затвердженням.</p></article>
        <article class="zone-card"><h3>Approve / Reject</h3><p>Жодна зміна не проходить без контролю.</p></article>
        <article class="zone-card"><h3>Package</h3><p>Готовий plug & play пакет без порожніх папок.</p></article>
      </div>
    `
  },
  ois: {
    title: 'OIS Core',
    mode: 'SYSTEM',
    state: 'OIS_VISIBLE',
    context: 'OIS — шар, який перетворює спілкування на керовану системну дію.',
    html: `
      <h2>OIS Core</h2>
      <p>Гібридна модель: DEFAULT = Smart System, OVERRIDE = Commands.</p>
      <div class="flow"><span>Smart Intent</span><span>Command Override</span><span>Mode Engine</span><span>State Engine</span><span>Decision Engine</span></div>
    `
  },
  manual: {
    title: 'Manual / Help',
    mode: 'ASSISTED',
    state: 'HELP_ACTIVE',
    context: 'Manual повинен навчати користувача працювати з ODIN і пояснювати звʼязки.',
    html: `
      <h2>Manual / Help</h2>
      <p>Ця зона буде містити докладну інструкцію, словник ODIN, правила роботи та приклади складних задач.</p>
      <div class="zone-grid">
        <article class="zone-card"><h3>ODIN Lexicon</h3><p>Терміни, команди, стани, режими, правила спілкування.</p></article>
        <article class="zone-card"><h3>Assisted Mode</h3><p>Підказки, наступні кроки, пояснення залежностей.</p></article>
      </div>
    `
  }
};

function setZone(zoneKey) {
  const zone = zones[zoneKey] || zones.command;
  workZone.innerHTML = zone.html;
  contextText.textContent = zone.context;
  zoneValue.textContent = zone.title.toUpperCase();
  modeValue.textContent = zone.mode;
  stateValue.textContent = zone.state;
  treeItems.forEach((item) => item.classList.toggle('active', item.dataset.zone === zoneKey));
}

function simulateIntent() {
  modeValue.textContent = 'ANALYSIS';
  stateValue.textContent = 'INTENT_DETECTED';
  contextText.textContent = 'ODIN визначив намір і готовий активувати відповідну Work Zone.';
}

masterStart.addEventListener('click', () => {
  workZone.innerHTML = `
    <h2>ODIN SYSTEM — MASTER START</h2>
    <p>Primary system action activated. Наступна версія має містити product selector, scenario selector і pipeline preview.</p>
    <div class="zone-grid">
      <article class="zone-card"><h3>Product Selector</h3><p>ODIN Core / Deutsch Trainer / Future Product.</p></article>
      <article class="zone-card"><h3>Scenario</h3><p>Start package, restore, build, QA, export.</p></article>
      <article class="zone-card"><h3>Pipeline Preview</h3><p>TASK → BUILD → QA → PACKAGE.</p></article>
      <article class="zone-card"><h3>Status</h3><p>MASTER_START_READY.</p></article>
    </div>
  `;
  modeValue.textContent = 'CONTROL';
  stateValue.textContent = 'MASTER_START_READY';
  zoneValue.textContent = 'MASTER START';
  contextText.textContent = 'MASTER START — головна системна дія, яка повинна запускати керований сценарій за правилами ODIN.';
  treeItems.forEach((item) => item.classList.remove('active'));
});

themeToggle.addEventListener('click', () => {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  themeToggle.textContent = next === 'dark' ? 'Light Theme' : 'Dark Theme';
});

treeItems.forEach((item) => item.addEventListener('click', () => setZone(item.dataset.zone)));
setZone('command');
