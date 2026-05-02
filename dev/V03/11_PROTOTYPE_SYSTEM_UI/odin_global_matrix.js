/* ODIN V03.27.2 — GLOBAL UI MATRIX
   Єдина shell-логіка для всіх сторінок Інтерфейсу ОДІН. */
(function () {
  const PAGE_TITLES = {
    main: { ua: 'Робоче середовище керування системою', en: 'System Control Workspace', de: 'Systemsteuerungs-Arbeitsbereich' },
    commit: { ua: 'Commit Builder', en: 'Commit Builder', de: 'Commit Builder' },
    state: { ua: 'State Workspace', en: 'State Workspace', de: 'State Workspace' }
  };

  const NAV = [
    { id: 'main', href: 'index.html', label: { ua: 'Головний інтерфейс', en: 'Main Interface', de: 'Hauptoberfläche' } },
    { id: 'commit', href: 'commit_builder.html', label: { ua: 'Commit Builder', en: 'Commit Builder', de: 'Commit Builder' } },
    { id: 'state', href: 'state_workspace.html', label: { ua: 'State Workspace', en: 'State Workspace', de: 'State Workspace' } }
  ];

  const DICT = {
    ua: { interface: 'Інтерфейс ОДІН', nav: 'Навігація', settings: 'Налаштування', pages: 'Сторінки', theme: 'Тема', light: 'Світла', dark: 'Темна', language: 'Мова', assistTitle: 'Підказка ODIN', assistText: 'Ця сторінка працює в єдиній матриці Інтерфейсу ОДІН.' },
    en: { interface: 'ODIN Interface', nav: 'Navigation', settings: 'Settings', pages: 'Pages', theme: 'Theme', light: 'Light', dark: 'Dark', language: 'Language', assistTitle: 'ODIN Hint', assistText: 'This page uses the unified ODIN Interface matrix.' },
    de: { interface: 'ODIN-Oberfläche', nav: 'Navigation', settings: 'Einstellungen', pages: 'Seiten', theme: 'Design', light: 'Hell', dark: 'Dunkel', language: 'Sprache', assistTitle: 'ODIN-Hinweis', assistText: 'Diese Seite nutzt die einheitliche ODIN-Interface-Matrix.' }
  };

  function getLang() { return localStorage.getItem('odin_lang') || 'ua'; }
  function getTheme() { return localStorage.getItem('odin_theme') || 'light'; }
  function t(key) { return (DICT[getLang()] && DICT[getLang()][key]) || DICT.ua[key] || key; }
  function titleFor(page) { return (PAGE_TITLES[page] && PAGE_TITLES[page][getLang()]) || PAGE_TITLES.main.ua; }

  function applyTheme(theme) {
    localStorage.setItem('odin_theme', theme);
    document.body.dataset.theme = theme;
    document.body.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('light', theme !== 'dark');
  }

  function setLang(lang) {
    localStorage.setItem('odin_lang', lang);
    renderShell();
  }

  function renderShell() {
    const page = document.body.dataset.page || 'main';
    const existing = document.querySelector('[data-odin-content]');
    const contentHTML = existing ? existing.innerHTML : document.body.innerHTML;
    const lang = getLang();
    const theme = getTheme();

    document.body.innerHTML = `
      <div class="odin-shell-page">
        <header class="odin-topbar">
          <div class="odin-brand">
            <div class="odin-logo-mark">OD</div>
            <div class="odin-brand-lines">
              <div class="odin-brand-title">ODIN</div>
              <div class="odin-brand-subtitle">${t('interface')}</div>
              <div class="odin-page-title">${titleFor(page)}</div>
            </div>
          </div>
          <div class="odin-top-actions">
            <button class="odin-settings-btn" type="button" data-settings-toggle title="${t('settings')}">⚙</button>
            <div class="odin-settings-menu" data-settings-menu>
              <div class="odin-settings-title">${t('pages')}</div>
              <div class="odin-menu-group">
                ${NAV.map(item => `<a class="odin-menu-item" href="${item.href}">${item.label[lang] || item.label.ua}</a>`).join('')}
              </div>
              <div class="odin-settings-title">${t('theme')}</div>
              <div class="odin-menu-group">
                <button class="odin-menu-button" data-theme-btn="light">${t('light')}</button>
                <button class="odin-menu-button" data-theme-btn="dark">${t('dark')}</button>
              </div>
              <div class="odin-settings-title">${t('language')}</div>
              <div class="odin-lang-row">
                <button class="odin-menu-button odin-lang-btn ${lang === 'ua' ? 'active' : ''}" data-lang="ua">UA</button>
                <button class="odin-menu-button odin-lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
                <button class="odin-menu-button odin-lang-btn ${lang === 'de' ? 'active' : ''}" data-lang="de">DE</button>
              </div>
            </div>
          </div>
        </header>
        <div class="odin-layout">
          <aside class="odin-panel odin-left">
            <div class="odin-scroll">
              <div class="odin-nav-title">${t('nav')}</div>
              <nav class="odin-nav">
                ${NAV.map(item => `<a class="odin-nav-btn ${item.id === page ? 'active' : ''}" href="${item.href}">${item.label[lang] || item.label.ua}</a>`).join('')}
              </nav>
            </div>
          </aside>
          <main class="odin-panel odin-main">
            <div class="odin-scroll odin-content-slot" data-odin-content>${contentHTML}</div>
          </main>
          <aside class="odin-panel odin-right">
            <div class="odin-scroll">
              <div class="odin-card">
                <h3>${t('assistTitle')}</h3>
                <p class="odin-note">${t('assistText')}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>`;

    applyTheme(theme);
    bindShell();
  }

  function bindShell() {
    const menu = document.querySelector('[data-settings-menu]');
    const toggle = document.querySelector('[data-settings-toggle]');
    if (toggle && menu) {
      toggle.addEventListener('click', function (e) { e.stopPropagation(); menu.classList.toggle('open'); });
      document.addEventListener('click', function () { menu.classList.remove('open'); }, { once: true });
      menu.addEventListener('click', function (e) { e.stopPropagation(); });
    }
    document.querySelectorAll('[data-theme-btn]').forEach(btn => btn.addEventListener('click', () => applyTheme(btn.dataset.themeBtn)));
    document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
  }

  window.ODIN_GLOBAL_MATRIX = { renderShell, applyTheme, setLang };
  document.addEventListener('DOMContentLoaded', renderShell);
})();
