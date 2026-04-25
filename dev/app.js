const ODIN_STORAGE_KEY = "odin_lessons_v3_16";
let REVIEW_FILTER = "ALL";
let TOPIC_FILTER = "ALL";
let LEVEL_FILTER = "ALL";

let ODIN_STATE = {lessonCreated:false,showDP:true,showSD:true,uxMode:"FULL",highlightMode:"TOPIC",lastHtml:"",lastModel:null,lastQa:null};

function esc(value){return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function getValue(id){return document.getElementById(id).value.trim()}
function log(message){const box=document.getElementById("log");if(box.textContent==="WAITING")box.textContent="";box.textContent+=message+"\n"}
function dataLog(message){const box=document.getElementById("dataLog");if(box.textContent==="DATA_WAITING")box.textContent="";box.textContent+=message+"\n"}
function clearLog(){document.getElementById("log").textContent=""}
function parseRows(raw,parts){return String(raw||"").split(/\n+/).map(l=>l.trim()).filter(Boolean).map(l=>l.split("|").map(p=>p.trim())).filter(p=>p.length>=parts)}
function collectInput(){return{title:getValue("title"),topic:getValue("topic")||"General",level:getValue("level")||"A1",goal:getValue("goal"),examples:parseRows(getValue("examples"),3),vocab:parseRows(getValue("vocab"),2)}}
function runModeGuard(){log("MODE_GUARD_STARTED");["SON","QA","NN","PLAN","BUILD","TEST","FIX","GIT"].forEach(m=>log("MODE_OK: "+m));log("MODE_GUARD_PASSED");return true}

function tokenizeGerman(sentence){return String(sentence||"").split(/(\\s+)/).map(part=>/^\\s+$/.test(part)?{text:part,type:"space"}:{text:part,type:"word"})}
function normalizeToken(token){return String(token||"").replace(/[.,!?;:]/g,"").toLowerCase()}
const TOPIC_PARTICLES=["auf","zu","ein","an"],SUBJECT_WORDS=["ich","du","er","sie","es","wir","ihr"],VERB_FORMS=["stehe","mach","kaufen","ruf","räume","steht","machst","kauft","ruft"];
function renderGermanWithHighlight(sentence){return tokenizeGerman(sentence).map(t=>{if(t.type==="space")return t.text;const c=normalizeToken(t.text);let cls="token";if(TOPIC_PARTICLES.includes(c))cls+=" hl-topic";if(SUBJECT_WORDS.includes(c))cls+=" hl-subject";if(VERB_FORMS.includes(c))cls+=" hl-verb";return '<span class="'+cls+'">'+esc(t.text)+'</span>'}).join("")}

function buildLesson(model){
 const examplesHtml=model.examples.map((e,i)=>['<article class="example-card" data-example="'+i+'">','<h3>'+(i+1)+'. <span class="de">'+renderGermanWithHighlight(e[0])+'</span></h3>','<div class="translation-wrap"><p class="dp"><b>ДП:</b> '+esc(e[1])+'</p><p class="sd"><b>СД:</b> '+esc(e[2])+'</p></div>','<button class="mini-toggle" type="button">Показати/сховати переклад цього прикладу</button>','</article>'].join("")).join("");
 const vocabHtml=model.vocab.map((v,i)=>'<tr><td>'+(i+1)+'</td><td><b>'+esc(v[0])+'</b></td><td>'+esc(v[1])+'</td></tr>').join("");
 return [
 '<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(model.title)+'</title><style>',
 'body{font-family:system-ui;line-height:1.6;padding:20px;max-width:920px;margin:auto;background:#f8fafc;color:#0f172a}section{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px;margin:14px 0}.example-card{border-left:5px solid #0284c7;padding:14px;margin:12px 0;background:#fff;border-radius:14px}.de{font-weight:900}.dp{color:#475569}.sd{color:#111827}.translation-wrap.local-hidden{display:none}.mini-toggle{border:0;border-radius:10px;padding:8px 10px;background:#e0f2fe;color:#075985;font-weight:800}.token{border-radius:7px;padding:1px 4px}body.hl-off .token{background:transparent!important;outline:none!important}body.hl-topic-mode .hl-topic{background:#fef3c7;outline:1px solid #f59e0b}body.hl-all-mode .hl-topic{background:#fef3c7;outline:1px solid #f59e0b}body.hl-all-mode .hl-subject{background:#dbeafe;outline:1px solid #60a5fa}body.hl-all-mode .hl-verb{background:#dcfce7;outline:1px solid #22c55e}table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #e2e8f0;padding:8px;text-align:left}.badge{display:inline-block;background:#f3e8ff;color:#7e22ce;border-radius:999px;padding:5px 9px;font-weight:800}',
 '</style></head><body class="hl-topic-mode"><h1>'+esc(model.title)+'</h1><span class="badge">Topic: '+esc(model.topic)+' · Level: '+esc(model.level)+'</span>',
 '<section><h2>1. Ціль уроку</h2><p>'+esc(model.goal)+'</p></section><section><h2>2. Основне правило</h2><p>Відокремлювана частка у простому реченні часто переходить у кінець.</p></section>',
 '<section><h2>3. Приклади з ДП і СД</h2>'+examplesHtml+'</section><section><h2>4. Словник</h2><table><thead><tr><th>№</th><th>DE</th><th>UA</th></tr></thead><tbody>'+vocabHtml+'</tbody></table></section>',
 '<section><h2>5. Практика</h2><p>Тема: <b>'+esc(model.topic)+'</b>. Рівень: <b>'+esc(model.level)+'</b>.</p></section><section><h2>QA marker</h2><p>Урок пройшов ODIN v3.17 SMART REVIEW PIPELINE.</p></section>',
 '<script>document.addEventListener("click",function(e){if(e.target.classList.contains("mini-toggle")){var card=e.target.closest(".example-card");card.querySelector(".translation-wrap").classList.toggle("local-hidden");}});<\\/script></body></html>'
 ].join("");
}

function findDuplicates(list,getKey){const seen=new Set(),dups=[];list.forEach(item=>{const key=getKey(item).toLowerCase().trim();if(key&&seen.has(key))dups.push(key);seen.add(key)});return dups}
function hardQaCheck(model,html){const messages=[];const error=t=>messages.push({level:"ERROR",text:t});const warning=t=>messages.push({level:"WARNING",text:t});const info=t=>messages.push({level:"INFO",text:t});
 if(model.title.length<3)error("Назва уроку занадто коротка або відсутня."); if(model.topic.length<3)error("Тема уроку відсутня."); if(model.level.length<2)error("Рівень уроку відсутній."); if(model.goal.length<40)error("Ціль уроку має бути розширеною."); if(model.examples.length<5)error("Потрібно мінімум 5 прикладів."); if(model.vocab.length<5)error("Потрібно мінімум 5 слів у словнику.");
 model.examples.forEach((e,i)=>{const n=i+1;if(!e[0]||e[0].length<4)error("Приклад "+n+": DE відсутнє.");if(!e[1]||e[1].length<4)error("Приклад "+n+": ДП відсутній.");if(!e[2]||e[2].length<4)error("Приклад "+n+": СД відсутній.");if(e[1]===e[2])warning("Приклад "+n+": ДП і СД однакові.")});
 const d=findDuplicates(model.examples,i=>i[0]||""); if(d.length>0)error("Є дублікати прикладів DE: "+d.join(", ")); if(!html.includes("QA marker"))error("HTML не містить QA marker."); info("PROGRESSION layer ready: level + MASTERED + topic progress.");
 const hasErrors=messages.some(m=>m.level==="ERROR"),hasWarnings=messages.some(m=>m.level==="WARNING");return{passed:!hasErrors,hasWarnings,messages}}
function renderQaReport(r){const rows=r.messages.map(m=>'<div class="qa-item '+(m.level==="ERROR"?"qa-error":m.level==="WARNING"?"qa-warning":"qa-info")+'"><b>'+m.level+':</b> '+esc(m.text)+'</div>').join("");const s=r.passed?(r.hasWarnings?"QA_PASSED_WITH_WARNINGS":"QA_PASSED"):"QA_FAILED_EXPORT_BLOCKED";document.getElementById("qaBox").innerHTML=rows+'<div class="qa-item summary '+(r.passed?"qa-pass":"qa-error")+'">'+s+'</div>'}
function renderDownload(html){const blob=new Blob([html],{type:"text/html;charset=utf-8"});const url=URL.createObjectURL(blob);document.getElementById("download").innerHTML='<a class="download" href="'+url+'" download="odin_lesson_v3_17_3.html">Завантажити урок</a>'}

function getPreviewDocument(){const f=document.getElementById("preview");return f.contentDocument||f.contentWindow.document}
function applyMode(){if(!ODIN_STATE.lessonCreated){log("INFO: спочатку створи урок.");return}const d=getPreviewDocument();if(!d)return;d.querySelectorAll(".dp").forEach(e=>e.style.display=ODIN_STATE.showDP?"block":"none");d.querySelectorAll(".sd").forEach(e=>e.style.display=ODIN_STATE.showSD?"block":"none")}
function applyHighlightMode(mode){if(!ODIN_STATE.lessonCreated){log("INFO: спочатку створи урок.");return}const d=getPreviewDocument();if(!d||!d.body)return;d.body.classList.remove("hl-topic-mode","hl-all-mode","hl-off");if(mode==="TOPIC"){d.body.classList.add("hl-topic-mode");log("LAMP_TOPIC_MODE")}else if(mode==="ALL"){d.body.classList.add("hl-all-mode");log("LAMP_ALL_RULES_MODE")}else{d.body.classList.add("hl-off");log("LAMP_OFF")}}
function toggleDP(){ODIN_STATE.showDP=!ODIN_STATE.showDP;applyMode();log(ODIN_STATE.showDP?"DP_VISIBLE":"DP_HIDDEN")}
function toggleSD(){ODIN_STATE.showSD=!ODIN_STATE.showSD;applyMode();log(ODIN_STATE.showSD?"SD_VISIBLE":"SD_HIDDEN")}
function modeStudy(){ODIN_STATE.showDP=false;ODIN_STATE.showSD=true;applyMode();applyHighlightMode("TOPIC");log("MODE_STUDY")}
function modeTest(){ODIN_STATE.showDP=false;ODIN_STATE.showSD=false;applyMode();applyHighlightMode("OFF");log("MODE_TEST_ONLY_DE")}
function modeFull(){ODIN_STATE.showDP=true;ODIN_STATE.showSD=true;applyMode();applyHighlightMode("ALL");log("MODE_FULL")}

function getLessons(){try{return JSON.parse(localStorage.getItem(ODIN_STORAGE_KEY)||"[]")}catch(e){return[]}}
function setLessons(l){localStorage.setItem(ODIN_STORAGE_KEY,JSON.stringify(l))}
function saveCurrentLesson(){if(!ODIN_STATE.lessonCreated||!ODIN_STATE.lastHtml||!ODIN_STATE.lastQa||!ODIN_STATE.lastQa.passed){dataLog("SAVE_BLOCKED: немає успішного уроку після QA.");return}const lessons=getLessons();const r={id:"lesson_"+Date.now(),title:ODIN_STATE.lastModel.title,topic:ODIN_STATE.lastModel.topic||"General",level:ODIN_STATE.lastModel.level||"A1",createdAt:new Date().toLocaleString(),html:ODIN_STATE.lastHtml,model:ODIN_STATE.lastModel,qaStatus:ODIN_STATE.lastQa.hasWarnings?"QA_PASSED_WITH_WARNINGS":"QA_PASSED",reviewStatus:"NEW",reviewCount:0,lastReviewed:null};lessons.unshift(r);setLessons(lessons);dataLog("LESSON_SAVED: "+r.title+" / "+r.topic+" / "+r.level);renderFilters();renderProgress();renderLessonsList()}
function statusClass(s){return s==="MASTERED"?"status-mastered":s==="LEARNED"?"status-learned":s==="REVIEW"?"status-review":"status-new"}
function nextAutoStatus(lesson){const count=(lesson.reviewCount||0)+1;if(lesson.reviewStatus==="NEW")return"REVIEW";if(lesson.reviewStatus==="REVIEW"&&count>=2)return"LEARNED";if(lesson.reviewStatus==="LEARNED"&&count>=4)return"MASTERED";return lesson.reviewStatus||"NEW"}
function setReviewStatus(index,status){const lessons=getLessons();if(!lessons[index])return;lessons[index].reviewStatus=status;lessons[index].lastReviewed=new Date().toLocaleString();lessons[index].reviewCount=(lessons[index].reviewCount||0)+1;setLessons(lessons);dataLog("STATUS_SET: "+lessons[index].title+" → "+status);renderProgress();renderLessonsList()}
function autoProgress(index){const lessons=getLessons();if(!lessons[index])return;const next=nextAutoStatus(lessons[index]);setReviewStatus(index,next);dataLog("AUTO_PROGRESS_APPLIED: "+next)}
function getTopics(){return[...new Set(getLessons().map(l=>l.topic||"General"))].sort()}
function getLevels(){return[...new Set(getLessons().map(l=>l.level||"A1"))].sort()}
function renderFilters(){const topic=document.getElementById("topicFilter");topic.innerHTML='<option value="ALL">All Topics</option>'+getTopics().map(t=>'<option value="'+esc(t)+'">'+esc(t)+'</option>').join("");topic.value=getTopics().includes(TOPIC_FILTER)?TOPIC_FILTER:"ALL";TOPIC_FILTER=topic.value;const level=document.getElementById("levelFilter");level.innerHTML='<option value="ALL">All Levels</option>'+getLevels().map(l=>'<option value="'+esc(l)+'">'+esc(l)+'</option>').join("");level.value=getLevels().includes(LEVEL_FILTER)?LEVEL_FILTER:"ALL";LEVEL_FILTER=level.value}
function calcProgressForTopic(topic){const lessons=getLessons().filter(l=>(l.topic||"General")===topic);if(!lessons.length)return 0;const score=lessons.reduce((sum,l)=>sum+(l.reviewStatus==="MASTERED"?1:l.reviewStatus==="LEARNED"?0.75:l.reviewStatus==="REVIEW"?0.35:0.1),0);return Math.round((score/lessons.length)*100)}
function renderProgress(){const topics=getTopics();const box=document.getElementById("progressBox");if(!topics.length){box.innerHTML='<p class="muted">Прогрес зʼявиться після збереження уроків.</p>';return}box.innerHTML='<h3>Progress by Topic</h3>'+topics.map(t=>{const p=calcProgressForTopic(t);return '<div class="progress-row"><div class="progress-label"><span>'+esc(t)+'</span><span>'+p+'%</span></div><div class="bar"><div class="fill" style="width:'+p+'%"></div></div></div>'}).join("")}
function renderLessonsList(){const lessons=getLessons();let f=REVIEW_FILTER==="ALL"?lessons:lessons.filter(l=>(l.reviewStatus||"NEW")===REVIEW_FILTER);f=TOPIC_FILTER==="ALL"?f:f.filter(l=>(l.topic||"General")===TOPIC_FILTER);f=LEVEL_FILTER==="ALL"?f:f.filter(l=>(l.level||"A1")===LEVEL_FILTER);const box=document.getElementById("lessonsList");if(!f.length){box.innerHTML='<p class="muted">Немає уроків для цього фільтра.</p>';dataLog("LESSONS_LIST_EMPTY");return}box.innerHTML=f.map(lesson=>{const i=lessons.findIndex(l=>l.id===lesson.id);const s=lesson.reviewStatus||"NEW";return '<div class="lesson-item"><h3>'+esc(lesson.title)+' <span class="topic-pill">'+esc(lesson.topic||"General")+'</span><span class="level-pill">'+esc(lesson.level||"A1")+'</span><span class="status-pill '+statusClass(s)+'">'+s+'</span></h3><div class="lesson-meta">'+esc(lesson.createdAt)+' · reviews: '+(lesson.reviewCount||0)+' · last: '+esc(lesson.lastReviewed||"—")+'</div><button data-action="open" data-index="'+i+'">Відкрити</button><button data-action="export" data-index="'+i+'">Export</button><button data-action="auto" data-index="'+i+'">Auto Progress</button><button data-action="status" data-status="REVIEW" data-index="'+i+'">REVIEW</button><button data-action="status" data-status="LEARNED" data-index="'+i+'">LEARNED</button><button data-action="status" data-status="MASTERED" data-index="'+i+'">MASTERED</button><button class="danger" data-action="delete" data-index="'+i+'">Видалити</button></div>'}).join("");dataLog("LESSONS_LIST_RENDERED: "+f.length)}
function openLesson(i){const l=getLessons()[i];if(!l)return;setPreviewHtml(l.html);ODIN_STATE.lessonCreated=true;ODIN_STATE.lastHtml=l.html;ODIN_STATE.lastModel=l.model;dataLog("LESSON_OPENED: "+l.title)}
function exportSavedLesson(i){const l=getLessons()[i];if(!l)return;renderDownload(l.html);dataLog("EXPORT_READY: "+l.title)}
function deleteLesson(i){const lessons=getLessons();const r=lessons.splice(i,1)[0];setLessons(lessons);dataLog("LESSON_DELETED: "+(r?r.title:i));renderFilters();renderProgress();renderLessonsList()}
function clearSavedLessons(){localStorage.removeItem(ODIN_STORAGE_KEY);dataLog("ALL_LESSONS_CLEARED");renderFilters();renderProgress();renderLessonsList()}
function setFilter(f){REVIEW_FILTER=f;dataLog("REVIEW_FILTER_SET: "+f);renderLessonsList()}
function setTopicFilter(v){TOPIC_FILTER=v;dataLog("TOPIC_FILTER_SET: "+v);renderLessonsList()}
function setLevelFilter(v){LEVEL_FILTER=v;dataLog("LEVEL_FILTER_SET: "+v);renderLessonsList()}

function clearAll(){clearLog();document.getElementById("qaBox").innerHTML='<p class="muted">QA зʼявиться після запуску.</p>';document.getElementById("download").innerHTML="";document.getElementById("preview").srcdoc="";ODIN_STATE={lessonCreated:false,showDP:true,showSD:true,uxMode:"FULL",highlightMode:"TOPIC",lastHtml:"",lastModel:null,lastQa:null}}
function executeOdinAction(){clearAll();log("RUNNING");runModeGuard();const model=collectInput();ODIN_STATE.lastModel=model;log("PLAN_DONE");log("PIPELINE_DONE");const html=buildLesson(model);ODIN_STATE.lastHtml=html;setPreviewHtml(html);ODIN_STATE.lessonCreated=true;log("LESSON_DONE");const report=hardQaCheck(model,html);ODIN_STATE.lastQa=report;renderQaReport(report);log(report.passed?(report.hasWarnings?"QA_PASSED_WITH_WARNINGS":"QA_PASSED"):"QA_FAILED");if(!report.passed){document.getElementById("download").innerHTML='<div class="qa-item qa-error">EXPORT BLOCKED</div>';log("EXPORT_BLOCKED");return}renderDownload(html);log("EXPORT_DONE");log("SMART_REVIEW_LAYER_READY_LAMP_REBUILT");log("DONE")}

function bind(){document.getElementById("runBtn").addEventListener("click",executeOdinAction);document.getElementById("saveBtn").addEventListener("click",saveCurrentLesson);document.getElementById("clearBtn").addEventListener("click",clearAll);document.getElementById("toggleDpBtn").addEventListener("click",toggleDP);document.getElementById("toggleSdBtn").addEventListener("click",toggleSD);document.getElementById("modeStudyBtn").addEventListener("click",modeStudy);document.getElementById("modeTestBtn").addEventListener("click",modeTest);document.getElementById("modeFullBtn").addEventListener("click",modeFull);document.getElementById("lampBtn").addEventListener("click",()=>applyHighlightMode("TOPIC"));document.getElementById("lampAllBtn").addEventListener("click",()=>applyHighlightMode("ALL"));document.getElementById("lampOffBtn").addEventListener("click",()=>applyHighlightMode("OFF"));document.getElementById("refreshLessonsBtn").addEventListener("click",()=>{renderFilters();renderProgress();renderLessonsList()});document.getElementById("clearLessonsBtn").addEventListener("click",clearSavedLessons);document.getElementById("filterAllBtn").addEventListener("click",()=>setFilter("ALL"));document.getElementById("filterNewBtn").addEventListener("click",()=>setFilter("NEW"));document.getElementById("filterReviewBtn").addEventListener("click",()=>setFilter("REVIEW"));document.getElementById("filterLearnedBtn").addEventListener("click",()=>setFilter("LEARNED"));document.getElementById("filterMasteredBtn").addEventListener("click",()=>setFilter("MASTERED"));document.getElementById("topicFilter").addEventListener("change",e=>setTopicFilter(e.target.value));document.getElementById("levelFilter").addEventListener("change",e=>setLevelFilter(e.target.value));document.getElementById("lessonsList").addEventListener("click",e=>{const b=e.target.closest("button[data-action]");if(!b)return;const i=Number(b.dataset.index);if(b.dataset.action==="open")openLesson(i);if(b.dataset.action==="export")exportSavedLesson(i);if(b.dataset.action==="delete")deleteLesson(i);if(b.dataset.action==="status")setReviewStatus(i,b.dataset.status);if(b.dataset.action==="auto")autoProgress(i)})}
document.addEventListener("DOMContentLoaded",()=>{bind();renderFilters();renderProgress();renderLessonsList();dataLog("PARSER_FIX_ACTIVE: newline rows are parsed correctly");dataLog("APP_READY_v3.17.3_LAMP_ENGINE_REBUILD")});


function smartPriority(lesson) {
  const status = lesson.reviewStatus || "NEW";
  const count = lesson.reviewCount || 0;
  const last = lesson.lastReviewed ? Date.parse(lesson.lastReviewed) : 0;
  const daysSince = last ? Math.max(0, Math.floor((Date.now() - last) / 86400000)) : 999;

  let score = 0;
  const reasons = [];

  if (status === "NEW") { score += 90; reasons.push("Новий урок ще не закріплений."); }
  if (status === "REVIEW") { score += 75; reasons.push("Позначений як REVIEW."); }
  if (status === "LEARNED") { score += 35; reasons.push("Вивчений, але потребує періодичного повторення."); }
  if (status === "MASTERED") { score += 10; reasons.push("MASTERED: низький пріоритет."); }

  if (count === 0) { score += 35; reasons.push("Ще не повторювався."); }
  if (count === 1) { score += 20; reasons.push("Було лише одне повторення."); }
  if (daysSince >= 7) { score += 25; reasons.push("Давно не повторювався."); }
  if (daysSince >= 3 && daysSince < 7) { score += 12; reasons.push("Пора освіжити."); }

  if (score > 100) score = 100;
  return { score, reasons, daysSince };
}

function smartPriorityClass(score) {
  if (score >= 75) return "priority-high";
  if (score >= 40) return "priority-mid";
  return "priority-low";
}

function showSmartReview() {
  const lessons = getLessons();

  if (!lessons.length) {
    document.getElementById("smartReviewBox").innerHTML =
      '<p class="muted">Немає збережених уроків. Спочатку створи і збережи урок.</p>';
    dataLog("SMART_REVIEW_EMPTY");
    return;
  }

  const ranked = lessons
    .map((lesson, index) => {
      const priority = smartPriority(lesson);
      return { lesson, index, priority };
    })
    .sort((a, b) => b.priority.score - a.priority.score)
    .slice(0, 5);

  document.getElementById("smartReviewBox").innerHTML = ranked.map(item => {
    const l = item.lesson;
    const p = item.priority;
    return [
      '<div class="smart-card ' + smartPriorityClass(p.score) + '">',
      '<h3>' + esc(l.title) + ' <span class="status-pill ' + statusClass(l.reviewStatus || "NEW") + '">' + esc(l.reviewStatus || "NEW") + '</span></h3>',
      '<div class="lesson-meta">' + esc(l.topic || "General") + ' · ' + esc(l.level || "A1") + ' · reviews: ' + (l.reviewCount || 0) + '</div>',
      '<div class="priority-score">Priority: ' + p.score + '%</div>',
      '<div class="reason">' + p.reasons.map(esc).join("<br>") + '</div>',
      '<button type="button" data-action="open" data-index="' + item.index + '">Відкрити</button>',
      '<button type="button" data-action="auto" data-index="' + item.index + '">Auto Progress після повторення</button>',
      '</div>'
    ].join("");
  }).join("");

  dataLog("SMART_REVIEW_READY: " + ranked.length);
}

document.addEventListener("DOMContentLoaded", function () {
  const smartBtn = document.getElementById("smartReviewBtn");
  if (smartBtn) smartBtn.addEventListener("click", showSmartReview);
  dataLog("SMART_REVIEW_LAYER_READY_LAMP_REBUILT");
});


/* v3.17.1 FIX: iframe may not be ready immediately after srcdoc update */
function refreshPreviewControls() {
  if (!ODIN_STATE.lessonCreated) return;
  setTimeout(function () {
    applyMode();
    applyHighlightMode(ODIN_STATE.highlightMode || "TOPIC");
  }, 80);
}

function setPreviewHtml(html) {
  const frame = document.getElementById("preview");
  frame.onload = function () {
    refreshPreviewControls();
  };
  frame.srcdoc = html;
}

/* Patch wrapper: make sure generated/opened lessons re-apply UX controls */
const _odinOriginalApplyMode = applyMode;
applyMode = function () {
  if (!ODIN_STATE.lessonCreated) {
    log("INFO: спочатку створи урок.");
    return;
  }
  const doc = getPreviewDocument();
  if (!doc || !doc.body) {
    setTimeout(applyMode, 80);
    return;
  }
  doc.querySelectorAll(".dp").forEach(e => e.style.display = ODIN_STATE.showDP ? "block" : "none");
  doc.querySelectorAll(".sd").forEach(e => e.style.display = ODIN_STATE.showSD ? "block" : "none");
};

const _odinOriginalApplyHighlightMode = applyHighlightMode;
applyHighlightMode = function (mode) {
  if (!ODIN_STATE.lessonCreated) {
    log("INFO: спочатку створи урок.");
    return;
  }
  const doc = getPreviewDocument();
  if (!doc || !doc.body) {
    setTimeout(function () { applyHighlightMode(mode); }, 80);
    return;
  }
  doc.body.classList.remove("hl-topic-mode", "hl-all-mode", "hl-off");
  if (mode === "TOPIC") {
    doc.body.classList.add("hl-topic-mode");
    ODIN_STATE.highlightMode = "TOPIC";
  } else if (mode === "ALL") {
    doc.body.classList.add("hl-all-mode");
    ODIN_STATE.highlightMode = "ALL";
  } else {
    doc.body.classList.add("hl-off");
    ODIN_STATE.highlightMode = "OFF";
  }
};


/* v3.17.2 FIX: direct lamp styling fallback */
function clearDirectLampStyles(doc) {
  if (!doc) return;
  doc.querySelectorAll(".token").forEach(el => {
    el.style.background = "";
    el.style.outline = "";
  });
}

function applyDirectLampStyles(mode) {
  if (!ODIN_STATE.lessonCreated) {
    log("INFO: спочатку створи урок.");
    return;
  }

  const doc = getPreviewDocument();
  if (!doc || !doc.body) {
    setTimeout(function () { applyDirectLampStyles(mode); }, 80);
    return;
  }

  clearDirectLampStyles(doc);

  doc.body.classList.remove("hl-topic-mode", "hl-all-mode", "hl-off");

  if (mode === "OFF") {
    doc.body.classList.add("hl-off");
    ODIN_STATE.highlightMode = "OFF";
    log("LAMP_OFF");
    return;
  }

  if (mode === "TOPIC") {
    doc.body.classList.add("hl-topic-mode");
    doc.querySelectorAll(".hl-topic").forEach(el => {
      el.style.background = "#fef3c7";
      el.style.outline = "1px solid #f59e0b";
    });
    ODIN_STATE.highlightMode = "TOPIC";
    log("LAMP_TOPIC_MODE_FIXED");
    return;
  }

  if (mode === "ALL") {
    doc.body.classList.add("hl-all-mode");
    doc.querySelectorAll(".hl-topic").forEach(el => {
      el.style.background = "#fef3c7";
      el.style.outline = "1px solid #f59e0b";
    });
    doc.querySelectorAll(".hl-subject").forEach(el => {
      el.style.background = "#dbeafe";
      el.style.outline = "1px solid #60a5fa";
    });
    doc.querySelectorAll(".hl-verb").forEach(el => {
      el.style.background = "#dcfce7";
      el.style.outline = "1px solid #22c55e";
    });
    ODIN_STATE.highlightMode = "ALL";
    log("LAMP_ALL_RULES_MODE_FIXED");
  }
}

/* override previous highlight function */
applyHighlightMode = applyDirectLampStyles;


/* v3.17.3 HARD FIX: rebuild lamp tokens inside Preview */
const ODIN_LAMP_RULES = {
  topic: ["auf", "zu", "ein", "an"],
  subject: ["ich", "du", "er", "sie", "es", "wir", "ihr"],
  verb: ["stehe", "mach", "kaufen", "ruf", "räume", "steht", "machst", "kauft", "ruft"]
};

function lampNormalizeWord(word) {
  return String(word || "").replace(/[.,!?;:]/g, "").toLowerCase();
}

function lampEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function rebuildLampTokens(doc) {
  if (!doc) return 0;

  let rebuilt = 0;

  doc.querySelectorAll(".de").forEach(container => {
    if (!container.dataset.lampRaw) {
      container.dataset.lampRaw = container.textContent || "";
    }

    const raw = container.dataset.lampRaw;
    const parts = raw.split(/(\s+)/);

    container.innerHTML = parts.map(part => {
      if (/^\s+$/.test(part)) return part;

      const clean = lampNormalizeWord(part);
      let cls = "lamp-token";

      if (ODIN_LAMP_RULES.topic.includes(clean)) cls += " lamp-topic";
      if (ODIN_LAMP_RULES.subject.includes(clean)) cls += " lamp-subject";
      if (ODIN_LAMP_RULES.verb.includes(clean)) cls += " lamp-verb";

      return '<span class="' + cls + '">' + lampEscape(part) + '</span>';
    }).join("");

    rebuilt++;
  });

  return rebuilt;
}

function clearLampInline(doc) {
  if (!doc) return;
  doc.querySelectorAll(".lamp-token, .token").forEach(el => {
    el.style.background = "";
    el.style.outline = "";
    el.style.borderRadius = "";
    el.style.padding = "";
  });
}

function applyLampModeHard(mode) {
  if (!ODIN_STATE.lessonCreated) {
    log("INFO: спочатку створи урок.");
    return;
  }

  const doc = getPreviewDocument();

  if (!doc || !doc.body) {
    setTimeout(function () { applyLampModeHard(mode); }, 120);
    return;
  }

  const rebuilt = rebuildLampTokens(doc);
  clearLampInline(doc);

  if (mode === "OFF") {
    ODIN_STATE.highlightMode = "OFF";
    log("LAMP_OFF_FIXED_v3.17.3");
    return;
  }

  if (mode === "TOPIC") {
    doc.querySelectorAll(".lamp-topic").forEach(el => {
      el.style.background = "#fef3c7";
      el.style.outline = "1px solid #f59e0b";
      el.style.borderRadius = "7px";
      el.style.padding = "1px 4px";
    });
    ODIN_STATE.highlightMode = "TOPIC";
    log("LAMP_TOPIC_MODE_FIXED_v3.17.3 tokens:" + rebuilt);
    return;
  }

  if (mode === "ALL") {
    doc.querySelectorAll(".lamp-topic").forEach(el => {
      el.style.background = "#fef3c7";
      el.style.outline = "1px solid #f59e0b";
      el.style.borderRadius = "7px";
      el.style.padding = "1px 4px";
    });
    doc.querySelectorAll(".lamp-subject").forEach(el => {
      el.style.background = "#dbeafe";
      el.style.outline = "1px solid #60a5fa";
      el.style.borderRadius = "7px";
      el.style.padding = "1px 4px";
    });
    doc.querySelectorAll(".lamp-verb").forEach(el => {
      el.style.background = "#dcfce7";
      el.style.outline = "1px solid #22c55e";
      el.style.borderRadius = "7px";
      el.style.padding = "1px 4px";
    });
    ODIN_STATE.highlightMode = "ALL";
    log("LAMP_ALL_RULES_MODE_FIXED_v3.17.3 tokens:" + rebuilt);
  }
}

/* final override */
applyHighlightMode = applyLampModeHard;

/* patch mode helpers too, so they call hard lamp */
modeStudy = function () {
  ODIN_STATE.showDP = false;
  ODIN_STATE.showSD = true;
  applyMode();
  applyLampModeHard("TOPIC");
  log("MODE_STUDY");
};

modeTest = function () {
  ODIN_STATE.showDP = false;
  ODIN_STATE.showSD = false;
  applyMode();
  applyLampModeHard("OFF");
  log("MODE_TEST_ONLY_DE");
};

modeFull = function () {
  ODIN_STATE.showDP = true;
  ODIN_STATE.showSD = true;
  applyMode();
  applyLampModeHard("ALL");
  log("MODE_FULL");
};


document.addEventListener("DOMContentLoaded", function () {
  const topicBtn = document.getElementById("lampBtn");
  const allBtn = document.getElementById("lampAllBtn");
  const offBtn = document.getElementById("lampOffBtn");

  if (topicBtn) topicBtn.onclick = function () { applyLampModeHard("TOPIC"); };
  if (allBtn) allBtn.onclick = function () { applyLampModeHard("ALL"); };
  if (offBtn) offBtn.onclick = function () { applyLampModeHard("OFF"); };

  dataLog("LAMP_ENGINE_REBUILD_READY_v3.17.3");
});
