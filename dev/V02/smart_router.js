const ODIN_SMART_ROUTER = {
  detectKind(file){
    const p = (file.path || "").toLowerCase();
    const title = (file.title || "").toLowerCase();

    if(p.includes("template_base_v1.html")) return "LESSON_TEMPLATE";
    if(p.includes("template")) return "TEMPLATE";
    if(p.includes("qa_system") || title.startsWith("qa_")) return "QA";
    if(p.includes("translation")) return "TRANSLATION";
    if(p.includes("highlight")) return "HIGHLIGHT";
    if(p.includes("audio")) return "AUDIO";
    if(p.includes("lesson")) return "LESSON_SYSTEM";
    if(p.includes("rule") || p.includes("lock")) return "RULE/LOCK";
    if(p.includes("package")) return "PACKAGE";
    return "DOCUMENT";
  },

  allFiles(){
    try{
      return ODIN_TREE_DATA.flatMap(g => g.items || []);
    }catch(e){
      return [];
    }
  },

  autoSelectLessonCore(){
    const files = this.allFiles();

    const priorities = [
      "TEMPLATE_BASE_v1.html",
      "TEMPLATE_RULES.md",
      "TEMPLATE_STRUCTURE.md",
      "QA_SYSTEM_OVERVIEW.md",
      "QA_STRUCTURE.md",
      "TRANSLATION_SYSTEM_OVERVIEW.md",
      "RN_DP_SD_STANDARD.md",
      "HIGHLIGHT_SYSTEM_OVERVIEW.md",
      "LESSON_SYSTEM_OVERVIEW.md",
      "LESSON_STRUCTURE.md",
      "ODIN_TEMPLATE_ROUTER_v1.md"
    ];

    const selected = [];

    for(const name of priorities){
      const found = files.find(f => (f.title || "").toLowerCase() === name.toLowerCase());
      if(found) selected.push({...found, kind:this.detectKind(found)});
    }

    return selected;
  }
};

function autoSelect(){
  const selected = ODIN_SMART_ROUTER.autoSelectLessonCore();
  ODIN_SESSION.addMany(selected);
  alert("AUTO SELECT DONE: " + selected.length + " files added to SESSION");
}
