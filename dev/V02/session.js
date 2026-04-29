const KEY="odin_session";
function getS(){return JSON.parse(localStorage.getItem(KEY)||"[]")}
function saveS(d){localStorage.setItem(KEY,JSON.stringify(d))}
function addS(f){let d=getS();if(!d.find(x=>x.path===f.path)){d.push(f);saveS(d)}}
