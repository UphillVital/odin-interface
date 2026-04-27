const ODIN_EXPORT_SYSTEM = {
  prepared: {
    readme: "",
    manifest: "",
    status: "",
    html: ""
  },

  filenameBase(){
    const node = ODIN_ADMIN_STATE.selected || {};
    return String(node.title || "ODIN_EXPORT")
      .replace(/[^a-zA-Z0-9_\-]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "")
      .toUpperCase();
  },

  prepare(){
    const node = ODIN_ADMIN_STATE.selected;
    if(!node){
      this.setStatus("EXPORT_BLOCKED: no selected node");
      return;
    }

    if(!ODIN_PACKAGE_BUILDER.last.readme){
      ODIN_PACKAGE_BUILDER.build();
    }

    const base = this.filenameBase();
    const exportTime = new Date().toISOString();

    this.prepared.readme = ODIN_PACKAGE_BUILDER.last.readme || "";
    this.prepared.manifest = ODIN_PACKAGE_BUILDER.last.manifest || "";
    this.prepared.status = ODIN_PACKAGE_BUILDER.last.status || "";

    this.prepared.html = `<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${base} EXPORT</title>
<style>
body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;margin:24px;background:#f8fafc;color:#0f172a;line-height:1.6}
pre{background:#0f172a;color:#e5e7eb;padding:16px;border-radius:16px;overflow:auto;white-space:pre-wrap}
.card{background:white;border:1px solid #dbe5f2;border-radius:20px;padding:18px;margin:14px 0}
</style>
</head>
<body>
<h1>${base} EXPORT</h1>
<div class="card">
<h2>Export metadata</h2>
<p><b>Generated:</b> ${exportTime}</p>
<p><b>Selected:</b> ${node.title}</p>
<p><b>Path:</b> ${node.path}</p>
<p><b>Layer:</b> ${node.layer}</p>
<p><b>Status:</b> ${node.status}</p>
</div>
<div class="card"><h2>README.md</h2><pre>${this.escapeHtml(this.prepared.readme)}</pre></div>
<div class="card"><h2>MANIFEST</h2><pre>${this.escapeHtml(this.prepared.manifest)}</pre></div>
<div class="card"><h2>STATUS.json</h2><pre>${this.escapeHtml(this.prepared.status)}</pre></div>
</body>
</html>`;

    const report = [
      "EXPORT_READY",
      "",
      `base: ${base}`,
      `selected: ${node.title}`,
      `path: ${node.path}`,
      `generated: ${exportTime}`,
      "",
      "Available downloads:",
      "- README.md",
      "- PACKAGE_MANIFEST.md",
      "- PACKAGE_STATUS.json",
      "- EXPORT.html"
    ].join("\n");

    this.setStatus(report);
    this.log("EXPORT_READY", `${base} export prepared.`);
  },

  escapeHtml(text){
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  },

  download(type){
    if(!this.prepared[type]){
      this.prepare();
    }

    const base = this.filenameBase();
    const map = {
      readme: { name: "README.md", type: "text/markdown;charset=utf-8" },
      manifest: { name: `PACKAGE_MANIFEST_${base}.md`, type: "text/markdown;charset=utf-8" },
      status: { name: `PACKAGE_STATUS_${base}.json`, type: "application/json;charset=utf-8" },
      html: { name: `${base}_EXPORT.html`, type: "text/html;charset=utf-8" }
    };

    const spec = map[type];
    if(!spec || !this.prepared[type]){
      this.log("DOWNLOAD_BLOCKED", `No export data for ${type}`);
      return;
    }

    const blob = new Blob([this.prepared[type]], { type: spec.type });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = spec.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);

    this.log("DOWNLOAD", spec.name);
  },

  setStatus(text){
    document.getElementById("exportStatus").textContent = text;
  },

  log(type, message){
    if(window.ODIN_ADMIN_STATE){
      ODIN_ADMIN_STATE.addLog(type, message);
      if(window.ODIN_ADMIN) ODIN_ADMIN.render();
    }
  }
};
