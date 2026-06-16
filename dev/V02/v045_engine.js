let HTML="";let STATUS={engine:"OK",preview:"-",qa:"-",export:"-"};

function preset(p){
 if(p==="FAST"){type.value="LESSON_FROM_TOPIC";mode.value="STRUCTURED";}
 if(p==="PRO"){type.value="LESSON_FROM_TOPIC";mode.value="HYBRID";}
 if(p==="REVIEW"){type.value="LESSON_REVIEW";mode.value="STRUCTURED";}
 if(p==="MIX"){type.value="LESSON_MIX";mode.value="HYBRID";}
}

function generate(){
 HTML=`<html><body><h1>${topic.value}</h1><p>${task.value}</p></body></html>`;
 preview.srcdoc=HTML;
 STATUS.preview="OK";
 updateStatus();
}

function qaCheck(){
 if(!HTML.includes("<h1>")){STATUS.qa="FAIL";alert("No title");return;}
 STATUS.qa="PASS";
 updateStatus();
}

function exportPkg(){
 if(STATUS.qa!=="PASS"){alert("QA FAIL");return;}
 const blob=new Blob([HTML],{type:"text/html"});
 const a=document.createElement("a");
 a.href=URL.createObjectURL(blob);
 a.download="lesson.html";
 a.click();
 STATUS.export="DONE";
 updateStatus();
}

function updateStatus(){
 status.textContent=JSON.stringify(STATUS,null,2);
}
