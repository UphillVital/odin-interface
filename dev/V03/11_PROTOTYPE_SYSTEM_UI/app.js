const state = {
  lang: 'uk',
  theme: 'light',
  zone: 'command'
};

const t = {
  uk: {
    title: 'Інтерфейс ОДІН V03',
    subtitle: 'Робоче середовище керування системою',
    masterStart: 'ODIN SYSTEM — MASTER START',
    treeTitle: 'Жива карта',
    assistTitle: 'Assisted Mode',
    explainBtn: 'Пояснити цю зону',
    commandHelp: 'Command Center — місце старту. Тут ODIN приймає намір, визначає режим і підказує наступний крок.',
    mapHelp: 'System Map — жива карта зв’язків. Вона показує, як OIS, Work Zones, File Workspace і Master Start пов’язані між собою.',
    filesHelp: 'File Workspace — зона контрольованої роботи з файлами: редактор, зміни, diff, затвердження, історія, пакет.',
    oisHelp: 'OIS Core — шар взаємодії: INPUT → INTENT → MODE → STATE → ACTION → OUTPUT.',
    manualHelp: 'Manual / Help — навчальна зона. Тут мають бути інструкції, словник ODIN і пояснення можливостей.',
    masterHelp: 'MASTER START не просто кнопка. Це вхід у системний запуск: вибір продукту, сценарію, pipeline і контроль результату.'
  },
  en: {
    title: 'ODIN Interface V03',
    subtitle: 'System control workspace',
    masterStart: 'ODIN SYSTEM — MASTER START',
    treeTitle: 'Live Map',
    assistTitle: 'Assisted Mode',
    explainBtn: 'Explain this zone',
    commandHelp: 'Command Center is the starting point. ODIN reads intent, selects mode, and suggests the next step.',
    mapHelp: 'System Map is live navigation. It shows how OIS, Work Zones, File Workspace, and Master Start connect.',
    filesHelp: 'File Workspace is controlled file work: editor, changes, diff, approval, history, and package flow.',
    oisHelp: 'OIS Core is the interaction layer: INPUT → INTENT → MODE → STATE → ACTION → OUTPUT.',
    manualHelp: 'Manual / Help is the learning zone for instructions, ODIN lexicon, and capability explanations.',
    masterHelp: 'MASTER START is not just a button. It starts product selection, scenario selection, pipeline execution, and result control.'
  }
};

const zones = {
  command: {
    kicker: 'Control',
    title: { uk: 'Command Center', en: 'Command Center' },
    desc: { uk: 'Головна робоча зона. Тут ODIN приймає завдання, визначає намір і веде процес.', en: 'The main work zone. ODIN receives the task, detects intent, and guides the process.' },
    cards: [
      ['INPUT', 'Запит або команда користувача.'],
      ['INTENT', 'ODIN визначає, що саме потрібно зробити.'],
      ['ACTION', 'Система пропонує або запускає наступний крок.']
    ],
    helpKey: 'commandHelp'
  },
  map: {
    kicker: 'Navigation',
    title: { uk: 'System Map Live', en: 'System Map Live' },
    desc: { uk: 'Карта стає навігацією: кожен вузол веде до своєї Work Zone.', en: 'The map becomes navigation: each node leads to its own Work Zone.' },
    helpKey: 'mapHelp'
  },
  files: {
    kicker: 'Workspace',
    title: { uk: 'File Workspace', en: 'File Workspace' },
    desc: { uk: 'Контрольована робота з файлами: зміни, diff, approval, history і package.', en: 'Controlled file work: changes, diff, approval, history, and package.' },
    cards: [
      ['Editor', 'Перегляд і робота з файлами.'],
      ['Diff', 'Порівняння змін до затвердження.'],
      ['Approve', 'Фіксація тільки перевірених змін.']
    ],
    helpKey: 'filesHelp'
  },
  ois: {
    kicker: 'Core',
    title: { uk: 'OIS Core', en: 'OIS Core' },
    desc: { uk: 'Серце взаємодії ODIN: Smart System за замовчуванням, Commands як override.', en: 'The ODIN interaction core: Smart System by default, Commands as override.' },
    cards: [
      ['Mode', 'DISCUSSION / BUILD / FIX / QA / EXPORT.'],
      ['State', 'Що зроблено, що заблоковано, що доступно.'],
      ['Decision', 'Автоматичний вибір наступної дії.']
    ],
    helpKey: 'oisHelp'
  },
  manual: {
    kicker: 'Help',
    title: { uk: 'Manual / Help', en: 'Manual / Help' },
    desc: { uk: 'Місце для інструкцій, словника ODIN, пояснень і навчання користувача системі.', en: 'A place for instructions, ODIN lexicon, explanations, and user learning.' },
    cards: [
      ['Lexicon', 'Спільний словник термінів ODIN.'],
      ['How to use', 'Покрокова інструкція роботи.'],
      ['Capabilities', 'Можливості ODIN і приклади складних задач.']
    ],
    helpKey: 'manualHelp'
  }
};

function translate() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t[state.lang][key] || el.textContent;
  });
  document.getElementById('langToggle').textContent = state.lang === 'uk' ? 'EN' : 'UA';
  document.documentElement.lang = state.lang;
}

function renderZone(zoneName) {
  state.zone = zoneName;
  const zone = zones[zoneName];
  document.querySelectorAll('.tree-item').forEach(btn => btn.classList.toggle('active', btn.dataset.zone === zoneName));
  document.getElementById('assistText').textContent = t[state.lang][zone.helpKey];

  if (zoneName === 'map') {
    document.getElementById('workZone').innerHTML = `
      <div class="zone-header"><div><div class="zone-kicker">${zone.kicker}</div><div class="zone-title">${zone.title[state.lang]}</div><div class="zone-desc">${zone.desc[state.lang]}</div></div></div>
      <div class="system-map">
        <div class="node" data-zone="ois"><strong>OIS</strong><span>INPUT → INTENT → MODE</span></div>
        <div class="node" data-zone="command"><strong>Command Center</strong><span>Start and control</span></div>
        <div class="node" data-zone="files"><strong>File Workspace</strong><span>Editor → Diff → Approve</span></div>
        <div class="node" data-zone="manual"><strong>Manual</strong><span>Help and lexicon</span></div>
      </div>`;
    document.querySelectorAll('.node').forEach(node => node.addEventListener('click', () => renderZone(node.dataset.zone)));
    return;
  }

  const cards = (zone.cards || []).map(c => `<div class="card"><h4>${c[0]}</h4><p>${c[1]}</p></div>`).join('');
  document.getElementById('workZone').innerHTML = `
    <div class="zone-header"><div><div class="zone-kicker">${zone.kicker}</div><div class="zone-title">${zone.title[state.lang]}</div><div class="zone-desc">${zone.desc[state.lang]}</div></div></div>
    <div class="card-grid">${cards}</div>`;
}

function showModal(title, text) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  document.getElementById('modal').classList.remove('hidden');
}

document.querySelectorAll('.tree-item').forEach(btn => btn.addEventListener('click', () => renderZone(btn.dataset.zone)));
document.getElementById('themeToggle').addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.body.className = `theme-${state.theme}`;
  document.getElementById('themeToggle').textContent = state.theme === 'light' ? 'Dark' : 'Light';
});
document.getElementById('langToggle').addEventListener('click', () => {
  state.lang = state.lang === 'uk' ? 'en' : 'uk';
  translate();
  renderZone(state.zone);
});
document.getElementById('masterStart').addEventListener('click', () => showModal('ODIN SYSTEM — MASTER START', t[state.lang].masterHelp));
document.getElementById('explainBtn').addEventListener('click', () => showModal(zones[state.zone].title[state.lang], t[state.lang][zones[state.zone].helpKey]));
document.getElementById('modalClose').addEventListener('click', () => document.getElementById('modal').classList.add('hidden'));

translate();
renderZone('command');
