// ODIN V03.27 — UI Matrix Shell
// Українською: спільна логіка для службових сторінок, щоб вони виглядали та поводились як головний index.html.
const odinMatrixState = {
  lang: localStorage.getItem('odin_lang') || 'ua',
  theme: localStorage.getItem('odin_theme') || 'light'
};
const odinMatrixHtmlLang = { ua: 'uk', en: 'en', de: 'de' };
const odinMatrixI18n = {
  ua: {
    title: 'Інтерфейс ОДІН', subtitle: 'Робоче середовище керування системою', quickSettings: 'Швидкі налаштування', settings: 'Налаштування', systemPages: 'Сторінки системи', mainInterface: 'Головний інтерфейс', commitBuilder: 'Commit Builder', stateWorkspace: 'State Workspace', themeLabel: 'Тема', languageLabel: 'Мова', themeLightName: 'Світла', themeDarkName: 'Темна', treeTitle: 'Навігація', assistTitle: 'Пояснення', modeLabel: 'РЕЖИМ', stateLabel: 'СТАН', projectLabel: 'ПРОЄКТ', workflowLabel: 'ПРОЦЕС', modeDiscussion: 'ОБГОВОРЕННЯ', stateReady: 'ГОТОВО', none: 'Не вибрано', workflowApproved: 'Затверджено',
    version: 'Версія', commitTitle: 'Назва фіксації', done: 'Що зроблено', value: 'Що це дає', context: 'Контекст', generate: 'Згенерувати', copy: 'Копіювати', commands: 'Команди Git', changelog: 'Запис CHANGELOG', commitIntro: 'Генерує Git-команди, tag і запис CHANGELOG за стандартом ODIN.', commitAssist: 'Commit Builder — запасний інструмент. Основний варіант: готовий блок «Повна фіксація», який надається разом із пакетом.',
    stateIntro: 'Показує стани системи, checkpoint-и та безпечні restore-команди.', stateHistory: 'Історія станів', details: 'Деталі стану', restore: 'Restore-команди', compare: 'Порівняння', stateAssist: 'State Workspace показує, де знаходиться система, що було зафіксовано і як безпечно повернутись до контрольної точки.', stable: 'Стабільний', currentState: 'Поточний стан', servicePage: 'Службова сторінка ODIN', uiMatrix: 'UI Matrix активна: сторінка використовує єдину шапку, меню, теми і мови.',
    hintTree: 'Навігація службової сторінки. Вона має повторювати логіку головного Інтерфейсу ОДІН.', hintAssist: 'Права панель пояснює призначення сторінки та наступну дію.', hintSettings: 'Шестерня відкриває системне меню: сторінки, тема, мова.'
  },
  en: {
    title: 'ODIN Interface', subtitle: 'System control workspace', quickSettings: 'Quick settings', settings: 'Settings', systemPages: 'System pages', mainInterface: 'Main Interface', commitBuilder: 'Commit Builder', stateWorkspace: 'State Workspace', themeLabel: 'Theme', languageLabel: 'Language', themeLightName: 'Light', themeDarkName: 'Dark', treeTitle: 'Navigation', assistTitle: 'Explanation', modeLabel: 'MODE', stateLabel: 'STATE', projectLabel: 'PROJECT', workflowLabel: 'WORKFLOW', modeDiscussion: 'DISCUSSION', stateReady: 'READY', none: 'None selected', workflowApproved: 'Approved',
    version: 'Version', commitTitle: 'Commit title', done: 'What was done', value: 'What it gives', context: 'Context', generate: 'Generate', copy: 'Copy', commands: 'Git Commands', changelog: 'CHANGELOG Entry', commitIntro: 'Generates Git commands, tag and CHANGELOG entry using ODIN standard.', commitAssist: 'Commit Builder is a fallback tool. Default path: use the ready “Full fixation” block provided with a package.',
    stateIntro: 'Shows system states, checkpoints and safe restore commands.', stateHistory: 'State History', details: 'State Details', restore: 'Restore Commands', compare: 'Compare', stateAssist: 'State Workspace shows where the system is, what was fixed, and how to safely return to a checkpoint.', stable: 'Stable', currentState: 'Current State', servicePage: 'ODIN service page', uiMatrix: 'UI Matrix active: this page uses unified header, menu, themes and languages.',
    hintTree: 'Service page navigation. It must follow the main ODIN Interface logic.', hintAssist: 'Right panel explains the page purpose and next action.', hintSettings: 'Gear opens the system menu: pages, theme, language.'
  },
  de: {
    title: 'ODIN Interface', subtitle: 'Arbeitsbereich zur Systemsteuerung', quickSettings: 'Schnelleinstellungen', settings: 'Einstellungen', systemPages: 'Systemseiten', mainInterface: 'Hauptinterface', commitBuilder: 'Commit Builder', stateWorkspace: 'State Workspace', themeLabel: 'Theme', languageLabel: 'Sprache', themeLightName: 'Hell', themeDarkName: 'Dunkel', treeTitle: 'Navigation', assistTitle: 'Erklärung', modeLabel: 'MODUS', stateLabel: 'STATUS', projectLabel: 'PROJEKT', workflowLabel: 'ABLAUF', modeDiscussion: 'DISKUSSION', stateReady: 'BEREIT', none: 'Nicht ausgewählt', workflowApproved: 'Genehmigt',
    version: 'Version', commitTitle: 'Commit-Titel', done: 'Was gemacht wurde', value: 'Was es bringt', context: 'Kontext', generate: 'Generieren', copy: 'Kopieren', commands: 'Git-Befehle', changelog: 'CHANGELOG-Eintrag', commitIntro: 'Erzeugt Git-Befehle, Tag und CHANGELOG-Eintrag nach ODIN-Standard.', commitAssist: 'Commit Builder ist ein Reservewerkzeug. Standard: den fertigen Block „Vollständige Fixierung“ aus dem Paket verwenden.',
    stateIntro: 'Zeigt Systemzustände, Checkpoints und sichere Restore-Befehle.', stateHistory: 'State History', details: 'State Details', restore: 'Restore-Befehle', compare: 'Vergleich', stateAssist: 'State Workspace zeigt, wo das System steht, was fixiert wurde und wie man sicher zu einem Checkpoint zurückkehrt.', stable: 'Stabil', currentState: 'Aktueller Zustand', servicePage: 'ODIN-Service-Seite', uiMatrix: 'UI Matrix aktiv: diese Seite nutzt einheitlichen Header, Menü, Themes und Sprachen.',
    hintTree: 'Navigation der Service-Seite. Sie muss der Logik des Hauptinterfaces folgen.', hintAssist: 'Die rechte Leiste erklärt Zweck und nächsten Schritt.', hintSettings: 'Das Zahnrad öffnet das Systemmenü: Seiten, Theme, Sprache.'
  }
};
function odinMatrixT(key) { return (odinMatrixI18n[odinMatrixState.lang] && odinMatrixI18n[odinMatrixState.lang][key]) || odinMatrixI18n.ua[key] || key; }
function odinMatrixApplyTheme() {
  document.body.classList.toggle('theme-light', odinMatrixState.theme === 'light');
  document.body.classList.toggle('theme-dark', odinMatrixState.theme === 'dark');
  document.body.dataset.theme = odinMatrixState.theme;
  localStorage.setItem('odin_theme', odinMatrixState.theme);
  const themeValue = document.getElementById('themeValue');
  if (themeValue) themeValue.textContent = odinMatrixState.theme === 'light' ? odinMatrixT('themeLightName') : odinMatrixT('themeDarkName');
}
function odinMatrixApplyI18n() {
  document.documentElement.lang = odinMatrixHtmlLang[odinMatrixState.lang] || 'uk';
  document.body.dataset.lang = odinMatrixState.lang;
  localStorage.setItem('odin_lang', odinMatrixState.lang);
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = odinMatrixT(el.dataset.i18n); });
  document.querySelectorAll('[data-help-key]').forEach(el => { el.setAttribute('data-help', odinMatrixT(el.dataset.helpKey)); });
  document.querySelectorAll('[data-lang-option]').forEach(btn => {
    const active = btn.dataset.langOption === odinMatrixState.lang;
    btn.classList.toggle('active', active);
    btn.classList.toggle('flag-ua', btn.dataset.langOption === 'ua');
    btn.classList.toggle('flag-en', btn.dataset.langOption === 'en');
    btn.classList.toggle('flag-de', btn.dataset.langOption === 'de');
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  const modeValue = document.getElementById('modeValue');
  const stateValue = document.getElementById('stateValue');
  const projectValue = document.getElementById('projectValue');
  const workflowValue = document.getElementById('workflowValue');
  if (modeValue) modeValue.textContent = odinMatrixT('modeDiscussion');
  if (stateValue) stateValue.textContent = odinMatrixT('stateReady');
  if (projectValue) projectValue.textContent = odinMatrixT('none');
  if (workflowValue) workflowValue.textContent = odinMatrixT('workflowApproved');
}
function odinMatrixInitShell() {
  odinMatrixApplyTheme();
  odinMatrixApplyI18n();
  const settingsToggle = document.getElementById('settingsToggle');
  const settingsMenu = document.getElementById('settingsMenu');
  const themeToggle = document.getElementById('themeToggle');
  if (settingsToggle && settingsMenu) {
    settingsToggle.addEventListener('click', event => {
      event.stopPropagation();
      const open = settingsMenu.hasAttribute('hidden');
      settingsMenu.toggleAttribute('hidden', !open);
      settingsToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', event => {
      if (!settingsMenu.contains(event.target) && event.target !== settingsToggle) {
        settingsMenu.setAttribute('hidden', '');
        settingsToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      odinMatrixState.theme = odinMatrixState.theme === 'light' ? 'dark' : 'light';
      odinMatrixApplyTheme();
    });
  }
  document.querySelectorAll('[data-lang-option]').forEach(btn => {
    btn.addEventListener('click', () => {
      odinMatrixState.lang = btn.dataset.langOption;
      odinMatrixApplyI18n();
      if (window.odinMatrixRender) window.odinMatrixRender();
    });
  });
}
function odinMatrixCopy(id) {
  const el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard?.writeText(el.textContent || el.value || '');
}
document.addEventListener('DOMContentLoaded', odinMatrixInitShell);
