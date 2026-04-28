const tree=document.getElementById("tree")

ODIN_TREE_DATA.forEach(g=>{
 let div=document.createElement("div")
 div.innerHTML="<b>"+g.group+"</b>"
 tree.appendChild(div)

 g.items.forEach(i=>{
  let f=document.createElement("div")
  f.innerText=i.title
  f.onclick=()=>addS(i)
  tree.appendChild(f)
 })
})
