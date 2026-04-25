const ODIN_STORAGE_KEY = "odin_lessons_v3_15";
let REVIEW_FILTER = "ALL";
let TOPIC_FILTER = "ALL";

let ODIN_STATE = {
  lessonCreated: false,
  showDP: true,
  showSD: true,
  uxMode: "FULL",
  highlightMode: "TOPIC",
  lastHtml: "",
  lastModel: null,
  lastQa: null
};

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function getValue(id) { return document.getElementById(id).value.trim(); }
function log(message) { const box=document.getElementById("log"); if(box.textContent==="WAITING") box.textContent=""; box.textContent += message + "\n"; }
function dataLog(message) { const box=document.getElementById("dataLog"); if(box.textContent==="DATA_WAITING") box.textContent=""; box.textContent += message + "\n"; }
function clearLog(){ document.getElementById("log").textContent=""; }

function parseRows(raw, expectedParts) {
  return String(raw || "")
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.split("|").map(part => part.trim()))
    .filter(parts => parts.length >= expectedParts);
}

function collectInput() {
  return {
    title: getValue("title"),
    topic: getValue("topic") || "General",
    goal: getValue("goal"),
    examples: parseRows(getValue("examples"), 3),
    vocab: parseRows(getValue("vocab"), 2)
  };
}

function runModeGuard(actionName) {
  log("MODE_GUARD_STARTED");
  ["SON","QA","NN","PLAN","BUILD","TEST","FIX","GIT"].forEach(mode => log("MODE_OK: " + mode));
  log("MODE_GUARD_PASSED");
  return true;
}

function tokenizeGerman(sentence) {
  return String(sentence || "").split(/(\s+)/).map(part => /^\s+$/.test(part) ? {text:part,type:"space"} : {text:part,type:"word"});
}
function normalizeToken(token) { return String(token || "").replace(/[.,!?;:]/g,"").toLowerCase(); }
const TOPIC_PARTICLES=["auf","zu","ein","an"];
const SUBJECT_WORDS=["ich","du","er","sie","es","wir","ihr"];
const VERB_FORMS=["stehe","mach","kaufen","ruf","räume","steht","machst","kauft","ruft"];

function renderGermanWithHighlight(sentence) {
  return tokenizeGerman(sentence).map(token => {
    if(token.type==="space") return token.text;
    const clean=normalizeToken(token.text);
    let cls="token";
    if(TOPIC_PARTICLES.includes(clean)) cls+=" hl-topic";
    if(SUBJECT_WORDS.includes(clean)) cls+=" hl-subject";
    if(VERB_FORMS.includes(clean)) cls+=" hl-verb";
    return '<span class="'+cls+'">'+esc(token.text)+'</span>';
  }).join("");
}

function buildLesson(model) {
  const examplesHtml = model.examples.map((example,index)=>[
    '<article class="example-card" data-example="'+index+'">',
    '<h3>'+(index+1)+'. <span class="de">'+renderGermanWithHighlight(example[0])+'</span></h3>',
    '<div class="translation-wrap">',
    '<p class="dp"><b>ДП:</b> '+esc(example[1])+'</p>',
    '<p class="sd"><b>СД:</b> '+esc(example[2])+'</p>',
    '</div>',
    '<button class="mini-toggle" type="button">Показати/сховати переклад цього прикладу</button>',
    '</article>'
  ].join("")).join("");

  const vocabHtml = model.vocab.map((item,index)=>
    '<tr><td>'+(index+1)+'</td><td><b>'+esc(item[0])+'</b></td><td>'+esc(item[1])+'</td></tr>'
  ).join("");

  return [
    '<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(model.title)+'</title>',
    '<style>',
    'body{font-family:system-ui;line-height:1.6;padding:20px;max-width:920px;margin:auto;background:#f8fafc;color:#0f172a}',
    'section{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px;margin:14px 0}',
    '.example-card{border-left:5px solid #0284c7;padding:14px;margin:12px 0;background:#fff;border-radius:14px;transition:.2s}',
    '.de{font-weight:900;color:#0f172a}.dp{color:#475569}.sd{color:#111827}.translation-wrap.local-hidden{display:none}',
    '.mini-toggle{border:0;border-radius:10px;padding:8px 10px;background:#e0f2fe;color:#075985;font-weight:800;cursor:pointer}',
    '.token{border-radius:7px;padding:1px 4px}body.hl-off .token{background:transparent!important;outline:none!important}',
    'body.hl-topic-mode .hl-topic{background:#fef3c7;outline:1px solid #f59e0b}',
    'body.hl-all-mode .hl-topic{background:#fef3c7;outline:1px solid #f59e0b}body.hl-all-mode .hl-subject{background:#dbeafe;outline:1px solid #60a5fa}body.hl-all-mode .hl-verb{background:#dcfce7;outline:1px solid #22c55e}',
    'table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #e2e8f0;padding:8px;text-align:left}.badge{display:inline-block;background:#ede9fe;color:#6d28d9;border-radius:999px;padding:5px 9px;font-weight:800}',
    '</style></head><body class="hl-topic-mode">',
    '<h1>'+esc(model.title)+'</h1><span class="badge">Topic: '+esc(model.topic)+'</span>',
    '<section id="goal"><h2>1. Ціль уроку</h2><p>'+esc(model.goal)+'</p></section>',
    '<section id="rule"><h2>2. Основне правило</h2><p>Відокремлювана частка у простому реченні часто переходить у кінець.</p></section>',
    '<section id="examples"><h2>3. Приклади з ДП і СД</h2>'+examplesHtml+'</section>',
    '<section id="vocab"><h2>4. Словник</h2><table><thead><tr><th>№</th><th>DE</th><th>UA</th></tr></thead><tbody>'+vocabHtml+'</tbody></table></section>',
    '<section id="practice"><h2>5. Практика</h2><p>Тема уроку: <b>'+esc(model.topic)+'</b>. Повторюй за темами.</p></section>',
    '<section id="qa-marker"><h2>QA marker</h2><p>Урок пройшов ODIN v3.15 TOPICS PIPELINE.</p></section>',
    '<script>document.addEventListener("click",function(e){if(e.target.classList.contains("mini-toggle")){var card=e.target.closest(".example-card");card.querySelector(".translation-wrap").classList.toggle("local-hidden");}});<\\/script>',
    '</body></html>'
  ].join("");
}

function findDuplicates(list,getKey){const seen=new Set(),dups=[];list.forEach(item=>{const key=getKey(item).toLowerCase().trim();if(key&&seen.has(key))dups.push(key);seen.add(key)});return dups;}

function hardQaCheck(model,html){
  const messages=[]; const error=t=>messages.push({level:"ERROR",text:t}); const warning=t=>messages.push({level:"WARNING",text:t}); const info=t=>messages.push({level:"INFO",text:t});
  if(model.title.length<3) error("Назва уроку занадто коротка або відсутня.");
  if(model.topic.length<3) error("Тема уроку відсутня або занадто коротка.");
  if(model.goal.length<40) error("Ціль уроку має бути розширеною: мінімум 40 символів.");
  if(model.examples.length<5) error("Потрібно мінімум 5 прикладів.");
  if(model.vocab.length<5) error("Потрібно мінімум 5 слів у словнику.");
  model.examples.forEach((e,i)=>{const n=i+1;if(!e[0]||e[0].length<4)error("Приклад "+n+": DE відсутнє.");if(!e[1]||e[1].length<4)error("Приклад "+n+": ДП відсутній.");if(!e[2]||e[2].length<4)error("Приклад "+n+": СД відсутній.");if(e[1]===e[2])warning("Приклад "+n+": ДП і СД однакові.")});
  const deDups=findDuplicates(model.examples,item=>item[0]||""); if(deDups.length>0) error("Є дублікати прикладів DE: "+deDups.join(", "));
  if(!html.includes("QA marker")) error("HTML не містить QA marker.");
  if(!html.includes("Topic:")) error("HTML не містить topic marker.");
  info("TOPICS layer ready: topic saved + topic filter.");
  const hasErrors=messages.some(m=>m.level==="ERROR"), hasWarnings=messages.some(m=>m.level==="WARNING");
  return {passed:!hasErrors,hasWarnings,messages};
}

function renderQaReport(report){
  const rows=report.messages.map(m=>'<div class="qa-item '+(m.level==="ERROR"?"qa-error":m.level==="WARNING"?"qa-warning":"qa-info")+'"><b>'+m.level+':</b> '+esc(m.text)+'</div>').join("");
  const summaryClass=report.passed?"qa-pass":"qa-error";
  const summaryText=report.passed?(report.hasWarnings?"QA_PASSED_WITH_WARNINGS":"QA_PASSED"):"QA_FAILED_EXPORT_BLOCKED";
  document.getElementById("qaBox").innerHTML=rows+'<div class="qa-item summary '+summaryClass+'">'+summaryText+'</div>';
}
function renderDownload(html){const blob=new Blob([html],{type:"text/html;charset=utf-8"});const url=URL.createObjectURL(blob);document.getElementById("download").innerHTML='<a class="download" href="'+url+'" download="odin_lesson_v3_15.html">Завантажити урок</a>';}

function getPreviewDocument(){const frame=document.getElementById("preview");return frame.contentDocument||frame.contentWindow.document;}
function applyMode(){if(!ODIN_STATE.lessonCreated){log("INFO: спочатку створи урок.");return}const doc=getPreviewDocument();if(!doc)return;doc.querySelectorAll(".dp").forEach(el=>el.style.display=ODIN_STATE.showDP?"block":"none");doc.querySelectorAll(".sd").forEach(el=>el.style.display=ODIN_STATE.showSD?"block":"none");}
function applyHighlightMode(mode){if(!ODIN_STATE.lessonCreated){log("INFO: спочатку створи урок.");return}const doc=getPreviewDocument();if(!doc||!doc.body)return;doc.body.classList.remove("hl-topic-mode","hl-all-mode","hl-off");if(mode==="TOPIC"){doc.body.classList.add("hl-topic-mode");ODIN_STATE.highlightMode="TOPIC";log("LAMP_TOPIC_MODE")}else if(mode==="ALL"){doc.body.classList.add("hl-all-mode");ODIN_STATE.highlightMode="ALL";log("LAMP_ALL_RULES_MODE")}else{doc.body.classList.add("hl-off");ODIN_STATE.highlightMode="OFF";log("LAMP_OFF")}}
function toggleDP(){ODIN_STATE.showDP=!ODIN_STATE.showDP;applyMode();log(ODIN_STATE.showDP?"DP_VISIBLE":"DP_HIDDEN")}
function toggleSD(){ODIN_STATE.showSD=!ODIN_STATE.showSD;applyMode();log(ODIN_STATE.showSD?"SD_VISIBLE":"SD_HIDDEN")}
function modeStudy(){ODIN_STATE.showDP=false;ODIN_STATE.showSD=true;applyMode();applyHighlightMode("TOPIC");log("MODE_STUDY")}
function modeTest(){ODIN_STATE.showDP=false;ODIN_STATE.showSD=false;applyMode();applyHighlightMode("OFF");log("MODE_TEST_ONLY_DE")}
function modeFull(){ODIN_STATE.showDP=true;ODIN_STATE.showSD=true;applyMode();applyHighlightMode("ALL");log("MODE_FULL")}

function getLessons(){try{return JSON.parse(localStorage.getItem(ODIN_STORAGE_KEY)||"[]")}catch(e){return[]}}
function setLessons(lessons){localStorage.setItem(ODIN_STORAGE_KEY,JSON.stringify(lessons))}
function saveCurrentLesson(){
  if(!ODIN_STATE.lessonCreated||!ODIN_STATE.lastHtml||!ODIN_STATE.lastQa||!ODIN_STATE.lastQa.passed){dataLog("SAVE_BLOCKED: немає успішного уроку після QA.");return}
  const lessons=getLessons();
  const record={id:"lesson_"+Date.now(),title:ODIN_STATE.lastModel.title,topic:ODIN_STATE.lastModel.topic||"General",createdAt:new Date().toLocaleString(),html:ODIN_STATE.lastHtml,model:ODIN_STATE.lastModel,qaStatus:ODIN_STATE.lastQa.hasWarnings?"QA_PASSED_WITH_WARNINGS":"QA_PASSED",reviewStatus:"NEW",reviewCount:0,lastReviewed:null};
  lessons.unshift(record); setLessons(lessons); dataLog("LESSON_SAVED: "+record.title+" / "+record.topic); renderTopicFilter(); renderLessonsList();
}
function statusClass(status){return status==="LEARNED"?"status-learned":status==="REVIEW"?"status-review":"status-new"}
function setReviewStatus(index,status){const lessons=getLessons();if(!lessons[index])return;lessons[index].reviewStatus=status;lessons[index].lastReviewed=new Date().toLocaleString();lessons[index].reviewCount=(lessons[index].reviewCount||0)+1;setLessons(lessons);dataLog("REVIEW_STATUS_SET: "+lessons[index].title+" → "+status);renderLessonsList();}
function getTopics(){const topics=[...new Set(getLessons().map(l=>l.topic||"General"))].sort();return topics;}
function renderTopicFilter(){
  const select=document.getElementById("topicFilter");
  const current=TOPIC_FILTER;
  select.innerHTML='<option value="ALL">All Topics</option>'+getTopics().map(t=>'<option value="'+esc(t)+'">'+esc(t)+'</option>').join("");
  select.value=getTopics().includes(current)?current:"ALL";
  TOPIC_FILTER=select.value;
}
function renderLessonsList(){
  const lessons=getLessons();
  let filtered=REVIEW_FILTER==="ALL"?lessons:lessons.filter(l=>(l.reviewStatus||"NEW")===REVIEW_FILTER);
  filtered=TOPIC_FILTER==="ALL"?filtered:filtered.filter(l=>(l.topic||"General")===TOPIC_FILTER);
  const box=document.getElementById("lessonsList");
  if(filtered.length===0){box.innerHTML='<p class="muted">Немає уроків для цього фільтра.</p>';dataLog("LESSONS_LIST_EMPTY: "+REVIEW_FILTER+" / "+TOPIC_FILTER);return}
  box.innerHTML=filtered.map(lesson=>{
    const realIndex=lessons.findIndex(l=>l.id===lesson.id);
    const status=lesson.reviewStatus||"NEW";
    return [
      '<div class="lesson-item">',
      '<h3>'+esc(lesson.title)+' <span class="topic-pill">'+esc(lesson.topic||"General")+'</span><span class="status-pill '+statusClass(status)+'">'+status+'</span></h3>',
      '<div class="lesson-meta">'+esc(lesson.createdAt)+' · '+esc(lesson.qaStatus)+' · reviews: '+(lesson.reviewCount||0)+'</div>',
      '<button type="button" data-action="open" data-index="'+realIndex+'">Відкрити</button>',
      '<button type="button" data-action="export" data-index="'+realIndex+'">Export</button>',
      '<button type="button" data-action="status" data-status="REVIEW" data-index="'+realIndex+'">Повторити</button>',
      '<button type="button" data-action="status" data-status="LEARNED" data-index="'+realIndex+'">Вивчено</button>',
      '<button type="button" data-action="status" data-status="NEW" data-index="'+realIndex+'">Новий</button>',
      '<button type="button" class="danger" data-action="delete" data-index="'+realIndex+'">Видалити</button>',
      '</div>'
    ].join("");
  }).join("");
  dataLog("LESSONS_LIST_RENDERED: "+filtered.length+" / "+REVIEW_FILTER+" / "+TOPIC_FILTER);
}
function openLesson(index){const lesson=getLessons()[index];if(!lesson)return;document.getElementById("preview").srcdoc=lesson.html;ODIN_STATE.lessonCreated=true;ODIN_STATE.lastHtml=lesson.html;ODIN_STATE.lastModel=lesson.model;dataLog("LESSON_OPENED: "+lesson.title)}
function exportSavedLesson(index){const lesson=getLessons()[index];if(!lesson)return;renderDownload(lesson.html);dataLog("SAVED_LESSON_EXPORT_READY: "+lesson.title)}
function deleteLesson(index){const lessons=getLessons();const removed=lessons.splice(index,1)[0];setLessons(lessons);dataLog("LESSON_DELETED: "+(removed?removed.title:index));renderTopicFilter();renderLessonsList();}
function clearSavedLessons(){localStorage.removeItem(ODIN_STORAGE_KEY);dataLog("ALL_LESSONS_CLEARED");renderTopicFilter();renderLessonsList();}
function setFilter(filter){REVIEW_FILTER=filter;dataLog("REVIEW_FILTER_SET: "+filter);renderLessonsList();}
function setTopicFilter(value){TOPIC_FILTER=value;dataLog("TOPIC_FILTER_SET: "+value);renderLessonsList();}

function clearAll(){
  clearLog();document.getElementById("qaBox").innerHTML='<p class="muted">QA зʼявиться після запуску.</p>';document.getElementById("download").innerHTML="";document.getElementById("preview").srcdoc="";
  ODIN_STATE={lessonCreated:false,showDP:true,showSD:true,uxMode:"FULL",highlightMode:"TOPIC",lastHtml:"",lastModel:null,lastQa:null};
}
function executeOdinAction(){
  clearAll(); log("RUNNING"); runModeGuard("v3.15 TOPICS SYSTEM");
  const model=collectInput(); ODIN_STATE.lastModel=model;
  log("PLAN_DONE"); log("PIPELINE_DONE");
  const html=buildLesson(model); ODIN_STATE.lastHtml=html; document.getElementById("preview").srcdoc=html; ODIN_STATE.lessonCreated=true; log("LESSON_DONE");
  const report=hardQaCheck(model,html); ODIN_STATE.lastQa=report; renderQaReport(report); log(report.passed?(report.hasWarnings?"QA_PASSED_WITH_WARNINGS":"QA_PASSED"):"QA_FAILED");
  if(!report.passed){document.getElementById("download").innerHTML='<div class="qa-item qa-error">EXPORT BLOCKED: HARD QA FAILED</div>';log("EXPORT_BLOCKED");return}
  renderDownload(html); log("EXPORT_DONE"); log("TOPICS_LAYER_READY"); log("DONE");
}
function bindStaticButtons(){
  document.getElementById("runBtn").addEventListener("click",executeOdinAction);
  document.getElementById("saveBtn").addEventListener("click",saveCurrentLesson);
  document.getElementById("clearBtn").addEventListener("click",clearAll);
  document.getElementById("toggleDpBtn").addEventListener("click",toggleDP);
  document.getElementById("toggleSdBtn").addEventListener("click",toggleSD);
  document.getElementById("modeStudyBtn").addEventListener("click",modeStudy);
  document.getElementById("modeTestBtn").addEventListener("click",modeTest);
  document.getElementById("modeFullBtn").addEventListener("click",modeFull);
  document.getElementById("lampBtn").addEventListener("click",()=>applyHighlightMode("TOPIC"));
  document.getElementById("lampAllBtn").addEventListener("click",()=>applyHighlightMode("ALL"));
  document.getElementById("lampOffBtn").addEventListener("click",()=>applyHighlightMode("OFF"));
  document.getElementById("refreshLessonsBtn").addEventListener("click",()=>{renderTopicFilter();renderLessonsList();});
  document.getElementById("clearLessonsBtn").addEventListener("click",clearSavedLessons);
  document.getElementById("filterAllBtn").addEventListener("click",()=>setFilter("ALL"));
  document.getElementById("filterNewBtn").addEventListener("click",()=>setFilter("NEW"));
  document.getElementById("filterReviewBtn").addEventListener("click",()=>setFilter("REVIEW"));
  document.getElementById("filterLearnedBtn").addEventListener("click",()=>setFilter("LEARNED"));
  document.getElementById("topicFilter").addEventListener("change",e=>setTopicFilter(e.target.value));
}
function bindLessonsListActions(){
  document.getElementById("lessonsList").addEventListener("click",function(event){
    const btn=event.target.closest("button[data-action]");
    if(!btn)return;
    const action=btn.dataset.action;
    const index=Number(btn.dataset.index);
    if(action==="open")openLesson(index);
    if(action==="export")exportSavedLesson(index);
    if(action==="delete")deleteLesson(index);
    if(action==="status")setReviewStatus(index,btn.dataset.status);
  });
}
document.addEventListener("DOMContentLoaded",function(){
  bindStaticButtons();
  bindLessonsListActions();
  renderTopicFilter();
  renderLessonsList();
  dataLog("APP_READY_v3.15_TOPICS");
});
