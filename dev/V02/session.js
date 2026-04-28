const ODIN_SESSION = {
  key: "odin_v03_session_files",

  get(){
    try { return JSON.parse(localStorage.getItem(this.key)) || []; }
    catch(e){ return []; }
  },

  save(files){
    localStorage.setItem(this.key, JSON.stringify(files, null, 2));
  },

  add(file){
    const files = this.get();
    const record = {
      title: file.title,
      path: file.path,
      type: file.type,
      layer: file.layer,
      status: file.status,
      kind: file.kind || "DOCUMENT",
      used_at: new Date().toISOString()
    };

    if(!files.some(x => x.path === record.path)){
      files.push(record);
      this.save(files);
    }

    this.render();
    return record;
  },

  clear(){
    localStorage.removeItem(this.key);
    this.render();
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
