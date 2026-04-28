const ODIN_CONTENT_ENGINE = {
  requiredKinds: ["LESSON_TEMPLATE", "ISH/TEMPLATE_RULE", "TRANSLATION_LOCK", "HIGHLIGHT_SYSTEM", "QA_ENGINE"],

  getExtraction(){
    try { return JSON.parse(localStorage.getItem("odin_v03_extraction")) || null; }
    catch(e){ return null; }
  },

  saveExtraction(data){
    localStorage.setItem("odin_v03_extraction", JSON.stringify(data, null, 2));
  },

  async ensureContentLoaded(){
    const files = ODIN_SESSION.get();
    for(const f of files){
      const cached = ODIN_SESSION.getCachedContent(f.path);
      if(!cached && typeof loadFileText === "function"){
        await loadFileText(f);
      }
    }
  },

  extractMarkers(text){
    const markers = [];
    const patterns = [
      ["RN_DP_SD", /РН|ДП|СД|RN_DP_SD|дослівн|смислов/i],
      ["TEMPLATE", /template|шаблон|TEMPLATE_BASE|структура уроку/i],
      ["QA", /QA|quality|перевір|gate|PASS|WARNING|FAILED/i],
      ["HIGHLIGHT", /highlight|підсвіт|lm-|markup/i],
      ["AUDIO", /audio|tts|voice|голос/i],
      ["LESSON_BLOCKS", /ціль уроку|основне правило|приклади|практика|домашн/i]
    ];
    for(const [name, re] of patterns){
      if(re.test(text || "")) markers.push(name);
    }
    return markers;
  },

  async extract(){
    await this.ensureContentLoaded();
    const files = ODIN_SESSION.get();

    const extracted = files.map(f => {
      const text = ODIN_SESSION.getCachedContent(f.path) || "";
      return {
        title: f.title,
        path: f.path,
        kind: f.kind || ODIN_SMART_ROUTER.detectKind(f),
        chars: text.length,
        lines: text ? text.split("\n").length : 0,
        markers: this.extractMarkers(text),
        snippet: text.slice(0, 900)
      };
    });

    const kinds = [...new Set(extracted.map(x => x.kind))];
    const missing = this.requiredKinds.filter(k => !kinds.includes(k));
    const warnings = [];

    if(missing.length) warnings.push("Missing core kinds: " + missing.join(", "));
    if(!extracted.some(x => x.path.includes("TEMPLATE_BASE_v1.html"))) warnings.push("TEMPLATE_BASE_v1.html not found in session.");
    if(!extracted.some(x => x.kind === "TRANSLATION_LOCK")) warnings.push("TRANSLATION_LOCK not found in session.");
    if(!extracted.some(x => x.kind === "QA_ENGINE")) warnings.push("QA_ENGINE not found in session.");

    const result = {
      created_at: new Date().toISOString(),
      files_count: extracted.length,
      kinds,
      warnings,
      extracted
    };

    this.saveExtraction(result);
    this.render(result);
    return result;
  },

  render(result){
    const el = document.getElementById("extractionReport");
    if(!el) return;
    el.textContent = JSON.stringify(result, null, 2);
  }
};
