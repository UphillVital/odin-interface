const ODIN_STORAGE_KEY = "odin_lessons_v3_19_standard_engine";

let ODIN_STATE = {
  lessonCreated:false,
  lastHtml:"",
  lastModel:null,
  lastQa:null
};

function esc(value){
  return String(value??"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
function getValue(id){return document.getElementById(id).value.trim();}
function log(message){const box=document.getElementById("log");if(box.textContent==="WAITING")box.textContent="";box.textContent+=message+"\n";}
function dataLog(message){const box=document.getElementById("dataLog");if(box.textContent==="DATA_WAITING")box.textContent="";box.textContent+=message+"\n";}
function parseRows(raw,parts){return String(raw||"").split(/\n+/).map(l=>l.trim()).filter(Boolean).map(l=>l.split("|").map(p=>p.trim())).filter(p=>p.length>=parts);}
function collectInput(){return{title:getValue("title"),topic:getValue("topic")||"general",level:getValue("level")||"A1",goal:getValue("goal"),examples:parseRows(getValue("examples"),3),vocab:parseRows(getValue("vocab"),2)};}

const STANDARD_VERSION = "DT_LESSON_STANDARD_v1";
const STANDARD_STACK = [
  "HIGHLIGHT_STANDARD_CORE_v1",
  "LESSON_TEMPLATE_STANDARD_v1",
  "LANGUAGE_MARKUP_STANDARD_v1",
  "QA_STANDARD_v1"
];

const VERB_LEMMAS = {
  "stehe":"aufstehen","mach":"zumachen","kaufen":"einkaufen","ruf":"anrufen","räume":"aufräumen",
  "bin":"sein","gehe":"gehen","gehen":"gehen","ist":"sein","sind":"sein"
};
const PREFIXES = ["auf","zu","ein","an"];
const SUBJECTS = ["ich","du","er","sie","es","wir","ihr"];
const ARTICLES = ["der","die","das","dem","den","ein","eine","einen","einem"];
const PREPOSITIONS = ["in","an","auf","neben","zwischen","vor","hinter","über","unter","bei","zu","zum","zur","im","am","beim"];

function normalizeWord(word){return String(word||"").replace(/[.,!?;:]/g,"").toLowerCase();}
function cleanTts(text){return String(text||"").replace(/<[^>]+>/g,"").trim();}
function getPos(word){
  const w=normalizeWord(word);
  if(SUBJECTS.includes(w)) return "pronoun";
  if(VERB_LEMMAS[w]) return "verb";
  if(PREFIXES.includes(w)) return "verb-prefix";
  if(ARTICLES.includes(w)) return "article";
  if(PREPOSITIONS.includes(w)) return "preposition";
  if(/^[A-ZÄÖÜ]/.test(word)) return "noun";
  return "unknown";
}
function renderLmWord(word, sentenceMeta){
  const clean=normalizeWord(word);
  const pos=getPos(word);
  let cls="lm-word";
  let attrs=`data-lemma="${esc(clean)}" data-pos="${esc(pos)}"`;

  if(pos==="pronoun"){
    cls += " lm-pronoun";
    attrs += ` data-person="${clean==="ich"?"1":clean==="du"?"2":"3"}" data-number="${["wir","ihr"].includes(clean)?"plural":"singular"}" data-case="nominative"`;
  } else if(pos==="verb"){
    cls += " lm-verb";
    const lemma=VERB_LEMMAS[clean] || clean;
    let type = ["bin","ist","sind"].includes(clean) ? "auxiliary" : PREFIXES.some(p => lemma.startsWith(p)) ? "separable" : "simple";
    attrs = `data-lemma="${esc(lemma)}" data-pos="verb" data-verb-type="${type}" data-tense="present" data-person="unknown" data-number="unknown"`;
    if(type==="separable") cls += " lm-separable";
  } else if(pos==="verb-prefix"){
    cls += " lm-prefix hl-topic";
    attrs = `data-lemma="${esc(clean)}" data-pos="verb-prefix" data-prefix="${esc(clean)}" data-role="topic"`;
  } else if(pos==="article"){
    cls += " lm-article";
    const caseGuess = ["dem","der"].includes(clean) ? "dativ" : ["die","den"].includes(clean) ? "akkusativ" : "unknown";
    attrs += ` data-article-type="definite" data-gender="unknown" data-number="unknown" data-case="${caseGuess}"`;
  } else if(pos==="preposition"){
    const role = sentenceMeta.role || "unknown";
    const question = sentenceMeta.question || "unknown";
    const gov = question==="wo" ? "dativ" : question==="wohin" ? "akkusativ" : "unknown";
    cls += ` lm-preposition ${role==="place"?"hl-place":role==="movement"?"hl-move":"hl-topic"}`;
    attrs += ` data-role="${role}" data-question="${question}" data-governs-case="${gov}"`;
  } else if(pos==="noun"){
    cls += " lm-noun";
    attrs += ` data-gender="unknown" data-number="singular" data-case="${sentenceMeta.caseName||"unknown"}"`;
  } else {
    cls += " lm-unknown";
  }

  return `<span class="${cls}" ${attrs}>${esc(word)}</span>`;
}
function inferSentenceMeta(sentence){
  const s = sentence.toLowerCase();
  const movement = /\b(gehe|gehen|fahre|fahren|laufe|laufen|komm|komme|kommt|ruf|mach)\b/.test(s);
  const place = /\b(bin|ist|sind|sitzt|steht|wartet|warten)\b/.test(s) && !movement;
  return {
    role: movement ? "movement" : place ? "place" : "topic",
    question: movement ? "wohin" : place ? "wo" : "unknown",
    caseName: movement ? "akkusativ" : place ? "dativ" : "unknown"
  };
}
function renderMarkedGerman(sentence, model, index){
  const meta = inferSentenceMeta(sentence);
  const parts = String(sentence||"").split(/(\s+)/);
  const html = parts.map(part => {
    if(/^\s+$/.test(part)) return part;
    const punctMatch = part.match(/^(.+?)([.,!?;:]*)$/);
    const word = punctMatch ? punctMatch[1] : part;
    const punct = punctMatch ? punctMatch[2] : "";
    return renderLmWord(word, meta) + esc(punct);
  }).join("");

  return `<div class="de" data-sentence-id="${esc(model.topic)}-S${index+1}" data-topic="${esc(model.topic)}" data-level="${esc(model.level)}" data-grammar="${esc(meta.role)},${esc(meta.question)},${esc(meta.caseName)}">${html}<button class="audio-mini" data-tts="${esc(cleanTts(sentence))}">🔊</button></div>`;
}
function lessonCss(){
  return `
:root{--bg:#f6f7f9;--card:#ffffff;--text:#1f2937;--muted:#4b5563;--line:#e5e7eb;--accent:#1f4b99;--accent-soft:#eef4ff;--shadow:0 6px 20px rgba(17,24,39,.06);--header-h:64px;--radius:18px;--audio:#0f766e;--audio-soft:#ecfeff}
*{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;font-family:Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.6} [id]{scroll-margin-top:84px}
.topbar{position:sticky;top:0;z-index:100;height:var(--header-h);background:rgba(246,247,249,.97);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.topbar-inner{max-width:1080px;margin:0 auto;height:100%;padding:0 14px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px}
.brand{font-size:12px;color:var(--muted);font-weight:700;letter-spacing:.08em;text-transform:uppercase}.center-actions{display:flex;gap:8px;align-items:center;justify-self:center;flex-wrap:wrap;justify-content:center}
.btn{appearance:none;border:1px solid var(--line);background:#fff;color:var(--text);border-radius:999px;padding:0;font-size:13px;font-weight:700;cursor:pointer;box-shadow:var(--shadow);width:42px;height:42px;display:inline-flex;align-items:center;justify-content:center}.btn.is-off{background:#f1f2f4;color:#6b7280;border-color:#d1d5db}
.wrap{max-width:1080px;margin:18px auto 36px;padding:0 14px}.hero,.card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px;margin-bottom:14px;box-shadow:var(--shadow)}.hero{text-align:center}
h1,h2,h3{margin:0 0 10px}h1{font-size:30px;line-height:1.15}h2{font-size:22px}.section-head{display:flex;align-items:center;gap:12px;margin-bottom:12px}.sec-num{display:inline-flex;align-items:center;justify-content:center;min-width:38px;height:38px;padding:0 10px;border-radius:999px;background:var(--accent-soft);border:1px solid #dbe7ff;color:var(--accent);font-weight:800;font-size:16px;box-shadow:var(--shadow)}
.grid,.vocab-columns{display:grid;gap:12px}.grid.two-col{grid-template-columns:repeat(auto-fit,minmax(360px,1fr))}.grid.three-col,.vocab-columns{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
.subcard{background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px}.tag{display:inline-block;padding:4px 8px;border-radius:999px;background:var(--accent-soft);color:var(--accent);font-size:14px;font-weight:700;margin-bottom:8px}
.sentence,.example,.dialog-row,.vocab-line{border-top:1px solid var(--line);padding:10px 0}.sentence:first-child,.example:first-child,.dialog-row:first-child,.vocab-line:first-child{border-top:none;padding-top:0}
.de{font-weight:800;font-size:19px;display:flex;gap:6px;align-items:flex-start;flex-wrap:wrap}.literal{display:none;font-size:15px;font-style:italic;margin-top:4px;color:#6b7280}body.show-literal .literal{display:block}.translation{color:var(--muted);margin-top:4px;font-size:17px}
.audio-mini{appearance:none;border:1px solid #bfe7e5;background:var(--audio-soft);color:var(--audio);border-radius:999px;width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:var(--shadow);flex:0 0 auto}
.hl-topic,.hl-case,.hl-move,.hl-place{border-radius:6px;padding:0 4px}body[data-hl-mode="off"] .hl-topic,body[data-hl-mode="off"] .hl-case,body[data-hl-mode="off"] .hl-move,body[data-hl-mode="off"] .hl-place{background:transparent;color:inherit;box-shadow:none}
body[data-hl-mode="theme"] .hl-topic,body[data-hl-mode="all"] .hl-topic{background:#fff7ed;color:#92400e}body[data-hl-mode="all"] .hl-case{background:#eef2ff;color:#4338ca}body[data-hl-mode="all"] .hl-move{background:#fee2e2;color:#b91c1c}body[data-hl-mode="all"] .hl-place{background:#ecfeff;color:#0f766e}
body[data-hl-mode="theme"] .hl-case,body[data-hl-mode="theme"] .hl-move,body[data-hl-mode="theme"] .hl-place{background:transparent;color:inherit;box-shadow:none}
[data-lang-block]{display:none}body[data-lang="ua"] [data-lang-block="ua"]{display:block}body[data-lang="ru"] [data-lang-block="ru"]{display:block}.inline-lang{display:none}body[data-lang="ua"] .inline-lang.ua{display:inline}body[data-lang="ru"] .inline-lang.ru{display:inline}
.modal{position:fixed;inset:0;background:rgba(15,23,42,.34);display:none;align-items:center;justify-content:center;z-index:120;padding:18px}.modal.open{display:flex}.panel-modal{width:min(360px,88vw);max-height:72vh;background:#fff;border:1px solid var(--line);border-radius:22px;box-shadow:0 20px 60px rgba(15,23,42,.18);overflow:hidden;display:flex;flex-direction:column}.panel-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--line)}.nav-list{padding:8px 14px 14px;overflow:auto}.nav-item{display:block;text-decoration:none;color:var(--text);border-top:1px solid var(--line);padding:10px 0;font-size:15px}.nav-item:first-child{border-top:none}.close-btn{appearance:none;border:1px solid var(--line);background:#fff;border-radius:999px;width:34px;height:34px;cursor:pointer}
.footer-note{color:var(--muted);font-size:15px;text-align:center;padding:4px 0 24px}

body[data-hl-mode="all"] .lm-word{border-radius:6px;padding:0 4px}
body[data-hl-mode="all"] .lm-verb{background:#dcfce7!important;color:#166534!important}
body[data-hl-mode="all"] .lm-prefix{background:#fff7ed!important;color:#92400e!important}
body[data-hl-mode="all"] .lm-pronoun{background:#dbeafe!important;color:#1d4ed8!important}
body[data-hl-mode="all"] .lm-noun{background:#f3e8ff!important;color:#7e22ce!important}
body[data-hl-mode="all"] .lm-preposition{background:#fee2e2!important;color:#b91c1c!important}
body[data-hl-mode="all"] .lm-article{background:#eef2ff!important;color:#4338ca!important}
body[data-hl-mode="all"] .lm-unknown{background:#f1f5f9!important;color:#334155!important}

@media(max-width:640px){:root{--header-h:60px}h1{font-size:25px}.grid.two-col,.grid.three-col,.vocab-columns{grid-template-columns:1fr}}
`;
}
function lessonJs(){
  return `<script>
const body=document.body;
const literalToggle=document.getElementById('literalToggle');
const glowToggle=document.getElementById('glowToggle');
const homeBtn=document.getElementById('homeBtn');
const langToggle=document.getElementById('langToggle');
const menuBtn=document.getElementById('menuBtn');
const navModal=document.getElementById('navModal');
const closeNav=document.getElementById('closeNav');
literalToggle.addEventListener('click',()=>{body.classList.toggle('show-literal');literalToggle.classList.toggle('is-off',!body.classList.contains('show-literal'));});
function updateGlow(){const m=body.dataset.hlMode;glowToggle.textContent=m==='off'?'💡0':(m==='theme'?'💡1':'💡2');glowToggle.title='Підсвітка / Подсветка: '+m;glowToggle.classList.toggle('is-off',m==='off');}
glowToggle.addEventListener('click',()=>{const m=body.dataset.hlMode;body.dataset.hlMode=m==='off'?'theme':(m==='theme'?'all':'off');updateGlow();});
updateGlow();
homeBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
langToggle.addEventListener('click',()=>{body.dataset.lang=body.dataset.lang==='ua'?'ru':'ua';langToggle.textContent=body.dataset.lang.toUpperCase();});
menuBtn.addEventListener('click',()=>navModal.classList.add('open'));
closeNav.addEventListener('click',()=>navModal.classList.remove('open'));
navModal.addEventListener('click',e=>{if(e.target===navModal)navModal.classList.remove('open')});
document.querySelectorAll('.nav-item').forEach(a=>a.addEventListener('click',(e)=>{e.preventDefault();const target=document.querySelector(a.getAttribute('href'));navModal.classList.remove('open');if(target)target.scrollIntoView({behavior:'smooth',block:'start'});}));
function speak(text){if(!('speechSynthesis' in window)){alert('Озвучка не підтримується.');return;}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='de-DE';u.rate=0.95;window.speechSynthesis.speak(u);}
document.querySelectorAll('[data-tts]').forEach(btn=>btn.addEventListener('click',()=>speak(btn.getAttribute('data-tts'))));
window.DT_STANDARD_LESSON_READY = true;
</script>`;
}


function autoRuVocab(text){
  const map = {
    "вставати":"вставать",
    "закривати":"закрывать",
    "закуповуватись":"закупаться",
    "телефонувати":"звонить",
    "прибирати":"убирать"
  };
  return map[text] || text;
}

function autoRu(text){
  const map = {
    "Я встаю о шостій годині вгору.":"Я встаю в шесть часов вверх.",
    "Я встаю о шостій годині.":"Я встаю в шесть часов.",
    "Зроби будь ласка двері до!":"Сделай пожалуйста дверь до!",
    "Закрий, будь ласка, двері!":"Закрой, пожалуйста, дверь!",
    "Ми купуємо сьогодні в супермаркеті всередину.":"Мы покупаем сегодня в супермаркете внутрь.",
    "Ми сьогодні закуповуємось у супермаркеті.":"Мы сегодня закупаемся в супермаркете.",
    "Подзвони мене будь ласка пізніше на.":"Позвони меня пожалуйста позже на.",
    "Подзвони мені, будь ласка, пізніше.":"Позвони мне, пожалуйста, позже.",
    "Я прибираю мою кімнату вгору.":"Я убираю мою комнату вверх.",
    "Я прибираю свою кімнату.":"Я убираю свою комнату."
  };
  return map[text] || text;
}

function buildStandardLesson(model){
  const examplesHtml = model.examples.map((e,i)=>`
    <div class="sentence">
      ${renderMarkedGerman(e[0], model, i)}
      <div class="literal"><span class="inline-lang ua">Дослівно: ${esc(e[1])}</span><span class="inline-lang ru">Дословно: ${esc(autoRu(e[1]))}</span></div>
      <div class="translation"><span class="inline-lang ua">${esc(e[2])}</span><span class="inline-lang ru">${esc(autoRu(e[2]))}</span></div>
    </div>`).join("");

  const vocabHtml = model.vocab.map((v,i)=>`
    <div class="vocab-line">
      <span class="vocab-word lm-word lm-vocab" data-lemma="${esc(normalizeWord(v[0]))}" data-pos="unknown">${esc(v[0])}</span> —
      <span class="inline-lang ua">${esc(v[1])}</span><span class="inline-lang ru">${esc(autoRuVocab(v[1]))}</span>
      <button class="audio-mini" data-tts="${esc(v[0])}">🔊</button>
    </div>`).join("");

  const nav = [
    ["top","0. Тема","0. Тема"],
    ["summary","1. Суть теми","1. Суть темы"],
    ["text","2. Основні приклади","2. Основные примеры"],
    ["analysis","3. Розбір","3. Разбор"],
    ["rule","4. Правило","4. Правило"],
    ["map","5. Карта","5. Карта"],
    ["vocab","6. Словник","6. Словарь"],
    ["drill","7. Мікродрил","7. Микродрилл"],
    ["after","8. Після уроку","8. После урока"],
    ["homework","9. Домашнє завдання","9. Домашнее задание"]
  ].map(x=>`<a class="nav-item" href="#${x[0]}"><span class="inline-lang ua">${x[1]}</span><span class="inline-lang ru">${x[2]}</span></a>`).join("");

  return `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(model.title)}</title>
<style>${lessonCss()}</style>
</head>
<body class="show-literal" data-hl-mode="off" data-lang="ua">
<header class="topbar"><div class="topbar-inner"><div class="brand">${STANDARD_VERSION} · ${esc(model.level)}</div><div class="center-actions"><button class="btn" id="homeBtn" title="Додому">🏠</button><button class="btn" id="menuBtn" title="Меню">☰</button><button class="btn is-off" id="glowToggle" title="Підсвітка">💡</button><button class="btn" id="literalToggle" title="Дослівний">+</button><button class="btn" id="langToggle" title="UA/RU">UA</button></div><div></div></div></header>
<div class="modal" id="navModal"><div class="panel-modal"><div class="panel-head"><b><span class="inline-lang ua">Розділи уроку</span><span class="inline-lang ru">Разделы урока</span></b><button class="close-btn" id="closeNav">✕</button></div><div class="nav-list">${nav}</div></div></div>
<main class="wrap" data-course="${esc(model.level)}" data-lesson-id="${esc(model.topic)}_${Date.now()}" data-lesson-topic="${esc(model.topic)}" data-lesson-version="v3.19">
<section class="hero" id="top"><div style="font-size:12px;color:#1f4b99;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px;"><span class="inline-lang ua">ODIN / DT STANDARD LESSON</span><span class="inline-lang ru">ODIN / DT УРОК-СТАНДАРТ</span></div><h1>${esc(model.title)}</h1><div style="font-size:18px;color:#0f5132;font-weight:700;margin-bottom:10px;">${esc(model.level)} · ${esc(model.topic)}</div><p style="max-width:860px;margin:0 auto;">${esc(model.goal)}</p></section>
<section class="card" id="summary"><div class="section-head"><span class="sec-num">1</span><h2><span class="inline-lang ua">Суть теми</span><span class="inline-lang ru">Суть темы</span></h2></div><div class="grid two-col"><div class="subcard"><div class="tag"><span class="inline-lang ua">Що вивчаємо</span><span class="inline-lang ru">Что изучаем</span></div><p>${esc(model.goal)}</p></div><div class="subcard"><div class="tag"><span class="inline-lang ua">Стандарт</span><span class="inline-lang ru">Стандарт</span></div><p><span class="inline-lang ua">Урок створено за ${STANDARD_VERSION}: Template + Highlight + Markup + Audio + QA + Standalone.</span><span class="inline-lang ru">Урок создан по ${STANDARD_VERSION}: Template + Highlight + Markup + Audio + QA + Standalone.</span></p></div></div></section>
<section class="card" id="text"><div class="section-head"><span class="sec-num">2</span><h2><span class="inline-lang ua">Основні приклади</span><span class="inline-lang ru">Основные примеры</span></h2></div>${examplesHtml}</section>
<section class="card" id="analysis"><div class="section-head"><span class="sec-num">3</span><h2><span class="inline-lang ua">Розбір і значення</span><span class="inline-lang ru">Разбор и значение</span></h2></div><div class="subcard"><p><span class="inline-lang ua">Кожне німецьке речення має language markup: <b>lm-word</b>, <b>data-lemma</b>, <b>data-pos</b>. Підсвітка керується через <b>body[data-hl-mode]</b>.</span><span class="inline-lang ru">Каждое немецкое предложение имеет language markup: <b>lm-word</b>, <b>data-lemma</b>, <b>data-pos</b>. Подсветка управляется через <b>body[data-hl-mode]</b>.</span></p></div></section>
<section class="card" id="rule"><div class="section-head"><span class="sec-num">4</span><h2><span class="inline-lang ua">Правило</span><span class="inline-lang ru">Правило</span></h2></div><div class="subcard"><p><span class="inline-lang ua">Тема уроку позначена в німецьких прикладах. У режимі ALL система показує додаткові граматичні ролі.</span><span class="inline-lang ru">Тема урока отмечена в немецких примерах. В режиме ALL система показывает дополнительные грамматические роли.</span></p></div></section>
<section class="card" id="map"><div class="section-head"><span class="sec-num">5</span><h2><span class="inline-lang ua">Швидка карта</span><span class="inline-lang ru">Быстрая карта</span></h2></div><div class="subcard"><ul class="clean"><li><span class="inline-lang ua">OFF — чисте читання</span><span class="inline-lang ru">OFF — чистое чтение</span></li><li><span class="inline-lang ua">THEME — тема уроку</span><span class="inline-lang ru">THEME — тема урока</span></li><li><span class="inline-lang ua">ALL — всі позначені правила</span><span class="inline-lang ru">ALL — все отмеченные правила</span></li></ul></div></section>
<section class="card" id="vocab"><div class="section-head"><span class="sec-num">6</span><h2><span class="inline-lang ua">Словник</span><span class="inline-lang ru">Словарь</span></h2></div><div class="vocab-columns"><div class="subcard">${vocabHtml}</div></div></section>
<section class="card" id="drill"><div class="section-head"><span class="sec-num">7</span><h2><span class="inline-lang ua">Мікродрил</span><span class="inline-lang ru">Микродрилл</span></h2></div><div class="subcard"><ol class="clean">${model.examples.slice(0,5).map(e=>`<li>${esc(e[0])}</li>`).join("")}</ol></div></section>
<section class="card" id="after"><div class="section-head"><span class="sec-num">8</span><h2><span class="inline-lang ua">Після уроку ти маєш зрозуміти</span><span class="inline-lang ru">После урока ты должен понять</span></h2></div><div class="subcard"><p><span class="inline-lang ua">Тему, ключові слова, граматичні ролі і базові речення.</span><span class="inline-lang ru">Тему, ключевые слова, грамматические роли и базовые предложения.</span></p></div></section>
<section class="card" id="homework"><div class="section-head"><span class="sec-num">9</span><h2><span class="inline-lang ua">Домашнє завдання</span><span class="inline-lang ru">Домашнее задание</span></h2></div><div class="subcard"><p><span class="inline-lang ua">Створи 5 власних речень за темою:</span><span class="inline-lang ru">Создай 5 собственных предложений по теме:</span> ${esc(model.topic)}.</p></div></section>
<div class="footer-note">ODIN v3.19 · ${STANDARD_VERSION} · standalone export</div>
</main>
${lessonJs()}
</body>
</html>`;
}

function qaCheckStandard(model, html){
  const errors=[], warnings=[], info=[];
  const has = s => html.includes(s);
  const count = s => (html.match(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"))||[]).length;

  function err(x){errors.push(x)} function warn(x){warnings.push(x)} function inf(x){info.push(x)}

  if(!has("<!DOCTYPE html>")) err("STRUCTURE: missing DOCTYPE");
  if(!has("<header class=\"topbar\"")) err("TEMPLATE: missing topbar");
  if(!has("id=\"menuBtn\"")) err("HEADER: missing menuBtn");
  if(!has("id=\"glowToggle\"")) err("HEADER: missing glowToggle");
  if(!has("id=\"literalToggle\"")) err("HEADER: missing literalToggle");
  if(!has("id=\"langToggle\"")) err("HEADER: missing langToggle");
  if(!has("id=\"navModal\"")) err("MENU: missing navModal");
  if(count("class=\"nav-item\"") < 8) err("MENU: too few nav items");

  if(!has("data-hl-mode=\"off\"")) err("HIGHLIGHT: body[data-hl-mode] missing or not default off");
  if(!has("body[data-hl-mode=\"theme\"]")) err("HIGHLIGHT CSS: theme mode missing");
  if(!has("body[data-hl-mode=\"all\"]")) err("HIGHLIGHT CSS: all mode missing");
  if(!has("body[data-hl-mode=\"off\"]")) err("HIGHLIGHT CSS: off mode missing");
  if(!has("body.dataset.hlMode")) err("HIGHLIGHT JS: dataset switch missing");
  if(!has("hl-topic")) err("HIGHLIGHT: hl-topic missing");

  if(count("lm-word") < 20) warn("MARKUP: lm-word count below PRO target");
  if(!has("data-lemma=")) err("MARKUP: data-lemma missing");
  if(!has("data-pos=")) err("MARKUP: data-pos missing");
  if(!has("data-pos=\"verb\"")) warn("MARKUP: no verbs detected");
  if(!has("data-pos=\"noun\"")) warn("MARKUP: no nouns detected");

  if(count("class=\"de\"") < 5) err("SENTENCE: too few .de sentences");
  if(count("class=\"translation\"") < Math.max(3, model.examples.length * 0.7)) warn("TRANSLATION: translation coverage low");
  if(count("class=\"literal\"") < 3) warn("TRANSLATION: literal coverage low");

  if(!has("speechSynthesis")) err("AUDIO: speechSynthesis missing");
  if(!has("SpeechSynthesisUtterance")) err("AUDIO: SpeechSynthesisUtterance missing");
  if(!has("u.lang='de-DE'")) err("AUDIO: de-DE voice language missing");
  if(count("data-tts=") < model.examples.length) warn("AUDIO: data-tts coverage low");

  if(count("vocab-word") < 5) err("VOCAB: too few vocab words");
  if(!has("Домашнє завдання")) err("PRACTICE: homework missing");
  if(!has("Мікродрил")) err("PRACTICE: drill missing");

  if(has("dt-lang-topic-mode") || has("dt-lang-all-mode") || has("dt-lang-off")) err("CONFLICT: old dt-lang highlight system detected");
  
  if(!has("<style>")) err("STANDALONE: inline style missing");
  if(!has("<script>")) err("STANDALONE: inline script missing");

  inf("STANDARD STACK: " + STANDARD_STACK.join(" + "));
  inf("DT_LESSON_STANDARD_v1 gate executed");

  return {
    status: errors.length ? "QA_FAILED" : warnings.length ? "QA_PASSED_WITH_WARNINGS" : "QA_PASSED",
    passed: errors.length === 0,
    errors, warnings, info
  };
}
function renderQaReport(r){
  const rows = [
    ...r.errors.map(x=>({level:"ERROR",text:x})),
    ...r.warnings.map(x=>({level:"WARNING",text:x})),
    ...r.info.map(x=>({level:"INFO",text:x}))
  ].map(m=>`<div class="qa-item ${m.level==="ERROR"?"qa-error":m.level==="WARNING"?"qa-warning":"qa-info"}"><b>${m.level}:</b> ${esc(m.text)}</div>`).join("");
  document.getElementById("qaBox").innerHTML = rows + `<div class="qa-item summary ${r.passed?"qa-pass":"qa-error"}">${r.status}</div>`;
}
function renderDownload(html){
  const blob=new Blob([html],{type:"text/html;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  document.getElementById("download").innerHTML=`<a class="download" href="${url}" download="odin_standard_lesson_v3_19_3.html">Завантажити стандартний урок</a>`;
}
function setPreviewHtml(html){document.getElementById("preview").srcdoc=html;}
function setPreviewHighlight(mode){
  const doc = document.getElementById("preview").contentDocument;
  if(!doc || !doc.body){log("INFO: preview not ready");return;}
  doc.body.dataset.hlMode = mode;
  log("PREVIEW_HIGHLIGHT_" + mode.toUpperCase());
}
function togglePreviewLiteral(){
  const doc = document.getElementById("preview").contentDocument;
  if(!doc || !doc.body){log("INFO: preview not ready");return;}
  doc.body.classList.toggle("show-literal");
  log("PREVIEW_LITERAL_TOGGLED");
}

function executeOdinAction(){
  document.getElementById("log").textContent="";
  document.getElementById("download").innerHTML="";
  document.getElementById("qaBox").innerHTML='<p class="muted">QA виконується...</p>';
  log("RUNNING");
  log("STANDARD_STACK_LOADED: " + STANDARD_STACK.join(" + "));
  const model=collectInput();
  ODIN_STATE.lastModel=model;
  log("INPUT_DONE");
  log("GENERATE_STANDARD_TEMPLATE");
  const html=buildStandardLesson(model);
  ODIN_STATE.lastHtml=html;
  setPreviewHtml(html);
  ODIN_STATE.lessonCreated=true;
  log("LESSON_DONE");
  log("QA_STARTED");
  const qa=qaCheckStandard(model, html);
  ODIN_STATE.lastQa=qa;
  renderQaReport(qa);
  log(qa.status);
  if(!qa.passed){
    document.getElementById("download").innerHTML='<div class="qa-item qa-error">EXPORT BLOCKED: QA_FAILED</div>';
    log("EXPORT_BLOCKED");
    return;
  }
  renderDownload(html);
  log("EXPORT_READY");
  log("STANDARD_ENGINE_FULL_RU_ALL_HIGHLIGHT_FIXED_DONE");
}
function getLessons(){try{return JSON.parse(localStorage.getItem(ODIN_STORAGE_KEY)||"[]")}catch(e){return[]}}
function setLessons(lessons){localStorage.setItem(ODIN_STORAGE_KEY,JSON.stringify(lessons))}
function saveCurrentLesson(){
  if(!ODIN_STATE.lessonCreated || !ODIN_STATE.lastQa || !ODIN_STATE.lastQa.passed){dataLog("SAVE_BLOCKED: QA not passed");return;}
  const lessons=getLessons();
  lessons.unshift({id:"lesson_"+Date.now(),title:ODIN_STATE.lastModel.title,topic:ODIN_STATE.lastModel.topic,level:ODIN_STATE.lastModel.level,html:ODIN_STATE.lastHtml,createdAt:new Date().toLocaleString(),qa:ODIN_STATE.lastQa.status});
  setLessons(lessons);
  dataLog("LESSON_SAVED: " + ODIN_STATE.lastModel.title);
  renderLessons();
}
function renderLessons(){
  const lessons=getLessons();
  const box=document.getElementById("lessonsList");
  if(!lessons.length){box.innerHTML='<p class="muted">Немає збережених уроків.</p>';return;}
  box.innerHTML=lessons.map((l,i)=>`<div class="lesson-item"><h3>${esc(l.title)}</h3><div class="lesson-meta">${esc(l.createdAt)} · ${esc(l.level)} · ${esc(l.topic)} · ${esc(l.qa)}</div><button data-action="open" data-index="${i}">Відкрити</button><button data-action="export" data-index="${i}">Export</button><button class="danger" data-action="delete" data-index="${i}">Видалити</button></div>`).join("");
}
function clearSavedLessons(){localStorage.removeItem(ODIN_STORAGE_KEY);dataLog("ALL_LESSONS_CLEARED");renderLessons();}
function clearAll(){
  document.getElementById("log").textContent="WAITING";
  document.getElementById("qaBox").innerHTML='<p class="muted">QA зʼявиться після запуску.</p>';
  document.getElementById("download").innerHTML="";
  document.getElementById("preview").srcdoc="";
  ODIN_STATE={lessonCreated:false,lastHtml:"",lastModel:null,lastQa:null};
}
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("runBtn").addEventListener("click",executeOdinAction);
  document.getElementById("saveBtn").addEventListener("click",saveCurrentLesson);
  document.getElementById("clearBtn").addEventListener("click",clearAll);
  document.getElementById("toggleLiteralBtn").addEventListener("click",togglePreviewLiteral);
  document.getElementById("hlOffBtn").addEventListener("click",()=>setPreviewHighlight("off"));
  document.getElementById("hlThemeBtn").addEventListener("click",()=>setPreviewHighlight("theme"));
  document.getElementById("hlAllBtn").addEventListener("click",()=>setPreviewHighlight("all"));
  document.getElementById("refreshLessonsBtn").addEventListener("click",renderLessons);
  document.getElementById("clearLessonsBtn").addEventListener("click",clearSavedLessons);
  document.getElementById("lessonsList").addEventListener("click",e=>{
    const b=e.target.closest("button[data-action]"); if(!b)return;
    const i=Number(b.dataset.index); const lessons=getLessons(); const l=lessons[i]; if(!l)return;
    if(b.dataset.action==="open"){setPreviewHtml(l.html);dataLog("OPENED: "+l.title);}
    if(b.dataset.action==="export"){renderDownload(l.html);dataLog("EXPORT_READY: "+l.title);}
    if(b.dataset.action==="delete"){lessons.splice(i,1);setLessons(lessons);renderLessons();dataLog("DELETED");}
  });
  renderLessons();
  dataLog("APP_READY_v3.19.3_FULL_RU_ALL_HIGHLIGHT_FIX");
});
