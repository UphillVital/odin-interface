let showDP = true;
let showSD = true;

function generateLesson(){
let html = `
<h1>Test Lesson</h1>

<p class="de">Ich stehe um sechs Uhr auf.</p>
<p class="dp">Я встаю о шостій годині вгору.</p>
<p class="sd">Я встаю о шостій годині.</p>

<p class="de">Mach die Tür zu!</p>
<p class="dp">Зроби двері до!</p>
<p class="sd">Закрий двері!</p>
`;

document.getElementById("preview").srcdoc = html;
applyMode();
}

function toggleDP(){
showDP = !showDP;
applyMode();
}

function toggleSD(){
showSD = !showSD;
applyMode();
}

function modeDE(){
showDP = false;
showSD = false;
applyMode();
}

function modeFull(){
showDP = true;
showSD = true;
applyMode();
}

function applyMode(){
let frame = document.getElementById("preview");
let doc = frame.contentDocument || frame.contentWindow.document;

if(!doc) return;

let dp = doc.querySelectorAll(".dp");
let sd = doc.querySelectorAll(".sd");

dp.forEach(el => el.style.display = showDP ? "block" : "none");
sd.forEach(el => el.style.display = showSD ? "block" : "none");
}
