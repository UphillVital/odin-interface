const ODIN_FILE_VIEWER = {
  fallbackMap: {
    "ODIN SYSTEM": "# ODIN SYSTEM\n\nGlobal Control Center.\n\nV02.2 додає GitHub Raw File Viewer.",
    "ODIN_TREE_PROJECT_v1/00_CORE/ODIN_TEMPLATE_ROUTER_v1.md": "# ODIN TEMPLATE ROUTER v1\n\nFallback preview. Якщо файл запушений у GitHub, OPEN має завантажити реальний вміст.",
    "ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html": "<!-- TEMPLATE_BASE_v1.html fallback preview -->\n<!-- Real content should load from GitHub raw if available. -->"
  },

  isFile(node){
    const path = node.path || "";
    return /\.(md|json|html|js|css|txt)$/i.test(path);
  },

  detectMode(path){
    if(/\.md$/i.test(path)) return "markdown";
    if(/\.json$/i.test(path)) return "json";
    if(/\.html$/i.test(path)) return "html";
    if(/\.js$/i.test(path)) return "javascript";
    if(/\.css$/i.test(path)) return "css";
    if(/\.txt$/i.test(path)) return "text";
    return "metadata";
  },

  setMeta(node, mode){
    document.getElementById("viewerPath").textContent = node.path || "—";
    document.getElementById("viewerType").textContent = node.type || "—";
    document.getElementById("viewerMode").textContent = mode || "—";
  },

  setPreview(text){
    document.getElementById("filePreview").textContent = text;
  },

  metadataPreview(node){
    return `# ${node.title}\n\nPath: ${node.path}\nType: ${node.type}\nLayer: ${node.layer}\nStatus: ${node.status}\n\n${node.description}\n\nFolder/metadata node. Future layer: directory listing.`;
  },

  fallbackPreview(node){
    if(this.fallbackMap[node.path]) return this.fallbackMap[node.path];
    return `# ${node.title}\n\nPath: ${node.path}\nType: ${node.type}\nStatus: ${node.status}\nLayer: ${node.layer}\n\n${node.description}\n\nFallback preview: real file not loaded.`;
  },

  async open(node){
    const mode = this.detectMode(node.path || "");
    this.setMeta(node, mode);

    if(!this.isFile(node)){
      this.setPreview(this.metadataPreview(node));
      return { ok:true, source:"metadata" };
    }

    const url = ODIN_REPO_CONFIG.toRawUrl(node.path);
    this.setPreview(`Loading from GitHub raw...\n\n${url}`);

    try {
      const res = await fetch(url, { cache: "no-store" });
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      this.setPreview(text || "(empty file)");
      return { ok:true, source:"github_raw", url };
    } catch(err) {
      this.setPreview(
        `GITHUB RAW LOAD FAILED\n${err.message}\n\nFallback preview:\n\n` + this.fallbackPreview(node)
      );
      return { ok:false, source:"fallback", error: err.message, url };
    }
  }
};
