function autoSelect(){
 const files = ODIN_TREE_DATA.flatMap(g=>g.items)
 files.filter(f=>f.path.includes("TEMPLATE")||f.path.includes("QA")||f.path.includes("TRANSLATION")).forEach(addS)
 alert("AUTO SELECT DONE")
}
