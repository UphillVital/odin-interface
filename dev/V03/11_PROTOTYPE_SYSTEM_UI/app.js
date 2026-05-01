const zones = {
  command: {
    title: 'Command Center',
    text: 'Головна зона керування: стан системи, активний режим, наступна дія, MASTER START.',
    next: 'Перевірити готовність продукту та запустити безпечний сценарій.'
  },
  map: {
    title: 'Live System Map',
    text: 'Жива карта системи: зв’язки, залежності, переходи у робочі зони.',
    next: 'Обрати модуль і перевірити його залежності.'
  },
  files: {
    title: 'File Workspace',
    text: 'Git-подібна зона: editor, changes, diff, approve/reject, history, package.',
    next: 'Відкрити зміни, переглянути diff і затвердити тільки безпечне.'
  },
  ois: {
    title: 'OIS Core',
    text: 'INPUT → INTENT → MODE → STATE → WORK ZONE → ACTION.',
    next: 'Перевірити, чи правильно визначено intent і mode.'
  },
  manual: {
    title: 'Manual / Help',
    text: 'Докладна інструкція користування ODIN Interface та можливостями системи.',
    next: 'Відкрити пояснення рівня або терміна, який незрозумілий.'
  }
};

const workZone = document.getElementById('workZone');
const statusLine = document.getElementById('statusLine');
const nextStep = () => document.getElementById('nextStep');

document.querySelectorAll('.tree-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tree-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const zone = zones[btn.dataset.zone];
    workZone.innerHTML = `
      <section class="zone-card hero-card">
        <span class="eyebrow">ACTIVE WORK ZONE</span>
        <h2>${zone.title}</h2>
        <p>${zone.text}</p>
        <div class="status-grid">
          <div><span>MODE</span><strong>CONTROL</strong></div>
          <div><span>STATE</span><strong>READY</strong></div>
          <div><span>ZONE</span><strong>${zone.title}</strong></div>
        </div>
      </section>
      <section class="zone-card">
        <h3>Next Safe Step</h3>
        <p id="nextStep">${zone.next}</p>
      </section>`;
    statusLine.textContent = `${zone.title.toUpperCase()} ACTIVE`;
  });
});

document.getElementById('themeToggle').addEventListener('click', () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
});

document.getElementById('masterStart').addEventListener('click', () => {
  const product = document.getElementById('productSelect').value;
  statusLine.textContent = `MASTER START PREPARED: ${product.toUpperCase()}`;
  alert(`ODIN MASTER START\nProduct: ${product}\nStatus: scenario preview prepared.\nNo fake execution in prototype.`);
});
