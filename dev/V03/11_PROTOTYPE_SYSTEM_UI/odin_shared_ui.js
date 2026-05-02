// ODIN shared UI shell — спільна логіка Quick Settings, тем і мов для службових сторінок V03.
const ODIN_UI_I18N = {
  ua: {
    nav:'Навігація', assistant:'Асистент ODIN', settings:'Швидкі налаштування', theme:'Тема', language:'Мова', light:'Світла', dark:'Темна',
    stateWorkspace:'State Workspace', commitBuilder:'Commit Builder', currentState:'Поточний стан', stable:'Стабільний', openMain:'Головний інтерфейс',
    commitIntro:'Генерує Git-команди, tag і запис CHANGELOG за стандартом ODIN.', stateIntro:'Показує стани системи, checkpoint-и та безпечні restore-команди.',
    version:'Версія', title:'Назва', done:'Що зроблено', value:'Що це дає', context:'Контекст', generate:'Згенерувати', copy:'Копіювати',
    commands:'Команди Git', changelog:'Запис CHANGELOG', tag:'Tag', stateHistory:'Історія станів', details:'Деталі стану', restore:'Restore-команди', compare:'Порівняння',
    helpCommit:'Заповни поля після перевірки змін. ODIN не виконує Git автоматично — лише готує команди.', helpState:'Стан = осмислена контрольна точка: tag + changelog + registry + пояснення.'
  },
  en: {
    nav:'Navigation', assistant:'ODIN Assistant', settings:'Quick Settings', theme:'Theme', language:'Language', light:'Light', dark:'Dark',
    stateWorkspace:'State Workspace', commitBuilder:'Commit Builder', currentState:'Current State', stable:'Stable', openMain:'Main Interface',
    commitIntro:'Generates Git commands, tag and CHANGELOG entry using ODIN standard.', stateIntro:'Shows system states, checkpoints and safe restore commands.',
    version:'Version', title:'Title', done:'What was done', value:'Value', context:'Context', generate:'Generate', copy:'Copy',
    commands:'Git Commands', changelog:'CHANGELOG Entry', tag:'Tag', stateHistory:'State History', details:'State Details', restore:'Restore Commands', compare:'Compare',
    helpCommit:'Fill fields after review. ODIN does not run Git automatically — it only prepares commands.', helpState:'State = meaningful checkpoint: tag + changelog + registry + explanation.'
  },
  de: {
    nav:'Navigation', assistant:'ODIN Assistent', settings:'Schnelleinstellungen', theme:'Theme', language:'Sprache', light:'Hell', dark:'Dunkel',
    stateWorkspace:'State Workspace', commitBuilder:'Commit Builder', currentState:'Aktueller Zustand', stable:'Stabil', openMain:'Hauptinterface',
    commitIntro:'Erzeugt Git-Befehle, Tag und CHANGELOG-Eintrag nach ODIN-Standard.', stateIntro:'Zeigt Systemzustände, Checkpoints und sichere Restore-Befehle.',
    version:'Version', title:'Titel', done:'Was gemacht wurde', value:'Wert', context:'Kontext', generate:'Generieren', copy:'Kopieren',
    commands:'Git-Befehle', changelog:'CHANGELOG-Eintrag', tag:'Tag', stateHistory:'State History', details:'State Details', restore:'Restore-Befehle', compare:'Vergleich',
    helpCommit:'Fülle die Felder nach der Prüfung aus. ODIN führt Git nicht automatisch aus — es bereitet nur Befehle vor.', helpState:'State = sinnvoller Checkpoint: Tag + Changelog + Registry + Erklärung.'
  }
};
function odinGetLang(){return localStorage.getItem('odin.lang')||'ua'}
function odinGetTheme(){return localStorage.getItem('odin.theme')||'light'}
function odinT(key){return (ODIN_UI_I18N[odinGetLang()]||ODIN_UI_I18N.ua)[key]||key}
function odinApplyI18n(){document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=odinT(el.dataset.i18n)});document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{el.placeholder=odinT(el.dataset.i18nPlaceholder)});document.querySelectorAll('[data-help-key]').forEach(el=>{el.setAttribute('data-help',odinT(el.dataset.helpKey))});document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===odinGetLang()));}
function odinApplyTheme(){document.documentElement.setAttribute('data-theme',odinGetTheme());document.querySelectorAll('[data-theme-btn]').forEach(b=>b.classList.toggle('active',b.dataset.themeBtn===odinGetTheme()))}
function odinSetLang(lang){localStorage.setItem('odin.lang',lang);odinApplyI18n();if(window.renderPage)window.renderPage()}
function odinSetTheme(theme){localStorage.setItem('odin.theme',theme);odinApplyTheme()}
function odinInitShell(){odinApplyTheme();odinApplyI18n();const btn=document.getElementById('odinSettingsBtn');const menu=document.getElementById('odinSettingsMenu');if(btn&&menu){btn.addEventListener('click',e=>{e.stopPropagation();menu.classList.toggle('open')});document.addEventListener('click',e=>{if(!menu.contains(e.target)&&e.target!==btn)menu.classList.remove('open')})}document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>odinSetLang(b.dataset.lang)));document.querySelectorAll('[data-theme-btn]').forEach(b=>b.addEventListener('click',()=>odinSetTheme(b.dataset.themeBtn)));}
document.addEventListener('DOMContentLoaded',odinInitShell);
function odinCopy(id){const el=document.getElementById(id);if(!el)return;navigator.clipboard?.writeText(el.textContent||el.value||'')}
