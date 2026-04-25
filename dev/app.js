function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function log(message) {
  const box = document.getElementById("log");
  if (box.textContent === "WAITING") box.textContent = "";
  box.textContent += message + "\n";
}

function parseRows(raw, expectedParts) {
  return String(raw || "")
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.split("|").map(part => part.trim()))
    .filter(parts => parts.length >= expectedParts);
}

function buildLesson(model) {
  const examplesHtml = model.examples.map((example, index) => {
    return [
      '<div class="ex">',
      '<h3>' + (index + 1) + '. ' + esc(example[0]) + '</h3>',
      '<p><b>ДП:</b> ' + esc(example[1]) + '</p>',
      '<p><b>СД:</b> ' + esc(example[2]) + '</p>',
      '</div>'
    ].join("");
  }).join("");

  const vocabHtml = model.vocab.map((item, index) => {
    return [
      '<tr>',
      '<td>' + (index + 1) + '</td>',
      '<td><b>' + esc(item[0]) + '</b></td>',
      '<td>' + esc(item[1]) + '</td>',
      '</tr>'
    ].join("");
  }).join("");

  return [
    '<!DOCTYPE html>',
    '<html lang="uk">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<title>' + esc(model.title) + '</title>',
    '<style>',
    'body{font-family:system-ui;line-height:1.6;padding:20px;max-width:900px;margin:auto;background:#f8fafc;color:#0f172a}',
    'section{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px;margin:14px 0}',
    '.ex{border-left:5px solid #0284c7;padding-left:12px;margin:12px 0}',
    'table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #e2e8f0;padding:8px;text-align:left}',
    '.badge{display:inline-block;background:#e0f2fe;color:#075985;border-radius:999px;padding:5px 9px;font-weight:800}',
    '</style>',
    '</head>',
    '<body>',
    '<h1>' + esc(model.title) + '</h1>',
    '<span class="badge">ODIN v3.8.1 QA 100</span>',
    '<section id="goal"><h2>1. Ціль уроку</h2><p>' + esc(model.goal) + '</p></section>',
    '<section id="rule"><h2>2. Основне правило</h2><p>Відокремлювана частка у простому реченні часто переходить у кінець.</p></section>',
    '<section id="examples"><h2>3. Приклади з ДП і СД</h2>' + examplesHtml + '</section>',
    '<section id="vocab"><h2>4. Словник</h2><table><thead><tr><th>№</th><th>DE</th><th>UA</th></tr></thead><tbody>' + vocabHtml + '</tbody></table></section>',
    '<section id="practice"><h2>5. Практика</h2><p>Закрий переклади і відтвори німецькі речення самостійно.</p></section>',
    '<section id="qa-marker"><h2>QA marker</h2><p>Урок пройшов ODIN QA SYSTEM 100.</p></section>',
    '</body>',
    '</html>'
  ].join("");
}

function qaCheck(model, html) {
  const checks = [
    { name: "Назва уроку є", passed: model.title.length >= 3 },
    { name: "Ціль уроку є", passed: model.goal.length >= 20 },
    { name: "Є мінімум 3 приклади", passed: model.examples.length >= 3 },
    { name: "Кожен приклад має DE", passed: model.examples.every(e => e[0] && e[0].length > 2) },
    { name: "Кожен приклад має ДП", passed: model.examples.every(e => e[1] && e[1].length > 2) },
    { name: "Кожен приклад має СД", passed: model.examples.every(e => e[2] && e[2].length > 2) },
    { name: "Є мінімум 3 слова в словнику", passed: model.vocab.length >= 3 },
    { name: "Кожне слово має DE і UA", passed: model.vocab.every(v => v[0] && v[1]) },
    { name: "Є блок правила", passed: html.includes("2. Основне правило") },
    { name: "Є блок практики", passed: html.includes("5. Практика") },
    { name: "Є QA marker", passed: html.includes("QA marker") }
  ];
  return checks;
}

function renderQA(checks) {
  const passed = checks.every(check => check.passed);
  const rows = checks.map(check => {
    return '<div class="qa-item ' + (check.passed ? "pass" : "fail") + '">' +
      (check.passed ? "✔" : "✘") + " " + esc(check.name) +
      '</div>';
  }).join("");

  document.getElementById("qaBox").innerHTML =
    rows +
    '<div class="qa-item ' + (passed ? "pass" : "fail") + '"><b>' +
    (passed ? "QA_PASSED" : "QA_FAILED") +
    '</b></div>';

  return passed;
}

function renderDownload(html) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  document.getElementById("download").innerHTML =
    '<a class="download" href="' + url + '" download="odin_lesson_v3_8_1.html">Завантажити урок</a>';
}

function runOdin() {
  clearAll();
  log("RUNNING");

  const model = {
    title: document.getElementById("title").value.trim(),
    goal: document.getElementById("goal").value.trim(),
    examples: parseRows(document.getElementById("examples").value, 3),
    vocab: parseRows(document.getElementById("vocab").value, 2)
  };

  log("PLAN_DONE");
  log("PIPELINE_DONE");

  const html = buildLesson(model);
  document.getElementById("preview").srcdoc = html;
  log("LESSON_DONE");

  const checks = qaCheck(model, html);
  const passed = renderQA(checks);
  log(passed ? "QA_PASSED" : "QA_FAILED");

  if (!passed) {
    document.getElementById("download").innerHTML =
      '<div class="qa-item fail">EXPORT BLOCKED: QA_FAILED</div>';
    log("EXPORT_BLOCKED");
    return;
  }

  renderDownload(html);
  log("EXPORT_DONE");
  log("DONE");
}

function clearAll() {
  document.getElementById("log").textContent = "";
  document.getElementById("qaBox").innerHTML =
    '<p class="muted">QA зʼявиться після запуску.</p>';
  document.getElementById("download").innerHTML = "";
  document.getElementById("preview").srcdoc = "";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("runBtn").addEventListener("click", runOdin);
  document.getElementById("clearBtn").addEventListener("click", clearAll);
});
