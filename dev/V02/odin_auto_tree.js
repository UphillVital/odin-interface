const ODIN_AUTO_TREE = {
  titleFromPath(path){ return path.split("/").pop(); },
  idFromPath(path){
    return path.replace(/^ODIN_TREE_PROJECT_v1\//,"").replace(/^dev\//,"DEV/")
      .replace(/[^a-zA-Z0-9]+/g,"_").replace(/^_|_$/g,"").toLowerCase();
  },
  groupFromPath(path){
    const map = [
      ["00_CORE","00 CORE"],["01_ODIN_INTERFACE","01 INTERFACE"],["02_MODULES","02 MODULES"],
      ["03_HEADER_LOCK","03 HEADER LOCK"],["04_QA_SYSTEM","04 QA SYSTEM"],
      ["05_LESSON_SYSTEM","05 LESSON SYSTEM"],["06_ISSU_SSUDT","06 ISSU / SSUDT"],
      ["07_UNIFIED_LESSON_TEMPLATE","07 TEMPLATE"],["08_HIGHLIGHT_SYSTEM","08 HIGHLIGHT"],
      ["09_TRANSLATION_SYSTEM","09 TRANSLATION"],["10_AUDIO_VOICE_SYSTEM","10 AUDIO VOICE"],
      ["11_EXPORT_SYSTEM","11 EXPORT"],["12_GIT_DEPLOYMENT","12 GIT DEPLOYMENT"],
      ["13_TEAM","13 TEAM"],["14_WORKFLOW","14 WORKFLOW"],["15_PACKAGES","15 PACKAGES"],
      ["16_RULES","16 RULES"]
    ];
    for(const [needle, group] of map){ if(path.includes("/"+needle+"/")) return group; }
    if(path.startsWith("dev/V02/")) return "DEV V02";
    return "SYSTEM";
  },
  generate(){
    const groups = {};
    for(const f of ODIN_FILE_INDEX){
      const group = this.groupFromPath(f.path);
      if(!groups[group]) groups[group] = [];
      groups[group].push({
        id: this.idFromPath(f.path),
        title: this.titleFromPath(f.path),
        path: f.path,
        type: f.type,
        status: f.status || "ACTIVE",
        layer: f.layer || group,
        description: f.description || f.path
      });
    }
    const order = ["SYSTEM","00 CORE","01 INTERFACE","02 MODULES","03 HEADER LOCK","04 QA SYSTEM","05 LESSON SYSTEM","06 ISSU / SSUDT","07 TEMPLATE","08 HIGHLIGHT","09 TRANSLATION","10 AUDIO VOICE","11 EXPORT","12 GIT DEPLOYMENT","13 TEAM","14 WORKFLOW","15 PACKAGES","16 RULES","DEV V02"];
    const data = order.filter(g => groups[g]).map(g => ({ group:g, items:groups[g] }));
    const code = "const ODIN_TREE_DATA = " + JSON.stringify(data, null, 2) + ";\n";
    document.getElementById("generatedTree").textContent = code;
    document.getElementById("treeStats").textContent = `Groups: ${data.length} · Files: ${ODIN_FILE_INDEX.length}`;
    return code;
  },
  async copy(){
    const text = document.getElementById("generatedTree").textContent || "";
    if(!text.trim()){ alert("Спочатку натисни GENERATE TREE"); return; }
    try{ await navigator.clipboard.writeText(text); alert("odin_tree_data.js copied"); }
    catch(e){ alert("Скопіюй вручну."); }
  },
  download(){
    const text = document.getElementById("generatedTree").textContent || this.generate();
    const blob = new Blob([text], {type:"application/javascript;charset=utf-8"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "odin_tree_data.js";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(a.href);
  }
};
