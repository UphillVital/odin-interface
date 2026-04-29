let CURRENT_HTML="",CURRENT_META=null,QA_STATE="WAIT";
const SKEY="odin_v046_session",LKEY="odin_v046_lessons";
function uid(){return"lesson_"+Date.now()+"_"+Math.random().toString(16).slice(2)}
function esc(s){return String(s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}
function fn(s){return String(s||"lesson").replace(/[^a-zA-Z0-9А-Яа-яЇїІіЄєҐґ_-]+/g,"_").slice(0,70)}
function setStatus(k,v,c){const el=document.getElementById(k);if(!el)return;el.textContent=v;el.className=c||""}
function updateStatuses(){setStatus("stEngine","OK","ok");setStatus("stPreview",CURRENT_HTML?"OK":"WAIT",CURRENT_HTML?"ok":"warn");setStatus("stQA",QA_STATE,QA_STATE==="PASS"?"ok":QA_STATE==="FAIL"?"bad":"warn");setStatus("stExport",CURRENT_HTML&&QA_STATE==="PASS"?"READY":"WAIT",CURRENT_HTML&&QA_STATE==="PASS"?"ok":"warn")}
function preset(p){if(p==="FAST"){lessonType.value="LESSON_FROM_TOPIC";mode.value="STRUCTURED";density.value="FAST"}if(p==="PRO"){lessonType.value="LESSON_FROM_TOPIC";mode.value="HYBRID";density.value="PRO"}if(p==="REVIEW"){lessonType.value="LESSON_REVIEW";mode.value="STRUCTURED";density.value="PRO"}if(p==="MIX"){lessonType.value="LESSON_MIX";mode.value="HYBRID";density.value="MAX"}reportOut.textContent="PRESET: "+p;updateStatuses()}
function getSession(){try{return JSON.parse(localStorage.getItem(SKEY))||[]}catch(e){return[]}}
function saveSession(d){localStorage.setItem(SKEY,JSON.stringify(d,null,2));renderSession()}
function kind(f){const p=(f.path||"").toLowerCase();if(p.includes("template_base"))return"LESSON_TEMPLATE";if(p.includes("template"))return"ISH/TEMPLATE";if(p.includes("translation")||p.includes("rn_dp_sd"))return"TRANSLATION_LOCK";if(p.includes("highlight")||p.includes("lm_markup"))return"HIGHLIGHT_SYSTEM";if(p.includes("qa"))return"QA_ENGINE";if(p.includes("lesson"))return"LESSON_SYSTEM";if(p.includes("rule")||p.includes("lock"))return"RULE/LOCK";return"DOCUMENT"}
function addSession(f){const d=getSession();const r={title:f.title,path:f.path,type:f.type,layer:f.layer,status:f.status,kind:kind(f),used_at:new Date().toISOString()};if(!d.some(x=>x.path===r.path))d.push(r);saveSession(d)}
function clearSession(){localStorage.removeItem(SKEY);renderSession()}
function renderSession(){const el=sessionList;if(!el)return;const d=getSession();el.innerHTML=d.length?d.map((f,i)=>`<div class="item"><b>${i+1}. ${esc(f.title)}</b><br><small>${esc(f.kind)} · ${esc(f.path)}</small></div>`).join(""):"<p class='meta'>Session порожня.</p>"}
function files(){try{return ODIN_TREE_DATA.flatMap(g=>g.items||[])}catch(e){return[]}}
function autoSelect(){const names=["TEMPLATE_BASE_v1.html","TEMPLATE_RULES.md","TRANSLATION_LOCK.md","RN_DP_SD_STANDARD.md","HIGHLIGHT_SYSTEM_OVERVIEW.md","QA_SYSTEM_OVERVIEW.md","LESSON_STRUCTURE.md"];const all=files();let count=0;names.forEach(n=>{const f=all.find(x=>(x.title||"").toLowerCase()===n.toLowerCase());if(f){addSession(f);count++}});reportOut.textContent="AUTO SELECT CORE: "+count+" files";updateStatuses()}
function initTree(){const t=tree;let data=[];try{data=ODIN_TREE_DATA}catch(e){}t.innerHTML="";data.forEach(g=>{const h=document.createElement("div");h.className="group";h.textContent=g.group;t.appendChild(h);(g.items||[]).forEach(f=>{const e=document.createElement("div");e.className="file";e.textContent=f.title;e.onclick=()=>{addSession(f);viewer.innerHTML="<b>"+esc(f.title)+"</b><br><small>"+esc(f.path)+"</small><p>Added to SESSION.</p>"};t.appendChild(e)})})}
function examples(){let count=density.value==="MAX"?10:density.value==="PRO"?6:3;let a=[["Ich stehe um sieben Uhr auf.","Я встаю о сьомій годині вгору.","Я встаю о сьомій годині."],["Sie kauft heute im Supermarkt ein.","Вона купує сьогодні в супермаркеті всередину.","Вона сьогодні робить покупки в супермаркеті."],["Wir rufen dich später an.","Ми телефонуємо тобі пізніше до.","Ми зателефонуємо тобі пізніше."],["Mach bitte das Fenster zu.","Роби будь ласка вікно до.","Закрий, будь ласка, вікно."],["Der Kurs fängt um neun Uhr an.","Курс починає о дев’ятій годині на.","Курс починається о дев’ятій."],["Ich nehme meine Unterlagen mit.","Я беру мої документи з.","Я беру документи з собою."],["Bitte schreib den Satz auf.","Будь ласка, пиши речення на.","Будь ласка, запиши речення."],["Wir hören jetzt mit der Übung auf.","Ми слухаємо зараз з вправою на.","Ми зараз припиняємо вправу."],["Er macht die Tür zu.","Він робить двері до.","Він зачиняє двері."],["Sie sieht das Wort nach.","Вона дивиться слово після.","Вона шукає слово."]];return a.slice(0,count)}
function generateLesson(){const p={title:topic.value.trim(),task:task.value.trim(),type:lessonType.value,mode:mode.value,level:level.value,density:density.value,session:getSession(),created_at:new Date().toISOString(),version:"V04.6.1_QA_FIX"};const ex=examples().map(e=>`<p><b>РН:</b> <span class="hl">${esc(e[0])}</span><br><span class="dp">ДП: ${esc(e[1])}</span><br><span class="sd">СД: ${esc(e[2])}</span></p>`).join("");const qa=`QA_WAITING\nTYPE: ${p.type}\nMODE: ${p.mode}\nLEVEL: ${p.level}\nDENSITY: ${p.density}\nSESSION: ${p.session.length}`;CURRENT_META={id:uid(),...p,qa};CURRENT_HTML=`<!doctype html><html lang="uk"><head><meta charset="utf-8"><title>${esc(p.title)}</title><style>body{font-family:system-ui;margin:0;background:#f5f7fb;color:#132033;line-height:1.6}header{background:#0f172a;color:white;padding:18px}main{max-width:980px;margin:auto;padding:18px}section{background:white;border:1px solid #dbe5f2;border-radius:20px;padding:16px;margin:14px 0}.badge{background:#dbeafe;color:#1d4ed8;border-radius:99px;padding:4px 10px;font-weight:800}.hl{background:#fef3c7;border-radius:6px;padding:1px 4px}.dp{color:#7c2d12}.sd{color:#14532d}pre{background:#0b1220;color:#e5e7eb;padding:12px;border-radius:12px;white-space:pre-wrap}</style></head><body><header><h1>${esc(p.title)}</h1><p>ODIN V04.6.1 · ${p.type} · ${p.mode} · ${p.level}</p></header><main><section><span class="badge">1. Ціль уроку</span><h2>Мета</h2><p>${esc(p.task)}</p></section><section><span class="badge">2. Основне правило</span><p>Урок побудовано відповідно до вибраного режиму. Для прикладу: у відокремлюваних дієсловах префікс часто переходить у кінець речення.</p></section><section><span class="badge">3. Приклади РН / ДП / СД</span>${ex}</section><section><span class="badge">4. Діалог</span><p><b>A:</b> Wann fängt der Deutschkurs an?<br><span class="dp">ДП: Коли починає німецький курс на?</span><br><span class="sd">СД: Коли починається курс німецької?</span></p><p><b>B:</b> Er fängt um neun Uhr an.<br><span class="dp">ДП: Він починає о дев’ятій годині на.</span><br><span class="sd">СД: Він починається о дев’ятій.</span></p></section><section><span class="badge">5. Словник</span><ul><li>anfangen — починати</li><li>mitbringen — приносити з собою</li><li>zumachen — закривати</li><li>anrufen — телефонувати</li></ul></section><section><span class="badge">6. Практика</span><ol><li>Знайди префікс.</li><li>Зроби ДП і СД.</li><li>Склади власні речення.</li></ol></section><section><span class="badge">7. Домашнє завдання</span><p>Створи власний міні-блок у форматі РН / ДП / СД.</p></section><section><span class="badge">QA Report</span><pre>${esc(qa)}</pre></section></main></body></html>`;out.textContent=CURRENT_HTML;QA_STATE="WAIT";refreshPreview();reportOut.textContent="GENERATED. Run QA CHECK before EXPORT.";updateStatuses()}
function refreshPreview(){lessonPreview.srcdoc=CURRENT_HTML||"<p style='font-family:sans-serif;padding:20px'>Немає згенерованого уроку.</p>";updateStatuses()}

/* V04.6.1 FIX: robust QA marker checks */
function hasAny(html, arr){const h=String(html||"").toLowerCase();return arr.some(x=>h.includes(String(x).toLowerCase()))}
function qaCheck(){
 if(!CURRENT_HTML){
   QA_STATE="FAIL";
   reportOut.textContent="QA_FAILED\nERROR: NO_LESSON_GENERATED";
   updateStatuses();
   return false;
 }

 const checks=[
   ["TITLE_PRESENT", /<h1[^>]*>[\s\S]*?<\/h1>/i.test(CURRENT_HTML)],
   ["GOAL_BLOCK_PRESENT", hasAny(CURRENT_HTML,["Ціль уроку","Мета"])],
   ["RULE_BLOCK_PRESENT", hasAny(CURRENT_HTML,["Основне правило"])],
   ["EXAMPLES_BLOCK_PRESENT", hasAny(CURRENT_HTML,["Приклади РН / ДП / СД","РН:"])],
   ["RN_PRESENT", hasAny(CURRENT_HTML,["РН:"])],
   ["DP_PRESENT", hasAny(CURRENT_HTML,["ДП:"])],
   ["SD_PRESENT", hasAny(CURRENT_HTML,["СД:"])],
   ["DIALOG_PRESENT", hasAny(CURRENT_HTML,["Діалог","<b>A:</b>","<b>B:</b>"])],
   ["VOCABULARY_PRESENT", hasAny(CURRENT_HTML,["Словник","anfangen"])],
   ["PRACTICE_PRESENT", hasAny(CURRENT_HTML,["Практика"])],
   ["HOMEWORK_PRESENT", hasAny(CURRENT_HTML,["Домашнє завдання"])],
   ["HIGHLIGHT_PRESENT", hasAny(CURRENT_HTML,["class=\"hl\"","class='hl'"])],
   ["QA_REPORT_PRESENT", hasAny(CURRENT_HTML,["QA Report"])]
 ];

 const failed=checks.filter(x=>!x[1]);
 QA_STATE=failed.length===0?"PASS":"FAIL";

 const report=[
   QA_STATE==="PASS"?"QA_PASSED":"QA_FAILED",
   "V04.6.1_QA_EXPORT_FIX",
   ...checks.map(x=>(x[1]?"✅ ":"❌ ")+x[0]),
   failed.length?("FAILED_CHECKS: "+failed.map(x=>x[0]).join(", ")):"EXPORT_READY"
 ].join("\n");

 if(CURRENT_META) CURRENT_META.qa=report;
 reportOut.textContent=report;
 updateStatuses();
 return QA_STATE==="PASS";
}

function blobDownload(text,name,type){const b=new Blob([text],{type});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;a.click();URL.revokeObjectURL(a.href)}
function exportPackage(){
 if(!CURRENT_HTML)generateLesson();
 if(!qaCheck()){
   alert("EXPORT BLOCKED: QA_FAILED\nПеревір QA / Export Report.");
   return;
 }
 const base=fn(CURRENT_META.title)+"_"+CURRENT_META.type;
 blobDownload(CURRENT_HTML,base+"_lesson.html","text/html;charset=utf-8");
 blobDownload(JSON.stringify({meta:CURRENT_META,html:CURRENT_HTML},null,2),base+"_lesson.json","application/json;charset=utf-8");
 blobDownload(JSON.stringify({result:QA_STATE,report:CURRENT_META.qa},null,2),base+"_qa_report.json","application/json;charset=utf-8");
 blobDownload(JSON.stringify(CURRENT_META,null,2),base+"_meta.json","application/json;charset=utf-8");
 blobDownload(`# ${CURRENT_META.title}\n\nODIN V04.6.1 export package.\n\nOpen lesson.html in browser.\n\nQA: ${QA_STATE}\n`,base+"_README.md","text/markdown;charset=utf-8");
 setStatus("stExport","DONE","ok");
 reportOut.textContent+="\nEXPORT_PACKAGE_DONE";
}
function getLessons(){try{return JSON.parse(localStorage.getItem(LKEY))||[]}catch(e){return[]}}
function saveLessons(d){localStorage.setItem(LKEY,JSON.stringify(d,null,2));renderLessons()}
function saveLesson(){if(!CURRENT_HTML)generateLesson();saveLessons([{...CURRENT_META,html:CURRENT_HTML,updated_at:new Date().toISOString()},...getLessons()]);alert("LESSON SAVED")}
function loadLesson(id){const l=getLessons().find(x=>x.id===id);if(!l)return;CURRENT_META=l;CURRENT_HTML=l.html;topic.value=l.title;lessonType.value=l.type||"LESSON_FROM_TOPIC";mode.value=l.mode||"HYBRID";level.value=l.level||"A1-A2";out.textContent=l.html;QA_STATE="WAIT";refreshPreview()}
function deleteLesson(id){if(confirm("Delete lesson?"))saveLessons(getLessons().filter(x=>x.id!==id))}
function clearLessons(){if(confirm("Clear all lessons?")){localStorage.removeItem(LKEY);renderLessons()}}
function renderLessons(){const d=getLessons();libraryList.innerHTML=d.length?d.map((l,i)=>`<div class="item"><b>${i+1}. ${esc(l.title)}</b><br><span class="meta">${esc(l.type)} · ${esc(l.mode)} · ${esc(l.level)}</span><div class="actions"><button onclick="loadLesson('${l.id}')">LOAD</button><button class="red" onclick="deleteLesson('${l.id}')">DELETE</button></div></div>`).join(""):"<p class='meta'>Уроків ще немає.</p>"}
document.addEventListener("DOMContentLoaded",()=>{initTree();renderSession();renderLessons();refreshPreview();updateStatuses()});
