let showDP = true;
let showSD = true;
let lessonCreated = false;

function log(message) {
  const box = document.getElementById("log");
  if (box.textContent === "WAITING") box.textContent = "";
  box.textContent += message + "\n";
}

function buildLessonHtml() {
  return [
    '<!DOCTYPE html>',
    '<html lang="uk">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<style>',
    'body{font-family:system-ui;line-height:1.6;padding:20px;color:#0f172a;background:#f8fafc}',
    '.card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:16px;margin:14px 0}',
    '.de{font-size:20px;font-weight:900;color:#0f172a}',
    '.dp{color:#475569}',
    '.sd{color:#111827}',
    '.tag{display:inline-block;background:#e0f2fe;color:#075985;border-radius:999px;padding:5px 9px;font-weight:800}',
    '</style>',
    '</head>',
    '<body>',
    '<h1>Тестовий урок ODIN v3.9.1</h1>',
    '<span class="tag">UI CONTROL</span>',
    '<div class="card">',
    '<p class="de">Ich stehe um sechs Uhr auf.</p>',
    '<p class="dp"><b>ДП:</b> Я встаю о шостій годині вгору.</p>',
    '<p class="sd"><b>СД:</b> Я встаю о шостій годині.</p>',
    '</div>',
    '<div class="card">',
    '<p class="de">Mach bitte die Tür zu!</p>',
    '<p class="dp"><b>ДП:</b> Зроби будь ласка двері до!</p>',
    '<p class="sd"><b>СД:</b> Закрий, будь ласка, двері!</p>',
    '</div>',
    '<div class="card">',
    '<p class="de">Wir kaufen heute ein.</p>',
    '<p class="dp"><b>ДП:</b> Ми купуємо сьогодні всередину.</p>',
    '<p class="sd"><b>СД:</b> Ми сьогодні закуповуємось.</p>',
    '</div>',
    '</body>',
    '</html>'
  ].join("");
}

function createLesson() {
  log("RUNNING");
  const frame = document.getElementById("preview");
  frame.srcdoc = buildLessonHtml();
  lessonCreated = true;
  log("LESSON_CREATED");
  applyMode();
  log("UI_READY");
}

function getPreviewDocument() {
  const frame = document.getElementById("preview");
  return frame.contentDocument || frame.contentWindow.document;
}

function applyMode() {
  if (!lessonCreated) {
    log("INFO: спочатку натисни 'Створити урок'");
    return;
  }

  const doc = getPreviewDocument();
  if (!doc) {
    log("ERROR: preview document not available");
    return;
  }

  doc.querySelectorAll(".dp").forEach(el => {
    el.style.display = showDP ? "block" : "none";
  });

  doc.querySelectorAll(".sd").forEach(el => {
    el.style.display = showSD ? "block" : "none";
  });
}

function toggleDP() {
  showDP = !showDP;
  applyMode();
  log(showDP ? "DP_VISIBLE" : "DP_HIDDEN");
}

function toggleSD() {
  showSD = !showSD;
  applyMode();
  log(showSD ? "SD_VISIBLE" : "SD_HIDDEN");
}

function modeDE() {
  showDP = false;
  showSD = false;
  applyMode();
  log("MODE_ONLY_DE");
}

function modeFull() {
  showDP = true;
  showSD = true;
  applyMode();
  log("MODE_FULL");
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("createLessonBtn").addEventListener("click", createLesson);
  document.getElementById("toggleDpBtn").addEventListener("click", toggleDP);
  document.getElementById("toggleSdBtn").addEventListener("click", toggleSD);
  document.getElementById("modeDeBtn").addEventListener("click", modeDE);
  document.getElementById("modeFullBtn").addEventListener("click", modeFull);
});
