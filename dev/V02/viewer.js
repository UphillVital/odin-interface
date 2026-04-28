const treeDiv=document.getElementById('tree');
const viewer=document.getElementById('viewer');
let CURRENT_FILE=null;
let CURRENT_TEXT='';
const USED_KEY='odin_v02_used_files';

function getTreeData(){
  try{
    if(typeof ODIN_TREE_DATA !== 'undefined') return ODIN_TREE_DATA;
  }catch(e){}
  if(window.ODIN_TREE_DATA) return window.ODIN_TREE_DATA;
  return null;
}

function esc(t){return String(t).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}
function fetchPath(path){
  if(path.startsWith('ODIN_TREE_PROJECT_v1/')) return '../../'+path;
  if(path.startsWith('dev/V02/')) return path.replace('dev/V02/','');
  return '../../'+path;
}
function kind(item,text){
  const p=(item.path||'').toLowerCase(), t=(text||'').toLowerCase();
  if(p.includes('template')||t.includes('template_base')) return 'TEMPLATE';
  if(p.includes('qa')) return 'QA';
  if(p.includes('lesson')) return 'LESSON';
  if(p.includes('translation')) return 'TRANSLATION';
  if(p.includes('highlight')) return 'HIGHLIGHT';
  if(p.includes('audio')) return 'AUDIO';
  if(p.includes('package')) return 'PACKAGE';
  if(p.includes('git')) return 'GIT';
  if(p.includes('rule')||p.includes('lock')) return 'RULE/LOCK';
  return 'DOCUMENT';
}
function initTree(){
  treeDiv.innerHTML='<h2>ODIN TREE</h2>';
  const data=getTreeData();
  if(!data){
    treeDiv.innerHTML+='<p>ODIN_TREE_DATA не знайдено. Перевір, що файл odin_tree_data.js лежить у dev/V02/ і підключений перед viewer.js.</p>';
    return;
  }
  data.forEach(group=>{
    const g=document.createElement('div');g.className='group';g.textContent=group.group;treeDiv.appendChild(g);
    group.items.forEach(item=>{
      const el=document.createElement('div');el.className='file';el.textContent=item.title;el.title=item.path;
      el.onclick=()=>openFile(item);treeDiv.appendChild(el);
    });
  });
}
async function openFile(item){
  CURRENT_FILE=item;CURRENT_TEXT='';
  viewer.innerHTML=`<h1>${item.title}</h1><p>${item.path}</p>
  <div class="actions">
    <button class="blue" onclick="runQA()">QA</button>
    <button class="amber" onclick="analyzeFile()">ANALYZE</button>
    <button class="green" onclick="useFile()">USE</button>
  </div>
  <div id="actionResult" class="card">Opening...</div><pre id="fileContent">Loading...</pre>`;
  try{
    const r=await fetch(fetchPath(item.path),{cache:'no-store'});
    if(!r.ok) throw new Error('HTTP '+r.status);
    CURRENT_TEXT=await r.text();
    document.getElementById('fileContent').textContent=CURRENT_TEXT||'(empty file)';
    document.getElementById('actionResult').textContent='OPEN_OK';
  }catch(e){
    CURRENT_TEXT=`OPEN_WARNING: ${e.message}\nPath: ${item.path}\nПорада: відкрий через VS Code Live Server.`;
    document.getElementById('fileContent').textContent=CURRENT_TEXT;
    document.getElementById('actionResult').textContent='OPEN_WARNING';
  }
}
function analyzeFile(){
  if(!CURRENT_FILE)return;
  document.getElementById('actionResult').innerHTML=`<b>ANALYZE_OK</b><br>Kind: ${kind(CURRENT_FILE,CURRENT_TEXT)}<br>Layer: ${CURRENT_FILE.layer||'—'}<br>Status: ${CURRENT_FILE.status||'—'}<br>Chars: ${CURRENT_TEXT.length}<br>Lines: ${CURRENT_TEXT.split('\n').length}`;
}
function runQA(){
  if(!CURRENT_FILE)return;
  const checks=[];
  const path=CURRENT_FILE.path||'', text=CURRENT_TEXT||'';
  function add(icon,msg){checks.push(icon+' '+msg)}
  add('✅','PATH_PRESENT');
  text.length>20?add('✅','CONTENT_PRESENT'):add('⚠️','CONTENT_WEAK');
  if(path.endsWith('.md')) /^#\s+/m.test(text)?add('✅','MD_H1_PRESENT'):add('⚠️','MD_H1_MISSING');
  if(path.endsWith('.json')){try{JSON.parse(text);add('✅','JSON_VALID')}catch(e){add('❌','JSON_INVALID')}}
  if(path.endsWith('.html')) /<html|<!doctype/i.test(text)?add('✅','HTML_STRUCTURE_PRESENT'):add('⚠️','HTML_STRUCTURE_WEAK');
  if(path.includes('TEMPLATE_BASE_v1.html')) /template|lesson|data-tts|lm-|header|topbar/i.test(text)?add('✅','LESSON_TEMPLATE_MARKERS_PRESENT'):add('⚠️','LESSON_TEMPLATE_MARKERS_WEAK');
  const err=checks.filter(x=>x.startsWith('❌')).length, warn=checks.filter(x=>x.startsWith('⚠️')).length;
  const result=err?'QA_FAILED':warn?'QA_PASSED_WITH_WARNINGS':'QA_PASSED';
  document.getElementById('actionResult').innerHTML=`<b>${result}</b><pre>${checks.join('\n')}</pre>`;
}
function useFile(){
  if(!CURRENT_FILE)return;
  const used=JSON.parse(localStorage.getItem(USED_KEY)||'[]');
  const rec={title:CURRENT_FILE.title,path:CURRENT_FILE.path,type:CURRENT_FILE.type,layer:CURRENT_FILE.layer,kind:kind(CURRENT_FILE,CURRENT_TEXT),used_at:new Date().toISOString()};
  if(!used.some(x=>x.path===rec.path))used.push(rec);
  localStorage.setItem(USED_KEY,JSON.stringify(used,null,2));
  document.getElementById('actionResult').innerHTML=`<b>USE_OK</b><br>Session files: ${used.length}<pre>${esc(JSON.stringify(rec,null,2))}</pre>`;
}
initTree();
