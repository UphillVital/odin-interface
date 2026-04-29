let HTML_CODE="";

function generate(){
 const topic=document.getElementById("topic").value;
 const task=document.getElementById("task").value;
 HTML_CODE=`<html><body><h1>${topic}</h1><p>${task}</p></body></html>`;
 document.getElementById("code").textContent=HTML_CODE;
 updatePreview();
}

function updatePreview(){
 document.getElementById("preview").srcdoc=HTML_CODE;
}

function download(){
 const blob=new Blob([HTML_CODE],{type:"text/html"});
 const a=document.createElement("a");
 a.href=URL.createObjectURL(blob);
 a.download="lesson.html";
 a.click();
}
