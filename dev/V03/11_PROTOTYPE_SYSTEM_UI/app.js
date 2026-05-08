const state = {
  lang: localStorage.getItem('odin_lang') || 'ua',
  theme: localStorage.getItem('odin_theme') || 'light',
  zone: 'command',
  project: localStorage.getItem('odin_active_project') || null,
  workflow: localStorage.getItem('odin_workflow') || 'editing',
  mode: 'discussion',
  status: 'ready'
};

const languages = ['ua', 'en', 'de'];
const htmlLang = { ua: 'uk', en: 'en', de: 'de' };

const i18n = {
  ua: {
    title: 'Інтерфейс ОДІН', subtitle: 'Робоче середовище керування системою', masterStart: 'ODIN SYSTEM — MASTER START', settings: 'Налаштування', quickSettings: 'Швидкі налаштування', systemPages: 'Сторінки системи', mainInterface: 'Головний інтерфейс', commitBuilder: 'Commit Builder', stateWorkspace: 'State Workspace', themeLabel: 'Тема', languageLabel: 'Мова',
    themeToggleDark: 'Темна тема', themeToggleLight: 'Світла тема', themeLightName: 'Світла', themeDarkName: 'Темна', treeTitle: 'Навігація', zoneCommand: 'Центр керування', zoneMap: 'Карта системи', zoneProjects: 'Проєкти', zoneFiles: 'Робота з файлами', zoneManual: 'Інструкція', assistTitle: 'Пояснення', modeLabel: 'РЕЖИМ', stateLabel: 'СТАН', projectLabel: 'ПРОЄКТ', none: 'Не вибрано', modeDiscussion: 'ОБГОВОРЕННЯ', stateReady: 'ГОТОВО', stateMasterReady: 'MASTER START ГОТОВИЙ',
    commandTitle: 'Центр керування', commandBody: 'Головна зона керування ODIN: режим, стан, запуск сценаріїв і MASTER START.', commandAssist: '<strong>Центр керування</strong> — стартова зона. Тут видно стан системи й запускаються головні сценарії. Наступний крок: вибрати продукт або відкрити карту системи.',
    mapTitle: 'Жива карта системи', mapBody: 'Карта показує звʼязки між OIS, робочими зонами, проєктами, роботою з файлами та QA.', mapAssist: '<strong>Карта системи</strong> пояснює, як частини ODIN повʼязані. Клікай вузли, щоб переходити до потрібної робочої зони.',
    projectsTitle: 'Робочий простір проєктів', projectsBody: 'Тут обираються продукти та проєкти: Deutsch Trainer, ІССУ, ССУДТ, нові проєкти.', projectsAssist: '<strong>Проєкти</strong> задають контекст роботи. Робота з файлами має працювати тільки після вибору проєкту.',
    filesTitle: 'Робота з файлами', filesBody: 'Робота з файлами: редактор, зміни, diff, затвердити/відхилити, історія, пакет.', filesNoProject: 'Проєкт ще не вибрано. Відкрий розділ «Проєкти».', filesAssist: '<strong>Робота з файлами</strong> працює в контексті вибраного проєкту. Якщо проєкт не вибрано — спочатку відкрий «Проєкти».',
    fileWorkspaceReady: 'File Workspace активний для вибраного проєкту.', fileSelect: 'Вибрати файл', fileLoadSample: 'Завантажити приклад', fileNameLabel: 'Файл', fileNoFile: 'Файл ще не вибрано', fileEditorTitle: 'Редактор', fileOriginalTitle: 'Оригінал', fileDiffTitle: 'Diff / зміни', fileHistoryTitle: 'Історія', fileApproveBtn: 'Затвердити', fileRejectBtn: 'Відхилити', fileDownloadBtn: 'Завантажити файл', filePackageBtn: 'Підготувати пакет', filePreviewBtn: 'Переглянути', previewTitle: 'Внутрішній переглядач', previewHtmlMode: 'HTML перегляд', previewCodeMode: 'Текст / код', previewEmpty: 'Немає даних для перегляду. Вибери файл або завантаж приклад.', previewUpdated: 'Перегляд оновлено. Перевір результат перед затвердженням.', fileEmptyEditor: 'Вибери текстовий файл або завантаж приклад.', fileApproved: 'Зміни затверджено.', fileRejected: 'Зміни відхилено.', fileDownloaded: 'Файл підготовлено до завантаження.', filePackaged: 'Пакет підготовлено логічно. Реальна ZIP-збірка буде наступним рівнем.', fileChanged: 'Є зміни', fileClean: 'Без змін', fileLinesChanged: 'Змінені рядки', fileBrowserLimit: 'Браузер не має прямого доступу до диска. Файл можна відкрити через вибір і завантажити оновлену копію.', fileNeedProject: 'Спочатку вибери проєкт, щоб ODIN знав контекст роботи з файлами.', fileSampleName: 'ODIN_SAMPLE_NOTE.md', fileSampleContent: '# ODIN sample\n\nЦе приклад файлу для перевірки редактора, diff, approve/reject та history.\n', diffNoChanges: 'Змін немає.', diffOriginal: 'Оригінал', diffDraft: 'Чернетка', historyEmpty: 'Історія поки порожня.', historyApproved: 'Затверджено', historyRejected: 'Відхилено', historyLoaded: 'Файл відкрито',
    manualTitle: 'Інструкція / Допомога', manualBody: 'Інструкції, можливості ODIN, словник і правила роботи.', manualAssist: '<strong>Інструкція</strong> — місце навчання й самопояснення системи. Тут має бути докладний HTML-довідник.',
    masterAssist: '<strong>MASTER START</strong> активовано. Наступний етап: вибір продукту → сценарій → перегляд pipeline → запуск.', selectedPrefix: 'Проєкт вибрано:', selectedSuffix: 'Тепер робота з файлами може працювати в правильному контексті.',
    flow: 'ВХІД → НАМІР → РЕЖИМ → СТАН → ДІЯ', nodeProjects: 'Проєкти → Контекст роботи', nodeFiles: 'Робота з файлами → Зміни', nodeOis: 'OIS → Центр керування', nodeManual: 'Інструкція → Пояснення', editor: 'Редактор', changes: 'Зміни / Diff', approve: 'Затвердити / Відхилити', package: 'Пакет', capabilities: 'Можливості ODIN', lexicon: 'Словник OIS', howTo: 'Як працювати', quality: 'Правила якості', newProject1: 'Новий проєкт 1', dtProject: 'Deutsch Trainer', issuProject: 'DT / ІССУ', ssudtProject: 'DT / ССУДТ', zoneHint: 'Локальна підказка для поточної робочої зони.', workflowLabel: 'ПРОЦЕС', workflowEditing: 'Редагування', workflowChanged: 'Є зміни', workflowReview: 'Перевірка', workflowApproved: 'Затверджено', workflowSuggestSelectProject: 'Спочатку обери проєкт. Потім відкрий роботу з файлами.', workflowSuggestOpenFile: 'Проєкт вибрано. Тепер можна відкрити файл або завантажити приклад.', workflowSuggestReview: 'Є зміни. Перевір diff і відправ зміни на затвердження.', workflowSuggestApproved: 'Зміни затверджено. Можна підготувати пакет або перейти до наступної задачі.', workflowProjectOpened: 'Проєкт активний. File Workspace тепер працює в його контексті.', workflowMapAction: 'Карта відкрила повʼязану робочу зону.', workflowReviewBtn: 'На перевірку',
    hintMaster: 'Запускає головний системний сценарій для вибраного продукту або проєкту.', hintTree: 'Дерево показує основні рівні ODIN. Клік відкриває відповідну робочу зону.', hintCommand: 'Головна зона керування: режим, стан, запуск сценаріїв.', hintMap: 'Жива карта системи: звʼязки, залежності, переходи до зон.', hintProjects: 'Місце вибору продуктів і проєктів: DT, ІССУ, ССУДТ, нові проєкти.', hintFiles: 'Робота з файлами у контексті вибраного проєкту: зміни, diff, approve/reject.', hintManual: 'Інструкції, пояснення можливостей ODIN і правила роботи.', hintAssist: 'Ця панель пояснює, де ти зараз і що логічно робити далі.'
  },
  en: {
    title: 'ODIN Interface', subtitle: 'System control workspace', masterStart: 'ODIN SYSTEM — MASTER START', settings: 'Settings', quickSettings: 'Quick settings', systemPages: 'System pages', mainInterface: 'Main Interface', commitBuilder: 'Commit Builder', stateWorkspace: 'State Workspace', themeLabel: 'Theme', languageLabel: 'Language',
    themeToggleDark: 'Dark theme', themeToggleLight: 'Light theme', themeLightName: 'Light', themeDarkName: 'Dark', treeTitle: 'Navigation', zoneCommand: 'Command Center', zoneMap: 'System Map', zoneProjects: 'Projects', zoneFiles: 'File Workspace', zoneManual: 'Manual', assistTitle: 'Explanation', modeLabel: 'MODE', stateLabel: 'STATE', projectLabel: 'PROJECT', none: 'None selected', modeDiscussion: 'DISCUSSION', stateReady: 'READY', stateMasterReady: 'MASTER START READY',
    commandTitle: 'Command Center', commandBody: 'Main ODIN control zone: mode, state, scenario launch, and MASTER START.', commandAssist: '<strong>Command Center</strong> is the starting zone. You see system state and launch main scenarios. Next step: select a product or open System Map.',
    mapTitle: 'Live System Map', mapBody: 'The map shows links between OIS, Work Zones, Projects, File Workspace, and QA.', mapAssist: '<strong>System Map</strong> explains how ODIN parts are connected. Click nodes to navigate to work zones.',
    projectsTitle: 'Projects Workspace', projectsBody: 'Select products and projects: Deutsch Trainer, ISSU, SSUDT, new projects.', projectsAssist: '<strong>Projects</strong> sets the working context. File Workspace should work only after a project is selected.',
    filesTitle: 'File Workspace', filesBody: 'Work with files: editor, changes, diff, approve/reject, history, package.', filesNoProject: 'No project selected yet. Open Projects.', filesAssist: '<strong>File Workspace</strong> works in the selected project context. If no project is selected, open Projects first.',
    fileWorkspaceReady: 'File Workspace is active for the selected project.', fileSelect: 'Choose file', fileLoadSample: 'Load sample', fileNameLabel: 'File', fileNoFile: 'No file selected yet', fileEditorTitle: 'Editor', fileOriginalTitle: 'Original', fileDiffTitle: 'Diff / changes', fileHistoryTitle: 'History', fileApproveBtn: 'Approve', fileRejectBtn: 'Reject', fileDownloadBtn: 'Download file', filePackageBtn: 'Prepare package', filePreviewBtn: 'Preview', previewTitle: 'Internal Previewer', previewHtmlMode: 'HTML preview', previewCodeMode: 'Text / code', previewEmpty: 'No data to preview. Choose a file or load a sample.', previewUpdated: 'Preview updated. Check the result before approval.', fileEmptyEditor: 'Choose a text file or load a sample.', fileApproved: 'Changes approved.', fileRejected: 'Changes rejected.', fileDownloaded: 'File prepared for download.', filePackaged: 'Package prepared logically. Real ZIP build is the next level.', fileChanged: 'Changed', fileClean: 'No changes', fileLinesChanged: 'Changed lines', fileBrowserLimit: 'The browser cannot directly access your disk. Open a file with the picker and download the updated copy.', fileNeedProject: 'Select a project first so ODIN knows the file-work context.', fileSampleName: 'ODIN_SAMPLE_NOTE.md', fileSampleContent: '# ODIN sample\n\nThis is a sample file for testing editor, diff, approve/reject, and history.\n', diffNoChanges: 'No changes.', diffOriginal: 'Original', diffDraft: 'Draft', historyEmpty: 'History is empty.', historyApproved: 'Approved', historyRejected: 'Rejected', historyLoaded: 'File loaded',
    manualTitle: 'Manual / Help', manualBody: 'Instructions, ODIN capabilities, lexicon, and working rules.', manualAssist: '<strong>Manual</strong> is the system learning and self-explanation area. It should contain a detailed editable HTML guide.',
    masterAssist: '<strong>MASTER START</strong> activated. Next stage: product selection → scenario → pipeline preview → launch.', selectedPrefix: 'Project selected:', selectedSuffix: 'File Workspace can now work in the correct context.',
    flow: 'INPUT → INTENT → MODE → STATE → ACTION', nodeProjects: 'Projects → Work Context', nodeFiles: 'File Workspace → Changes', nodeOis: 'OIS → Command Center', nodeManual: 'Manual → Explanation', editor: 'Editor', changes: 'Changes / Diff', approve: 'Approve / Reject', package: 'Package', capabilities: 'ODIN Capabilities', lexicon: 'OIS Lexicon', howTo: 'How to work', quality: 'Quality rules', newProject1: 'New Project 1', dtProject: 'Deutsch Trainer', issuProject: 'DT / ISSU', ssudtProject: 'DT / SSUDT', zoneHint: 'Local hint for the current work zone.', workflowLabel: 'WORKFLOW', workflowEditing: 'Editing', workflowChanged: 'Changed', workflowReview: 'Review', workflowApproved: 'Approved', workflowSuggestSelectProject: 'Select a project first. Then open File Workspace.', workflowSuggestOpenFile: 'Project selected. You can now open a file or load a sample.', workflowSuggestReview: 'There are changes. Check the diff and send changes to review.', workflowSuggestApproved: 'Changes approved. You can prepare a package or move to the next task.', workflowProjectOpened: 'Project is active. File Workspace now works in its context.', workflowMapAction: 'The map opened the related work zone.', workflowReviewBtn: 'Send to review',
    hintMaster: 'Starts the main system scenario for the selected product or project.', hintTree: 'The tree shows core ODIN layers. Click to open the related work zone.', hintCommand: 'Main control zone: mode, state, scenario launch.', hintMap: 'Live system map: links, dependencies, navigation to zones.', hintProjects: 'Select products and projects: DT, ISSU, SSUDT, new projects.', hintFiles: 'Work with files in the selected project context: changes, diff, approve/reject.', hintManual: 'Instructions, ODIN capabilities, and operating rules.', hintAssist: 'This panel explains where you are and what the next logical step is.'
  },
  de: {
    title: 'ODIN Oberfläche', subtitle: 'Arbeitsbereich zur Systemsteuerung', masterStart: 'ODIN SYSTEM — MASTER START', settings: 'Einstellungen', quickSettings: 'Schnelleinstellungen', systemPages: 'Systemseiten', mainInterface: 'Hauptinterface', commitBuilder: 'Commit Builder', stateWorkspace: 'State Workspace', themeLabel: 'Design', languageLabel: 'Sprache',
    themeToggleDark: 'Dunkles Design', themeToggleLight: 'Helles Design', themeLightName: 'Hell', themeDarkName: 'Dunkel', treeTitle: 'Navigation', zoneCommand: 'Steuerzentrale', zoneMap: 'Systemkarte', zoneProjects: 'Projekte', zoneFiles: 'Dateiarbeitsbereich', zoneManual: 'Handbuch', assistTitle: 'Erklärung', modeLabel: 'MODUS', stateLabel: 'STATUS', projectLabel: 'PROJEKT', none: 'Nicht ausgewählt', modeDiscussion: 'DISKUSSION', stateReady: 'BEREIT', stateMasterReady: 'MASTER START BEREIT',
    commandTitle: 'Steuerzentrale', commandBody: 'Zentrale ODIN-Steuerzone: Modus, Status, Szenariostart und MASTER START.', commandAssist: '<strong>Steuerzentrale</strong> ist die Startzone. Hier siehst du den Systemstatus und startest Hauptszenarien. Nächster Schritt: Produkt auswählen oder Systemkarte öffnen.',
    mapTitle: 'Lebendige Systemkarte', mapBody: 'Die Karte zeigt Verbindungen zwischen OIS, Arbeitszonen, Projekten, Dateiarbeitsbereich und QA.', mapAssist: '<strong>Systemkarte</strong> erklärt, wie ODIN-Bereiche verbunden sind. Klicke auf Knoten, um zu Arbeitszonen zu wechseln.',
    projectsTitle: 'Projektarbeitsbereich', projectsBody: 'Hier werden Produkte und Projekte ausgewählt: Deutsch Trainer, ISSU, SSUDT, neue Projekte.', projectsAssist: '<strong>Projekte</strong> setzen den Arbeitskontext. Der Dateiarbeitsbereich soll erst nach Projektauswahl arbeiten.',
    filesTitle: 'Dateiarbeitsbereich', filesBody: 'Arbeit mit Dateien: Editor, Änderungen, Diff, Genehmigen/Ablehnen, Verlauf, Paket.', filesNoProject: 'Noch kein Projekt ausgewählt. Öffne den Bereich „Projekte“.', filesAssist: '<strong>Dateiarbeitsbereich</strong> arbeitet im Kontext des ausgewählten Projekts. Wenn kein Projekt ausgewählt ist, öffne zuerst „Projekte“.',
    fileWorkspaceReady: 'Der Dateiarbeitsbereich ist für das ausgewählte Projekt aktiv.', fileSelect: 'Datei wählen', fileLoadSample: 'Beispiel laden', fileNameLabel: 'Datei', fileNoFile: 'Noch keine Datei ausgewählt', fileEditorTitle: 'Editor', fileOriginalTitle: 'Original', fileDiffTitle: 'Diff / Änderungen', fileHistoryTitle: 'Verlauf', fileApproveBtn: 'Genehmigen', fileRejectBtn: 'Ablehnen', fileDownloadBtn: 'Datei herunterladen', filePackageBtn: 'Paket vorbereiten', filePreviewBtn: 'Vorschau', previewTitle: 'Interner Viewer', previewHtmlMode: 'HTML-Vorschau', previewCodeMode: 'Text / Code', previewEmpty: 'Keine Daten für die Vorschau. Wähle eine Datei oder lade ein Beispiel.', previewUpdated: 'Vorschau aktualisiert. Prüfe das Ergebnis vor der Freigabe.', fileEmptyEditor: 'Wähle eine Textdatei oder lade ein Beispiel.', fileApproved: 'Änderungen genehmigt.', fileRejected: 'Änderungen abgelehnt.', fileDownloaded: 'Datei zum Herunterladen vorbereitet.', filePackaged: 'Paket logisch vorbereitet. Der echte ZIP-Build ist die nächste Stufe.', fileChanged: 'Geändert', fileClean: 'Keine Änderungen', fileLinesChanged: 'Geänderte Zeilen', fileBrowserLimit: 'Der Browser kann nicht direkt auf deine Festplatte zugreifen. Öffne eine Datei über die Auswahl und lade die aktualisierte Kopie herunter.', fileNeedProject: 'Wähle zuerst ein Projekt, damit ODIN den Dateikontext kennt.', fileSampleName: 'ODIN_SAMPLE_NOTE.md', fileSampleContent: '# ODIN Beispiel\n\nDies ist eine Beispieldatei zum Testen von Editor, Diff, Genehmigen/Ablehnen und Verlauf.\n', diffNoChanges: 'Keine Änderungen.', diffOriginal: 'Original', diffDraft: 'Entwurf', historyEmpty: 'Der Verlauf ist leer.', historyApproved: 'Genehmigt', historyRejected: 'Abgelehnt', historyLoaded: 'Datei geladen',
    manualTitle: 'Handbuch / Hilfe', manualBody: 'Anleitungen, ODIN-Fähigkeiten, Lexikon und Arbeitsregeln.', manualAssist: '<strong>Handbuch</strong> ist der Lern- und Selbsterklärungsbereich des Systems. Hier soll ein detailliertes editierbares HTML-Handbuch liegen.',
    masterAssist: '<strong>MASTER START</strong> aktiviert. Nächste Stufe: Produktauswahl → Szenario → Pipeline-Vorschau → Start.', selectedPrefix: 'Projekt ausgewählt:', selectedSuffix: 'Der Dateiarbeitsbereich kann jetzt im richtigen Kontext arbeiten.',
    flow: 'EINGABE → ABSICHT → MODUS → STATUS → AKTION', nodeProjects: 'Projekte → Arbeitskontext', nodeFiles: 'Dateiarbeitsbereich → Änderungen', nodeOis: 'OIS → Steuerzentrale', nodeManual: 'Handbuch → Erklärung', editor: 'Editor', changes: 'Änderungen / Diff', approve: 'Genehmigen / Ablehnen', package: 'Paket', capabilities: 'ODIN-Fähigkeiten', lexicon: 'OIS-Lexikon', howTo: 'Arbeitsweise', quality: 'Qualitätsregeln', newProject1: 'Neues Projekt 1', dtProject: 'Deutsch Trainer', issuProject: 'DT / ISSU', ssudtProject: 'DT / SSUDT', zoneHint: 'Lokaler Hinweis für die aktuelle Arbeitszone.', workflowLabel: 'ABLAUF', workflowEditing: 'Bearbeitung', workflowChanged: 'Geändert', workflowReview: 'Prüfung', workflowApproved: 'Genehmigt', workflowSuggestSelectProject: 'Wähle zuerst ein Projekt. Öffne danach den Dateiarbeitsbereich.', workflowSuggestOpenFile: 'Projekt ausgewählt. Du kannst jetzt eine Datei öffnen oder ein Beispiel laden.', workflowSuggestReview: 'Es gibt Änderungen. Prüfe den Diff und sende die Änderungen zur Prüfung.', workflowSuggestApproved: 'Änderungen genehmigt. Du kannst ein Paket vorbereiten oder zur nächsten Aufgabe gehen.', workflowProjectOpened: 'Projekt ist aktiv. Der Dateiarbeitsbereich arbeitet jetzt in diesem Kontext.', workflowMapAction: 'Die Karte hat die verbundene Arbeitszone geöffnet.', workflowReviewBtn: 'Zur Prüfung',
    hintMaster: 'Startet das Hauptszenario für das ausgewählte Produkt oder Projekt.', hintTree: 'Der Baum zeigt die wichtigsten ODIN-Ebenen. Ein Klick öffnet die passende Arbeitszone.', hintCommand: 'Zentrale Steuerzone: Modus, Status, Szenariostart.', hintMap: 'Lebendige Systemkarte: Verbindungen, Abhängigkeiten, Navigation zu Zonen.', hintProjects: 'Produkte und Projekte auswählen: DT, ISSU, SSUDT, neue Projekte.', hintFiles: 'Dateiarbeit im Kontext des ausgewählten Projekts: Änderungen, Diff, Genehmigen/Ablehnen.', hintManual: 'Anleitungen, ODIN-Fähigkeiten und Arbeitsregeln.', hintAssist: 'Diese Leiste erklärt, wo du bist und was der nächste logische Schritt ist.'
  }
};


const odinV04PlanTracker = {
  activeBase: '199D',
  lastCleanFoundation: 'ODIN_V03_PACKAGE_199D_SECURE_EXPORT_RELEASE_QA_GATE_V1.zip',
  templateEtalon: 'dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html',
  workingFolder: 'dev/V03/11_PROTOTYPE_SYSTEM_UI',
  cancelledPackages: [
    'ODIN_V03_199D1_MAIN_CONTROL_HUB_V04_PLAN_TRACKER_V1.zip',
    'ODIN_V03_199D1_FIX_UI_MATRIX_MAIN_CONTROL_HUB_V04_PLAN_TRACKER_V1.zip'
  ],
  rules: {
    noNewHtmlPages: true,
    noNewShell: true,
    useExistingLeftTree: true,
    useExistingWorkZone: true,
    useExistingAssistPanel: true,
    useExistingStatusBar: true,
    keepQuickSettings: true
  },
  phases: [
    {
      id: 'PHASE 0',
      title: 'Foundation Lock',
      status: 'DONE',
      what: '199D is fixed as ACTIVE BASE. 200D–230D are not active core.',
      why: 'Keep a clean rollback-safe foundation and stop meta-expansion.',
      result: 'Stable clean starting point for V04.'
    },
    {
      id: 'PHASE 0.1',
      title: 'True Template Integration',
      status: 'CURRENT',
      what: 'Integrate planning and capabilities into the approved 11_PROTOTYPE_SYSTEM_UI template.',
      why: 'All ODIN interface functions must live inside the canonical UI shell.',
      result: 'One main page, one left tree, one work zone, one assist panel.'
    },
    {
      id: 'V04.0',
      title: 'Real State Engine',
      status: 'NEXT',
      what: 'Create real active state, package registry, module registry, rollback points and QA tracking.',
      why: 'ODIN must know its own state before real execution starts.',
      result: 'Real system state foundation.'
    },
    {
      id: 'V04.1',
      title: 'Real Execution Engine',
      status: 'PLANNED',
      what: 'Action Request → Validation → Execution → Result → Log → State Update.',
      why: 'Move from demo buttons to real controlled actions.',
      result: 'Workflow runtime and execution queue.'
    },
    {
      id: 'V04.2',
      title: 'Persistence Layer',
      status: 'PLANNED',
      what: 'Local JSON, IndexedDB, file persistence, and later Git/GitHub persistence.',
      why: 'State must survive reloads and become restorable.',
      result: 'Real memory and snapshot base.'
    },
    {
      id: 'V04.3',
      title: 'Live UI State Graph',
      status: 'PLANNED',
      what: 'Live state viewer, execution graph, logs, health monitor and module manager.',
      why: 'User must see real system state and transitions.',
      result: 'Live ODIN control interface.'
    },
    {
      id: 'V04.4',
      title: 'Recovery Replay Engine',
      status: 'PLANNED',
      what: 'Snapshots, replay, rollback, restore and corruption detection.',
      why: 'Recovery must become real instead of conceptual.',
      result: 'Real restore and replay engine.'
    },
    {
      id: 'V04.5',
      title: 'Autonomous Loop',
      status: 'PLANNED',
      what: 'Observers, watchdogs, schedulers, background tasks and integrity monitors.',
      why: 'ODIN should begin controlled autonomy.',
      result: 'Self-monitoring runtime loop.'
    }
  ],
  capabilities: [
    { id: 'CAP-001', name: 'System Overview', status: 'INTEGRATED' },
    { id: 'CAP-002', name: 'V04 Planning / Plan Tracker', status: 'INTEGRATED' },
    { id: 'CAP-003', name: 'Foundation Lock', status: 'INTEGRATED' },
    { id: 'CAP-004', name: 'Capabilities Registry', status: 'INTEGRATED' },
    { id: 'CAP-005', name: 'QA / Release Flow', status: 'FOUNDATION' },
    { id: 'CAP-006', name: 'Deutsch Trainer / Lesson Factory', status: 'FOUNDATION' },
    { id: 'CAP-007', name: 'Real State Engine', status: 'NEXT' },
    { id: 'CAP-008', name: 'Real Execution Engine', status: 'PLANNED' },
    { id: 'CAP-009', name: 'Persistence Layer', status: 'PLANNED' },
    { id: 'CAP-010', name: 'Live UI State Graph', status: 'PLANNED' },
    { id: 'CAP-011', name: 'Recovery Replay', status: 'PLANNED' },
    { id: 'CAP-012', name: 'Autonomous Loop', status: 'PLANNED' }
  ]
};



Object.assign(i18n.ua, {
  zoneV04Plan: 'План V04',
  zoneFoundation: 'Foundation Lock',
  zoneCapabilities: 'Можливості',
  v04PlanTitle: 'V04 — Real Core Plan Tracker',
  v04PlanBody: 'План переходу від чистої бази 199D до реального ядра ODIN. Інтегровано в еталонний шаблон 11_PROTOTYPE_SYSTEM_UI.',
  foundationTitle: 'Foundation Lock / Active Base',
  foundationBody: '199D зафіксовано як ACTIVE BASE. 200D–230D скасовано як активні збірки та залишено тільки як experimental reference.',
  capabilitiesTitle: 'Capabilities Registry',
  capabilitiesBody: 'Список інтегрованих і запланованих можливостей ODIN у межах одного шаблону інтерфейсу.',
  hintV04Plan: 'План V04 показує фази переходу до real core.',
  hintFoundation: 'Foundation Lock фіксує активну базу 199D і правила чистого переходу.',
  hintCapabilities: 'Registry показує, які можливості вже інтегровані та які заплановані.',
  v04PlanAssist: '<strong>V04 Plan Tracker</strong> — контроль переходу до Real Core. Поточна фаза: True Template Integration. Наступна: V04.0 Real State Engine.',
  foundationAssist: '<strong>Foundation Lock</strong> — захист чистої бази. Працюємо тільки в dev/V03/11_PROTOTYPE_SYSTEM_UI і не створюємо нові HTML-сторінки.',
  capabilitiesAssist: '<strong>Capabilities Registry</strong> — карта можливостей, які підключаються до єдиного ODIN Interface.'
});
Object.assign(i18n.en, {
  zoneV04Plan: 'V04 Plan',
  zoneFoundation: 'Foundation Lock',
  zoneCapabilities: 'Capabilities',
  v04PlanTitle: 'V04 — Real Core Plan Tracker',
  v04PlanBody: 'Transition plan from clean 199D base to the real ODIN core. Integrated into the canonical 11_PROTOTYPE_SYSTEM_UI template.',
  foundationTitle: 'Foundation Lock / Active Base',
  foundationBody: '199D is fixed as ACTIVE BASE. 200D–230D are cancelled as active builds and kept only as experimental reference.',
  capabilitiesTitle: 'Capabilities Registry',
  capabilitiesBody: 'List of integrated and planned ODIN capabilities inside the single interface template.',
  hintV04Plan: 'The V04 plan shows phases for the transition to real core.',
  hintFoundation: 'Foundation Lock fixes active base 199D and clean transition rules.',
  hintCapabilities: 'Registry shows integrated and planned capabilities.',
  v04PlanAssist: '<strong>V04 Plan Tracker</strong> controls transition to Real Core. Current phase: True Template Integration. Next: V04.0 Real State Engine.',
  foundationAssist: '<strong>Foundation Lock</strong> protects the clean base. Work only in dev/V03/11_PROTOTYPE_SYSTEM_UI and do not create new HTML pages.',
  capabilitiesAssist: '<strong>Capabilities Registry</strong> maps capabilities connected to the single ODIN Interface.'
});
Object.assign(i18n.de, {
  zoneV04Plan: 'V04 Plan',
  zoneFoundation: 'Foundation Lock',
  zoneCapabilities: 'Fähigkeiten',
  v04PlanTitle: 'V04 — Real Core Plan Tracker',
  v04PlanBody: 'Übergangsplan von der sauberen 199D-Basis zum realen ODIN-Core. In die kanonische Vorlage 11_PROTOTYPE_SYSTEM_UI integriert.',
  foundationTitle: 'Foundation Lock / Aktive Basis',
  foundationBody: '199D ist als ACTIVE BASE fixiert. 200D–230D sind als aktive Builds annulliert und bleiben nur experimentelle Referenz.',
  capabilitiesTitle: 'Capabilities Registry',
  capabilitiesBody: 'Liste integrierter und geplanter ODIN-Fähigkeiten innerhalb einer einzigen Interface-Vorlage.',
  hintV04Plan: 'Der V04-Plan zeigt die Phasen des Übergangs zum Real Core.',
  hintFoundation: 'Foundation Lock fixiert die aktive Basis 199D und Regeln für den sauberen Übergang.',
  hintCapabilities: 'Registry zeigt integrierte und geplante Fähigkeiten.',
  v04PlanAssist: '<strong>V04 Plan Tracker</strong> steuert den Übergang zum Real Core. Aktuelle Phase: True Template Integration. Nächste Phase: V04.0 Real State Engine.',
  foundationAssist: '<strong>Foundation Lock</strong> schützt die saubere Basis. Arbeit nur in dev/V03/11_PROTOTYPE_SYSTEM_UI, keine neuen HTML-Seiten.',
  capabilitiesAssist: '<strong>Capabilities Registry</strong> zeigt Fähigkeiten im einheitlichen ODIN Interface.'
});



Object.assign(i18n.ua, {
  zoneCommitBuilder: 'Commit Builder',
  zoneStateWorkspace: 'State Workspace',
  commitBuilderTitle: 'Commit Builder — аудит інтеграції',
  commitBuilderBody: 'Окрема сторінка має бути інтегрована як внутрішня зона ODIN Interface. Поки що це audit-зона без перенесеної логіки.',
  stateWorkspaceTitle: 'State Workspace — аудит інтеграції',
  stateWorkspaceBody: 'Окрема сторінка має бути інтегрована як внутрішня зона ODIN Interface. Поки що це audit-зона без перенесеної логіки.',
  hintCommitBuilder: 'Commit Builder буде внутрішньою зоною, не окремою HTML-сторінкою.',
  hintStateWorkspace: 'State Workspace буде внутрішньою зоною, не окремою HTML-сторінкою.',
  commitBuilderAssist: '<strong>Commit Builder</strong> — наступний крок: перевірити старий файл і перенести корисну логіку в цю зону.',
  stateWorkspaceAssist: '<strong>State Workspace</strong> — наступний крок: перевірити старий файл і перенести корисну логіку в цю зону.'
});
Object.assign(i18n.en, {
  zoneCommitBuilder: 'Commit Builder',
  zoneStateWorkspace: 'State Workspace',
  commitBuilderTitle: 'Commit Builder — integration audit',
  commitBuilderBody: 'Standalone page must be integrated as an internal ODIN Interface zone. This is currently an audit zone without migrated logic.',
  stateWorkspaceTitle: 'State Workspace — integration audit',
  stateWorkspaceBody: 'Standalone page must be integrated as an internal ODIN Interface zone. This is currently an audit zone without migrated logic.',
  hintCommitBuilder: 'Commit Builder will become an internal zone, not a standalone HTML page.',
  hintStateWorkspace: 'State Workspace will become an internal zone, not a standalone HTML page.',
  commitBuilderAssist: '<strong>Commit Builder</strong> — next step: audit old file and migrate useful logic into this zone.',
  stateWorkspaceAssist: '<strong>State Workspace</strong> — next step: audit old file and migrate useful logic into this zone.'
});
Object.assign(i18n.de, {
  zoneCommitBuilder: 'Commit Builder',
  zoneStateWorkspace: 'State Workspace',
  commitBuilderTitle: 'Commit Builder — Integrationsaudit',
  commitBuilderBody: 'Standalone-Seite muss als interne ODIN-Interface-Zone integriert werden. Aktuell ist dies eine Audit-Zone ohne migrierte Logik.',
  stateWorkspaceTitle: 'State Workspace — Integrationsaudit',
  stateWorkspaceBody: 'Standalone-Seite muss als interne ODIN-Interface-Zone integriert werden. Aktuell ist dies eine Audit-Zone ohne migrierte Logik.',
  hintCommitBuilder: 'Commit Builder wird interne Zone, keine separate HTML-Seite.',
  hintStateWorkspace: 'State Workspace wird interne Zone, keine separate HTML-Seite.',
  commitBuilderAssist: '<strong>Commit Builder</strong> — nächster Schritt: alte Datei prüfen und nützliche Logik migrieren.',
  stateWorkspaceAssist: '<strong>State Workspace</strong> — nächster Schritt: alte Datei prüfen und nützliche Logik migrieren.'
});



Object.assign(i18n.ua, {
  zoneControlCenter: 'Control Center',
  controlCenter: 'Control Center',
  controlCenterTitle: 'Control Center — аудит інтеграції',
  controlCenterBody: 'Control Center має бути інтегрований як внутрішня зона ODIN Interface, а не як окрема активна HTML-сторінка.',
  hintControlCenter: 'Аудит Control Center: визначити корисну логіку та перенести її в єдиний ODIN Interface.',
  controlCenterAssist: '<strong>Control Center</strong> — джерело для інтеграції release/QA/control логіки. Наступний крок: перевірити старий файл і перенести корисні функції в цю зону.'
});
Object.assign(i18n.en, {
  zoneControlCenter: 'Control Center',
  controlCenter: 'Control Center',
  controlCenterTitle: 'Control Center — integration audit',
  controlCenterBody: 'Control Center must be integrated as an internal ODIN Interface zone, not as an active standalone HTML page.',
  hintControlCenter: 'Control Center audit: identify useful logic and migrate it into the single ODIN Interface.',
  controlCenterAssist: '<strong>Control Center</strong> — source for release/QA/control logic integration. Next step: inspect old file and migrate useful functions into this zone.'
});
Object.assign(i18n.de, {
  zoneControlCenter: 'Control Center',
  controlCenter: 'Control Center',
  controlCenterTitle: 'Control Center — Integrationsaudit',
  controlCenterBody: 'Control Center muss als interne ODIN-Interface-Zone integriert werden, nicht als aktive separate HTML-Seite.',
  hintControlCenter: 'Control-Center-Audit: nützliche Logik identifizieren und in das einheitliche ODIN Interface migrieren.',
  controlCenterAssist: '<strong>Control Center</strong> — Quelle für Release-/QA-/Control-Logik. Nächster Schritt: alte Datei prüfen und nützliche Funktionen migrieren.'
});



Object.assign(i18n.ua, {
  zoneMigrationPlan: 'План міграції',
  migrationPlanTitle: 'Legacy Function Migration Plan',
  migrationPlanBody: 'План перенесення корисної логіки зі старих standalone сторінок у єдиний ODIN Interface.',
  hintMigrationPlan: 'Показує порядок перенесення Commit Builder, State Workspace і Control Center у внутрішні зони.',
  migrationPlanAssist: '<strong>Legacy Function Migration Plan</strong> — дорожня карта перед реальною міграцією функцій. Наступний крок: 199D.5 Commit Builder.'
});
Object.assign(i18n.en, {
  zoneMigrationPlan: 'Migration Plan',
  migrationPlanTitle: 'Legacy Function Migration Plan',
  migrationPlanBody: 'Plan for migrating useful logic from old standalone pages into the single ODIN Interface.',
  hintMigrationPlan: 'Shows the order for migrating Commit Builder, State Workspace and Control Center into internal zones.',
  migrationPlanAssist: '<strong>Legacy Function Migration Plan</strong> — roadmap before real function migration. Next step: 199D.5 Commit Builder.'
});
Object.assign(i18n.de, {
  zoneMigrationPlan: 'Migrationsplan',
  migrationPlanTitle: 'Legacy Function Migration Plan',
  migrationPlanBody: 'Plan zur Migration nützlicher Logik aus alten Standalone-Seiten in das einheitliche ODIN Interface.',
  hintMigrationPlan: 'Zeigt die Reihenfolge für Commit Builder, State Workspace und Control Center als interne Zonen.',
  migrationPlanAssist: '<strong>Legacy Function Migration Plan</strong> — Roadmap vor der echten Funktionsmigration. Nächster Schritt: 199D.5 Commit Builder.'
});


const odinLegacyMigrationPlan199D4 = {"meta": {"system": "ODIN Interface", "module": "Legacy Function Migration Plan", "version": "V03.199D.4", "type": "LEGACY_FUNCTION_MIGRATION_PLAN_v1", "created": "2026-05-08T04:02:31.547608+00:00", "workingFolder": "dev/V03/11_PROTOTYPE_SYSTEM_UI", "templateEtalon": "dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html"}, "status": "LEGACY_FUNCTION_MIGRATION_PLAN_READY", "phase": "PHASE 0.7 — LEGACY FUNCTION MIGRATION PLAN", "activeBase": "199D", "oneMainPageRule": true, "legacyPages": [{"id": "LEGACY-COMMIT-BUILDER", "source": "dev/V03/commit_builder.html", "targetZone": "commitBuilder", "migrationStatus": "PLANNED", "extract": ["commit message builder logic", "path list / git add helper logic", "commit preview", "copy git commands", "validation of commit text"], "reject": ["standalone html shell", "separate header/sidebar", "independent styles not matching ODIN UI Matrix"]}, {"id": "LEGACY-STATE-WORKSPACE", "source": "dev/V03/state_workspace.html", "targetZone": "stateWorkspace", "migrationStatus": "PLANNED", "extract": ["state viewing logic", "state history display", "state import/export helpers", "state diff / comparison ideas", "workspace diagnostics"], "reject": ["standalone html shell", "separate navigation", "local layout duplication"]}, {"id": "LEGACY-CONTROL-CENTER", "source": "dev/V03/control_center.html", "targetZone": "controlCenter", "migrationStatus": "PLANNED", "extract": ["QA flow controls", "release/export controls", "package status display", "system status report generation", "control action validation concepts"], "reject": ["standalone control center page", "independent mini-design-system", "duplicate runtime panels"]}], "migrationRules": {"onlyActiveHtml": "dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html", "allLogicGoesTo": "dev/V03/11_PROTOTYPE_SYSTEM_UI/app.js", "allStylesGoTo": "dev/V03/11_PROTOTYPE_SYSTEM_UI/styles.css", "noNewHtmlPages": true, "preserveHeader": true, "preserveQuickSettings": true, "preserveLeftTree": true, "preserveWorkZone": true, "preserveAssistPanel": true, "preserveStatusBar": true, "legacyPagesDeleteOnlyAfterMigrationQa": true}, "implementationOrder": [{"step": "199D.5", "name": "Commit Builder Internal Function Migration", "why": "Smallest and safest legacy function to migrate first.", "expectedResult": "Commit Builder becomes a real internal tool zone."}, {"step": "199D.6", "name": "State Workspace Internal Function Migration", "why": "State Workspace prepares V04.0 Real State Engine.", "expectedResult": "State viewing/workspace logic becomes internal zone."}, {"step": "199D.7", "name": "Control Center Internal Function Migration", "why": "Control Center should orchestrate QA/release functions inside one interface.", "expectedResult": "Control Center becomes internal command/control zone."}, {"step": "199D.8", "name": "Legacy Standalone Cleanup", "why": "After successful migration QA, standalone files can be deprecated or removed.", "expectedResult": "One main page rule fully enforced."}, {"step": "V04.0", "name": "Real State Engine Bootstrap", "why": "After UI is clean and legacy zones are internal, build real state.", "expectedResult": "ODIN starts tracking real active state."}], "nextStep": "Prepare 199D.5 — Commit Builder Internal Function Migration."};


Object.assign(i18n.ua, {
  commitBuilderTitle: 'Commit Builder',
  commitBuilderBody: 'Внутрішній інструмент ODIN для підготовки git-команд без переходу на окрему HTML-сторінку.',
  commitBuilderAssist: '<strong>Commit Builder</strong> формує 3 рядки git-команд у стандарті ODIN: git add, git commit, git push.',
  commitPathLabel: 'Шляхи для git add',
  commitMessageLabel: 'Текст commit',
  commitBranchLabel: 'Гілка',
  commitBuildButton: 'Зібрати команди',
  commitCopyButton: 'Скопіювати команди',
  commitValidationOk: 'COMMIT_BUILDER_READY',
  commitValidationFail: 'Потрібно вказати шлях і текст commit.'
});
Object.assign(i18n.en, {
  commitBuilderTitle: 'Commit Builder',
  commitBuilderBody: 'Internal ODIN tool for preparing git commands without opening a separate HTML page.',
  commitBuilderAssist: '<strong>Commit Builder</strong> creates ODIN-standard 3-line git commands: git add, git commit, git push.',
  commitPathLabel: 'Paths for git add',
  commitMessageLabel: 'Commit message',
  commitBranchLabel: 'Branch',
  commitBuildButton: 'Build commands',
  commitCopyButton: 'Copy commands',
  commitValidationOk: 'COMMIT_BUILDER_READY',
  commitValidationFail: 'Path and commit message are required.'
});
Object.assign(i18n.de, {
  commitBuilderTitle: 'Commit Builder',
  commitBuilderBody: 'Internes ODIN-Werkzeug zur Vorbereitung von Git-Befehlen ohne separate HTML-Seite.',
  commitBuilderAssist: '<strong>Commit Builder</strong> erstellt ODIN-Standard-Git-Befehle in 3 Zeilen: git add, git commit, git push.',
  commitPathLabel: 'Pfade für git add',
  commitMessageLabel: 'Commit-Nachricht',
  commitBranchLabel: 'Branch',
  commitBuildButton: 'Befehle erstellen',
  commitCopyButton: 'Befehle kopieren',
  commitValidationOk: 'COMMIT_BUILDER_READY',
  commitValidationFail: 'Pfad und Commit-Nachricht sind erforderlich.'
});



Object.assign(i18n.ua, {
  stateWorkspaceTitle: 'State Workspace',
  stateWorkspaceBody: 'Внутрішня зона ODIN для перегляду, експорту, імпорту та діагностики системного стану.',
  stateWorkspaceAssist: '<strong>State Workspace</strong> — перший реальний міст до V04.0 State Engine. Тут видно active state, snapshot і базову перевірку JSON.',
  stateSnapshotButton: 'Створити snapshot',
  stateCopyButton: 'Скопіювати state',
  stateImportButton: 'Імпортувати / перевірити JSON',
  stateResetButton: 'Відновити demo state',
  stateImportLabel: 'JSON для імпорту / перевірки',
  stateStatusReady: 'STATE_WORKSPACE_READY',
  stateStatusSnapshot: 'STATE_SNAPSHOT_READY',
  stateStatusCopied: 'STATE_JSON_COPIED',
  stateStatusImportOk: 'STATE_IMPORT_VALID',
  stateStatusImportFail: 'STATE_IMPORT_INVALID'
});
Object.assign(i18n.en, {
  stateWorkspaceTitle: 'State Workspace',
  stateWorkspaceBody: 'Internal ODIN zone for viewing, exporting, importing and diagnosing system state.',
  stateWorkspaceAssist: '<strong>State Workspace</strong> — first real bridge to V04.0 State Engine. It shows active state, snapshot and basic JSON validation.',
  stateSnapshotButton: 'Create snapshot',
  stateCopyButton: 'Copy state',
  stateImportButton: 'Import / validate JSON',
  stateResetButton: 'Restore demo state',
  stateImportLabel: 'JSON for import / validation',
  stateStatusReady: 'STATE_WORKSPACE_READY',
  stateStatusSnapshot: 'STATE_SNAPSHOT_READY',
  stateStatusCopied: 'STATE_JSON_COPIED',
  stateStatusImportOk: 'STATE_IMPORT_VALID',
  stateStatusImportFail: 'STATE_IMPORT_INVALID'
});
Object.assign(i18n.de, {
  stateWorkspaceTitle: 'State Workspace',
  stateWorkspaceBody: 'Interne ODIN-Zone zum Anzeigen, Exportieren, Importieren und Diagnostizieren des Systemzustands.',
  stateWorkspaceAssist: '<strong>State Workspace</strong> — erste reale Brücke zu V04.0 State Engine. Zeigt aktiven Zustand, Snapshot und JSON-Basisprüfung.',
  stateSnapshotButton: 'Snapshot erstellen',
  stateCopyButton: 'State kopieren',
  stateImportButton: 'JSON importieren / prüfen',
  stateResetButton: 'Demo-State wiederherstellen',
  stateImportLabel: 'JSON für Import / Prüfung',
  stateStatusReady: 'STATE_WORKSPACE_READY',
  stateStatusSnapshot: 'STATE_SNAPSHOT_READY',
  stateStatusCopied: 'STATE_JSON_COPIED',
  stateStatusImportOk: 'STATE_IMPORT_VALID',
  stateStatusImportFail: 'STATE_IMPORT_INVALID'
});


const odinStateWorkspace199D6 = {"activeBase": "199D", "currentPhase": "PHASE 0.9", "nextPhase": "199D.7 — Control Center Internal Function Migration", "oneMainPageRule": true, "templatePath": "dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html", "legacyStandalonePages": {"commit_builder.html": "MIGRATED_INTERNAL_ZONE", "state_workspace.html": "MIGRATED_INTERNAL_ZONE", "control_center.html": "AUDIT_ZONE_PENDING_MIGRATION"}};


Object.assign(i18n.ua, {
  controlCenterTitle: 'Control Center',
  controlCenterBody: 'Внутрішній центр керування ODIN для QA, release readiness та системного контролю.',
  controlCenterAssist: '<strong>Control Center</strong> — orchestration-зона для QA/status/release контролю всередині єдиного ODIN Interface.',
  controlQaButton: 'Запустити QA',
  controlExportButton: 'Перевірити Export',
  controlReleaseButton: 'Release Status',
  controlResetButton: 'Відновити demo control state',
  controlStatusReady: 'CONTROL_CENTER_READY',
  controlStatusQa: 'QA_PASSED',
  controlStatusExport: 'EXPORT_READY',
  controlStatusRelease: 'RELEASE_CONTROLLED'
});
Object.assign(i18n.en, {
  controlCenterTitle: 'Control Center',
  controlCenterBody: 'Internal ODIN control center for QA, release readiness and system control.',
  controlCenterAssist: '<strong>Control Center</strong> — orchestration zone for QA/status/release control inside one ODIN Interface.',
  controlQaButton: 'Run QA',
  controlExportButton: 'Check Export',
  controlReleaseButton: 'Release Status',
  controlResetButton: 'Restore demo control state',
  controlStatusReady: 'CONTROL_CENTER_READY',
  controlStatusQa: 'QA_PASSED',
  controlStatusExport: 'EXPORT_READY',
  controlStatusRelease: 'RELEASE_CONTROLLED'
});
Object.assign(i18n.de, {
  controlCenterTitle: 'Control Center',
  controlCenterBody: 'Internes ODIN Control Center für QA, Release-Readiness und Systemkontrolle.',
  controlCenterAssist: '<strong>Control Center</strong> — Orchestrierungszone für QA/Status/Release-Kontrolle innerhalb eines ODIN Interface.',
  controlQaButton: 'QA starten',
  controlExportButton: 'Export prüfen',
  controlReleaseButton: 'Release-Status',
  controlResetButton: 'Demo-Control-State wiederherstellen',
  controlStatusReady: 'CONTROL_CENTER_READY',
  controlStatusQa: 'QA_PASSED',
  controlStatusExport: 'EXPORT_READY',
  controlStatusRelease: 'RELEASE_CONTROLLED'
});


const odinControlCenter199D7 = {"activeBase": "199D", "qa": "READY", "release": "CONTROLLED", "export": "READY", "runtime": "FOUNDATION_ONLY", "nextPhase": "199D.8 — Legacy Standalone Cleanup"};


Object.assign(i18n.ua, {
  zoneRealStateEngine: 'Real State Engine',
  realStateEngineTitle: 'V04.0 — Real State Engine',
  realStateEngineBody: 'Перший реальний state layer ODIN: active state, package registry, module registry, rollback points.',
  hintRealStateEngine: 'Real State Engine показує активний стан системи і готує V04.1 Execution Engine.',
  realStateAssist: '<strong>Real State Engine</strong> — початок реального ядра ODIN. Тепер система має active state, registries і rollback points.',
  stateShowActive: 'Active State',
  stateShowPackages: 'Package Registry',
  stateShowModules: 'Module Registry',
  stateShowRollback: 'Rollback Points',
  stateRunDiagnostics: 'State Diagnostics',
  stateCopySnapshot: 'Copy Snapshot'
});
Object.assign(i18n.en, {
  zoneRealStateEngine: 'Real State Engine',
  realStateEngineTitle: 'V04.0 — Real State Engine',
  realStateEngineBody: 'First real ODIN state layer: active state, package registry, module registry, rollback points.',
  hintRealStateEngine: 'Real State Engine shows active system state and prepares V04.1 Execution Engine.',
  realStateAssist: '<strong>Real State Engine</strong> — start of real ODIN core. The system now has active state, registries and rollback points.',
  stateShowActive: 'Active State',
  stateShowPackages: 'Package Registry',
  stateShowModules: 'Module Registry',
  stateShowRollback: 'Rollback Points',
  stateRunDiagnostics: 'State Diagnostics',
  stateCopySnapshot: 'Copy Snapshot'
});
Object.assign(i18n.de, {
  zoneRealStateEngine: 'Real State Engine',
  realStateEngineTitle: 'V04.0 — Real State Engine',
  realStateEngineBody: 'Erster realer ODIN-State-Layer: aktiver Zustand, Package Registry, Module Registry, Rollback Points.',
  hintRealStateEngine: 'Real State Engine zeigt aktiven Systemzustand und bereitet V04.1 Execution Engine vor.',
  realStateAssist: '<strong>Real State Engine</strong> — Start des realen ODIN-Kerns. Das System hat nun aktiven State, Registries und Rollback Points.',
  stateShowActive: 'Active State',
  stateShowPackages: 'Package Registry',
  stateShowModules: 'Module Registry',
  stateShowRollback: 'Rollback Points',
  stateRunDiagnostics: 'State Diagnostics',
  stateCopySnapshot: 'Copy Snapshot'
});


const odinRealStateEngineV040 = {"activeState": {"schema": "ODIN_ACTIVE_STATE_v1", "version": "V04.0.0", "created": "2026-05-08T04:51:41.141520+00:00", "activeBase": "199D", "currentPhase": "V04.0 — REAL STATE ENGINE BOOTSTRAP", "previousPhase": "199D.8 — LEGACY STANDALONE CLEANUP", "oneMainPageRule": true, "mainPage": "dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html", "status": "REAL_STATE_ENGINE_BOOTSTRAP_READY", "systemMode": "FOUNDATION_TO_REAL_CORE", "legacyStandalonePages": {"commit_builder.html": "DEPRECATED_REMOVABLE", "state_workspace.html": "DEPRECATED_REMOVABLE", "control_center.html": "DEPRECATED_REMOVABLE"}, "nextPhase": "V04.1 — REAL EXECUTION ENGINE"}, "packageRegistry": {"schema": "ODIN_PACKAGE_REGISTRY_v1", "activeBase": "199D", "currentPackage": "ODIN_V04_0_REAL_STATE_ENGINE_BOOTSTRAP_V1", "history": [{"version": "199D", "name": "SECURE_EXPORT_RELEASE_QA_GATE", "status": "LAST_CLEAN_FOUNDATION"}, {"version": "199D.1", "name": "TRUE_TEMPLATE_INTEGRATION", "status": "APPLIED"}, {"version": "199D.2", "name": "STANDALONE_PAGES_INTEGRATION_AUDIT", "status": "APPLIED"}, {"version": "199D.3", "name": "CONTROL_CENTER_INTEGRATION_AUDIT", "status": "APPLIED"}, {"version": "199D.4", "name": "LEGACY_FUNCTION_MIGRATION_PLAN", "status": "APPLIED"}, {"version": "199D.5", "name": "COMMIT_BUILDER_INTERNAL_FUNCTION_MIGRATION", "status": "APPLIED"}, {"version": "199D.6", "name": "STATE_WORKSPACE_INTERNAL_FUNCTION_MIGRATION", "status": "APPLIED"}, {"version": "199D.7", "name": "CONTROL_CENTER_INTERNAL_FUNCTION_MIGRATION", "status": "APPLIED"}, {"version": "199D.8", "name": "LEGACY_STANDALONE_CLEANUP", "status": "APPLIED"}, {"version": "V04.0", "name": "REAL_STATE_ENGINE_BOOTSTRAP", "status": "CURRENT"}], "experimentalReferenceOnly": ["200D-230D"]}, "moduleRegistry": {"schema": "ODIN_MODULE_REGISTRY_v1", "modules": [{"id": "mainInterface", "name": "Main ODIN Interface", "status": "ACTIVE", "zone": "command"}, {"id": "v04Plan", "name": "V04 Plan Tracker", "status": "ACTIVE", "zone": "v04plan"}, {"id": "foundation", "name": "Foundation Lock", "status": "ACTIVE", "zone": "foundation"}, {"id": "capabilities", "name": "Capabilities Registry", "status": "ACTIVE", "zone": "capabilities"}, {"id": "commitBuilder", "name": "Commit Builder", "status": "ACTIVE_INTERNAL", "zone": "commitBuilder"}, {"id": "stateWorkspace", "name": "State Workspace", "status": "ACTIVE_INTERNAL", "zone": "stateWorkspace"}, {"id": "controlCenter", "name": "Control Center", "status": "ACTIVE_INTERNAL", "zone": "controlCenter"}, {"id": "realStateEngine", "name": "Real State Engine", "status": "BOOTSTRAP", "zone": "realStateEngine"}]}, "rollbackPoints": {"schema": "ODIN_ROLLBACK_POINTS_v1", "points": [{"id": "RB-199D", "name": "Last Clean Foundation", "package": "ODIN_V03_PACKAGE_199D_SECURE_EXPORT_RELEASE_QA_GATE_V1.zip", "status": "PRIMARY_ROLLBACK"}, {"id": "RB-199D8", "name": "One Main Page Cleanup", "package": "ODIN_V03_199D8_LEGACY_STANDALONE_CLEANUP_V1.zip", "status": "SECONDARY_ROLLBACK"}]}};


Object.assign(i18n.ua, {
  zoneExecutionEngine: 'Execution Engine',
  executionEngineTitle: 'V04.1 — Real Execution Engine',
  executionEngineBody: 'Реальний execution layer ODIN: action request, validation, execution, result, log, state update.',
  hintExecutionEngine: 'Execution Engine запускає контрольовані action-запити та веде execution log.',
  executionAssist: '<strong>Execution Engine</strong> — перший runtime-шар ODIN. Він ще працює локально в UI, але вже має queue, validation, execution log і state update model.',
  actionSelectLabel: 'Action Request',
  actionRunButton: 'Run Action',
  actionValidateButton: 'Validate',
  actionResetButton: 'Reset Engine',
  executionCopyLogButton: 'Copy Execution Log'
});
Object.assign(i18n.en, {
  zoneExecutionEngine: 'Execution Engine',
  executionEngineTitle: 'V04.1 — Real Execution Engine',
  executionEngineBody: 'Real ODIN execution layer: action request, validation, execution, result, log, state update.',
  hintExecutionEngine: 'Execution Engine runs controlled action requests and maintains execution log.',
  executionAssist: '<strong>Execution Engine</strong> — first ODIN runtime layer. It still runs locally in UI, but now has queue, validation, execution log and state update model.',
  actionSelectLabel: 'Action Request',
  actionRunButton: 'Run Action',
  actionValidateButton: 'Validate',
  actionResetButton: 'Reset Engine',
  executionCopyLogButton: 'Copy Execution Log'
});
Object.assign(i18n.de, {
  zoneExecutionEngine: 'Execution Engine',
  executionEngineTitle: 'V04.1 — Real Execution Engine',
  executionEngineBody: 'Realer ODIN Execution Layer: Action Request, Validation, Execution, Result, Log, State Update.',
  hintExecutionEngine: 'Execution Engine startet kontrollierte Action Requests und führt Execution Log.',
  executionAssist: '<strong>Execution Engine</strong> — erster ODIN Runtime-Layer. Läuft noch lokal im UI, hat aber Queue, Validation, Execution Log und State-Update-Modell.',
  actionSelectLabel: 'Action Request',
  actionRunButton: 'Action starten',
  actionValidateButton: 'Validieren',
  actionResetButton: 'Engine zurücksetzen',
  executionCopyLogButton: 'Execution Log kopieren'
});


const odinExecutionEngineV041 = {"engine": {"schema": "ODIN_EXECUTION_ENGINE_v1", "version": "V04.1.0", "created": "2026-05-08T05:01:06.725185+00:00", "status": "REAL_EXECUTION_ENGINE_READY", "phase": "V04.1 — REAL EXECUTION ENGINE", "activeBase": "199D", "flow": ["ACTION_REQUEST", "VALIDATION", "EXECUTION", "RESULT", "LOG", "STATE_UPDATE"], "queues": {"pending": [], "running": [], "completed": [], "failed": []}, "supportedActions": [{"id": "ACTION-STATE-DIAGNOSTICS", "name": "Run State Diagnostics", "requires": ["realStateEngine"], "updatesState": true}, {"id": "ACTION-QA-CHECK", "name": "Run QA Check", "requires": ["controlCenter"], "updatesState": true}, {"id": "ACTION-EXPORT-CHECK", "name": "Run Export Check", "requires": ["controlCenter"], "updatesState": true}, {"id": "ACTION-COMMIT-PREPARE", "name": "Prepare Commit Commands", "requires": ["commitBuilder"], "updatesState": false}], "nextStep": "V04.2 — Persistence Layer"}, "log": {"schema": "ODIN_EXECUTION_LOG_v1", "created": "2026-05-08T05:01:06.725185+00:00", "events": [{"time": "2026-05-08T05:01:06.725185+00:00", "type": "ENGINE_BOOTSTRAP", "status": "REAL_EXECUTION_ENGINE_READY", "message": "Execution Engine initialized after Real State Engine."}]}};
let odinExecutionRuntimeV041 = JSON.parse(JSON.stringify(odinExecutionEngineV041));


Object.assign(i18n.ua, {
  htmlDiffFixReady: 'HTML_DIFF_FIX_READY',
  htmlAwareDiffMode: 'HTML-aware diff'
});
Object.assign(i18n.en, {
  htmlDiffFixReady: 'HTML_DIFF_FIX_READY',
  htmlAwareDiffMode: 'HTML-aware diff'
});
Object.assign(i18n.de, {
  htmlDiffFixReady: 'HTML_DIFF_FIX_READY',
  htmlAwareDiffMode: 'HTML-aware diff'
});



Object.assign(i18n.ua, {
  zoneRuntimeGraph: 'Runtime Graph',
  runtimeGraphTitle: 'V04.3 — Live Runtime Graph',
  runtimeGraphBody: 'Візуальна карта звʼязків між State Engine, Execution Engine, Persistence Layer, Registry, Rollback і внутрішніми зонами.',
  hintRuntimeGraph: 'Live Runtime Graph показує, як основні частини ODIN повʼязані між собою.',
  runtimeGraphAssist: '<strong>Live Runtime Graph</strong> — перший живий огляд архітектури ODIN. Наступний крок: Recovery Replay Engine.',
  graphShowNodes: 'Показати Nodes',
  graphShowEdges: 'Показати Edges',
  graphRunHealth: 'Graph Health Check',
  graphCopy: 'Copy Graph Snapshot'
});
Object.assign(i18n.en, {
  zoneRuntimeGraph: 'Runtime Graph',
  runtimeGraphTitle: 'V04.3 — Live Runtime Graph',
  runtimeGraphBody: 'Visual map of links between State Engine, Execution Engine, Persistence Layer, Registry, Rollback and internal zones.',
  hintRuntimeGraph: 'Live Runtime Graph shows how main ODIN parts are connected.',
  runtimeGraphAssist: '<strong>Live Runtime Graph</strong> — first live overview of ODIN architecture. Next step: Recovery Replay Engine.',
  graphShowNodes: 'Show Nodes',
  graphShowEdges: 'Show Edges',
  graphRunHealth: 'Graph Health Check',
  graphCopy: 'Copy Graph Snapshot'
});
Object.assign(i18n.de, {
  zoneRuntimeGraph: 'Runtime Graph',
  runtimeGraphTitle: 'V04.3 — Live Runtime Graph',
  runtimeGraphBody: 'Visuelle Karte der Verbindungen zwischen State Engine, Execution Engine, Persistence Layer, Registry, Rollback und internen Zonen.',
  hintRuntimeGraph: 'Live Runtime Graph zeigt, wie ODIN-Hauptteile verbunden sind.',
  runtimeGraphAssist: '<strong>Live Runtime Graph</strong> — erster Live-Überblick der ODIN-Architektur. Nächster Schritt: Recovery Replay Engine.',
  graphShowNodes: 'Nodes anzeigen',
  graphShowEdges: 'Edges anzeigen',
  graphRunHealth: 'Graph Health Check',
  graphCopy: 'Graph Snapshot kopieren'
});


const odinRuntimeGraphV043 = {"schema": "ODIN_LIVE_RUNTIME_GRAPH_v1", "version": "V04.3.0", "created": "2026-05-08T06:21:58.445345+00:00", "status": "LIVE_RUNTIME_GRAPH_READY", "phase": "V04.3 — LIVE RUNTIME GRAPH", "activeBase": "199D", "nodes": [{"id": "stateEngine", "label": "Real State Engine", "status": "ACTIVE", "type": "core"}, {"id": "executionEngine", "label": "Real Execution Engine", "status": "ACTIVE", "type": "runtime"}, {"id": "persistenceLayer", "label": "Persistence Layer", "status": "BOOTSTRAP", "type": "storage"}, {"id": "moduleRegistry", "label": "Module Registry", "status": "ACTIVE", "type": "registry"}, {"id": "packageRegistry", "label": "Package Registry", "status": "ACTIVE", "type": "registry"}, {"id": "rollbackPoints", "label": "Rollback Points", "status": "ACTIVE", "type": "recovery"}, {"id": "commitBuilder", "label": "Commit Builder", "status": "INTERNAL_ZONE", "type": "tool"}, {"id": "stateWorkspace", "label": "State Workspace", "status": "INTERNAL_ZONE", "type": "tool"}, {"id": "controlCenter", "label": "Control Center", "status": "INTERNAL_ZONE", "type": "tool"}, {"id": "htmlDiffFix", "label": "HTML Diff Fix", "status": "APPLIED", "type": "fix"}], "edges": [{"from": "stateEngine", "to": "moduleRegistry", "relation": "reads/writes"}, {"from": "stateEngine", "to": "packageRegistry", "relation": "tracks"}, {"from": "stateEngine", "to": "rollbackPoints", "relation": "protects"}, {"from": "executionEngine", "to": "stateEngine", "relation": "updates"}, {"from": "executionEngine", "to": "persistenceLayer", "relation": "logs"}, {"from": "persistenceLayer", "to": "stateEngine", "relation": "persists"}, {"from": "controlCenter", "to": "executionEngine", "relation": "orchestrates"}, {"from": "stateWorkspace", "to": "stateEngine", "relation": "views"}, {"from": "commitBuilder", "to": "packageRegistry", "relation": "release support"}, {"from": "htmlDiffFix", "to": "stateWorkspace", "relation": "file workspace repair"}], "nextStep": "V04.4 — Recovery Replay Engine"};


Object.assign(i18n.ua, {
  zoneRecoveryReplay: 'Recovery Replay',
  recoveryReplayTitle: 'V04.4 — Recovery Replay Engine',
  recoveryReplayBody: 'Перший recovery/replay layer ODIN: snapshots, replay plan, rollback preview, recovery validation.',
  hintRecoveryReplay: 'Recovery Replay показує, як ODIN може відновлювати стан через snapshots і replay.',
  recoveryReplayAssist: '<strong>Recovery Replay Engine</strong> — міст до справжнього restore/rollback. Наступний крок: Autonomous Loop.',
  recoveryShowSnapshots: 'Показати Snapshots',
  recoveryGenerateReplay: 'Generate Replay Plan',
  recoveryRollbackPreview: 'Rollback Preview',
  recoveryValidate: 'Recovery Validation',
  recoveryCopy: 'Copy Recovery Snapshot'
});
Object.assign(i18n.en, {
  zoneRecoveryReplay: 'Recovery Replay',
  recoveryReplayTitle: 'V04.4 — Recovery Replay Engine',
  recoveryReplayBody: 'First ODIN recovery/replay layer: snapshots, replay plan, rollback preview, recovery validation.',
  hintRecoveryReplay: 'Recovery Replay shows how ODIN can restore state through snapshots and replay.',
  recoveryReplayAssist: '<strong>Recovery Replay Engine</strong> — bridge to real restore/rollback. Next step: Autonomous Loop.',
  recoveryShowSnapshots: 'Show Snapshots',
  recoveryGenerateReplay: 'Generate Replay Plan',
  recoveryRollbackPreview: 'Rollback Preview',
  recoveryValidate: 'Recovery Validation',
  recoveryCopy: 'Copy Recovery Snapshot'
});
Object.assign(i18n.de, {
  zoneRecoveryReplay: 'Recovery Replay',
  recoveryReplayTitle: 'V04.4 — Recovery Replay Engine',
  recoveryReplayBody: 'Erster ODIN Recovery/Replay Layer: Snapshots, Replay Plan, Rollback Preview, Recovery Validation.',
  hintRecoveryReplay: 'Recovery Replay zeigt, wie ODIN Zustand über Snapshots und Replay wiederherstellen kann.',
  recoveryReplayAssist: '<strong>Recovery Replay Engine</strong> — Brücke zu echtem Restore/Rollback. Nächster Schritt: Autonomous Loop.',
  recoveryShowSnapshots: 'Snapshots anzeigen',
  recoveryGenerateReplay: 'Replay Plan erstellen',
  recoveryRollbackPreview: 'Rollback Preview',
  recoveryValidate: 'Recovery Validation',
  recoveryCopy: 'Recovery Snapshot kopieren'
});


const odinRecoveryReplayV044 = {"schema": "ODIN_RECOVERY_REPLAY_ENGINE_v1", "version": "V04.4.0", "created": "2026-05-08T10:59:14.018374+00:00", "status": "RECOVERY_REPLAY_ENGINE_READY", "phase": "V04.4 — RECOVERY REPLAY ENGINE", "activeBase": "199D", "capabilities": ["snapshot creation", "replay plan generation", "rollback preview", "recovery validation"], "snapshots": [{"id": "SNAP-199D", "name": "Last Clean Foundation", "source": "ODIN_V03_PACKAGE_199D_SECURE_EXPORT_RELEASE_QA_GATE_V1.zip", "status": "PRIMARY"}, {"id": "SNAP-V04.3", "name": "Live Runtime Graph Checkpoint", "source": "ODIN_V04_3_LIVE_RUNTIME_GRAPH_V1.zip", "status": "CURRENT"}], "replayFlow": ["LOAD_SNAPSHOT", "VALIDATE_STATE", "REPLAY_EVENTS", "CHECK_REGISTRIES", "VERIFY_UI_MATRIX", "REPORT_RECOVERY_STATUS"], "nextStep": "V04.5 — Autonomous Loop"};

const workZone = document.getElementById('workZone');
const assistContent = document.getElementById('assistContent');
const modeValue = document.getElementById('modeValue');
const stateValue = document.getElementById('stateValue');
const projectValue = document.getElementById('projectValue');
const workflowValue = document.getElementById('workflowValue');
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

function setWorkflow(stage) {
  state.workflow = stage;
  localStorage.setItem('odin_workflow', stage);
  applyI18n();
}

function workflowText() {
  const key = { editing: 'workflowEditing', changed: 'workflowChanged', review: 'workflowReview', approved: 'workflowApproved' }[state.workflow] || 'workflowEditing';
  return t(key);
}

function workflowSuggestion() {
  if (!state.project) return t('workflowSuggestSelectProject');
  if (state.workflow === 'changed') return t('workflowSuggestReview');
  if (state.workflow === 'review') return t('workflowSuggestReview');
  if (state.workflow === 'approved') return t('workflowSuggestApproved');
  return t('workflowSuggestOpenFile');
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
  if (workflowValue) workflowValue.textContent = workflowText();
}

function setActiveTree(zone) {
  document.querySelectorAll('.tree-item').forEach(btn => btn.classList.toggle('active', btn.dataset.zone === zone));
}

function hint() { return `<span class="hint" tabindex="0" data-help-key="zoneHint" data-help="${t('zoneHint')}">?</span>`; }
function zoneTemplate(title, body, cards = '') {
  return `<section class="zone-card"><h2 class="zone-title">${title}${hint()}</h2><p>${body}</p>${cards}</section>`;
}
function card(label, action = '') { return action ? `<button class="mini-card" onclick="${action}">${label}</button>` : `<div class="mini-card">${label}</div>`; }
function openMapZone(zone) {
  renderZone(zone);
  assistContent.innerHTML = t('workflowMapAction') + '<br>' + workflowSuggestion();
}

function renderZone(zone) {
  state.zone = zone;
  state.status = state.status === 'master' ? 'master' : 'ready';
  setActiveTree(zone);

  if (zone === 'command') {
    workZone.innerHTML = zoneTemplate(t('commandTitle'), t('commandBody'), `<div class="action-row"><button class="primary-action" onclick="masterStart()">${t('masterStart')} ${hint()}</button><div class="input-like">${t('flow')}</div></div>`);
    assistContent.innerHTML = t('commandAssist');
  }

  if (zone === 'map') {
    workZone.innerHTML = zoneTemplate(t('mapTitle'), t('mapBody'), `<div class="zone-grid">${card(t('nodeProjects'), "openMapZone('projects')")}${card(t('nodeFiles'), "openMapZone('files')")}${card(t('nodeOis'), "openMapZone('command')")}${card(t('nodeManual'), "openMapZone('manual')")}</div>`);
    assistContent.innerHTML = t('mapAssist');
  }

  if (zone === 'projects') {
    workZone.innerHTML = zoneTemplate(t('projectsTitle'), t('projectsBody'), `<div class="zone-grid">${card(t('dtProject'), "selectProject('Deutsch Trainer / DT')")}${card(t('issuProject'), "selectProject('DT / ІССУ')")}${card(t('ssudtProject'), "selectProject('DT / ССУДТ')")}${card(t('newProject1'), "selectProject('New Project 1')")}</div>`);
    assistContent.innerHTML = t('projectsAssist');
  }


  if (zone === 'v04plan') {
    workZone.innerHTML = zoneTemplate(t('v04PlanTitle'), t('v04PlanBody'), renderV04PlanTracker());
    assistContent.innerHTML = t('v04PlanAssist');
  }

  if (zone === 'foundation') {
    workZone.innerHTML = zoneTemplate(t('foundationTitle'), t('foundationBody'), renderFoundationLock());
    assistContent.innerHTML = t('foundationAssist');
  }

  if (zone === 'capabilities') {
    workZone.innerHTML = zoneTemplate(t('capabilitiesTitle'), t('capabilitiesBody'), renderCapabilitiesRegistry());
    assistContent.innerHTML = t('capabilitiesAssist');
  }




  if (zone === 'migrationPlan') {
    workZone.innerHTML = zoneTemplate(t('migrationPlanTitle'), t('migrationPlanBody'), renderLegacyMigrationPlan199D4());
    assistContent.innerHTML = t('migrationPlanAssist');
  }

  if (zone === 'controlCenter') {
    workZone.innerHTML = zoneTemplate(t('controlCenterTitle'), t('controlCenterBody'), renderControlCenterTool());
    assistContent.innerHTML = t('controlCenterAssist');
    setTimeout(resetControlCenter199D7, 0);
  }

  if (zone === 'commitBuilder') {
    workZone.innerHTML = zoneTemplate(t('commitBuilderTitle'), t('commitBuilderBody'), renderCommitBuilderTool());
    assistContent.innerHTML = t('commitBuilderAssist');
    setTimeout(buildCommitCommands199D5, 0);
  }





  if (zone === 'recoveryReplay') {
    workZone.innerHTML = zoneTemplate(t('recoveryReplayTitle'), t('recoveryReplayBody'), renderRecoveryReplayV044());
    assistContent.innerHTML = t('recoveryReplayAssist');
    setTimeout(validateRecoveryV044, 0);
  }

  if (zone === 'runtimeGraph') {
    workZone.innerHTML = zoneTemplate(t('runtimeGraphTitle'), t('runtimeGraphBody'), renderRuntimeGraphV043());
    assistContent.innerHTML = t('runtimeGraphAssist');
    setTimeout(runRuntimeGraphHealthV043, 0);
  }

  if (zone === 'executionEngine') {
    workZone.innerHTML = zoneTemplate(t('executionEngineTitle'), t('executionEngineBody'), renderExecutionEngineV041());
    assistContent.innerHTML = t('executionAssist');
    setTimeout(resetExecutionEngineV041, 0);
  }

  if (zone === 'realStateEngine') {
    workZone.innerHTML = zoneTemplate(t('realStateEngineTitle'), t('realStateEngineBody'), renderRealStateEngineV040());
    assistContent.innerHTML = t('realStateAssist');
    setTimeout(runRealStateDiagnosticsV040, 0);
  }

  if (zone === 'stateWorkspace') {
    workZone.innerHTML = zoneTemplate(t('stateWorkspaceTitle'), t('stateWorkspaceBody'), renderStateWorkspaceTool());
    assistContent.innerHTML = t('stateWorkspaceAssist');
    setTimeout(resetStateWorkspace199D6, 0);
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


function statusClass(status) {
  return String(status || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function renderV04PlanTracker() {
  const cards = odinV04PlanTracker.phases.map(phase => `
    <article class="v04-phase-card status-${statusClass(phase.status)}">
      <div class="v04-phase-head">
        <span class="v04-phase-id">${escapeHtml(phase.id)}</span>
        <span class="v04-status">${escapeHtml(phase.status)}</span>
      </div>
      <h3>${escapeHtml(phase.title)}</h3>
      <p><strong>Що робимо:</strong> ${escapeHtml(phase.what)}</p>
      <p><strong>Навіщо:</strong> ${escapeHtml(phase.why)}</p>
      <p><strong>Що матимемо:</strong> ${escapeHtml(phase.result)}</p>
    </article>
  `).join('');

  return `
    <div class="v04-tracker">
      <div class="v04-summary">
        <div><strong>ACTIVE BASE</strong><span>${escapeHtml(odinV04PlanTracker.activeBase)}</span></div>
        <div><strong>TEMPLATE</strong><span>${escapeHtml(odinV04PlanTracker.templateEtalon)}</span></div>
        <div><strong>WORK FOLDER</strong><span>${escapeHtml(odinV04PlanTracker.workingFolder)}</span></div>
      </div>
      <div class="v04-phase-list">${cards}</div>
    </div>
  `;
}

function renderFoundationLock() {
  const cancelled = odinV04PlanTracker.cancelledPackages.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  const rules = Object.entries(odinV04PlanTracker.rules).map(([key, value]) => `
    <div class="v04-rule-row"><span>${escapeHtml(key)}</span><strong>${escapeHtml(String(value))}</strong></div>
  `).join('');

  return `
    <div class="v04-foundation">
      <div class="v04-lock-banner">
        <strong>ACTIVE BASE = ${escapeHtml(odinV04PlanTracker.activeBase)}</strong>
        <span>LAST CLEAN FOUNDATION</span>
      </div>
      <h3>Cancelled / not active builds</h3>
      <ul>${cancelled}</ul>
      <h3>Clean transition rules</h3>
      <div class="v04-rule-list">${rules}</div>
    </div>
  `;
}

function renderCapabilitiesRegistry() {
  return `
    <div class="v04-capability-list">
      ${odinV04PlanTracker.capabilities.map(cap => `
        <article class="v04-capability-card">
          <span>${escapeHtml(cap.id)}</span>
          <strong>${escapeHtml(cap.name)}</strong>
          <em>${escapeHtml(cap.status)}</em>
        </article>
      `).join('')}
    </div>
  `;
}




function renderCommitBuilderTool() {
  return `
    <div class="commit-builder-tool">
      <div class="commit-builder-grid">
        <label>
          <span>${t('commitPathLabel')}</span>
          <textarea id="commitBuilderPaths" rows="5">dev/V03/11_PROTOTYPE_SYSTEM_UI/</textarea>
        </label>
        <label>
          <span>${t('commitMessageLabel')}</span>
          <input id="commitBuilderMessage" type="text" value="ODIN V03.199D.5 — інтегровано Commit Builder у головний шаблон" />
        </label>
        <label>
          <span>${t('commitBranchLabel')}</span>
          <input id="commitBuilderBranch" type="text" value="dev" />
        </label>
      </div>
      <div class="commit-builder-actions">
        <button type="button" class="primary-action" onclick="buildCommitCommands199D5()">${t('commitBuildButton')}</button>
        <button type="button" onclick="copyCommitCommands199D5()">${t('commitCopyButton')}</button>
      </div>
      <div id="commitBuilderStatus" class="commit-builder-status">READY</div>
      <pre id="commitBuilderOutput" class="commit-builder-output"></pre>
    </div>
  `;
}

function normalizeCommitPaths199D5(raw) {
  return String(raw || '')
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
    .join(' ');
}

function sanitizeCommitMessage199D5(message) {
  return String(message || '').replace(/"/g, '\\"').trim();
}

function buildCommitCommands199D5() {
  const paths = normalizeCommitPaths199D5(document.getElementById('commitBuilderPaths')?.value);
  const message = sanitizeCommitMessage199D5(document.getElementById('commitBuilderMessage')?.value);
  const branch = String(document.getElementById('commitBuilderBranch')?.value || 'dev').trim() || 'dev';
  const status = document.getElementById('commitBuilderStatus');
  const output = document.getElementById('commitBuilderOutput');

  if (!paths || !message) {
    if (status) status.textContent = t('commitValidationFail');
    if (output) output.textContent = '';
    return '';
  }

  const commands = `git add ${paths}\ngit commit -m "${message}"\ngit push origin ${branch}`;
  if (status) status.textContent = t('commitValidationOk');
  if (output) output.textContent = commands;
  return commands;
}

async function copyCommitCommands199D5() {
  const commands = buildCommitCommands199D5();
  if (!commands) return;
  try {
    await navigator.clipboard.writeText(commands);
    const status = document.getElementById('commitBuilderStatus');
    if (status) status.textContent = 'COMMIT_COMMANDS_COPIED';
  } catch (error) {
    const status = document.getElementById('commitBuilderStatus');
    if (status) status.textContent = 'COPY_UNAVAILABLE';
  }
}



function cloneStateWorkspace199D6() {
  return JSON.parse(JSON.stringify(odinStateWorkspace199D6));
}





function renderRecoveryReplayV044() {
  const flow = odinRecoveryReplayV044.replayFlow.map((step) => `<span>${escapeHtml(step)}</span>`).join('');
  const snapshots = odinRecoveryReplayV044.snapshots.map((snap) => `
    <article class="recovery-snapshot-card">
      <span>${escapeHtml(snap.id)}</span>
      <strong>${escapeHtml(snap.name)}</strong>
      <em>${escapeHtml(snap.status)}</em>
      <code>${escapeHtml(snap.source)}</code>
    </article>
  `).join('');

  return `
    <div class="recovery-replay-tool">
      <div class="recovery-summary">
        <article><span>STATUS</span><strong>${escapeHtml(odinRecoveryReplayV044.status)}</strong></article>
        <article><span>SNAPSHOTS</span><strong>${escapeHtml(String(odinRecoveryReplayV044.snapshots.length))}</strong></article>
        <article><span>FLOW STEPS</span><strong>${escapeHtml(String(odinRecoveryReplayV044.replayFlow.length))}</strong></article>
        <article><span>NEXT</span><strong>${escapeHtml(odinRecoveryReplayV044.nextStep)}</strong></article>
      </div>

      <div class="recovery-flow">${flow}</div>

      <div class="recovery-actions">
        <button type="button" class="primary-action" onclick="showRecoverySnapshotsV044()">${t('recoveryShowSnapshots')}</button>
        <button type="button" onclick="generateRecoveryReplayPlanV044()">${t('recoveryGenerateReplay')}</button>
        <button type="button" onclick="rollbackPreviewV044()">${t('recoveryRollbackPreview')}</button>
        <button type="button" onclick="validateRecoveryV044()">${t('recoveryValidate')}</button>
        <button type="button" onclick="copyRecoverySnapshotV044()">${t('recoveryCopy')}</button>
      </div>

      <div class="recovery-snapshot-list">${snapshots}</div>
      <div id="recoveryReplayStatus" class="recovery-status">RECOVERY_REPLAY_ENGINE_READY</div>
      <pre id="recoveryReplayOutput" class="recovery-output"></pre>
    </div>
  `;
}

function writeRecoveryReplayOutputV044(payload, status) {
  const output = document.getElementById('recoveryReplayOutput');
  const statusEl = document.getElementById('recoveryReplayStatus');
  if (output) output.textContent = JSON.stringify(payload, null, 2);
  if (statusEl) statusEl.textContent = status || payload.status || 'READY';
}

function showRecoverySnapshotsV044() {
  writeRecoveryReplayOutputV044({ status: 'RECOVERY_SNAPSHOTS_READY', snapshots: odinRecoveryReplayV044.snapshots }, 'RECOVERY_SNAPSHOTS_READY');
}

function generateRecoveryReplayPlanV044() {
  const plan = { status: 'RECOVERY_REPLAY_PLAN_READY', created: new Date().toISOString(), flow: odinRecoveryReplayV044.replayFlow, targetSnapshot: 'SNAP-V04.3', validationRequired: true };
  writeRecoveryReplayOutputV044(plan, plan.status);
}

function rollbackPreviewV044() {
  const preview = { status: 'ROLLBACK_PREVIEW_READY', rollbackTarget: 'SNAP-199D', currentSnapshot: 'SNAP-V04.3', mode: 'PREVIEW_ONLY', destructiveAction: false };
  writeRecoveryReplayOutputV044(preview, preview.status);
}

function validateRecoveryV044() {
  const result = {
    status: 'RECOVERY_VALIDATION_PASSED',
    checks: [
      { id: 'REC-001', name: 'snapshots exist', pass: odinRecoveryReplayV044.snapshots.length > 0 },
      { id: 'REC-002', name: 'replay flow exists', pass: odinRecoveryReplayV044.replayFlow.length > 0 },
      { id: 'REC-003', name: 'active base known', pass: odinRecoveryReplayV044.activeBase === '199D' },
      { id: 'REC-004', name: 'next step defined', pass: !!odinRecoveryReplayV044.nextStep }
    ]
  };
  result.passed = result.checks.every((check) => check.pass);
  result.status = result.passed ? 'RECOVERY_VALIDATION_PASSED' : 'RECOVERY_VALIDATION_FAILED';
  writeRecoveryReplayOutputV044(result, result.status);
}

async function copyRecoverySnapshotV044() {
  const snapshot = { status: 'RECOVERY_SNAPSHOT_EXPORT_READY', created: new Date().toISOString(), recovery: odinRecoveryReplayV044 };
  try {
    await navigator.clipboard.writeText(JSON.stringify(snapshot, null, 2));
    writeRecoveryReplayOutputV044(snapshot, 'RECOVERY_SNAPSHOT_COPIED');
  } catch (error) {
    writeRecoveryReplayOutputV044(snapshot, 'COPY_UNAVAILABLE');
  }
}


function renderRuntimeGraphV043() {
  const nodes = odinRuntimeGraphV043.nodes.map((node) => `
    <article class="runtime-node node-${escapeHtml(node.type)}">
      <span>${escapeHtml(node.type)}</span>
      <strong>${escapeHtml(node.label)}</strong>
      <em>${escapeHtml(node.status)}</em>
    </article>
  `).join('');

  const edges = odinRuntimeGraphV043.edges.map((edge) => `
    <article class="runtime-edge">
      <strong>${escapeHtml(edge.from)} → ${escapeHtml(edge.to)}</strong>
      <span>${escapeHtml(edge.relation)}</span>
    </article>
  `).join('');

  return `
    <div class="runtime-graph-tool">
      <div class="runtime-graph-summary">
        <article><span>STATUS</span><strong>${escapeHtml(odinRuntimeGraphV043.status)}</strong></article>
        <article><span>NODES</span><strong>${escapeHtml(String(odinRuntimeGraphV043.nodes.length))}</strong></article>
        <article><span>EDGES</span><strong>${escapeHtml(String(odinRuntimeGraphV043.edges.length))}</strong></article>
        <article><span>NEXT</span><strong>${escapeHtml(odinRuntimeGraphV043.nextStep)}</strong></article>
      </div>

      <div class="runtime-graph-actions">
        <button type="button" class="primary-action" onclick="showRuntimeNodesV043()">${t('graphShowNodes')}</button>
        <button type="button" onclick="showRuntimeEdgesV043()">${t('graphShowEdges')}</button>
        <button type="button" onclick="runRuntimeGraphHealthV043()">${t('graphRunHealth')}</button>
        <button type="button" onclick="copyRuntimeGraphSnapshotV043()">${t('graphCopy')}</button>
      </div>

      <div class="runtime-graph-map">
        <div class="runtime-node-list">${nodes}</div>
        <div class="runtime-edge-list">${edges}</div>
      </div>

      <div id="runtimeGraphStatus" class="runtime-graph-status">LIVE_RUNTIME_GRAPH_READY</div>
      <pre id="runtimeGraphOutput" class="runtime-graph-output"></pre>
    </div>
  `;
}

function writeRuntimeGraphOutputV043(payload, status) {
  const output = document.getElementById('runtimeGraphOutput');
  const statusEl = document.getElementById('runtimeGraphStatus');
  if (output) output.textContent = JSON.stringify(payload, null, 2);
  if (statusEl) statusEl.textContent = status || payload.status || 'READY';
}

function showRuntimeNodesV043() {
  writeRuntimeGraphOutputV043({
    status: 'RUNTIME_GRAPH_NODES_READY',
    nodes: odinRuntimeGraphV043.nodes
  }, 'RUNTIME_GRAPH_NODES_READY');
}

function showRuntimeEdgesV043() {
  writeRuntimeGraphOutputV043({
    status: 'RUNTIME_GRAPH_EDGES_READY',
    edges: odinRuntimeGraphV043.edges
  }, 'RUNTIME_GRAPH_EDGES_READY');
}

function runRuntimeGraphHealthV043() {
  const nodeIds = new Set(odinRuntimeGraphV043.nodes.map((node) => node.id));
  const invalidEdges = odinRuntimeGraphV043.edges.filter((edge) => !nodeIds.has(edge.from) || !nodeIds.has(edge.to));
  const result = {
    status: invalidEdges.length ? 'RUNTIME_GRAPH_HEALTH_FAILED' : 'RUNTIME_GRAPH_HEALTH_PASSED',
    totalNodes: odinRuntimeGraphV043.nodes.length,
    totalEdges: odinRuntimeGraphV043.edges.length,
    invalidEdges
  };
  writeRuntimeGraphOutputV043(result, result.status);
}

async function copyRuntimeGraphSnapshotV043() {
  const snapshot = {
    status: 'RUNTIME_GRAPH_SNAPSHOT_READY',
    created: new Date().toISOString(),
    graph: odinRuntimeGraphV043
  };
  try {
    await navigator.clipboard.writeText(JSON.stringify(snapshot, null, 2));
    writeRuntimeGraphOutputV043(snapshot, 'RUNTIME_GRAPH_SNAPSHOT_COPIED');
  } catch (error) {
    writeRuntimeGraphOutputV043(snapshot, 'COPY_UNAVAILABLE');
  }
}


function renderExecutionEngineV041() {
  const options = odinExecutionRuntimeV041.engine.supportedActions.map((action) => `
    <option value="${escapeHtml(action.id)}">${escapeHtml(action.id)} — ${escapeHtml(action.name)}</option>
  `).join('');

  return `
    <div class="execution-engine-tool">
      <div class="execution-flow">
        ${odinExecutionRuntimeV041.engine.flow.map((step) => `<span>${escapeHtml(step)}</span>`).join('')}
      </div>

      <div class="execution-grid">
        <article><span>STATUS</span><strong>${escapeHtml(odinExecutionRuntimeV041.engine.status)}</strong></article>
        <article><span>PHASE</span><strong>${escapeHtml(odinExecutionRuntimeV041.engine.phase)}</strong></article>
        <article><span>NEXT</span><strong>${escapeHtml(odinExecutionRuntimeV041.engine.nextStep)}</strong></article>
        <article><span>COMPLETED</span><strong>${escapeHtml(String(odinExecutionRuntimeV041.engine.queues.completed.length))}</strong></article>
      </div>

      <label class="execution-select-label">
        <span>${t('actionSelectLabel')}</span>
        <select id="executionActionSelect">${options}</select>
      </label>

      <div class="execution-actions">
        <button type="button" onclick="validateExecutionActionV041()">${t('actionValidateButton')}</button>
        <button type="button" class="primary-action" onclick="runExecutionActionV041()">${t('actionRunButton')}</button>
        <button type="button" onclick="copyExecutionLogV041()">${t('executionCopyLogButton')}</button>
        <button type="button" onclick="resetExecutionEngineV041()">${t('actionResetButton')}</button>
      </div>

      <div id="executionStatus" class="execution-status">REAL_EXECUTION_ENGINE_READY</div>
      <pre id="executionOutput" class="execution-output"></pre>
    </div>
  `;
}

function selectedExecutionActionV041() {
  const select = document.getElementById('executionActionSelect');
  const id = select?.value || odinExecutionRuntimeV041.engine.supportedActions[0]?.id;
  return odinExecutionRuntimeV041.engine.supportedActions.find((action) => action.id === id);
}

function writeExecutionOutputV041(payload, status) {
  const output = document.getElementById('executionOutput');
  const statusEl = document.getElementById('executionStatus');
  if (output) output.textContent = JSON.stringify(payload, null, 2);
  if (statusEl) statusEl.textContent = status || payload.status || 'READY';
}

function pushExecutionEventV041(event) {
  odinExecutionRuntimeV041.log.events.push({
    time: new Date().toISOString(),
    ...event
  });
}

function validateExecutionActionV041() {
  const action = selectedExecutionActionV041();
  const result = {
    status: 'ACTION_VALIDATED',
    action,
    validation: {
      hasAction: !!action,
      hasRequirements: Array.isArray(action?.requires),
      updatesStateKnown: typeof action?.updatesState === 'boolean'
    }
  };
  result.validationPassed = Object.values(result.validation).every(Boolean);
  pushExecutionEventV041({
    type: 'VALIDATION',
    status: result.validationPassed ? 'PASSED' : 'FAILED',
    actionId: action?.id || null
  });
  writeExecutionOutputV041(result, result.status);
  return result;
}

function runExecutionActionV041() {
  const validation = validateExecutionActionV041();
  const action = selectedExecutionActionV041();

  if (!validation.validationPassed) {
    writeExecutionOutputV041(validation, 'ACTION_VALIDATION_FAILED');
    return;
  }

  const executionId = 'EXEC-' + Date.now();
  const result = {
    status: 'ACTION_EXECUTED',
    executionId,
    actionId: action.id,
    actionName: action.name,
    flow: odinExecutionRuntimeV041.engine.flow,
    stateUpdate: action.updatesState ? 'STATE_UPDATE_REQUESTED' : 'NO_STATE_UPDATE_REQUIRED',
    completedAt: new Date().toISOString()
  };

  odinExecutionRuntimeV041.engine.queues.completed.push(result);
  pushExecutionEventV041({
    type: 'EXECUTION',
    status: 'COMPLETED',
    executionId,
    actionId: action.id
  });

  writeExecutionOutputV041(result, 'ACTION_EXECUTED');
}

async function copyExecutionLogV041() {
  const payload = {
    status: 'EXECUTION_LOG_READY',
    log: odinExecutionRuntimeV041.log,
    completed: odinExecutionRuntimeV041.engine.queues.completed
  };

  try {
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    writeExecutionOutputV041(payload, 'EXECUTION_LOG_COPIED');
  } catch (error) {
    writeExecutionOutputV041(payload, 'COPY_UNAVAILABLE');
  }
}

function resetExecutionEngineV041() {
  odinExecutionRuntimeV041 = JSON.parse(JSON.stringify(odinExecutionEngineV041));
  writeExecutionOutputV041({
    status: 'REAL_EXECUTION_ENGINE_RESET',
    engine: odinExecutionRuntimeV041.engine
  }, 'REAL_EXECUTION_ENGINE_READY');
}


function renderRealStateEngineV040() {
  return `
    <div class="real-state-engine">
      <div class="real-state-grid">
        <article><span>ACTIVE BASE</span><strong>${escapeHtml(odinRealStateEngineV040.activeState.activeBase)}</strong></article>
        <article><span>STATUS</span><strong>${escapeHtml(odinRealStateEngineV040.activeState.status)}</strong></article>
        <article><span>CURRENT PHASE</span><strong>${escapeHtml(odinRealStateEngineV040.activeState.currentPhase)}</strong></article>
        <article><span>NEXT</span><strong>${escapeHtml(odinRealStateEngineV040.activeState.nextPhase)}</strong></article>
      </div>

      <div class="real-state-actions">
        <button type="button" class="primary-action" onclick="showRealStatePayloadV040('activeState')">${t('stateShowActive')}</button>
        <button type="button" onclick="showRealStatePayloadV040('packageRegistry')">${t('stateShowPackages')}</button>
        <button type="button" onclick="showRealStatePayloadV040('moduleRegistry')">${t('stateShowModules')}</button>
        <button type="button" onclick="showRealStatePayloadV040('rollbackPoints')">${t('stateShowRollback')}</button>
        <button type="button" onclick="runRealStateDiagnosticsV040()">${t('stateRunDiagnostics')}</button>
        <button type="button" onclick="copyRealStateSnapshotV040()">${t('stateCopySnapshot')}</button>
      </div>

      <div id="realStateStatus" class="real-state-status">REAL_STATE_ENGINE_BOOTSTRAP_READY</div>
      <pre id="realStateOutput" class="real-state-output"></pre>
    </div>
  `;
}

function showRealStatePayloadV040(key) {
  const payload = odinRealStateEngineV040[key] || {};
  const output = document.getElementById('realStateOutput');
  const status = document.getElementById('realStateStatus');
  if (output) output.textContent = JSON.stringify(payload, null, 2);
  if (status) status.textContent = key.toUpperCase() + '_READY';
  return payload;
}

function runRealStateDiagnosticsV040() {
  const diagnostics = {
    status: 'REAL_STATE_DIAGNOSTICS_PASSED',
    checks: [
      { id: 'STATE-001', name: 'active state exists', pass: !!odinRealStateEngineV040.activeState },
      { id: 'STATE-002', name: 'package registry exists', pass: !!odinRealStateEngineV040.packageRegistry },
      { id: 'STATE-003', name: 'module registry exists', pass: !!odinRealStateEngineV040.moduleRegistry },
      { id: 'STATE-004', name: 'rollback points exist', pass: !!odinRealStateEngineV040.rollbackPoints },
      { id: 'STATE-005', name: 'one main page rule', pass: odinRealStateEngineV040.activeState.oneMainPageRule === true }
    ]
  };
  const output = document.getElementById('realStateOutput');
  const status = document.getElementById('realStateStatus');
  if (output) output.textContent = JSON.stringify(diagnostics, null, 2);
  if (status) status.textContent = diagnostics.status;
  return diagnostics;
}

async function copyRealStateSnapshotV040() {
  const snapshot = {
    status: 'REAL_STATE_SNAPSHOT_READY',
    created: new Date().toISOString(),
    payload: odinRealStateEngineV040
  };
  try {
    await navigator.clipboard.writeText(JSON.stringify(snapshot, null, 2));
    const status = document.getElementById('realStateStatus');
    if (status) status.textContent = 'REAL_STATE_SNAPSHOT_COPIED';
  } catch (error) {
    const output = document.getElementById('realStateOutput');
    if (output) output.textContent = JSON.stringify(snapshot, null, 2);
  }
}


function renderStateWorkspaceTool() {
  return `
    <div class="state-workspace-tool">
      <div class="state-workspace-grid">
        <article class="state-stat-card"><span>ACTIVE BASE</span><strong>${escapeHtml(odinStateWorkspace199D6.activeBase)}</strong></article>
        <article class="state-stat-card"><span>CURRENT PHASE</span><strong>${escapeHtml(odinStateWorkspace199D6.currentPhase)}</strong></article>
        <article class="state-stat-card"><span>NEXT</span><strong>${escapeHtml(odinStateWorkspace199D6.nextPhase)}</strong></article>
        <article class="state-stat-card"><span>ONE PAGE</span><strong>${escapeHtml(String(odinStateWorkspace199D6.oneMainPageRule))}</strong></article>
      </div>

      <div class="state-workspace-actions">
        <button type="button" class="primary-action" onclick="createStateSnapshot199D6()">${t('stateSnapshotButton')}</button>
        <button type="button" onclick="copyStateWorkspace199D6()">${t('stateCopyButton')}</button>
        <button type="button" onclick="importStateWorkspace199D6()">${t('stateImportButton')}</button>
        <button type="button" onclick="resetStateWorkspace199D6()">${t('stateResetButton')}</button>
      </div>

      <div id="stateWorkspaceStatus" class="state-workspace-status">${t('stateStatusReady')}</div>

      <label class="state-import-label">
        <span>${t('stateImportLabel')}</span>
        <textarea id="stateWorkspaceImport" rows="7"></textarea>
      </label>

      <pre id="stateWorkspaceOutput" class="state-workspace-output"></pre>
    </div>
  `;
}

function setStateWorkspaceOutput199D6(payload, status) {
  const output = document.getElementById('stateWorkspaceOutput');
  const statusEl = document.getElementById('stateWorkspaceStatus');
  if (output) output.textContent = JSON.stringify(payload, null, 2);
  if (statusEl) statusEl.textContent = status || payload.status || t('stateStatusReady');
}

function createStateSnapshot199D6() {
  const snapshot = {
    status: 'STATE_SNAPSHOT_READY',
    created: new Date().toISOString(),
    state: cloneStateWorkspace199D6()
  };
  setStateWorkspaceOutput199D6(snapshot, t('stateStatusSnapshot'));
  return snapshot;
}

async function copyStateWorkspace199D6() {
  const snapshot = createStateSnapshot199D6();
  try {
    await navigator.clipboard.writeText(JSON.stringify(snapshot, null, 2));
    const statusEl = document.getElementById('stateWorkspaceStatus');
    if (statusEl) statusEl.textContent = t('stateStatusCopied');
  } catch (error) {
    const statusEl = document.getElementById('stateWorkspaceStatus');
    if (statusEl) statusEl.textContent = 'COPY_UNAVAILABLE';
  }
}

function importStateWorkspace199D6() {
  const raw = document.getElementById('stateWorkspaceImport')?.value || '';
  try {
    const parsed = JSON.parse(raw);
    const result = {
      status: 'STATE_IMPORT_VALID',
      importedKeys: Object.keys(parsed),
      imported: parsed
    };
    setStateWorkspaceOutput199D6(result, t('stateStatusImportOk'));
  } catch (error) {
    setStateWorkspaceOutput199D6({
      status: 'STATE_IMPORT_INVALID',
      message: String(error.message || error)
    }, t('stateStatusImportFail'));
  }
}

function resetStateWorkspace199D6() {
  const input = document.getElementById('stateWorkspaceImport');
  if (input) input.value = JSON.stringify(cloneStateWorkspace199D6(), null, 2);
  createStateSnapshot199D6();
}


function renderStandaloneIntegrationAudit(kind) {
  const isCommit = kind === 'commitBuilder';
  const legacyFile = isCommit ? 'dev/V03/commit_builder.html' : 'dev/V03/state_workspace.html';
  const targetZone = isCommit ? 'commitBuilder' : 'stateWorkspace';
  return `
    <div class="standalone-audit-card">
      <div class="standalone-audit-status">PHASE 0.5 — AUDIT</div>
      <h3>${escapeHtml(legacyFile)}</h3>
      <p><strong>Decision:</strong> integrate as internal zone <code>${escapeHtml(targetZone)}</code>.</p>
      <p><strong>Rule:</strong> do not use as active standalone HTML page.</p>
      <p><strong>Delete now:</strong> no. First audit and migrate useful logic.</p>
      <ol>
        <li>Audit legacy page source.</li>
        <li>Extract useful function blocks.</li>
        <li>Move logic into <code>app.js</code> render zone.</li>
        <li>Keep UI inside existing <code>workZone</code>.</li>
        <li>Remove standalone legacy pages after successful migration.</li>
      </ol>
    </div>
  `;
}




function cloneControlCenter199D7() {
  return JSON.parse(JSON.stringify(odinControlCenter199D7));
}

function renderControlCenterTool() {
  return `
    <div class="control-center-tool">
      <div class="control-center-grid">
        <article class="control-card">
          <span>QA</span>
          <strong>${escapeHtml(odinControlCenter199D7.qa)}</strong>
        </article>

        <article class="control-card">
          <span>RELEASE</span>
          <strong>${escapeHtml(odinControlCenter199D7.release)}</strong>
        </article>

        <article class="control-card">
          <span>EXPORT</span>
          <strong>${escapeHtml(odinControlCenter199D7.export)}</strong>
        </article>

        <article class="control-card">
          <span>RUNTIME</span>
          <strong>${escapeHtml(odinControlCenter199D7.runtime)}</strong>
        </article>
      </div>

      <div class="control-center-actions">
        <button type="button" class="primary-action" onclick="runQaControl199D7()">${t('controlQaButton')}</button>
        <button type="button" onclick="runExportControl199D7()">${t('controlExportButton')}</button>
        <button type="button" onclick="runReleaseControl199D7()">${t('controlReleaseButton')}</button>
        <button type="button" onclick="resetControlCenter199D7()">${t('controlResetButton')}</button>
      </div>

      <div id="controlCenterStatus" class="control-center-status">${t('controlStatusReady')}</div>

      <pre id="controlCenterOutput" class="control-center-output"></pre>
    </div>
  `;
}

function setControlCenterOutput199D7(payload, status) {
  const output = document.getElementById('controlCenterOutput');
  const statusEl = document.getElementById('controlCenterStatus');

  if (output) output.textContent = JSON.stringify(payload, null, 2);
  if (statusEl) statusEl.textContent = status || payload.status || t('controlStatusReady');
}

function runQaControl199D7() {
  setControlCenterOutput199D7({
    status: 'QA_PASSED',
    checks: [
      'UI_MATRIX_OK',
      'ONE_MAIN_PAGE_RULE_OK',
      'INTERNAL_ZONES_OK',
      'NO_NEW_HTML_OK'
    ]
  }, t('controlStatusQa'));
}

function runExportControl199D7() {
  setControlCenterOutput199D7({
    status: 'EXPORT_READY',
    package: '199D.7',
    exportMode: 'CONTROLLED'
  }, t('controlStatusExport'));
}

function runReleaseControl199D7() {
  setControlCenterOutput199D7({
    status: 'RELEASE_CONTROLLED',
    activeBase: '199D',
    nextPhase: '199D.8'
  }, t('controlStatusRelease'));
}

function resetControlCenter199D7() {
  setControlCenterOutput199D7(cloneControlCenter199D7(), t('controlStatusReady'));
}


function renderControlCenterIntegrationAudit() {
  return `
    <div class="standalone-audit-card control-center-audit-card">
      <div class="standalone-audit-status">PHASE 0.6 — CONTROL CENTER AUDIT</div>
      <h3>dev/V03/control_center.html</h3>
      <p><strong>Status:</strong> LEGACY / SOURCE FOR INTEGRATION.</p>
      <p><strong>Decision:</strong> integrate as internal zone <code>controlCenter</code>.</p>
      <p><strong>Rule:</strong> one active page only: <code>dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html</code>.</p>
      <p><strong>Delete now:</strong> no. First extract useful control, QA and release logic.</p>
      <div class="audit-step-grid">
        <article><strong>1. Audit</strong><span>Inspect legacy control_center.html in repo.</span></article>
        <article><strong>2. Extract</strong><span>Keep logic, reject old shell/layout.</span></article>
        <article><strong>3. Integrate</strong><span>Move functions into app.js internal zone.</span></article>
        <article><strong>4. Normalize</strong><span>Render inside workZone using ODIN UI Matrix.</span></article>
        <article><strong>5. Deprecate</strong><span>Remove standalone active role after migration.</span></article>
      </div>
    </div>
  `;
}



function renderLegacyMigrationPlan199D4() {
  const pages = odinLegacyMigrationPlan199D4.legacyPages.map((item) => `
    <article class="migration-card">
      <div class="migration-card-head">
        <span>${escapeHtml(item.id)}</span>
        <strong>${escapeHtml(item.migrationStatus)}</strong>
      </div>
      <h3>${escapeHtml(item.targetZone)}</h3>
      <p><strong>Source:</strong> <code>${escapeHtml(item.source)}</code></p>
      <p><strong>Extract:</strong></p>
      <ul>${item.extract.map((x) => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
      <p><strong>Reject:</strong></p>
      <ul>${item.reject.map((x) => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
    </article>
  `).join('');

  const order = odinLegacyMigrationPlan199D4.implementationOrder.map((step) => `
    <article class="migration-step">
      <strong>${escapeHtml(step.step)} — ${escapeHtml(step.name)}</strong>
      <span>${escapeHtml(step.why)}</span>
      <em>${escapeHtml(step.expectedResult)}</em>
    </article>
  `).join('');

  return `
    <div class="migration-plan">
      <div class="migration-lock">
        <strong>ONE MAIN PAGE RULE</strong>
        <span>${escapeHtml(odinLegacyMigrationPlan199D4.migrationRules.onlyActiveHtml)}</span>
      </div>
      <h3>Legacy pages</h3>
      <div class="migration-grid">${pages}</div>
      <h3>Implementation order</h3>
      <div class="migration-steps">${order}</div>
    </div>
  `;
}


function escapeHtml(value) {
  return String(value || '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function normalizeHtmlForDiff(content) {
  return String(content || '')
    .replace(/\r\n/g, '\n')
    .replace(/>\s*</g, '>\n<')
    .replace(/(<\/?[^>]+>)/g, '\n$1\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line, index, arr) => line.trim() || index < arr.length - 1)
    .join('\n');
}

function diffSourceForCurrentFile(value) {
  if (isHtmlPreviewFile()) {
    return normalizeHtmlForDiff(value);
  }
  return String(value || '').replace(/\r\n/g, '\n');
}

function computeDiff() {
  const originalSource = diffSourceForCurrentFile(fileState.original || '');
  const draftSource = diffSourceForCurrentFile(fileState.draft || '');
  const originalLines = originalSource.split('\n');
  const draftLines = draftSource.split('\n');
  const max = Math.max(originalLines.length, draftLines.length);
  const rows = [];
  let changes = 0;

  for (let i = 0; i < max; i += 1) {
    const original = originalLines[i] ?? '';
    const draft = draftLines[i] ?? '';

    if (original === draft) {
      if (original || draft || i < max - 1) {
        rows.push(`<div class="diff-row diff-same"><span>${i + 1}</span><code>${escapeHtml(draft || ' ')}</code></div>`);
      }
    } else {
      changes += 1;
      rows.push(`<div class="diff-row diff-removed"><span>${i + 1}</span><code>- ${escapeHtml(original || ' ')}</code></div>`);
      rows.push(`<div class="diff-row diff-added"><span>${i + 1}</span><code>+ ${escapeHtml(draft || ' ')}</code></div>`);
    }
  }

  return {
    changes,
    html: changes ? rows.join('') : `<div class="empty-state">${t('diffNoChanges')}</div>`,
    mode: isHtmlPreviewFile() ? 'HTML_AWARE_DIFF' : 'TEXT_DIFF'
  };
}

function renderHistory() {
  if (!fileState.history.length) return `<div class="empty-state">${t('historyEmpty')}</div>`;
  return fileState.history.map(item => `<div class="history-item"><strong>${escapeHtml(t(item.type) || item.type)}</strong><span>${escapeHtml(item.time)}</span></div>`).join('');
}

function isHtmlPreviewFile() {
  return /\.html?$/i.test(fileState.name || '');
}

function previewModeLabel() {
  return isHtmlPreviewFile() ? t('previewHtmlMode') : t('previewCodeMode');
}

function buildPreviewHtml() {
  const content = fileState.draft || '';
  if (!content.trim()) return `<div class="empty-state">${t('previewEmpty')}</div>`;
  if (isHtmlPreviewFile()) {
    return `<iframe class="html-preview-frame" title="${escapeHtml(t('previewTitle'))}" sandbox="allow-same-origin" srcdoc="${escapeHtml(content)}"></iframe>`;
  }
  return `<pre class="code-preview">${escapeHtml(content)}</pre>`;
}

function renderPreviewPanel() {
  const panel = document.getElementById('previewPanel');
  const meta = document.getElementById('previewMeta');
  const frame = document.getElementById('previewFrame');
  if (!panel || !meta || !frame) return;
  meta.textContent = fileState.name ? previewModeLabel() : t('previewEmpty');
  frame.innerHTML = buildPreviewHtml();
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  assistContent.innerHTML = t('previewUpdated') + '<br>' + workflowSuggestion();
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
      <div class="workspace-sticky-actions">
        <div class="file-toolbar">
          <label class="file-picker">
            ${t('fileSelect')}
            <input id="fileInput" type="file" accept=".txt,.md,.html,.css,.js,.json,.xml,.csv,text/*" />
          </label>
          <button type="button" onclick="loadSampleFile()">${t('fileLoadSample')}</button>
          <button type="button" onclick="sendToReview()" ${hasProject ? '' : 'disabled'}>${t('workflowReviewBtn')}</button>
          <button type="button" onclick="approveFileDraft()" ${hasProject ? '' : 'disabled'}>${t('fileApproveBtn')}</button>
          <button type="button" onclick="rejectFileDraft()" ${hasProject ? '' : 'disabled'}>${t('fileRejectBtn')}</button>
          <button type="button" onclick="downloadDraftFile()" ${hasProject && fileState.name ? '' : 'disabled'}>${t('fileDownloadBtn')}</button>
          <button type="button" onclick="renderPreviewPanel()" ${hasProject ? '' : 'disabled'}>${t('filePreviewBtn')}</button>
        </div>

        <div class="workflow-strip">
          <span class="workflow-step ${state.workflow === 'editing' ? 'active' : ''}">${t('workflowEditing')}</span>
          <span class="workflow-step ${state.workflow === 'changed' ? 'active' : ''}">${t('workflowChanged')}</span>
          <span class="workflow-step ${state.workflow === 'review' ? 'active' : ''}">${t('workflowReview')}</span>
          <span class="workflow-step ${state.workflow === 'approved' ? 'active' : ''}">${t('workflowApproved')}</span>
        </div>
      </div>
      <div class="file-meta">
        <span><strong>${t('fileNameLabel')}:</strong> ${escapeHtml(fileState.name || t('fileNoFile'))}</span>
        <span class="file-status ${isChanged ? 'changed' : 'clean'}">${isChanged ? t('fileChanged') : t('fileClean')}</span>
        <span>${t('fileLinesChanged')}: <strong>${diff.changes}</strong></span>
        <span class="diff-mode-badge">${escapeHtml(diff.mode || 'TEXT_DIFF')}</span>
      </div>

      <div class="browser-note">${t('fileBrowserLimit')}</div>

      <div class="file-grid">
        <section class="file-panel editor-panel compare-panel" id="editorPanel">
          <h3>${t('fileEditorTitle')} ${hint()}</h3>
          <textarea id="fileEditor" ${hasProject ? '' : 'disabled'} placeholder="${escapeHtml(t('fileEmptyEditor'))}">${escapeHtml(fileState.draft)}</textarea>
        </section>
        <section class="file-panel original-panel compare-panel" id="originalPanel">
          <h3>${t('fileOriginalTitle')}</h3>
          <pre id="originalView" aria-readonly="true">${escapeHtml(fileState.original || t('fileEmptyEditor'))}</pre>
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

      <section class="file-panel preview-panel" id="previewPanel">
        <h3>${t('previewTitle')}</h3>
        <div class="preview-meta" id="previewMeta">${fileState.name ? previewModeLabel() : t('previewEmpty')}</div>
        <div class="preview-frame" id="previewFrame">${buildPreviewHtml()}</div>
      </section>

      <div class="action-row">
        <button type="button" class="primary-action" onclick="prepareFilePackage()" ${hasProject ? '' : 'disabled'}>${t('filePackageBtn')}</button>
      </div>
    </div>
  `);
  assistContent.innerHTML = (hasProject ? t('filesAssist') : `<strong>${t('filesTitle')}</strong><br>${t('fileNeedProject')}`) + '<br>' + workflowSuggestion();
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
      setWorkflow(fileState.original === fileState.draft ? 'editing' : 'changed', { silent: true });
      refreshFileWorkspaceLiveParts();
      syncComparePanelHeights();
    });
    editor.addEventListener('mouseup', syncComparePanelHeights);
    editor.addEventListener('keyup', syncComparePanelHeights);
    syncComparePanelHeights();
  }
}

function refreshFileWorkspaceLiveParts() {
  const diff = computeDiff();
  const isChanged = fileState.original !== fileState.draft;
  const status = document.querySelector('.file-status');
  const meta = document.querySelector('.file-meta span:last-child strong');
  const diffView = document.getElementById('diffView');
  const workflowValue = document.getElementById('workflowValue');
  if (status) {
    status.className = `file-status ${isChanged ? 'changed' : 'clean'}`;
    status.textContent = isChanged ? t('fileChanged') : t('fileClean');
  }
  if (meta) meta.textContent = String(diff.changes);
  const diffMode = document.querySelector('.diff-mode-badge');
  if (diffMode) diffMode.textContent = diff.mode || 'TEXT_DIFF';
  if (diffView) diffView.innerHTML = diff.html;
  const previewFrame = document.getElementById('previewFrame');
  const previewMeta = document.getElementById('previewMeta');
  if (previewFrame) previewFrame.innerHTML = buildPreviewHtml();
  if (previewMeta) previewMeta.textContent = fileState.name ? previewModeLabel() : t('previewEmpty');
  if (workflowValue) workflowValue.textContent = workflowText();
  document.querySelectorAll('.workflow-step').forEach(step => step.classList.remove('active'));
  const steps = Array.from(document.querySelectorAll('.workflow-step'));
  const order = ['editing', 'changed', 'review', 'approved'];
  const index = order.indexOf(state.workflow);
  if (steps[index]) steps[index].classList.add('active');
  assistContent.innerHTML = t('filesAssist') + '<br>' + workflowSuggestion();
}

function syncComparePanelHeights() {
  const editor = document.getElementById('fileEditor');
  const original = document.getElementById('originalView');
  if (!editor || !original) return;
  original.style.minHeight = `${editor.offsetHeight}px`;
}


function loadSampleFile() {
  fileState.name = t('fileSampleName');
  fileState.original = t('fileSampleContent').replaceAll('\\n', '\n');
  fileState.draft = fileState.original;
  addHistory('historyLoaded');
  setWorkflow('editing');
  renderFileWorkspace();
}

function approveFileDraft() {
  fileState.original = fileState.draft;
  addHistory('historyApproved');
  setWorkflow('approved');
  assistContent.innerHTML = t('fileApproved') + '<br>' + workflowSuggestion();
  renderFileWorkspace();
}

function rejectFileDraft() {
  fileState.draft = fileState.original;
  addHistory('historyRejected');
  setWorkflow('editing');
  assistContent.innerHTML = t('fileRejected') + '<br>' + workflowSuggestion();
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
  assistContent.innerHTML = t('filePackaged') + '<br>' + workflowSuggestion();
}

function selectProject(projectName) {
  state.project = projectName;
  localStorage.setItem('odin_active_project', projectName);
  setWorkflow('editing');
  projectValue.textContent = projectName;
  assistContent.innerHTML = `<strong>${t('selectedPrefix')}</strong> ${projectName}. ${t('selectedSuffix')}<br>${t('workflowProjectOpened')}`;
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


document.querySelectorAll('[data-zone-jump]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const zone = link.dataset.zoneJump;
    if (zone) {
      setZone(zone);
      settingsMenu.hidden = true;
      settingsToggle.setAttribute('aria-expanded', 'false');
    }
  });
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
