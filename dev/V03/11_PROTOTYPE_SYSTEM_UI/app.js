const state = { lang: 'ua', theme: 'light', zone: 'command', project: null };
const workZone = document.getElementById('workZone');
const assistText = document.getElementById('assistText');

const t = {
  ua: {
    title:'Інтерфейс ОДІН', subtitle:'робоче середовище керування системою', tree:'Дерево системи', theme:'Тема', assistTitle:'Пояснення ODIN',
    commandTitle:'Command Center', commandText:'Тут ODIN приймає намір, команду або режим і переводить їх у робочу зону.',
    mapTitle:'Жива карта системи', mapText:'Карта показує звʼязки між OIS, Work Zones, Projects, File Workspace та QA.',
    projectsTitle:'Проєкти ODIN', projectsText:'Оберіть продукт або проєкт. Після вибору File Workspace працює у його контексті.',
    workspaceTitle:'File Workspace', workspaceText:'Робота з файлами доступна тільки після вибору продукту або проєкту.',
    manualTitle:'Manual / Help', manualText:'Тут будуть докладні інструкції, можливості ODIN та пояснення системи.',
    selected:'Вибрано', next:'Наступний безпечний крок', selectProject:'Обери DT / ІССУ / ССУДТ або новий проєкт.'
  },
  en: {
    title:'ODIN Interface', subtitle:'system control workspace', tree:'System Tree', theme:'Theme', assistTitle:'ODIN Explanation',
    commandTitle:'Command Center', commandText:'ODIN receives intent, command, or mode here and routes it into the correct work zone.',
    mapTitle:'Live System Map', mapText:'The map shows links between OIS, Work Zones, Projects, File Workspace, and QA.',
    projectsTitle:'ODIN Projects', projectsText:'Select a product or project. File Workspace will operate in that selected context.',
    workspaceTitle:'File Workspace', workspaceText:'File work is available only after selecting a product or project.',
    manualTitle:'Manual / Help', manualText:'Detailed instructions, ODIN capabilities, and system explanations will live here.',
    selected:'Selected', next:'Next safe step', selectProject:'Select DT / ISSU / SSUDT or a new project.'
  }
};

const help = {
  master_start:{ua:'Запускає правильний системний сценарій ODIN за вибраним продуктом або режимом.',en:'Starts the correct ODIN scenario based on selected product or mode.'},
  command:{ua:'Головна зона для команд, намірів і режимів.',en:'Main area for commands, intents, and modes.'},
  system_map:{ua:'Жива карта: звʼязки, залежності, переходи у Work Zones.',en:'Live map: relations, dependencies, navigation to Work Zones.'},
  projects:{ua:'Центр вибору продукту або проєкту.',en:'Product or project selection center.'},
  dt:{ua:'Deutsch Trainer — продукт ODIN для німецької.',en:'Deutsch Trainer — ODIN product for German learning.'},
  issu:{ua:'ІССУ — індивідуальна система створення уроків.',en:'ISSU — individual lesson creation system.'},
  ssudt:{ua:'ССУДТ — системна система уроків Deutsch Trainer.',en:'SSUDT — systematic Deutsch Trainer lesson system.'},
  file_workspace:{ua:'Редактор, зміни, diff, approve/reject, history, package — у контексті проєкту.',en:'Editor, changes, diff, approve/reject, history, package — in project context.'},
  manual:{ua:'Інструкції, правила, пояснення можливостей ODIN.',en:'Instructions, rules, and ODIN capability explanations.'}
};

function tr(k){ return t[state.lang][k]; }
function explain(key){ return help[key]?.[state.lang] || ''; }

function syncStaticText(){
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = tr(el.dataset.i18n));
}
function setAssist(title, text, next){
  assistText.innerHTML = `<strong>${title}</strong><br>${text}<br><br><strong>${tr('next')}:</strong><br>${next || tr('selectProject')}`;
}
function setZone(zone){
  state.zone = zone;
  document.querySelectorAll('.tree-item').forEach(b => b.classList.toggle('active', b.dataset.zone === zone));
  render();
}
function selectProject(name){ state.project = name; setZone('workspace'); }
function render(){
  if(state.zone === 'command'){
    workZone.innerHTML = `<h1>${tr('commandTitle')}</h1><p class="muted">${tr('commandText')}</p><div class="card"><h3>ODIN SYSTEM — MASTER START</h3><p>${explain('master_start')}</p></div>`;
    setAssist(tr('commandTitle'), tr('commandText'), tr('selectProject'));
  } else if(state.zone === 'map'){
    workZone.innerHTML = `<h1>${tr('mapTitle')}</h1><p class="muted">${tr('mapText')}</p><div><span class="map-node" onclick="setZone('projects')">Projects</span><span class="map-node" onclick="setZone('workspace')">File Workspace</span><span class="map-node" onclick="setZone('command')">OIS</span><span class="map-node">QA</span></div>`;
    setAssist(tr('mapTitle'), tr('mapText'), tr('selectProject'));
  } else if(['projects','dt','issu','ssudt'].includes(state.zone)){
    workZone.innerHTML = `<h1>${tr('projectsTitle')}</h1><p class="muted">${tr('projectsText')}</p><div class="card-grid"><div class="card" onclick="selectProject('Deutsch Trainer')"><h3>Deutsch Trainer</h3><p>${explain('dt')}</p></div><div class="card" onclick="selectProject('ІССУ')"><h3>ІССУ</h3><p>${explain('issu')}</p></div><div class="card" onclick="selectProject('ССУДТ')"><h3>ССУДТ</h3><p>${explain('ssudt')}</p></div><div class="card" onclick="selectProject('New Project 1')"><h3>New Project 1</h3><p class="muted">Future workspace</p></div></div>`;
    setAssist(tr('projectsTitle'), tr('projectsText'), tr('selectProject'));
  } else if(state.zone === 'workspace'){
    const selected = state.project ? `${tr('selected')}: ${state.project}` : tr('selectProject');
    workZone.innerHTML = `<h1>${tr('workspaceTitle')}</h1><p class="muted">${tr('workspaceText')}</p><div class="card"><h3>${selected}</h3><p>Editor / Changes / Diff / Approve / Reject / History / Package</p></div>`;
    setAssist(tr('workspaceTitle'), tr('workspaceText'), state.project ? 'Review files, then use diff and approval flow.' : tr('selectProject'));
  } else if(state.zone === 'manual'){
    workZone.innerHTML = `<h1>${tr('manualTitle')}</h1><p class="muted">${tr('manualText')}</p><div class="card"><h3>Explanation System</h3><p>${explain('manual')}</p></div>`;
    setAssist(tr('manualTitle'), tr('manualText'), 'Open Explanation System manual.');
  }
}

document.querySelectorAll('.tree-item').forEach(btn => btn.addEventListener('click', () => setZone(btn.dataset.zone)));
document.getElementById('langToggle').addEventListener('click', () => { state.lang = state.lang === 'ua' ? 'en' : 'ua'; syncStaticText(); render(); });
document.getElementById('themeToggle').addEventListener('click', () => { state.theme = state.theme === 'light' ? 'dark' : 'light'; document.body.className = `theme-${state.theme}`; });
document.getElementById('masterStart').addEventListener('click', () => setZone('projects'));

document.addEventListener('click', e => {
  const target = e.target.closest('[data-help]');
  if(!target) return;
  const key = target.dataset.help;
  document.getElementById('modalTitle').textContent = key;
  document.getElementById('modalText').textContent = explain(key);
  document.getElementById('helpModal').hidden = false;
  e.stopPropagation();
});
document.getElementById('closeModal').addEventListener('click', () => document.getElementById('helpModal').hidden = true);

syncStaticText();
render();
