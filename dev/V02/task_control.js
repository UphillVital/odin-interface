/* ODIN V03.7.5 — TASK CONTROL + PERSISTENT STORAGE
   Мета:
   - бачити backlog задач
   - фільтрувати tasks
   - міняти status / priority
   - export/import snapshot для state + review decisions
   - не змінювати файли проекту
*/

const ODIN_TASK_CONTROL = {
  snapshotKey: "odin_task_control_snapshot_v0375",

  getProject() {
    if (!window.ODIN_STATE) return null;
    ODIN_STATE.load?.();
    if (typeof ODIN_STATE.ensureProject === "function") return ODIN_STATE.ensureProject();
    return ODIN_STATE.getActiveProject?.() || null;
  },

  getTasks() {
    const project = this.getProject();
    return project?.tasks || [];
  },

  setTaskStatus(taskId, status) {
    const task = this.getTasks().find(t => t.id === taskId || t.review_task_id === taskId);
    if (!task) return;

    task.status = status;
    task.updated_at = new Date().toISOString();

    if (window.ODIN_STATE) {
      ODIN_STATE.log("TASK_STATUS_UPDATED", `${status}: ${task.name || task.path}`);
      ODIN_STATE.save();
    }

    this.render();
    if (window.ODIN_TASK_CENTER?.refresh) ODIN_TASK_CENTER.refresh();
  },

  setTaskPriority(taskId, priority) {
    const task = this.getTasks().find(t => t.id === taskId || t.review_task_id === taskId);
    if (!task) return;

    task.priority = priority;
    task.updated_at = new Date().toISOString();

    if (window.ODIN_STATE) {
      ODIN_STATE.log("TASK_PRIORITY_UPDATED", `${priority}: ${task.name || task.path}`);
      ODIN_STATE.save();
    }

    this.render();
    if (window.ODIN_TASK_CENTER?.refresh) ODIN_TASK_CENTER.refresh();
  },

  getFilters() {
    const get = id => document.getElementById(id)?.value || "ALL";
    return {
      status: get("taskFilterStatus"),
      priority: get("taskFilterPriority"),
      type: get("taskFilterType")
    };
  },

  applyFilters(tasks) {
    const f = this.getFilters();

    return tasks.filter(task => {
      if (f.status !== "ALL" && (task.status || "UNKNOWN") !== f.status) return false;
      if (f.priority !== "ALL" && (task.priority || "UNKNOWN") !== f.priority) return false;
      if (f.type !== "ALL" && (task.type || "UNKNOWN") !== f.type) return false;
      return true;
    });
  },

  render() {
    const all = this.getTasks();
    const filtered = this.applyFilters(all);

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    setText("taskControlTotal", all.length);
    setText("taskControlVisible", filtered.length);
    setText("taskControlOpen", all.filter(t => (t.status || "OPEN") === "OPEN").length);
    setText("taskControlDone", all.filter(t => (t.status || "") === "DONE").length);

    const box = document.getElementById("taskControlList");
    if (!box) return;

    if (!filtered.length) {
      box.innerHTML = "<p class='muted'>Немає задач за поточним фільтром.</p>";
      return;
    }

    box.innerHTML = filtered.map((task, i) => {
      const id = this.escapeAttr(task.id || task.review_task_id);
      return `
        <div class="session-item">
          <b>${i + 1}. ${this.escapeHtml(task.name || task.path || task.id)}</b><br>
          <small>${this.escapeHtml(task.path || "")}</small><br>
          <span class="meta">
            type=${this.escapeHtml(task.type || "—")} ·
            status=${this.escapeHtml(task.status || "—")} ·
            priority=${this.escapeHtml(task.priority || "—")} ·
            action=${this.escapeHtml(task.action || "—")}
          </span><br>
          <small>reasons: ${this.escapeHtml((task.reasons || []).join("; "))}</small>
          <div class="actions">
            <button onclick="ODIN_TASK_CONTROL.setTaskStatus('${id}','OPEN')">OPEN</button>
            <button onclick="ODIN_TASK_CONTROL.setTaskStatus('${id}','IN_PROGRESS')">IN_PROGRESS</button>
            <button onclick="ODIN_TASK_CONTROL.setTaskStatus('${id}','DONE')">DONE</button>
            <button onclick="ODIN_TASK_CONTROL.setTaskStatus('${id}','BLOCKED')">BLOCKED</button>
            <button onclick="ODIN_TASK_CONTROL.setTaskPriority('${id}','LOW')">LOW</button>
            <button onclick="ODIN_TASK_CONTROL.setTaskPriority('${id}','MEDIUM')">MEDIUM</button>
            <button onclick="ODIN_TASK_CONTROL.setTaskPriority('${id}','HIGH')">HIGH</button>
          </div>
        </div>
      `;
    }).join("");
  },

  buildSnapshot() {
    const reviewDecisions = (() => {
      try { return JSON.parse(localStorage.getItem("odin_unknown_review_v0373")) || {}; }
      catch(e) { return {}; }
    })();

    return {
      version: "V03.7.5",
      created_at: new Date().toISOString(),
      odin_state: window.ODIN_STATE?.data || null,
      review_decisions: reviewDecisions,
      review_to_task_report: window.ODIN_STATE?.data?.tree?.review_to_task_report || null,
      unknown_review: window.ODIN_STATE?.data?.tree?.unknown_review || null,
      unknown_semantic: window.ODIN_STATE?.data?.tree?.unknown_semantic || null
    };
  },

  exportSnapshot() {
    const snapshot = this.buildSnapshot();
    localStorage.setItem(this.snapshotKey, JSON.stringify(snapshot, null, 2));

    const box = document.getElementById("taskSnapshotBox");
    if (box) box.textContent = JSON.stringify(snapshot, null, 2);

    if (window.ODIN_STATE) {
      ODIN_STATE.log("TASK_SNAPSHOT_EXPORTED", "Task/control snapshot exported to UI/localStorage");
      ODIN_STATE.save();
    }
  },

  copySnapshot() {
    const box = document.getElementById("taskSnapshotBox");
    navigator.clipboard?.writeText(box?.textContent || JSON.stringify(this.buildSnapshot(), null, 2));
  },

  importSnapshotFromBox() {
    const box = document.getElementById("taskSnapshotBox");
    if (!box) return;

    try {
      const snapshot = JSON.parse(box.textContent || "{}");

      if (snapshot.review_decisions) {
        localStorage.setItem("odin_unknown_review_v0373", JSON.stringify(snapshot.review_decisions, null, 2));
      }

      if (snapshot.odin_state && window.ODIN_STATE) {
        ODIN_STATE.data = snapshot.odin_state;
        ODIN_STATE.save();
      }

      if (window.ODIN_STATE) {
        ODIN_STATE.log("TASK_SNAPSHOT_IMPORTED", "Task/control snapshot imported from UI");
        ODIN_STATE.save();
      }

      this.render();
      if (window.ODIN_TASK_CENTER?.refresh) ODIN_TASK_CENTER.refresh();

      alert("SNAPSHOT IMPORTED");
    } catch (error) {
      alert("IMPORT ERROR: " + error.message);
    }
  },

  clearTaskViewOnly() {
    const box = document.getElementById("taskControlList");
    if (box) box.innerHTML = "<p class='muted'>View cleared. State не змінено.</p>";
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

window.ODIN_TASK_CONTROL = ODIN_TASK_CONTROL;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => ODIN_TASK_CONTROL.render(), 1200);
});
