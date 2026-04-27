const ODIN_PACKAGE_BUILDER = {
  last: {
    readme: "",
    manifest: "",
    status: ""
  },

  safeName(text){
    return String(text || "ODIN_PACKAGE")
      .replace(/[^a-zA-Z0-9_\-]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "")
      .toUpperCase();
  },

  build(){
    const node = ODIN_ADMIN_STATE.selected;
    const now = new Date().toISOString();
    const packageName = this.safeName(node.title) + "_PACKAGE_v1";
    const target = node.path || "UNKNOWN_TARGET";

    const readme = `# ${packageName}

## Що це
Пакет, сформований ODIN-ADMIN V02.5 для вибраного вузла.

## Selected node
- Title: ${node.title}
- Path: ${node.path}
- Type: ${node.type}
- Layer: ${node.layer}
- Status: ${node.status}

## Куди класти
Перевір target path перед застосуванням:

\`\`\`text
${target}
\`\`\`

## Що робити
1. Перевірити вміст.
2. Перевірити QA.
3. Додати README.md, MANIFEST, STATUS.json.
4. Зафіксувати через Git.

## Git
\`\`\`bash
git add ${target}
git commit -m "add ${packageName}"
git push origin dev
\`\`\`
`;

    const manifest = `# PACKAGE MANIFEST — ${packageName}

## Package
${packageName}

## Target
\`\`\`text
${target}
\`\`\`

## Purpose
Package generated from ODIN-ADMIN selected node.

## Source node
- title: ${node.title}
- path: ${node.path}
- type: ${node.type}
- layer: ${node.layer}
- status: ${node.status}

## Required files
- README.md
- PACKAGE_MANIFEST_${packageName}.md
- PACKAGE_STATUS_${packageName}.json
`;

    const status = {
      package: packageName,
      generated_by: "ODIN-ADMIN V02.5",
      created_at: now,
      target,
      source_node: node,
      has_readme: true,
      has_manifest: true,
      has_status: true,
      export_mode: "front_end_preview",
      note: "Browser does not write files directly to repo yet."
    };

    this.last.readme = readme;
    this.last.manifest = manifest;
    this.last.status = JSON.stringify(status, null, 2);

    document.getElementById("packageReadme").textContent = this.last.readme;
    document.getElementById("packageManifest").textContent = this.last.manifest;
    document.getElementById("packageStatus").textContent = this.last.status;

    this.log("PACKAGE_BUILD", `${packageName} generated for ${target}`);
    return this.last;
  },

  async copy(type){
    const text = this.last[type] || "";
    if(!text){
      this.log("COPY_BLOCKED", `Nothing to copy: ${type}`);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      this.log("COPY_OK", `${type} copied to clipboard`);
    } catch(e){
      this.log("COPY_FAILED", e.message);
      alert("Не вдалося скопіювати автоматично. Виділи текст вручну.");
    }
  },

  log(type, message){
    if(window.ODIN_ADMIN_STATE){
      ODIN_ADMIN_STATE.addLog(type, message);
      if(window.ODIN_ADMIN) ODIN_ADMIN.render();
    }
  }
};
