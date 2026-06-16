function generate(){
 const topic=document.getElementById("topic").value
 let html="<h1>"+topic+"</h1>"
 html+="<p>Ich lerne Deutsch.<br>Я вчу німецьку.<br>Я вивчаю німецьку.</p>"
 document.getElementById("out").textContent=html
 window._lesson=html
}
function download(){
 const blob=new Blob([window._lesson||""],{type:"text/html"})
 const a=document.createElement("a")
 a.href=URL.createObjectURL(blob)
 a.download="lesson.html"
 a.click()
}
