/* ODIN V03.7 — FILE CONTROL B
   ODIN:
   - бачить файли
   - пропонує зміни
   - генерує git-команди

   Не пише у файли.
   Не видаляє автоматично.
   Не змінює engine.
*/

const ODIN_FILE_CONTROL = {
  selectedFiles: [],
  lastProposal: null,

  getTreeFiles() {
    try {
      if (typeof ODIN_TREE_DATA !== "undefined") {
        return ODIN_TREE_DATA.flatMap(group => (group.items || []).map(item => ({
          ...item,
          source: "ODIN_TREE_DATA",
          group: group.group || "UNKNOWN"
        })));
      }
    } catch (e) {}

    if (window.ODIN_TREE_DATA) {
      return window.ODIN_TREE_DATA.flatMap(group => (group.items || []).map(item => ({
        ...item,
        source: "ODIN_TREE_DATA",
        group: group.group || "UNKNOWN"
      })));
    }

    return [];
  },

  getFileIndexFiles() {
    const candidates = [
      window.ODIN_FILE_INDEX,
      window.ODIN_FILES_INDEX,
      window.ODIN_FILE_LIST
    ];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate.map(item => ({
          title: item.title || item.name || item.path,
          path: item.path || item.file || item.name,
          type: item.type || "file",
          status: item.status || "UNKNOWN",
          layer: item.layer || "INDEX",
          source: "FILE_INDEX"
        }));
      }
    }

    return [];
  },

  getAllKnownFiles() {
    const treeFiles = this.getTreeFiles();
    const indexFiles = this.getFileIndexFiles();
    const byPath = new Map();

    [...treeFiles, ...indexFiles].forEach(file => {
      if (!file || !file.path) return;
      byPath.set(file.path, {
        id: file.id || this.pathToId(file.path),
        title: file.title || file.path.split("/").pop(),
        path: file.path,
        type: file.type || "file",
        status: file.status || "UNKNOWN",
        layer: file.layer || file.group || "UNKNOWN",
        group: file.group || file.layer || "UNKNOWN",
        source: file.source || "UNKNOWN",
        description: file.description || ""
      });
    });

    return Array.from(byPath.values()).sort((a, b) => a.path.localeCompare(b.path));
  },

  pathToId(path) {
    return String(path || "")
      .toLowerCase()
      .replace(/[^a-z0-9а-яіїєґ]+/gi, "_")
      .replace(/^_+|_+$/g, "");
  },

  render() {
    const files = this.getAllKnownFiles();
    const box = document.getElementById("fileControlList");
    const count = document.getElementById("fileControlCount");

    if (count) count.textContent = String(files.length);

    if (!box) return;

    if (!files.length) {
      box.textContent = "Файлів не знайдено. Перевір odin_tree_data.js / odin_file_index.js.";
      return;
    }

    box.innerHTML = files.map((file, index) => `
      <div class="session-item">
        <label>
          <input type="checkbox" data-file-path="${this.escapeAttr(file.path)}" onchange="ODIN_FILE_CONTROL.toggleFile('${this.escapeAttr(file.path)}', this.checked)">
          <b>${index + 1}. ${this.escapeHtml(file.title)}</b>
        </label><br>
        <span class="meta">${this.escapeHtml(file.type)} · ${this.escapeHtml(file.layer)} · ${this.escapeHtml(file.source)}</span><br>
        <small>${this.escapeHtml(file.path)}</small>
      </div>
    `).join("");
  },

  toggleFile(path, checked) {
    if (checked) {
      if (!this.selectedFiles.includes(path)) this.selectedFiles.push(path);
    } else {
      this.selectedFiles = this.selectedFiles.filter(p => p !== path);
    }

    this.updateSelected();
  },

  clearSelection() {
    this.selectedFiles = [];
    document.querySelectorAll("[data-file-path]").forEach(input => input.checked = false);
    this.updateSelected();
  },

  updateSelected() {
    const box = document.getElementById("fileControlSelected");
    if (!box) return;

    box.textContent = this.selectedFiles.length
      ? this.selectedFiles.join("\n")
      : "Нічого не вибрано.";
  },

  propose(action) {
    const files = this.selectedFiles.slice();

    if (!files.length) {
      this.showProposal({
        action,
        status: "BLOCKED",
        reason: "Немає вибраних файлів.",
        files: [],
        git: []
      });
      return;
    }

    const proposal = {
      action,
      status: "PROPOSED",
      created_at: new Date().toISOString(),
      files,
      safety: {
        auto_write: false,
        auto_delete: false,
        confirm_required: true
      },
      git: this.buildGitCommands(files, action)
    };

    this.lastProposal = proposal;
    this.showProposal(proposal);

    if (window.ODIN_EVENT_BUS) {
      ODIN_EVENT_BUS.emit("TASK_CREATED", {
        name: "FILE CONTROL: " + action,
        type: "FILE_CONTROL",
        status: "PROPOSED",
        stage: "PLAN"
      });
      ODIN_EVENT_BUS.emit("STAGE_CHANGED", { stage: "GIT" });
    }
  },

  buildGitCommands(files, action) {
    const addTarget = files.join(" ");
    const commitMessage = this.getCommitMessage(action);

    return [
      "git add " + addTarget,
      'git commit -m "' + commitMessage + '"',
      "git push origin dev"
    ];
  },

  getCommitMessage(action) {
    const map = {
      ADD: "Add selected ODIN files",
      UPDATE: "Update selected ODIN files",
      FIX: "Fix selected ODIN files",
      DOCS: "Update ODIN documentation",
      REMOVE: "Remove selected ODIN files"
    };
    return map[action] || "Update selected ODIN files";
  },

  showProposal(proposal) {
    const box = document.getElementById("fileControlProposal");
    const gitBox = document.getElementById("gitCommandBox");

    if (box) {
      box.textContent = JSON.stringify(proposal, null, 2);
    }

    if (gitBox) {
      gitBox.textContent = (proposal.git || []).join("\n");
    }
  },

  copyGitCommands() {
    const box = document.getElementById("gitCommandBox");
    if (!box) return;

    navigator.clipboard?.writeText(box.textContent || "");
    if (window.ODIN_ADMIN_STATE?.addLog) {
      ODIN_ADMIN_STATE.addLog("GIT_COPY", "Git commands copied from File Control.");
    }
  },

  escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  },

  escapeAttr(value) {
    return String(value ?? "")
      .replaceAll("\\", "\\\\")
      .replaceAll("'", "\\'")
      .replaceAll('"', "&quot;");
  }
};

window.ODIN_FILE_CONTROL = ODIN_FILE_CONTROL;

document.addEventListener("DOMContentLoaded", () => {
  ODIN_FILE_CONTROL.render();
});
