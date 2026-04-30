/* ODIN V03.7.4 — REVIEW → TASK CENTER INTEGRATION
   Призначення:
   - confirmed review decisions → tasks
   - не дублювати задачі
   - не змінювати файли
   - не виконувати git
*/

const ODIN_REVIEW_TO_TASK = {
  taskPrefix: "unknown_review_task::",

  getReviewPlan() {
    if (window.ODIN_UNKNOWN_REVIEW && typeof ODIN_UNKNOWN_REVIEW.buildPlan === "function") {
      return ODIN_UNKNOWN_REVIEW.buildPlan();
    }

    if (window.ODIN_STATE?.data?.tree?.unknown_review) {
      return ODIN_STATE.data.tree.unknown_review;
    }

    return {
      version: "V03.7.4",
      total_items: 0,
      confirmed: 0,
      pending: 0,
      rows: []
    };
  },

  ensureProject() {
    if (!window.ODIN_STATE) return null;
    if (typeof ODIN_STATE.ensureProject === "function") return ODIN_STATE.ensureProject();
    if (typeof ODIN_STATE.getActiveProject === "function" && ODIN_STATE.getActiveProject()) return ODIN_STATE.getActiveProject();
    if (typeof ODIN_STATE.createProject === "function") return ODIN_STATE.createProject({ name: "ODIN Main Project", type: "ODIN" });
    return null;
  },

  shouldCreateTask(row, includeDocument = false) {
    if (!row.confirmed) return false;

    const action = row.suggested_action;

    if (action === "CREATE_TASK") return true;
    if (action === "FIX_LATER") return true;
    if (includeDocument && action === "DOCUMENT") return true;

    return false;
  },

  makeTaskId(row) {
    return this.taskPrefix + row.path + "::" + row.suggested_action;
  },

  taskExists(project, taskId) {
    return (project.tasks || []).some(task => task.review_task_id === taskId || task.id === taskId);
  },

  createTaskFromRow(row) {
    const project = this.ensureProject();
    if (!project) return { ok: false, reason: "ODIN_STATE project not available", row };

    const taskId = this.makeTaskId(row);

    if (this.taskExists(project, taskId)) {
      return { ok: false, reason: "DUPLICATE_SKIPPED", row };
    }

    const priority = row.type === "UNKNOWN_ORPHAN" ? "HIGH" : "MEDIUM";

    const task = {
      id: taskId,
      review_task_id: taskId,
      name: `${row.suggested_action}: ${row.path.split("/").pop()}`,
      type: "UNKNOWN_REVIEW",
      status: "OPEN",
      stage: "PLAN",
      priority,
      action: row.suggested_action,
      path: row.path,
      unknown_type: row.type,
      current_group: row.current_group,
      reasons: row.reasons || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      result: null
    };

    project.tasks = project.tasks || [];
    project.tasks.unshift(task);
    project.updated_at = new Date().toISOString();

    if (window.ODIN_STATE) {
      ODIN_STATE.log("REVIEW_TASK_CREATED", `${task.action}: ${task.path}`);
      ODIN_STATE.save();
    }

    return { ok: true, task };
  },

  generateTasks(options = {}) {
    const includeDocument = !!options.includeDocument;
    const plan = this.getReviewPlan();
    const rows = plan.rows || [];

    const confirmedRows = rows.filter(row => this.shouldCreateTask(row, includeDocument));
    const created = [];
    const skipped = [];

    confirmedRows.forEach(row => {
      const result = this.createTaskFromRow(row);
      if (result.ok) created.push(result.task);
      else skipped.push(result);
    });

    const report = {
      version: "V03.7.4",
      created_at: new Date().toISOString(),
      include_document: includeDocument,
      source_total: rows.length,
      source_confirmed: rows.filter(r => r.confirmed).length,
      candidates: confirmedRows.length,
      created: created.length,
      skipped: skipped.length,
      created_tasks: created,
      skipped_items: skipped.map(x => ({
        reason: x.reason,
        path: x.row?.path,
        action: x.row?.suggested_action
      }))
    };

    if (window.ODIN_STATE) {
      ODIN_STATE.data.tree.review_to_task_report = report;
      ODIN_STATE.log("REVIEW_TO_TASK_DONE", `created=${report.created}; skipped=${report.skipped}`);
      ODIN_STATE.save();
    }

    this.renderReport(report);
    if (window.ODIN_TASK_CENTER?.refresh) ODIN_TASK_CENTER.refresh();

    return report;
  },

  renderReport(report = null) {
    if (!report && window.ODIN_STATE?.data?.tree?.review_to_task_report) {
      report = ODIN_STATE.data.tree.review_to_task_report;
    }

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    if (!report) {
      setText("reviewTaskCreated", 0);
      setText("reviewTaskSkipped", 0);
      setText("reviewTaskCandidates", 0);
      const box = document.getElementById("reviewTaskReportBox");
      if (box) box.textContent = "Review → Task ще не запускався.";
      return;
    }

    setText("reviewTaskCreated", report.created || 0);
    setText("reviewTaskSkipped", report.skipped || 0);
    setText("reviewTaskCandidates", report.candidates || 0);

    const box = document.getElementById("reviewTaskReportBox");
    if (box) box.textContent = JSON.stringify(report, null, 2);
  },

  copyReport() {
    const box = document.getElementById("reviewTaskReportBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  }
};

window.ODIN_REVIEW_TO_TASK = ODIN_REVIEW_TO_TASK;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => ODIN_REVIEW_TO_TASK.renderReport(), 1100);
});
