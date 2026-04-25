const ODIN_STORAGE_KEY = "odin_lessons_v3_21_full_integration";
const REQUIRED_LANGS = ["ua","ru"];
const TARGET_LANG = "de";
const STANDARD_STACK = [
  "DT_LESSON_STANDARD_v1",
  "TRANSLATION_STANDARD_v2",
  "HIGHLIGHT_STANDARD_CORE_v1",
  "LANGUAGE_MARKUP_STANDARD_v1",
  "QA_STANDARD_v1"
];

let ODIN_STATE = { lessonCreated:false, lastHtml:"", lastModel:null, lastQa:null };

function esc(value){return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function getValue(id){return document.getElementById(id).value.trim()}
function log(message){const box=document.getElementById("log");if(box.textContent==="WAITING")box.textContent="";box.textContent+=message+"\n"}
function dataLog(message){const box=document.getElementById("dataLog");if(box.textContent==="DATA_WAITING")box.textContent="";box.textContent+=message+"\n"}
function parseRows(raw,parts){return String(raw||"").split(/\n+/).map(l=>l.trim()).filter(Boolean).map(l=>l.split("|").map(p=>p.trim())).filter(p=>p.length>=parts)}
function collectModel(){
  const examples=parseRows(getValue("examples"),5).map((p,i)=>({
    id:"ex"+String(i+1).padStart(3,"0"),
    de:p[0],
    literal:{ua:p[1],ru:p[3]},
    semantic:{ua:p[2],ru:p[4]}
  }));
  const vocab=parseRows(getValue("vocab"),3).map((p,i)=>({
    id:"vocab"+String(i+1).padStart(3,"0"),
    de:p[0],
    translation:{ua:p[1],ru:p[2]}
  }));
  return {
    targetLang:TARGET_LANG,
    uiLangs:REQUIRED_LANGS,
    title:{ua:getValue("title_ua"),ru:getValue("title_ru")},
    topic:getValue("topic")||"general",
    level:getValue("level")||"A1",
    goal:{ua:getValue("goal_ua"),ru:getValue("goal_ru")},
    examples,
    vocab
  };
}

function i18nSpan(id,value){
  return REQUIRED_LANGS.map(lang=>`<span data-i18n="${esc(id)}" data-lang="${lang}">${esc(value[lang]||"[MISSING_TRANSLATION]")}</span>`).join("");
}
function i18nBlock(id,value){
  return REQUIRED_LANGS.map(lang=>`<div data-i18n-block="${esc(id)}" data-lang="${lang}">${esc(value[lang]||"[MISSING_TRANSLATION]")}</div>`).join("");
}
function cleanTts(text){return String(text||"").replace(/<[^>]+>/g,"").trim()}
const VERB_LEMMAS={stehe:"aufstehen",mach:"zumachen",kaufen:"einkaufen",ruf:"anrufen",räume:"aufräumen",bin:"sein",ist:"sein",sind:"sein",gehe:"gehen"};
const PREFIXES=["auf","zu","ein","an"],SUBJECTS=["ich","du","er","sie","es","wir","ihr"],ARTICLES=["der","die","das","dem","den","ein","eine","einen","einem"],PREPOSITIONS=["in","an","auf","neben","zwischen","vor","hinter","über","unter","bei","zu","zum","zur","im","am","beim"];
function normalizeWord(word){return String(word||"").replace(/[.,!?;:]/g,"").toLowerCase()}
function inferSentenceMeta(sentence){const s=sentence.toLowerCase();const movement=/\b(gehe|gehen|fahre|fahren|laufe|laufen|komm|komme|kommt|ruf|mach)\b/.test(s);const place=/\b(bin|ist|sind|sitzt|steht|wartet|warten)\b/.test(s)&&!movement;return{role:movement?"movement":place?"place":"topic",question:movement?"wohin":place?"wo":"unknown",caseName:movement?"akkusativ":place?"dativ":"unknown"}}
function getPos(word){const w=normalizeWord(word);if(SUBJECTS.includes(w))return"pronoun";if(VERB_LEMMAS[w])return"verb";if(PREFIXES.includes(w))return"verb-prefix";if(ARTICLES.includes(w))return"article";if(PREPOSITIONS.includes(w))return"preposition";if(/^[A-ZÄÖÜ]/.test(word))return"noun";return"unknown"}
function renderLmWord(word,meta){const clean=normalizeWord(word);const pos=getPos(word);let cls="lm-word";let attrs=`data-lemma="${esc(clean)}" data-pos="${esc(pos)}"`;
  if(pos==="pronoun"){cls+=" lm-pronoun";attrs+=` data-person="${clean==="ich"?"1":clean==="du"?"2":"3"}" data-number="${["wir","ihr"].includes(clean)?"plural":"singular"}" data-case="nominative"`}
  else if(pos==="verb"){const lemma=VERB_LEMMAS[clean]||clean;const type=["bin","ist","sind"].includes(clean)?"auxiliary":PREFIXES.some(p=>lemma.startsWith(p))?"separable":"simple";cls+=` lm-verb ${type==="separable"?"lm-separable":""}`;attrs=`data-lemma="${esc(lemma)}" data-pos="verb" data-verb-type="${type}" data-tense="present" data-person="unknown" data-number="unknown"`}
  else if(pos==="verb-prefix"){cls+=" lm-prefix hl-topic";attrs=`data-lemma="${esc(clean)}" data-pos="verb-prefix" data-prefix="${esc(clean)}" data-role="topic"`}
  else if(pos==="article"){cls+=" lm-article";const c=["dem","der"].includes(clean)?"dativ":["die","den"].includes(clean)?"akkusativ":"unknown";attrs+=` data-article-type="definite" data-gender="unknown" data-number="unknown" data-case="${c}"`}
  else if(pos==="preposition"){const role=meta.role,question=meta.question,gov=question==="wo"?"dativ":question==="wohin"?"akkusativ":"unknown";cls+=` lm-preposition ${role==="place"?"hl-place":role==="movement"?"hl-move":"hl-topic"}`;attrs+=` data-role="${role}" data-question="${question}" data-governs-case="${gov}"`}
  else if(pos==="noun"){cls+=" lm-noun";attrs+=` data-gender="unknown" data-number="singular" data-case="${meta.caseName}"`}
  else cls+=" lm-unknown";
  return `<span class="${cls}" ${attrs}>${esc(word)}</span>`;
}
function renderMarkedGerman(sentence,model,index){const meta=inferSentenceMeta(sentence);const html=String(sentence||"").split(/(\s+)/).map(part=>{if(/^\s+$/.test(part))return part;const m=part.match(/^(.+?)([.,!?;:]*)$/);const word=m?m[1]:part;const punct=m?m[2]:"";return renderLmWord(word,meta)+esc(punct)}).join("");
  return `<div class="de" data-target-lang="de" data-sentence-id="${esc(model.topic)}-S${index+1}" data-topic="${esc(model.topic)}" data-level="${esc(model.level)}" data-grammar="${esc(meta.role)},${esc(meta.question)},${esc(meta.caseName)}">${html}<button class="audio-mini" data-tts="${esc(cleanTts(sentence))}">🔊</button></div>`;
}

function lessonCss(){return `
:root{--bg:#f6f7f9;--card:#fff;--text:#1f2937;--muted:#4b5563;--line:#e5e7eb;--accent:#1f4b99;--accent-soft:#eef4ff;--shadow:0 6px 20px rgba(17,24,39,.06);--header-h:64px;--audio:#0f766e;--audio-soft:#ecfeff}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}[id]{scroll-margin-top:84px}
.topbar{position:sticky;top:0;z-index:100;height:var(--header-h);background:rgba(246,247,249,.97);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.topbar-inner{max-width:1080px;margin:0 auto;height:100%;padding:0 14px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:10px}.brand{font-size:12px;color:var(--muted);font-weight:700;letter-spacing:.08em;text-transform:uppercase}.center-actions{display:flex;gap:8px;align-items:center;justify-self:center;flex-wrap:wrap;justify-content:center}
.btn{appearance:none;border:1px solid var(--line);background:#fff;color:var(--text);border-radius:999px;padding:0;font-size:13px;font-weight:700;cursor:pointer;box-shadow:var(--shadow);width:42px;height:42px;display:inline-flex;align-items:center;justify-content:center}.btn.is-off{background:#f1f2f4;color:#6b7280;border-color:#d1d5db}
.wrap{max-width:1080px;margin:18px auto 36px;padding:0 14px}.hero,.card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px;margin-bottom:14px;box-shadow:var(--shadow)}.hero{text-align:center}
h1,h2,h3{margin:0 0 10px}h1{font-size:30px;line-height:1.15}.section-head{display:flex;align-items:center;gap:12px;margin-bottom:12px}.sec-num{display:inline-flex;align-items:center;justify-content:center;min-width:38px;height:38px;border-radius:999px;background:var(--accent-soft);border:1px solid #dbe7ff;color:var(--accent);font-weight:800}
.grid,.vocab-columns{display:grid;gap:12px}.grid.two-col{grid-template-columns:repeat(auto-fit,minmax(360px,1fr))}.vocab-columns{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}.subcard{background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px}.tag{display:inline-block;padding:4px 8px;border-radius:999px;background:var(--accent-soft);color:var(--accent);font-size:14px;font-weight:700;margin-bottom:8px}
.sentence,.vocab-line{border-top:1px solid var(--line);padding:10px 0}.sentence:first-child,.vocab-line:first-child{border-top:none}.de{font-weight:800;font-size:19px;display:flex;gap:6px;align-items:flex-start;flex-wrap:wrap}.literal{display:none;font-size:15px;font-style:italic;margin-top:4px;color:#6b7280}body.show-literal .literal{display:block}.translation{color:var(--muted);margin-top:4px;font-size:17px}
.audio-mini{appearance:none;border:1px solid #bfe7e5;background:var(--audio-soft);color:var(--audio);border-radius:999px;width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:var(--shadow);flex:0 0 auto}
[data-lang],[data-i18n-block]{display:none}body[data-ui-lang="ua"] [data-lang="ua"]{display:inline}body[data-ui-lang="ru"] [data-lang="ru"]{display:inline}body[data-ui-lang="ua"] [data-i18n-block][data-lang="ua"]{display:block}body[data-ui-lang="ru"] [data-i18n-block][data-lang="ru"]{display:block}
.hl-topic,.hl-case,.hl-move,.hl-place{border-radius:6px;padding:0 4px}body[data-hl-mode="off"] .hl-topic,body[data-hl-mode="off"] .hl-case,body[data-hl-mode="off"] .hl-move,body[data-hl-mode="off"] .hl-place{background:transparent;color:inherit;box-shadow:none}
body[data-hl-mode="theme"] .hl-topic,body[data-hl-mode="theme"] .hl-move,body[data-hl-mode="theme"] .hl-place,body[data-hl-mode="all"] .hl-topic{background:#fff7ed;color:#92400e}
body[data-hl-mode="all"] .hl-case{background:#eef2ff;color:#4338ca}body[data-hl-mode="all"] .hl-move{background:#fee2e2;color:#b91c1c}body[data-hl-mode="all"] .hl-place{background:#ecfeff;color:#0f766e}
body[data-hl-mode="all"] .lm-word{border-radius:6px;padding:0 4px}body[data-hl-mode="all"] .lm-verb{background:#dcfce7!important;color:#166534!important}body[data-hl-mode="all"] .lm-prefix{background:#fff7ed!important;color:#92400e!important}body[data-hl-mode="all"] .lm-pronoun{background:#dbeafe!important;color:#1d4ed8!important}body[data-hl-mode="all"] .lm-noun{background:#f3e8ff!important;color:#7e22ce!important}body[data-hl-mode="all"] .lm-preposition{background:#fee2e2!important;color:#b91c1c!important}body[data-hl-mode="all"] .lm-article{background:#eef2ff!important;color:#4338ca!important}
.modal{position:fixed;inset:0;background:rgba(15,23,42,.34);display:none;align-items:center;justify-content:center;z-index:120;padding:18px}.modal.open{display:flex}.panel-modal{width:min(360px,88vw);max-height:72vh;background:#fff;border:1px solid var(--line);border-radius:22px;box-shadow:0 20px 60px rgba(15,23,42,.18);overflow:hidden;display:flex;flex-direction:column}.panel-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--line)}.nav-list{padding:8px 14px 14px;overflow:auto}.nav-item{display:block;text-decoration:none;color:var(--text);border-top:1px solid var(--line);padding:10px 0}.nav-item:first-child{border-top:none}.close-btn{appearance:none;border:1px solid var(--line);background:#fff;border-radius:999px;width:34px;height:34px;cursor:pointer}.footer-note{color:var(--muted);font-size:15px;text-align:center;padding:4px 0 24px}
@media(max-width:640px){h1{font-size:25px}.grid.two-col,.vocab-columns{grid-template-columns:1fr}}
`}

function lessonJs(){return `<script>
const body=document.body;
const literalToggle=document.getElementById('literalToggle'),glowToggle=document.getElementById('glowToggle'),homeBtn=document.getElementById('homeBtn'),langToggle=document.getElementById('langToggle'),menuBtn=document.getElementById('menuBtn'),navModal=document.getElementById('navModal'),closeNav=document.getElementById('closeNav');
literalToggle.addEventListener('click',()=>{body.classList.toggle('show-literal');literalToggle.classList.toggle('is-off',!body.classList.contains('show-literal'));});
function updateGlow(){const m=body.dataset.hlMode;glowToggle.textContent=m==='off'?'💡0':(m==='theme'?'💡1':'💡2');glowToggle.classList.toggle('is-off',m==='off');}
glowToggle.addEventListener('click',()=>{const m=body.dataset.hlMode;body.dataset.hlMode=m==='off'?'theme':(m==='theme'?'all':'off');updateGlow();});updateGlow();
homeBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
langToggle.addEventListener('click',()=>{body.dataset.uiLang=body.dataset.uiLang==='ua'?'ru':'ua';langToggle.textContent=body.dataset.uiLang.toUpperCase();});
menuBtn.addEventListener('click',()=>navModal.classList.add('open'));closeNav.addEventListener('click',()=>navModal.classList.remove('open'));navModal.addEventListener('click',e=>{if(e.target===navModal)navModal.classList.remove('open')});
document.querySelectorAll('.nav-item').forEach(a=>a.addEventListener('click',(e)=>{e.preventDefault();const target=document.querySelector(a.getAttribute('href'));navModal.classList.remove('open');if(target)target.scrollIntoView({behavior:'smooth',block:'start'});}));
function speak(text){if(!('speechSynthesis' in window)){alert('Озвучка не підтримується.');return;}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='de-DE';u.rate=0.95;window.speechSynthesis.speak(u);}
document.querySelectorAll('[data-tts]').forEach(btn=>btn.addEventListener('click',()=>speak(btn.getAttribute('data-tts'))));
window.DT_STANDARD_LESSON_READY=true;
</scr`+`ipt>`}

function buildLesson(model){
  const nav=[
    ["top",{ua:"0. Тема",ru:"0. Тема"}],["summary",{ua:"1. Суть теми",ru:"1. Суть темы"}],["text",{ua:"2. Основні приклади",ru:"2. Основные примеры"}],["analysis",{ua:"3. Розбір",ru:"3. Разбор"}],["rule",{ua:"4. Правило",ru:"4. Правило"}],["vocab",{ua:"5. Словник",ru:"5. Словарь"}],["drill",{ua:"6. Мікродрил",ru:"6. Микродрилл"}],["after",{ua:"7. Після уроку",ru:"7. После урока"}],["homework",{ua:"8. Домашнє завдання",ru:"8. Домашнее задание"}]
  ].map(([id,label])=>`<a class="nav-item" href="#${id}">${i18nSpan("menu."+id,label)}</a>`).join("");
  const examplesHtml=model.examples.map((e,i)=>`<div class="sentence">${renderMarkedGerman(e.de,model,i)}<div class="literal">${i18nSpan(e.id+".literal",e.literal)}</div><div class="translation">${i18nSpan(e.id+".semantic",e.semantic)}</div></div>`).join("");
  const vocabHtml=model.vocab.map(v=>`<div class="vocab-line"><span class="vocab-word lm-word lm-vocab" data-lemma="${esc(normalizeWord(v.de))}" data-pos="unknown">${esc(v.de)}</span> — ${i18nSpan(v.id+".translation",v.translation)} <button class="audio-mini" data-tts="${esc(v.de)}">🔊</button></div>`).join("");
  return `<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${esc(model.title.ua)} / ${esc(model.title.ru)}</title><style>${lessonCss()}</style></head>
<body class="show-literal" data-hl-mode="off" data-ui-lang="ua" data-target-lang="de">
<header class="topbar"><div class="topbar-inner"><div class="brand">DT STANDARD v3.21 · ${esc(model.level)}</div><div class="center-actions"><button class="btn" id="homeBtn">🏠</button><button class="btn" id="menuBtn">☰</button><button class="btn is-off" id="glowToggle">💡0</button><button class="btn" id="literalToggle">+</button><button class="btn" id="langToggle">UA</button></div><div></div></div></header>
<div class="modal" id="navModal"><div class="panel-modal"><div class="panel-head"><b>${i18nSpan("menu.title",{ua:"Розділи уроку",ru:"Разделы урока"})}</b><button class="close-btn" id="closeNav">✕</button></div><div class="nav-list">${nav}</div></div></div>
<main class="wrap" data-course="${esc(model.level)}" data-lesson-id="${esc(model.topic)}_${Date.now()}" data-lesson-topic="${esc(model.topic)}" data-lesson-version="v3.21">
<section class="hero" id="top"><div style="font-size:12px;color:#1f4b99;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">${i18nSpan("lesson.system",{ua:"ODIN / DT УРОК-СТАНДАРТ",ru:"ODIN / DT УРОК-СТАНДАРТ"})}</div><h1>${i18nSpan("lesson.title",model.title)}</h1><div style="font-size:18px;color:#0f5132;font-weight:700;margin-bottom:10px">${esc(model.level)} · ${esc(model.topic)}</div><p style="max-width:860px;margin:0 auto">${i18nSpan("lesson.goal",model.goal)}</p></section>
<section class="card" id="summary"><div class="section-head"><span class="sec-num">1</span><h2>${i18nSpan("section.summary",{ua:"Суть теми",ru:"Суть темы"})}</h2></div><div class="grid two-col"><div class="subcard"><div class="tag">${i18nSpan("label.goal",{ua:"Що вивчаємо",ru:"Что изучаем"})}</div>${i18nBlock("lesson.goal.block",model.goal)}</div><div class="subcard"><div class="tag">${i18nSpan("label.standard",{ua:"Стандарт",ru:"Стандарт"})}</div><p>${i18nSpan("standard.text",{ua:"Урок створено за DT_LESSON_STANDARD_v1 + TRANSLATION_STANDARD_v2.",ru:"Урок создан по DT_LESSON_STANDARD_v1 + TRANSLATION_STANDARD_v2."})}</p></div></div></section>
<section class="card" id="text"><div class="section-head"><span class="sec-num">2</span><h2>${i18nSpan("section.examples",{ua:"Основні приклади",ru:"Основные примеры"})}</h2></div>${examplesHtml}</section>
<section class="card" id="analysis"><div class="section-head"><span class="sec-num">3</span><h2>${i18nSpan("section.analysis",{ua:"Розбір і значення",ru:"Разбор и значение"})}</h2></div><div class="subcard"><p>${i18nSpan("analysis.text",{ua:"Кожне німецьке речення має language markup: lm-word, data-lemma, data-pos.",ru:"Каждое немецкое предложение имеет language markup: lm-word, data-lemma, data-pos."})}</p></div></section>
<section class="card" id="rule"><div class="section-head"><span class="sec-num">4</span><h2>${i18nSpan("section.rule",{ua:"Правило",ru:"Правило"})}</h2></div><div class="subcard"><p>${i18nSpan("rule.text",{ua:"Режим 💡1 показує тему уроку. Режим 💡2 показує розширену граматичну розмітку.",ru:"Режим 💡1 показывает тему урока. Режим 💡2 показывает расширенную грамматическую разметку."})}</p></div></section>
<section class="card" id="vocab"><div class="section-head"><span class="sec-num">5</span><h2>${i18nSpan("section.vocab",{ua:"Словник",ru:"Словарь"})}</h2></div><div class="vocab-columns"><div class="subcard">${vocabHtml}</div></div></section>
<section class="card" id="drill"><div class="section-head"><span class="sec-num">6</span><h2>${i18nSpan("section.drill",{ua:"Мікродрил",ru:"Микродрилл"})}</h2></div><div class="subcard"><ol>${model.examples.map(e=>`<li>${esc(e.de)}</li>`).join("")}</ol></div></section>
<section class="card" id="after"><div class="section-head"><span class="sec-num">7</span><h2>${i18nSpan("section.after",{ua:"Після уроку ти маєш зрозуміти",ru:"После урока ты должен понять"})}</h2></div><div class="subcard"><p>${i18nSpan("after.text",{ua:"Тему, ключові слова, граматичні ролі і базові речення.",ru:"Тему, ключевые слова, грамматические роли и базовые предложения."})}</p></div></section>
<section class="card" id="homework"><div class="section-head"><span class="sec-num">8</span><h2>${i18nSpan("section.homework",{ua:"Домашнє завдання",ru:"Домашнее задание"})}</h2></div><div class="subcard"><p>${i18nSpan("homework.text",{ua:"Створи 5 власних речень за темою.",ru:"Создай 5 собственных предложений по теме."})}</p></div></section>
<div class="footer-note">ODIN v3.21 · FULL INTEGRATION · standalone export</div></main>${lessonJs()}</body></html>`;
}

function qaCheck(model,html){
 const errors=[],warnings=[],info=[]; const has=s=>html.includes(s); const count=s=>(html.match(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"))||[]).length;
 const req=(cond,msg)=>{if(!cond)errors.push(msg)}; const warn=(cond,msg)=>{if(!cond)warnings.push(msg)};
 req(has("data-ui-lang=\"ua\""),"TRANSLATION: missing data-ui-lang"); req(has("data-target-lang=\"de\""),"TRANSLATION: missing data-target-lang");
 req(!has("[MISSING_TRANSLATION]"),"TRANSLATION: missing translation slot");
 REQUIRED_LANGS.forEach(lang=>{req(has(`data-lang="${lang}"`),`TRANSLATION: missing lang ${lang}`)});
 req(has("data-i18n=\"lesson.title\""),"TRANSLATION: lesson.title i18n missing"); req(has("data-i18n=\"lesson.goal\""),"TRANSLATION: lesson.goal i18n missing");
 req(has("<header class=\"topbar\""),"TEMPLATE: missing header"); req(has("id=\"navModal\""),"TEMPLATE: missing menu"); req(count("class=\"nav-item\"")>=8,"TEMPLATE: nav items too few");
 req(has("data-hl-mode=\"off\""),"HIGHLIGHT: default off missing"); req(has("body[data-hl-mode=\"theme\"]"),"HIGHLIGHT CSS: theme missing"); req(has("body[data-hl-mode=\"all\"]"),"HIGHLIGHT CSS: all missing");
 req(count("lm-word")>=20,"MARKUP: lm-word below required"); req(has("data-lemma="),"MARKUP: data-lemma missing"); req(has("data-pos="),"MARKUP: data-pos missing");
 req(count("class=\"de\"")>=5,"SENTENCE: .de below 5"); req(count("data-tts=")>=model.examples.length,"AUDIO: data-tts below examples"); req(has("speechSynthesis"),"AUDIO: speechSynthesis missing"); req(has("u.lang='de-DE'"),"AUDIO: de-DE missing");
 req(count("vocab-word")>=5,"VOCAB: vocab below 5"); warn(count("data-pos=\"noun\"")>0,"MARKUP WARNING: no nouns detected");
 info.push("FULL_INTEGRATION_QA_EXECUTED"); info.push("STANDARD_STACK: "+STANDARD_STACK.join(" + "));
 return {status:errors.length?"QA_FAILED":warnings.length?"QA_PASSED_WITH_WARNINGS":"QA_PASSED",passed:errors.length===0,errors,warnings,info};
}
function renderQa(r){const rows=[...r.errors.map(x=>["ERROR",x]),...r.warnings.map(x=>["WARNING",x]),...r.info.map(x=>["INFO",x])].map(([level,text])=>`<div class="qa-item ${level==="ERROR"?"qa-error":level==="WARNING"?"qa-warning":"qa-info"}"><b>${level}:</b> ${esc(text)}</div>`).join("");document.getElementById("qaBox").innerHTML=rows+`<div class="qa-item summary ${r.passed?"qa-pass":"qa-error"}">${r.status}</div>`}
function renderDownload(html){const blob=new Blob([html],{type:"text/html;charset=utf-8"});const url=URL.createObjectURL(blob);document.getElementById("download").innerHTML=`<a class="download" href="${url}" download="odin_full_integration_v3_21.html">Завантажити урок</a>`}
function setPreviewHtml(html){document.getElementById("preview").srcdoc=html}
function withPreview(fn){const doc=document.getElementById("preview").contentDocument;if(doc&&doc.body)fn(doc);else log("PREVIEW_NOT_READY")}
function setPreviewLang(lang){withPreview(doc=>{doc.body.dataset.uiLang=lang;log("PREVIEW_LANG_"+lang.toUpperCase())})}
function setPreviewHighlight(mode){withPreview(doc=>{doc.body.dataset.hlMode=mode;log("PREVIEW_HL_"+mode.toUpperCase())})}
function toggleLiteral(){withPreview(doc=>{doc.body.classList.toggle("show-literal");log("PREVIEW_LITERAL_TOGGLED")})}
function execute(){document.getElementById("log").textContent="";document.getElementById("download").innerHTML="";log("RUNNING");log("FULL_INTEGRATION_STACK_LOADED");const model=collectModel();ODIN_STATE.lastModel=model;const html=buildLesson(model);ODIN_STATE.lastHtml=html;setPreviewHtml(html);ODIN_STATE.lessonCreated=true;log("LESSON_DONE");const qa=qaCheck(model,html);ODIN_STATE.lastQa=qa;renderQa(qa);log(qa.status);if(!qa.passed){document.getElementById("download").innerHTML='<div class="qa-item qa-error">EXPORT BLOCKED</div>';log("EXPORT_BLOCKED");return}renderDownload(html);log("EXPORT_READY");log("FULL_INTEGRATION_DONE")}
function getLessons(){try{return JSON.parse(localStorage.getItem(ODIN_STORAGE_KEY)||"[]")}catch(e){return[]}}
function setLessons(l){localStorage.setItem(ODIN_STORAGE_KEY,JSON.stringify(l))}
function save(){if(!ODIN_STATE.lessonCreated||!ODIN_STATE.lastQa?.passed){dataLog("SAVE_BLOCKED: QA not passed");return}const lessons=getLessons();lessons.unshift({id:"lesson_"+Date.now(),title:ODIN_STATE.lastModel.title.ua,html:ODIN_STATE.lastHtml,qa:ODIN_STATE.lastQa.status,createdAt:new Date().toLocaleString()});setLessons(lessons);dataLog("LESSON_SAVED");renderLessons()}
function renderLessons(){const lessons=getLessons();const box=document.getElementById("lessonsList");if(!lessons.length){box.innerHTML='<p class="muted">Немає збережених уроків.</p>';return}box.innerHTML=lessons.map((l,i)=>`<div class="lesson-item"><h3>${esc(l.title)}</h3><div class="lesson-meta">${esc(l.createdAt)} · ${esc(l.qa)}</div><button data-action="open" data-index="${i}">Відкрити</button><button data-action="export" data-index="${i}">Export</button><button class="danger" data-action="delete" data-index="${i}">Видалити</button></div>`).join("")}
function clearSaved(){localStorage.removeItem(ODIN_STORAGE_KEY);dataLog("ALL_LESSONS_CLEARED");renderLessons()}
function clearAll(){document.getElementById("log").textContent="WAITING";document.getElementById("qaBox").innerHTML='<p class="muted">QA зʼявиться після запуску.</p>';document.getElementById("download").innerHTML="";document.getElementById("preview").srcdoc="";ODIN_STATE={lessonCreated:false,lastHtml:"",lastModel:null,lastQa:null}}
document.addEventListener("DOMContentLoaded",()=>{document.getElementById("runBtn").onclick=execute;document.getElementById("saveBtn").onclick=save;document.getElementById("clearBtn").onclick=clearAll;document.getElementById("toggleLiteralBtn").onclick=toggleLiteral;document.getElementById("uiUaBtn").onclick=()=>setPreviewLang("ua");document.getElementById("uiRuBtn").onclick=()=>setPreviewLang("ru");document.getElementById("hlOffBtn").onclick=()=>setPreviewHighlight("off");document.getElementById("hlThemeBtn").onclick=()=>setPreviewHighlight("theme");document.getElementById("hlAllBtn").onclick=()=>setPreviewHighlight("all");document.getElementById("refreshLessonsBtn").onclick=renderLessons;document.getElementById("clearLessonsBtn").onclick=clearSaved;document.getElementById("lessonsList").addEventListener("click",e=>{const b=e.target.closest("button[data-action]");if(!b)return;const lessons=getLessons();const i=Number(b.dataset.index);const l=lessons[i];if(!l)return;if(b.dataset.action==="open"){setPreviewHtml(l.html);dataLog("OPENED")}if(b.dataset.action==="export"){renderDownload(l.html);dataLog("EXPORT_READY")}if(b.dataset.action==="delete"){lessons.splice(i,1);setLessons(lessons);renderLessons();dataLog("DELETED")}});renderLessons();dataLog("APP_READY_v3.21_FULL_INTEGRATION")});
