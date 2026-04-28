const ODIN_SESSION = {
  key: "odin_v03_session_files",
  contentKey: "odin_v03_file_content_cache",

  get(){
    try { return JSON.parse(localStorage.getItem(this.key)) || []; }
    catch(e){ return []; }
  },

  save(files){
    localStorage.setItem(this.key, JSON.stringify(files, null, 2));
  },

  cacheContent(path, text){
    let cache = {};
    try { cache = JSON.parse(localStorage.getItem(this.contentKey)) || {}; } catch(e){}
    cache[path] = text;
    localStorage.setItem(this.contentKey, JSON.stringify(cache));
  },

  getCachedContent(path){
    try {
      const cache = JSON.parse(localStorage.getItem(this.contentKey)) || {};
      return cache[path] || "";
    } catch(e){ return ""; }
  },

  add(file){
    const files = this.get();
    const record = {
      title: file.title,
      path: file.path,
      type: file.type,
      layer: file.layer,
      status: file.status,
      kind: file.kind || ODIN_SMART_ROUTER.detectKind(file),
      used_at: new Date().toISOString()
    };

    if(!files.some(x => x.path === record.path)){
      files.push(record);
      this.save(files);
    }

    this.render();
    return record;
  },

  addMany(files){
    files.forEach(f => this.add(f));
    this.render();
  },

  clear(){
    localStorage.removeItem(this.key);
    localStorage.removeItem(this.contentKey);
    localStorage.removeItem("odin_v03_extraction");
    this.render();
    const r = document.getElementById("extractionReport");
    if(r) r.textContent = "Session cleared.";
  },

  render(){
    const list = document.getElementById("sessionList");
    if(!list) return;

    const files = this.get();
    if(files.length === 0){
      list.innerHTML = "<p class='meta'>Session порожня.</p>";
      return;
    }

    list.innerHTML = files.map((f, i) => `
      <div class="session-item">
        <b>${i + 1}. ${f.title}</b><br>
        <span class="meta">${f.kind || "DOCUMENT"} · ${f.layer || "—"}</span><br>
        <small>${f.path}</small>
      </div>
    `).join("");
  }
};

document.addEventListener("DOMContentLoaded", () => ODIN_SESSION.render());
