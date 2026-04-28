const ODIN_SMART_ROUTER = {
  detectKind(file){
    const p = (file.path || "").toLowerCase();
    const title = (file.title || "").toLowerCase();

    if(p.includes("template_base_v1.html")) return "LESSON_TEMPLATE";
    if(p.includes("template_rules") || p.includes("template_structure") || p.includes("template_requirements")) return "ISH/TEMPLATE_RULE";
    if(p.includes("translation_lock") || p.includes("rn_dp_sd") || p.includes("literal_semantic")) return "TRANSLATION_LOCK";
    if(p.includes("highlight") || p.includes("lm_markup")) return "HIGHLIGHT_SYSTEM";
    if(p.includes("qa_system") || title.startsWith("qa_") || p.includes("qa_")) return "QA_ENGINE";
    if(p.includes("lesson_structure") || p.includes("lesson_system")) return "LESSON_SYSTEM";
    if(p.includes("rule") || p.includes("lock")) return "RULE/LOCK";
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
      "TEMPLATE_REQUIREMENTS.md",
      "UNIFIED_TEMPLATE_OVERVIEW.md",
      "TRANSLATION_LOCK.md",
      "RN_DP_SD_STANDARD.md",
      "LITERAL_SEMANTIC_RULES.md",
      "TRANSLATION_SYSTEM_OVERVIEW.md",
      "HIGHLIGHT_SYSTEM_OVERVIEW.md",
      "LM_MARKUP_STANDARD.md",
      "GRAMMAR_HIGHLIGHT_RULES.md",
      "QA_SYSTEM_OVERVIEW.md",
      "QA_STRUCTURE.md",
      "QA_TRANSLATION.md",
      "QA_MARKUP.md",
      "QA_FINAL_GATE.md",
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
  alert("AUTO SELECT CORE DONE: " + selected.length + " files added to SESSION");
}
