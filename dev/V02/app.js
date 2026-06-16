const ODIN_ADMIN = {
  init(){
    this.renderTree();
    this.select("dashboard", true);
    ODIN_ADMIN_STATE.addLog("BOOT", "ODIN-ADMIN V02.6 Real Export loaded.");
    this.render();
  },

  renderTree(){
    const root = document.getElementById("treeRoot");
    root.innerHTML = ODIN_TREE_DATA.map(group => `
      <div class="tree-group">
        <div class="tree-folder">${group.group}</div>
        ${group.items.map(item => `<button class="tree-btn" data-id="${item.id}" onclick="ODIN_ADMIN.select('${item.id}')">${item.title}</button>`).join("")}
      </div>
    `).join("");
  },

  findNode(id){
    for(const group of ODIN_TREE_DATA){
      const item = group.items.find(x => x.id === id);
      if(item) return item;
    }
    return ODIN_TREE_DATA[0].items[0];
  },

  select(id, silent=false){
    ODIN_ADMIN_STATE.selected = this.findNode(id);
    document.querySelectorAll(".tree-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.id === id));
    if(!silent) ODIN_ADMIN_STATE.addLog("SELECT", "Selected: " + ODIN_ADMIN_STATE.selected.path);
    this.render();
  },

  async run(action){
    const s = ODIN_ADMIN_STATE.selected;
    const msg = `${action} requested for ${s.path}`;
    ODIN_ADMIN_STATE.addLog(action, msg);

    const plan = {
      OPEN: "OPEN → GitHub raw fetch → file preview → fallback if unavailable",
      QA: "QA → selected node/file → checklist → PASS/WARN/FAIL",
      TEMPLATE: "TEMPLATE → route table → hard lock → router QA",
      BUILD: "BUILD → validate inputs → create package/output",
      PACKAGE: "PACKAGE → README + MANIFEST + STATUS preview",
      EXPORT: "EXPORT → prepare downloadable README/MANIFEST/STATUS/HTML",
      FIX: "FIX → safe patch only → no stable break"
    };

    if(action === "OPEN"){
      const result = await ODIN_FILE_VIEWER.open(s);
      ODIN_ADMIN_STATE.addLog("OPEN_RESULT", result.ok ? `Loaded from ${result.source}` : `Fallback: ${result.error}`);
    }

    if(action === "QA"){
      const qa = ODIN_QA_LAYER.run(s);
      ODIN_ADMIN_STATE.addLog("QA_RESULT", `${qa.result}: pass=${qa.passed}, warn=${qa.warnings}, err=${qa.errors}`);
      document.getElementById("systemStatus").textContent = qa.result;
      document.getElementById("systemStatus").className = "pill ready";
    } else if(action === "TEMPLATE"){
      ODIN_TEMPLATE_CONTROL.routeCheck();
      ODIN_TEMPLATE_CONTROL.lessonLock();
      document.getElementById("systemStatus").textContent = "TEMPLATE_CONTROL_READY";
      document.getElementById("systemStatus").className = "pill ready";
    } else if(action === "PACKAGE"){
      ODIN_PACKAGE_BUILDER.build();
      document.getElementById("systemStatus").textContent = "PACKAGE_READY";
      document.getElementById("systemStatus").className = "pill ready";
    } else if(action === "EXPORT"){
      ODIN_EXPORT_SYSTEM.prepare();
      document.getElementById("systemStatus").textContent = "EXPORT_READY";
      document.getElementById("systemStatus").className = "pill ready";
    } else {
      document.getElementById("systemStatus").textContent = action + "_RECORDED";
      document.getElementById("systemStatus").className = "pill ready";
    }

    document.getElementById("automationPlan").textContent = plan[action] || msg;
    this.render();
  },

  resetLog(){
    ODIN_ADMIN_STATE.clearLog();
    ODIN_ADMIN_STATE.addLog("RESET", "Admin log reset.");
    this.render();
  },

  render(){
    const s = ODIN_ADMIN_STATE.selected;
    document.getElementById("selectedTitle").textContent = s.title;
    document.getElementById("selectedPath").textContent = s.path;
    document.getElementById("nodeType").textContent = s.type;
    document.getElementById("nodeStatus").textContent = s.status;
    document.getElementById("nodeLayer").textContent = s.layer;
    document.getElementById("nodeDescription").textContent = s.description;
    document.getElementById("syncState").textContent = localStorage.getItem("odin_admin_v02_sync_time") ? "SYNCED" : "IDLE";

    const log = ODIN_ADMIN_STATE.getLog();
    document.getElementById("logBox").textContent = log.length
      ? log.map(x => `[${x.time}] ${x.type} @ ${x.selected} — ${x.message}`).join("\n")
      : "Лог порожній.";
  }
};
ODIN_ADMIN.init();
