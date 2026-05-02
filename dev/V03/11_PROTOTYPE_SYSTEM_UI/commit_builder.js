const dict = {
  uk: {
    subtitle: 'Просунутий генератор фіксації змін', title: 'Commit Builder', description: 'Створює повний набір команд: add, commit, push, tag, push tag і запис для CHANGELOG.', stateNotice: 'Workflow state: перевір, що зміни затверджені перед фіксацією.', theme: 'Тема', version: 'Версія', changeName: 'Назва зміни', project: 'Активний проєкт', workflow: 'Workflow state', done: 'Що зроблено', benefit: 'Що це дає', context: 'Контекст', generate: 'Згенерувати', copyCommands: 'Копіювати команди', copyChangelog: 'Копіювати changelog', commandsTitle: 'Git-команди', changelogTitle: 'CHANGELOG', warning: 'Увага: workflow ще не Approved. Commit можна підготувати, але фіксацію краще робити після затвердження.'
  },
  en: {
    subtitle: 'Advanced change checkpoint generator', title: 'Commit Builder', description: 'Creates the full command set: add, commit, push, tag, push tag, and CHANGELOG entry.', stateNotice: 'Workflow state: verify changes are approved before locking the checkpoint.', theme: 'Theme', version: 'Version', changeName: 'Change name', project: 'Active project', workflow: 'Workflow state', done: 'What was done', benefit: 'What this gives', context: 'Context', generate: 'Generate', copyCommands: 'Copy commands', copyChangelog: 'Copy changelog', commandsTitle: 'Git commands', changelogTitle: 'CHANGELOG', warning: 'Warning: workflow is not Approved. You can prepare the commit, but lock it after approval.'
  },
  de: {
    subtitle: 'Erweiterter Generator für Änderungsfixierung', title: 'Commit Builder', description: 'Erstellt den kompletten Befehlssatz: add, commit, push, tag, push tag und CHANGELOG-Eintrag.', stateNotice: 'Workflow-Status: Prüfe, ob Änderungen vor der Fixierung genehmigt sind.', theme: 'Theme', version: 'Version', changeName: 'Änderungsname', project: 'Aktives Projekt', workflow: 'Workflow-Status', done: 'Was gemacht wurde', benefit: 'Was es bringt', context: 'Kontext', generate: 'Generieren', copyCommands: 'Befehle kopieren', copyChangelog: 'Changelog kopieren', commandsTitle: 'Git-Befehle', changelogTitle: 'CHANGELOG', warning: 'Achtung: Workflow ist noch nicht Approved. Commit kann vorbereitet werden, aber Fixierung besser nach Genehmigung.'
  }
};

const $ = (id) => document.getElementById(id);
let lang = localStorage.getItem('odin_lang') || 'uk';
let theme = localStorage.getItem('odin_theme') || 'light';

function slugify(text) {
  return text.toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'CHECKPOINT';
}
function lines(text) { return text.split('\n').map(s => s.trim()).filter(Boolean); }
function bulletBlock(items) { return items.map(i => `- ${i}`).join('\n'); }
function versionRaw() { return $('version').value.trim() || 'V03.23'; }
function versionTag() { return versionRaw().replace(/^V/i, 'V'); }

function generate() {
  const version = versionRaw();
  const name = $('changeName').value.trim() || 'Контрольна точка ODIN';
  const project = $('project').value.trim() || 'ODIN V03 Core';
  const state = $('workflow').value;
  const done = lines($('done').value);
  const benefit = lines($('benefit').value);
  const context = lines($('context').value);
  const tag = `${versionTag()}-${slugify(name)}`;
  const warning = state !== 'Approved' ? `# ${dict[lang].warning}\n` : '';

  const commitMessage = `ODIN ${version} — ${name}.\n\n✔ Що зроблено:\n${bulletBlock(done)}\n\n✔ Що це дає:\n${bulletBlock(benefit)}\n\n✔ Контекст:\n${bulletBlock([...context, `Активний проєкт: ${project}`, `Workflow state: ${state}`])}`;

  const commands = `${warning}git add dev/V03/\ngit commit -m "${commitMessage.replaceAll('"', '\\"')}"\ngit push origin feature/odin-interface-v03\ngit tag -a ${tag} -m "ODIN ${version} — ${name}"\ngit push origin ${tag}`;

  const changelog = `## ODIN ${version} — ${name}\n\n✔ Що зроблено:\n${bulletBlock(done)}\n\n✔ Що це дає:\n${bulletBlock(benefit)}\n\n✔ Контекст:\n${bulletBlock([...context, `Активний проєкт: ${project}`, `Workflow state: ${state}`])}`;

  $('commands').textContent = commands;
  $('changelog').textContent = changelog;
}

function applyLang() {
  localStorage.setItem('odin_lang', lang);
  document.documentElement.lang = lang === 'uk' ? 'uk' : lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[lang][key]) el.textContent = dict[lang][key];
  });
  generate();
}
function applyTheme() {
  document.body.dataset.theme = theme;
  localStorage.setItem('odin_theme', theme);
}
async function copyText(id) {
  const text = $(id).textContent;
  if (!text) return;
  await navigator.clipboard.writeText(text);
}

$('lang').value = lang;
$('lang').addEventListener('change', e => { lang = e.target.value; applyLang(); });
$('themeBtn').addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; applyTheme(); });
$('generate').addEventListener('click', generate);
$('copyCommands').addEventListener('click', () => copyText('commands'));
$('copyChangelog').addEventListener('click', () => copyText('changelog'));
['version','changeName','project','workflow','done','benefit','context'].forEach(id => $(id).addEventListener('input', generate));
$('workflow').addEventListener('change', generate);
applyTheme();
applyLang();
