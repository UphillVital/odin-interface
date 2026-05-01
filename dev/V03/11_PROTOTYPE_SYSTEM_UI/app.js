const state = {
  lang: localStorage.getItem('odin_lang') || 'ua',
  theme: localStorage.getItem('odin_theme') || 'light',
  zone: 'command',
  project: null,
  mode: 'discussion',
  status: 'ready'
};

const languages = ['ua', 'en', 'de'];
const htmlLang = { ua: 'uk', en: 'en', de: 'de' };

const i18n = {
  ua: {
    title: 'Інтерфейс ОДІН', subtitle: 'Робоче середовище керування системою', masterStart: 'ODIN SYSTEM — MASTER START', settings: 'Налаштування', quickSettings: 'Швидкі налаштування', themeLabel: 'Тема', languageLabel: 'Мова',
    themeToggleDark: 'Темна тема', themeToggleLight: 'Світла тема', themeLightName: 'Світла', themeDarkName: 'Темна', treeTitle: 'Навігація', zoneCommand: 'Центр керування', zoneMap: 'Карта системи', zoneProjects: 'Проєкти', zoneFiles: 'Робота з файлами', zoneManual: 'Інструкція', assistTitle: 'Пояснення', modeLabel: 'РЕЖИМ', stateLabel: 'СТАН', projectLabel: 'ПРОЄКТ', none: 'Не вибрано', modeDiscussion: 'ОБГОВОРЕННЯ', stateReady: 'ГОТОВО', stateMasterReady: 'MASTER START ГОТОВИЙ',
    commandTitle: 'Центр керування', commandBody: 'Головна зона керування ODIN: режим, стан, запуск сценаріїв і MASTER START.', commandAssist: '<strong>Центр керування</strong> — стартова зона. Тут видно стан системи й запускаються головні сценарії. Наступний крок: вибрати продукт або відкрити карту системи.',
    mapTitle: 'Жива карта системи', mapBody: 'Карта показує звʼязки між OIS, робочими зонами, проєктами, роботою з файлами та QA.', mapAssist: '<strong>Карта системи</strong> пояснює, як частини ODIN повʼязані. Клікай вузли, щоб переходити до потрібної робочої зони.',
    projectsTitle: 'Робочий простір проєктів', projectsBody: 'Тут обираються продукти та проєкти: Deutsch Trainer, ІССУ, ССУДТ, нові проєкти.', projectsAssist: '<strong>Проєкти</strong> задають контекст роботи. Робота з файлами має працювати тільки після вибору проєкту.',
    filesTitle: 'Робота з файлами', filesBody: 'Робота з файлами: редактор, зміни, diff, затвердити/відхилити, історія, пакет.', filesNoProject: 'Проєкт ще не вибрано. Відкрий розділ «Проєкти».', filesAssist: '<strong>Робота з файлами</strong> працює в контексті вибраного проєкту. Якщо проєкт не вибрано — спочатку відкрий «Проєкти».',
    fileWorkspaceReady: 'File Workspace активний для вибраного проєкту.', fileSelect: 'Вибрати файл', fileLoadSample: 'Завантажити приклад', fileNameLabel: 'Файл', fileNoFile: 'Файл ще не вибрано', fileEditorTitle: 'Редактор', fileOriginalTitle: 'Оригінал', fileDiffTitle: 'Diff / зміни', fileHistoryTitle: 'Історія', fileApproveBtn: 'Затвердити', fileRejectBtn: 'Відхилити', fileDownloadBtn: 'Завантажити файл', filePackageBtn: 'Підготувати пакет', fileEmptyEditor: 'Вибери текстовий файл або завантаж приклад.', fileApproved: 'Зміни затверджено.', fileRejected: 'Зміни відхилено.', fileDownloaded: 'Файл підготовлено до завантаження.', filePackaged: 'Пакет підготовлено логічно. Реальна ZIP-збірка буде наступним рівнем.', fileChanged: 'Є зміни', fileClean: 'Без змін', fileLinesChanged: 'Змінені рядки', fileBrowserLimit: 'Браузер не має прямого доступу до диска. Файл можна відкрити через вибір і завантажити оновлену копію.', fileNeedProject: 'Спочатку вибери проєкт, щоб ODIN знав контекст роботи з файлами.', fileSampleName: 'ODIN_SAMPLE_NOTE.md', fileSampleContent: '# ODIN sample\n\nЦе приклад файлу для перевірки редактора, diff, approve/reject та history.\n', diffNoChanges: 'Змін немає.', diffOriginal: 'Оригінал', diffDraft: 'Чернетка', historyEmpty: 'Історія поки порожня.', historyApproved: 'Затверджено', historyRejected: 'Відхилено', historyLoaded: 'Файл відкрито',
    manualTitle: 'Інструкція / Допомога', manualBody: 'Інструкції, можливості ODIN, словник і правила роботи.', manualAssist: '<strong>Інструкція</strong> — місце навчання й самопояснення системи. Тут має бути докладний HTML-довідник.',
    masterAssist: '<strong>MASTER START</strong> активовано. Наступний етап: вибір продукту → сценарій → перегляд pipeline → запуск.', selectedPrefix: 'Проєкт вибрано:', selectedSuffix: 'Тепер робота з файлами може працювати в правильному контексті.',
    flow: 'ВХІД → НАМІР → РЕЖИМ → СТАН → ДІЯ', nodeProjects: 'Проєкти → Контекст роботи', nodeFiles: 'Робота з файлами → Зміни', nodeOis: 'OIS → Центр керування', nodeManual: 'Інструкція → Пояснення', editor: 'Редактор', changes: 'Зміни / Diff', approve: 'Затвердити / Відхилити', package: 'Пакет', capabilities: 'Можливості ODIN', lexicon: 'Словник OIS', howTo: 'Як працювати', quality: 'Правила якості', newProject1: 'Новий проєкт 1', dtProject: 'Deutsch Trainer', issuProject: 'DT / ІССУ', ssudtProject: 'DT / ССУДТ', zoneHint: 'Локальна підказка для поточної робочої зони.',
    hintMaster: 'Запускає головний системний сценарій для вибраного продукту або проєкту.', hintTree: 'Дерево показує основні рівні ODIN. Клік відкриває відповідну робочу зону.', hintCommand: 'Головна зона керування: режим, стан, запуск сценаріїв.', hintMap: 'Жива карта системи: звʼязки, залежності, переходи до зон.', hintProjects: 'Місце вибору продуктів і проєктів: DT, ІССУ, ССУДТ, нові проєкти.', hintFiles: 'Робота з файлами у контексті вибраного проєкту: зміни, diff, approve/reject.', hintManual: 'Інструкції, пояснення можливостей ODIN і правила роботи.', hintAssist: 'Ця панель пояснює, де ти зараз і що логічно робити далі.'
  },
  en: {
    title: 'ODIN Interface', subtitle: 'System control workspace', masterStart: 'ODIN SYSTEM — MASTER START', settings: 'Settings', quickSettings: 'Quick settings', themeLabel: 'Theme', languageLabel: 'Language',
    themeToggleDark: 'Dark theme', themeToggleLight: 'Light theme', themeLightName: 'Light', themeDarkName: 'Dark', treeTitle: 'Navigation', zoneCommand: 'Command Center', zoneMap: 'System Map', zoneProjects: 'Projects', zoneFiles: 'File Workspace', zoneManual: 'Manual', assistTitle: 'Explanation', modeLabel: 'MODE', stateLabel: 'STATE', projectLabel: 'PROJECT', none: 'None selected', modeDiscussion: 'DISCUSSION', stateReady: 'READY', stateMasterReady: 'MASTER START READY',
    commandTitle: 'Command Center', commandBody: 'Main ODIN control zone: mode, state, scenario launch, and MASTER START.', commandAssist: '<strong>Command Center</strong> is the starting zone. You see system state and launch main scenarios. Next step: select a product or open System Map.',
    mapTitle: 'Live System Map', mapBody: 'The map shows links between OIS, Work Zones, Projects, File Workspace, and QA.', mapAssist: '<strong>System Map</strong> explains how ODIN parts are connected. Click nodes to navigate to work zones.',
    projectsTitle: 'Projects Workspace', projectsBody: 'Select products and projects: Deutsch Trainer, ISSU, SSUDT, new projects.', projectsAssist: '<strong>Projects</strong> sets the working context. File Workspace should work only after a project is selected.',
    filesTitle: 'File Workspace', filesBody: 'Work with files: editor, changes, diff, approve/reject, history, package.', filesNoProject: 'No project selected yet. Open Projects.', filesAssist: '<strong>File Workspace</strong> works in the selected project context. If no project is selected, open Projects first.',
    fileWorkspaceReady: 'File Workspace is active for the selected project.', fileSelect: 'Choose file', fileLoadSample: 'Load sample', fileNameLabel: 'File', fileNoFile: 'No file selected yet', fileEditorTitle: 'Editor', fileOriginalTitle: 'Original', fileDiffTitle: 'Diff / changes', fileHistoryTitle: 'History', fileApproveBtn: 'Approve', fileRejectBtn: 'Reject', fileDownloadBtn: 'Download file', filePackageBtn: 'Prepare package', fileEmptyEditor: 'Choose a text file or load a sample.', fileApproved: 'Changes approved.', fileRejected: 'Changes rejected.', fileDownloaded: 'File prepared for download.', filePackaged: 'Package prepared logically. Real ZIP build is the next level.', fileChanged: 'Changed', fileClean: 'No changes', fileLinesChanged: 'Changed lines', fileBrowserLimit: 'The browser cannot directly access your disk. Open a file with the picker and download the updated copy.', fileNeedProject: 'Select a project first so ODIN knows the file-work context.', fileSampleName: 'ODIN_SAMPLE_NOTE.md', fileSampleContent: '# ODIN sample\n\nThis is a sample file for testing editor, diff, approve/reject, and history.\n', diffNoChanges: 'No changes.', diffOriginal: 'Original', diffDraft: 'Draft', historyEmpty: 'History is empty.', historyApproved: 'Approved', historyRejected: 'Rejected', historyLoaded: 'File loaded',
    manualTitle: 'Manual / Help', manualBody: 'Instructions, ODIN capabilities, lexicon, and working rules.', manualAssist: '<strong>Manual</strong> is the system learning and self-explanation area. It should contain a detailed editable HTML guide.',
    masterAssist: '<strong>MASTER START</strong> activated. Next stage: product selection → scenario → pipeline preview → launch.', selectedPrefix: 'Project selected:', selectedSuffix: 'File Workspace can now work in the correct context.',
    flow: 'INPUT → INTENT → MODE → STATE → ACTION', nodeProjects: 'Projects → Work Context', nodeFiles: 'File Workspace → Changes', nodeOis: 'OIS → Command Center', nodeManual: 'Manual → Explanation', editor: 'Editor', changes: 'Changes / Diff', approve: 'Approve / Reject', package: 'Package', capabilities: 'ODIN Capabilities', lexicon: 'OIS Lexicon', howTo: 'How to work', quality: 'Quality rules', newProject1: 'New Project 1', dtProject: 'Deutsch Trainer', issuProject: 'DT / ISSU', ssudtProject: 'DT / SSUDT', zoneHint: 'Local hint for the current work zone.',
    hintMaster: 'Starts the main system scenario for the selected product or project.', hintTree: 'The tree shows core ODIN layers. Click to open the related work zone.', hintCommand: 'Main control zone: mode, state, scenario launch.', hintMap: 'Live system map: links, dependencies, navigation to zones.', hintProjects: 'Select products and projects: DT, ISSU, SSUDT, new projects.', hintFiles: 'Work with files in the selected project context: changes, diff, approve/reject.', hintManual: 'Instructions, ODIN capabilities, and operating rules.', hintAssist: 'This panel explains where you are and what the next logical step is.'
  },
  de: {
    title: 'ODIN Oberfläche', subtitle: 'Arbeitsbereich zur Systemsteuerung', masterStart: 'ODIN SYSTEM — MASTER START', settings: 'Einstellungen', quickSettings: 'Schnelleinstellungen', themeLabel: 'Design', languageLabel: 'Sprache',
    themeToggleDark: 'Dunkles Design', themeToggleLight: 'Helles Design', themeLightName: 'Hell', themeDarkName: 'Dunkel', treeTitle: 'Navigation', zoneCommand: 'Steuerzentrale', zoneMap: 'Systemkarte', zoneProjects: 'Projekte', zoneFiles: 'Dateiarbeitsbereich', zoneManual: 'Handbuch', assistTitle: 'Erklärung', modeLabel: 'MODUS', stateLabel: 'STATUS', projectLabel: 'PROJEKT', none: 'Nicht ausgewählt', modeDiscussion: 'DISKUSSION', stateReady: 'BEREIT', stateMasterReady: 'MASTER START BEREIT',
    commandTitle: 'Steuerzentrale', commandBody: 'Zentrale ODIN-Steuerzone: Modus, Status, Szenariostart und MASTER START.', commandAssist: '<strong>Steuerzentrale</strong> ist die Startzone. Hier siehst du den Systemstatus und startest Hauptszenarien. Nächster Schritt: Produkt auswählen oder Systemkarte öffnen.',
    mapTitle: 'Lebendige Systemkarte', mapBody: 'Die Karte zeigt Verbindungen zwischen OIS, Arbeitszonen, Projekten, Dateiarbeitsbereich und QA.', mapAssist: '<strong>Systemkarte</strong> erklärt, wie ODIN-Bereiche verbunden sind. Klicke auf Knoten, um zu Arbeitszonen zu wechseln.',
    projectsTitle: 'Projektarbeitsbereich', projectsBody: 'Hier werden Produkte und Projekte ausgewählt: Deutsch Trainer, ISSU, SSUDT, neue Projekte.', projectsAssist: '<strong>Projekte</strong> setzen den Arbeitskontext. Der Dateiarbeitsbereich soll erst nach Projektauswahl arbeiten.',
    filesTitle: 'Dateiarbeitsbereich', filesBody: 'Arbeit mit Dateien: Editor, Änderungen, Diff, Genehmigen/Ablehnen, Verlauf, Paket.', filesNoProject: 'Noch kein Projekt ausgewählt. Öffne den Bereich „Projekte“.', filesAssist: '<strong>Dateiarbeitsbereich</strong> arbeitet im Kontext des ausgewählten Projekts. Wenn kein Projekt ausgewählt ist, öffne zuerst „Projekte“.',
    fileWorkspaceReady: 'Der Dateiarbeitsbereich ist für das ausgewählte Projekt aktiv.', fileSelect: 'Datei wählen', fileLoadSample: 'Beispiel laden', fileNameLabel: 'Datei', fileNoFile: 'Noch keine Datei ausgewählt', fileEditorTitle: 'Editor', fileOriginalTitle: 'Original', fileDiffTitle: 'Diff / Änderungen', fileHistoryTitle: 'Verlauf', fileApproveBtn: 'Genehmigen', fileRejectBtn: 'Ablehnen', fileDownloadBtn: 'Datei herunterladen', filePackageBtn: 'Paket vorbereiten', fileEmptyEditor: 'Wähle eine Textdatei oder lade ein Beispiel.', fileApproved: 'Änderungen genehmigt.', fileRejected: 'Änderungen abgelehnt.', fileDownloaded: 'Datei zum Herunterladen vorbereitet.', filePackaged: 'Paket logisch vorbereitet. Der echte ZIP-Build ist die nächste Stufe.', fileChanged: 'Geändert', fileClean: 'Keine Änderungen', fileLinesChanged: 'Geänderte Zeilen', fileBrowserLimit: 'Der Browser kann nicht direkt auf deine Festplatte zugreifen. Öffne eine Datei über die Auswahl und lade die aktualisierte Kopie herunter.', fileNeedProject: 'Wähle zuerst ein Projekt, damit ODIN den Dateikontext kennt.', fileSampleName: 'ODIN_SAMPLE_NOTE.md', fileSampleContent: '# ODIN Beispiel\n\nDies ist eine Beispieldatei zum Testen von Editor, Diff, Genehmigen/Ablehnen und Verlauf.\n', diffNoChanges: 'Keine Änderungen.', diffOriginal: 'Original', diffDraft: 'Entwurf', historyEmpty: 'Der Verlauf ist leer.', historyApproved: 'Genehmigt', historyRejected: 'Abgelehnt', historyLoaded: 'Datei geladen',
    manualTitle: 'Handbuch / Hilfe', manualBody: 'Anleitungen, ODIN-Fähigkeiten, Lexikon und Arbeitsregeln.', manualAssist: '<strong>Handbuch</strong> ist der Lern- und Selbsterklärungsbereich des Systems. Hier soll ein detailliertes editierbares HTML-Handbuch liegen.',
    masterAssist: '<strong>MASTER START</strong> aktiviert. Nächste Stufe: Produktauswahl → Szenario → Pipeline-Vorschau → Start.', selectedPrefix: 'Projekt ausgewählt:', selectedSuffix: 'Der Dateiarbeitsbereich kann jetzt im richtigen Kontext arbeiten.',
    flow: 'EINGABE → ABSICHT → MODUS → STATUS → AKTION', nodeProjects: 'Projekte → Arbeitskontext', nodeFiles: 'Dateiarbeitsbereich → Änderungen', nodeOis: 'OIS → Steuerzentrale', nodeManual: 'Handbuch → Erklärung', editor: 'Editor', changes: 'Änderungen / Diff', approve: 'Genehmigen / Ablehnen', package: 'Paket', capabilities: 'ODIN-Fähigkeiten', lexicon: 'OIS-Lexikon', howTo: 'Arbeitsweise', quality: 'Qualitätsregeln', newProject1: 'Neues Projekt 1', dtProject: 'Deutsch Trainer', issuProject: 'DT / ISSU', ssudtProject: 'DT / SSUDT', zoneHint: 'Lokaler Hinweis für die aktuelle Arbeitszone.',
    hintMaster: 'Startet das Hauptszenario für das ausgewählte Produkt oder Projekt.', hintTree: 'Der Baum zeigt die wichtigsten ODIN-Ebenen. Ein Klick öffnet die passende Arbeitszone.', hintCommand: 'Zentrale Steuerzone: Modus, Status, Szenariostart.', hintMap: 'Lebendige Systemkarte: Verbindungen, Abhängigkeiten, Navigation zu Zonen.', hintProjects: 'Produkte und Projekte auswählen: DT, ISSU, SSUDT, neue Projekte.', hintFiles: 'Dateiarbeit im Kontext des ausgewählten Projekts: Änderungen, Diff, Genehmigen/Ablehnen.', hintManual: 'Anleitungen, ODIN-Fähigkeiten und Arbeitsregeln.', hintAssist: 'Diese Leiste erklärt, wo du bist und was der nächste logische Schritt ist.'
  }
};

const workZone = document.getElementById('workZone');
const assistContent = document.getElementById('assistContent');
const modeValue = document.getElementById('modeValue');
const stateValue = document.getElementById('stateValue');
const projectValue = document.getElementById('projectValue');
const settingsToggle = document.getElementById('settingsToggle');
const settingsMenu = document.getElementById('settingsMenu');
const themeValue = document.getElementById('themeValue');

const fileState = {
  name: localStorage.getItem('odin_file_name') || '',
  original: localStorage.getItem('odin_file_original') || '',
  draft: localStorage.getItem('odin_file_draft') || '',
  history: JSON.parse(localStorage.getItem('odin_file_history') || '[]')
};

function saveFileState() {
  localStorage.setItem('odin_file_name', fileState.name || '');
  localStorage.setItem('odin_file_original', fileState.original || '');
  localStorage.setItem('odin_file_draft', fileState.draft || '');
  localStorage.setItem('odin_file_history', JSON.stringify(fileState.history.slice(-20)));
}

function addHistory(type) {
  fileState.history.unshift({ type, time: new Date().toLocaleString() });
  fileState.history = fileState.history.slice(0, 20);
  saveFileState();
}

function t(key) { return (i18n[state.lang] && i18n[state.lang][key]) || i18n.ua[key] || key; }
function nextLanguage() { return languages[(languages.indexOf(state.lang) + 1) % languages.length]; }

function applyTheme() {
  document.body.classList.toggle('theme-light', state.theme === 'light');
  document.body.classList.toggle('theme-dark', state.theme === 'dark');
  document.body.dataset.theme = state.theme;
  localStorage.setItem('odin_theme', state.theme);
}

function applyI18n() {
  document.documentElement.lang = htmlLang[state.lang] || 'uk';
  document.body.dataset.lang = state.lang;
  localStorage.setItem('odin_lang', state.lang);

  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-help-key]').forEach(el => { el.setAttribute('data-help', t(el.dataset.helpKey)); });

  themeValue.textContent = state.theme === 'light' ? t('themeLightName') : t('themeDarkName');
  document.querySelectorAll('[data-lang-option]').forEach(btn => {
    const active = btn.dataset.langOption === state.lang;
    btn.classList.toggle('active', active);
    btn.classList.toggle('flag-ua', btn.dataset.langOption === 'ua');
    btn.classList.toggle('flag-en', btn.dataset.langOption === 'en');
    btn.classList.toggle('flag-de', btn.dataset.langOption === 'de');
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  modeValue.textContent = t('modeDiscussion');
  stateValue.textContent = state.status === 'master' ? t('stateMasterReady') : t('stateReady');
  projectValue.textContent = state.project || t('none');
}

function setActiveTree(zone) {
  document.querySelectorAll('.tree-item').forEach(btn => btn.classList.toggle('active', btn.dataset.zone === zone));
}

function hint() { return `<span class="hint" tabindex="0" data-help-key="zoneHint" data-help="${t('zoneHint')}">?</span>`; }
function zoneTemplate(title, body, cards = '') {
  return `<section class="zone-card"><h2 class="zone-title">${title}${hint()}</h2><p>${body}</p>${cards}</section>`;
}
function card(label, action = '') { return action ? `<button class="mini-card" onclick="${action}">${label}</button>` : `<div class="mini-card">${label}</div>`; }

function renderZone(zone) {
  state.zone = zone;
  state.status = state.status === 'master' ? 'master' : 'ready';
  setActiveTree(zone);

  if (zone === 'command') {
    workZone.innerHTML = zoneTemplate(t('commandTitle'), t('commandBody'), `<div class="action-row"><button class="primary-action" onclick="masterStart()">${t('masterStart')} ${hint()}</button><div class="input-like">${t('flow')}</div></div>`);
    assistContent.innerHTML = t('commandAssist');
  }

  if (zone === 'map') {
    workZone.innerHTML = zoneTemplate(t('mapTitle'), t('mapBody'), `<div class="zone-grid">${card(t('nodeProjects'), "renderZone('projects')")}${card(t('nodeFiles'), "renderZone('files')")}${card(t('nodeOis'), "renderZone('command')")}${card(t('nodeManual'), "renderZone('manual')")}</div>`);
    assistContent.innerHTML = t('mapAssist');
  }

  if (zone === 'projects') {
    workZone.innerHTML = zoneTemplate(t('projectsTitle'), t('projectsBody'), `<div class="zone-grid">${card(t('dtProject'), "selectProject('Deutsch Trainer / DT')")}${card(t('issuProject'), "selectProject('DT / ІССУ')")}${card(t('ssudtProject'), "selectProject('DT / ССУДТ')")}${card(t('newProject1'), "selectProject('New Project 1')")}</div>`);
    assistContent.innerHTML = t('projectsAssist');
  }

  if (zone === 'files') {
    renderFileWorkspace();
  }

  if (zone === 'manual') {
    workZone.innerHTML = zoneTemplate(t('manualTitle'), t('manualBody'), `<div class="zone-grid">${card(t('capabilities'))}${card(t('lexicon'))}${card(t('howTo'))}${card(t('quality'))}</div>`);
    assistContent.innerHTML = t('manualAssist');
  }

  applyI18n();
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function computeDiff() {
  const originalLines = (fileState.original || '').split('\n');
  const draftLines = (fileState.draft || '').split('\n');
  const max = Math.max(originalLines.length, draftLines.length);
  const rows = [];
  let changes = 0;
  for (let i = 0; i < max; i += 1) {
    const original = originalLines[i] ?? '';
    const draft = draftLines[i] ?? '';
    if (original === draft) {
      if (original || draft || i < max - 1) rows.push(`<div class="diff-row diff-same"><span>${i + 1}</span><code>${escapeHtml(draft)}</code></div>`);
    } else {
      changes += 1;
      rows.push(`<div class="diff-row diff-removed"><span>${i + 1}</span><code>- ${escapeHtml(original)}</code></div>`);
      rows.push(`<div class="diff-row diff-added"><span>${i + 1}</span><code>+ ${escapeHtml(draft)}</code></div>`);
    }
  }
  return { changes, html: changes ? rows.join('') : `<div class="empty-state">${t('diffNoChanges')}</div>` };
}

function renderHistory() {
  if (!fileState.history.length) return `<div class="empty-state">${t('historyEmpty')}</div>`;
  return fileState.history.map(item => `<div class="history-item"><strong>${escapeHtml(t(item.type) || item.type)}</strong><span>${escapeHtml(item.time)}</span></div>`).join('');
}

function renderFileWorkspace() {
  const hasProject = Boolean(state.project);
  const diff = computeDiff();
  const isChanged = fileState.original !== fileState.draft;
  const projectNote = hasProject
    ? `<div class="workspace-context"><strong>${escapeHtml(state.project)}</strong><span>${t('fileWorkspaceReady')}</span></div>`
    : `<div class="workspace-context warning"><strong>${t('filesNoProject')}</strong><span>${t('fileNeedProject')}</span></div>`;

  workZone.innerHTML = zoneTemplate(t('filesTitle'), t('filesBody'), `
    ${projectNote}
    <div class="file-workspace">
      <div class="file-toolbar">
        <label class="file-picker">
          ${t('fileSelect')}
          <input id="fileInput" type="file" accept=".txt,.md,.html,.css,.js,.json,.xml,.csv,text/*" />
        </label>
        <button type="button" onclick="loadSampleFile()">${t('fileLoadSample')}</button>
        <button type="button" onclick="approveFileDraft()" ${hasProject ? '' : 'disabled'}>${t('fileApproveBtn')}</button>
        <button type="button" onclick="rejectFileDraft()" ${hasProject ? '' : 'disabled'}>${t('fileRejectBtn')}</button>
        <button type="button" onclick="downloadDraftFile()" ${hasProject && fileState.name ? '' : 'disabled'}>${t('fileDownloadBtn')}</button>
      </div>

      <div class="file-meta">
        <span><strong>${t('fileNameLabel')}:</strong> ${escapeHtml(fileState.name || t('fileNoFile'))}</span>
        <span class="file-status ${isChanged ? 'changed' : 'clean'}">${isChanged ? t('fileChanged') : t('fileClean')}</span>
        <span>${t('fileLinesChanged')}: <strong>${diff.changes}</strong></span>
      </div>

      <div class="browser-note">${t('fileBrowserLimit')}</div>

      <div class="file-grid">
        <section class="file-panel editor-panel">
          <h3>${t('fileEditorTitle')} ${hint()}</h3>
          <textarea id="fileEditor" ${hasProject ? '' : 'disabled'} placeholder="${escapeHtml(t('fileEmptyEditor'))}">${escapeHtml(fileState.draft)}</textarea>
        </section>
        <section class="file-panel">
          <h3>${t('fileOriginalTitle')}</h3>
          <pre>${escapeHtml(fileState.original || t('fileEmptyEditor'))}</pre>
        </section>
        <section class="file-panel diff-panel">
          <h3>${t('fileDiffTitle')}</h3>
          <div id="diffView">${diff.html}</div>
        </section>
        <section class="file-panel history-panel">
          <h3>${t('fileHistoryTitle')}</h3>
          ${renderHistory()}
        </section>
      </div>

      <div class="action-row">
        <button type="button" class="primary-action" onclick="prepareFilePackage()" ${hasProject ? '' : 'disabled'}>${t('filePackageBtn')}</button>
      </div>
    </div>
  `);
  assistContent.innerHTML = hasProject ? t('filesAssist') : `<strong>${t('filesTitle')}</strong><br>${t('fileNeedProject')}`;
  bindFileWorkspaceEvents();
}

function bindFileWorkspaceEvents() {
  const input = document.getElementById('fileInput');
  if (input) {
    input.addEventListener('change', event => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        fileState.name = file.name;
        fileState.original = String(reader.result || '');
        fileState.draft = fileState.original;
        addHistory('historyLoaded');
        renderFileWorkspace();
      };
      reader.readAsText(file);
    });
  }
  const editor = document.getElementById('fileEditor');
  if (editor) {
    editor.addEventListener('input', event => {
      fileState.draft = event.target.value;
      saveFileState();
      renderFileWorkspace();
    });
  }
}

function loadSampleFile() {
  fileState.name = t('fileSampleName');
  fileState.original = t('fileSampleContent').replaceAll('\\n', '\n');
  fileState.draft = fileState.original;
  addHistory('historyLoaded');
  renderFileWorkspace();
}

function approveFileDraft() {
  fileState.original = fileState.draft;
  addHistory('historyApproved');
  assistContent.innerHTML = t('fileApproved');
  renderFileWorkspace();
}

function rejectFileDraft() {
  fileState.draft = fileState.original;
  addHistory('historyRejected');
  assistContent.innerHTML = t('fileRejected');
  renderFileWorkspace();
}

function downloadDraftFile() {
  if (!fileState.name) return;
  const blob = new Blob([fileState.draft || ''], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileState.name.replace(/(\.[^.]+)?$/, '_ODIN_EDIT$1');
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  assistContent.innerHTML = t('fileDownloaded');
}

function prepareFilePackage() {
  assistContent.innerHTML = t('filePackaged');
}

function selectProject(projectName) {
  state.project = projectName;
  projectValue.textContent = projectName;
  assistContent.innerHTML = `<strong>${t('selectedPrefix')}</strong> ${projectName}. ${t('selectedSuffix')}`;
}

function masterStart() {
  state.status = 'master';
  renderZone('projects');
  assistContent.innerHTML = t('masterAssist');
  applyI18n();
}

document.querySelectorAll('.tree-item').forEach(btn => btn.addEventListener('click', () => renderZone(btn.dataset.zone)));
settingsToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  const isOpen = !settingsMenu.hidden;
  settingsMenu.hidden = isOpen;
  settingsToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
});

document.addEventListener('click', (event) => {
  if (!document.getElementById('quickSettings').contains(event.target)) {
    settingsMenu.hidden = true;
    settingsToggle.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    settingsMenu.hidden = true;
    settingsToggle.setAttribute('aria-expanded', 'false');
  }
});

document.getElementById('themeToggle').addEventListener('click', () => { state.theme = state.theme === 'light' ? 'dark' : 'light'; applyTheme(); applyI18n(); });
document.querySelectorAll('[data-lang-option]').forEach(btn => btn.addEventListener('click', () => {
  state.lang = btn.dataset.langOption;
  renderZone(state.zone);
}));

applyTheme();
applyI18n();
renderZone('command');
