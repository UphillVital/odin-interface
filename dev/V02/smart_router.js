function autoSelect(){
 const files = ODIN_TREE_DATA.flatMap(g=>g.items)

 const selected = files.filter(f =>
  f.path.includes("TEMPLATE") ||
  f.path.includes("QA_SYSTEM") ||
  f.path.includes("TRANSLATION") ||
  f.path.includes("RULE")
 )

 selected.forEach(f=>addS(f))

 alert("AUTO SELECT DONE")
}
