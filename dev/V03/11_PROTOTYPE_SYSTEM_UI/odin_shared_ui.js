// ODIN Shared UI Shell v26.1
// Українською: спільна логіка тем, мов, Quick Settings і навігації службових сторінок.
const ODIN_UI_I18N = {
  ua: {
    title:'Інтерфейс ОДІН', subtitle:'Робоче середовище керування системою', settings:'Налаштування', quickSettings:'Швидкі налаштування', navigation:'Навігація', pages:'Сторінки', themeLabel:'Тема', languageLabel:'Мова', light:'Світла', dark:'Темна',
    mainInterface:'Головний інтерфейс', commitBuilder:'Commit Builder', stateWorkspace:'State Workspace', assistant:'Асистент ODIN', modeLabel:'Режим', stateLabel:'Стан', projectLabel:'Проєкт', workflowLabel:'Workflow', stable:'Стабільний', currentState:'Поточний стан',
    activePage:'Активна сторінка', openMain:'Відкрити головний інтерфейс', navCommit:'Генератор фіксацій', navState:'Стани системи', navMain:'Головна',
    version:'Версія', fixTitle:'Назва фіксації', done:'Що зроблено', value:'Що це дає', context:'Контекст', generate:'Згенерувати', copy:'Копіювати', gitCommands:'Git-команди', changelogEntry:'Запис CHANGELOG', tag:'Tag',
    commitIntro:'Генерує commit, tag і changelog за стандартом ODIN. Git не виконується автоматично.', stateIntro:'Показує стан системи, checkpoint-и та безпечні команди відновлення.',
    stateHistory:'Історія станів', stateDetails:'Деталі стану', restoreCommands:'Команди відновлення', compareStates:'Порівняння станів',
    helpSettings:'Тут перемикаються тема, мова і відкриваються службові сторінки ODIN.', helpCommit:'Заповни поля після тестування пакета. ODIN підготує повну фіксацію.', helpState:'State — це осмислена контрольна точка: tag + changelog + registry + опис.', helpNav:'Це службова навігація поточної сторінки у тому самому ODIN-шаблоні.', helpAssist:'Права панель пояснює, що робити на поточній сторінці.',
    approvedWarning:'Рекомендація: генерувати фіксацію тільки після тесту і Approved-стану.', emptyRequired:'Заповни версію і назву фіксації.'
  },
  en: {
    title:'ODIN Interface', subtitle:'System control workspace', settings:'Settings', quickSettings:'Quick Settings', navigation:'Navigation', pages:'Pages', themeLabel:'Theme', languageLabel:'Language', light:'Light', dark:'Dark',
    mainInterface:'Main Interface', commitBuilder:'Commit Builder', stateWorkspace:'State Workspace', assistant:'ODIN Assistant', modeLabel:'Mode', stateLabel:'State', projectLabel:'Project', workflowLabel:'Workflow', stable:'Stable', currentState:'Current State',
    activePage:'Active page', openMain:'Open Main Interface', navCommit:'Commit Generator', navState:'System States', navMain:'Main',
    version:'Version', fixTitle:'Fix title', done:'What was done', value:'Value', context:'Context', generate:'Generate', copy:'Copy', gitCommands:'Git Commands', changelogEntry:'CHANGELOG Entry', tag:'Tag',
    commitIntro:'Generates commit, tag and changelog using the ODIN standard. Git is not executed automatically.', stateIntro:'Shows system state, checkpoints and safe restore commands.',
    stateHistory:'State History', stateDetails:'State Details', restoreCommands:'Restore Commands', compareStates:'Compare States',
    helpSettings:'Switch theme/language and open ODIN service pages here.', helpCommit:'Fill the fields after testing. ODIN prepares the full fixation block.', helpState:'State is a meaningful checkpoint: tag + changelog + registry + description.', helpNav:'This is service navigation inside the same ODIN template.', helpAssist:'The right panel explains what to do on the current page.',
    approvedWarning:'Recommendation: generate fixation only after testing and Approved state.', emptyRequired:'Fill version and title.'
  },
  de: {
    title:'ODIN Interface', subtitle:'Arbeitsbereich zur Systemsteuerung', settings:'Einstellungen', quickSettings:'Schnelleinstellungen', navigation:'Navigation', pages:'Seiten', themeLabel:'Theme', languageLabel:'Sprache', light:'Hell', dark:'Dunkel',
    mainInterface:'Hauptinterface', commitBuilder:'Commit Builder', stateWorkspace:'State Workspace', assistant:'ODIN Assistent', modeLabel:'Modus', stateLabel:'Status', projectLabel:'Projekt', workflowLabel:'Workflow', stable:'Stabil', currentState:'Aktueller Zustand',
    activePage:'Aktive Seite', openMain:'Hauptinterface öffnen', navCommit:'Commit Generator', navState:'Systemzustände', navMain:'Hauptseite',
    version:'Version', fixTitle:'Titel der Fixierung', done:'Was gemacht wurde', value:'Wert', context:'Kontext', generate:'Generieren', copy:'Kopieren', gitCommands:'Git-Befehle', changelogEntry:'CHANGELOG-Eintrag', tag:'Tag',
    commitIntro:'Erzeugt Commit, Tag und Changelog nach ODIN-Standard. Git wird nicht automatisch ausgeführt.', stateIntro:'Zeigt Systemzustände, Checkpoints und sichere Restore-Befehle.',
    stateHistory:'State History', stateDetails:'State Details', restoreCommands:'Restore-Befehle', compareStates:'Zustände vergleichen',
    helpSettings:'Hier werden Theme/Sprache gewechselt und ODIN-Service-Seiten geöffnet.', helpCommit:'Fülle die Felder nach dem Test. ODIN bereitet den vollständigen Fixierungsblock vor.', helpState:'State ist ein sinnvoller Checkpoint: Tag + Changelog + Registry + Beschreibung.', helpNav:'Das ist Service-Navigation im gleichen ODIN-Template.', helpAssist:'Die rechte Seitenleiste erklärt, was auf der aktuellen Seite zu tun ist.',
    approvedWarning:'Empfehlung: Fixierung erst nach Test und Approved-Status generieren.', emptyRequired:'Version und Titel ausfüllen.'
  }
};
function odinGetLang(){ return localStorage.getItem('odin.lang') || document.body.dataset.lang || 'ua'; }
function odinGetTheme(){ return localStorage.getItem('odin.theme') || document.body.dataset.theme || 'light'; }
function odinT(key){ return (ODIN_UI_I18N[odinGetLang()] || ODIN_UI_I18N.ua)[key] || key; }
function odinApplyI18n(){
  document.documentElement.lang = odinGetLang() === 'ua' ? 'uk' : odinGetLang();
  document.body.dataset.lang = odinGetLang();
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = odinT(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = odinT(el.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-help-key]').forEach(el => { el.setAttribute('data-help', odinT(el.dataset.helpKey)); });
  document.querySelectorAll('[data-lang-option]').forEach(btn => btn.classList.toggle('active', btn.dataset.langOption === odinGetLang()));
  if (window.odinRenderPage) window.odinRenderPage();
}
function odinApplyTheme(){
  const theme = odinGetTheme();
  document.body.dataset.theme = theme;
  document.body.classList.toggle('theme-light', theme === 'light');
  document.body.classList.toggle('theme-dark', theme === 'dark');
  const themeValue = document.getElementById('themeValue');
  if (themeValue) themeValue.textContent = theme === 'light' ? odinT('light') : odinT('dark');
}
function odinSetLang(lang){ localStorage.setItem('odin.lang', lang); odinApplyI18n(); odinApplyTheme(); }
function odinToggleTheme(){ localStorage.setItem('odin.theme', odinGetTheme() === 'light' ? 'dark' : 'light'); odinApplyTheme(); }
function odinInitShell(){
  odinApplyTheme();
  odinApplyI18n();
  const toggle = document.getElementById('settingsToggle');
  const menu = document.getElementById('settingsMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isHidden = menu.hasAttribute('hidden');
      if (isHidden) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', String(isHidden));
    });
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && event.target !== toggle) {
        menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  document.querySelectorAll('[data-lang-option]').forEach(btn => btn.addEventListener('click', () => odinSetLang(btn.dataset.langOption)));
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.addEventListener('click', odinToggleTheme);
}
function odinCopyFrom(id){
  const el = document.getElementById(id);
  if (!el) return;
  const text = el.value || el.textContent || '';
  navigator.clipboard?.writeText(text);
}
document.addEventListener('DOMContentLoaded', odinInitShell);
