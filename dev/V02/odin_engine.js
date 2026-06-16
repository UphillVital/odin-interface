/* ODIN V04.0.2 — CONNECT TASK → ENGINE
   Adds task operations to ODIN_ENGINE.
   Does not replace existing Task Control.
*/

const ODIN_ENGINE = {
  version: "V04.0.2",
  operations: {},

  init() {
    this.register("engine_test", () => ({
      status: "OK",
      message: "ODIN_ENGINE_CORE_READY",
      version: this.version,
      timestamp: new Date().toISOString()
    }));

    this.registerTaskOperations();

    this.log("ENGINE_INIT", "ODIN Engine Core initialized with task operations");
    this.renderStatus("READY", "ODIN_ENGINE_TASK_CONNECTED");
  },

  register(name, handler) {
    this.operations[name] = handler;
    return true;
  },

  registerTaskOperations() {
    this.register("task_refresh", () => {
      if (window.ODIN_TASK_CONTROL?.render) {
        ODIN_TASK_CONTROL.render();
      }
      if (window.ODIN_TASK_CENTER?.refresh) {
        ODIN_TASK_CENTER.refresh();
      }

      return {
        status: "OK",
        message: "TASK_REFRESH_DONE",
        summary: this.taskSummaryData()
      };
    });

    this.register("task_summary", () => ({
      status: "OK",
      message: "TASK_SUMMARY_READY",
      summary: this.taskSummaryData()
    }));

    this.register("task_snapshot", () => {
      const snapshot = this.taskSnapshotData();

      if (window.ODIN_STATE) {
        ODIN_STATE.data.engine = ODIN_STATE.data.engine || {};
        ODIN_STATE.data.engine.task_snapshot = snapshot;
        ODIN_STATE.log?.("ENGINE_TASK_SNAPSHOT", `tasks=${snapshot.total}`);
        ODIN_STATE.save?.();
      }

      return {
        status: "OK",
        message: "TASK_SNAPSHOT_SAVED",
        snapshot
      };
    });
  },

  getProject() {
    try {
      if (window.ODIN_STATE?.load) ODIN_STATE.load();
      if (window.ODIN_STATE?.getActiveProject) return ODIN_STATE.getActiveProject();
    } catch (e) {}
    return null;
  },

  getTasks() {
    const project = this.getProject();
    return project?.tasks || [];
  },

  taskSummaryData() {
    const tasks = this.getTasks();

    const byStatus = {};
    const byPriority = {};
    const byType = {};

    tasks.forEach(task => {
      const status = task.status || "UNKNOWN";
      const priority = task.priority || "UNKNOWN";
      const type = task.type || "UNKNOWN";

      byStatus[status] = (byStatus[status] || 0) + 1;
      byPriority[priority] = (byPriority[priority] || 0) + 1;
      byType[type] = (byType[type] || 0) + 1;
    });

    return {
      total: tasks.length,
      by_status: byStatus,
      by_priority: byPriority,
      by_type: byType,
      open: tasks.filter(t => (t.status || "OPEN") === "OPEN").length,
      done: tasks.filter(t => (t.status || "") === "DONE").length,
      timestamp: new Date().toISOString()
    };
  },

  taskSnapshotData() {
    const tasks = this.getTasks();

    return {
      version: this.version,
      created_at: new Date().toISOString(),
      total: tasks.length,
      tasks: tasks.map(t => ({
        id: t.id,
        name: t.name,
        type: t.type,
        status: t.status,
        priority: t.priority,
        action: t.action,
        path: t.path,
        created_at: t.created_at,
        updated_at: t.updated_at
      }))
    };
  },

  run(operation, payload = {}) {
    const started = new Date().toISOString();

    try {
      if (!this.operations[operation]) {
        const result = {
          status: "ERROR",
          operation,
          error: "OPERATION_NOT_REGISTERED",
          available_operations: Object.keys(this.operations),
          started,
          finished: new Date().toISOString()
        };
        this.log("ENGINE_RUN_ERROR", `${operation}: OPERATION_NOT_REGISTERED`);
        this.renderResult(result);
        return result;
      }

      this.log("ENGINE_RUN_START", operation);
      const data = this.operations[operation](payload);

      const result = {
        status: "OK",
        operation,
        payload,
        data,
        started,
        finished: new Date().toISOString()
      };

      this.log("ENGINE_RUN_DONE", operation);
      this.renderResult(result);
      return result;
    } catch (error) {
      const result = {
        status: "ERROR",
        operation,
        payload,
        error: error.message,
        stack: error.stack,
        started,
        finished: new Date().toISOString()
      };

      this.log("ENGINE_RUN_EXCEPTION", `${operation}: ${error.message}`);
      this.renderResult(result);
      return result;
    }
  },

  dependencyCheck() {
    const deps = {
      ODIN_STATE: !!window.ODIN_STATE,
      ODIN_TASK_CENTER: !!window.ODIN_TASK_CENTER,
      ODIN_TASK_CONTROL: !!window.ODIN_TASK_CONTROL,
      ODIN_REVIEW_TO_TASK: !!window.ODIN_REVIEW_TO_TASK,
      ODIN_GIT_CONTROL: !!window.ODIN_GIT_CONTROL,
      ODIN_DIFF_PLANNER: !!window.ODIN_DIFF_PLANNER,
      ODIN_SAFE_PUSH: !!window.ODIN_SAFE_PUSH,
      ODIN_PUSH_PACKAGE_EXPORT: !!window.ODIN_PUSH_PACKAGE_EXPORT,
      ODIN_PROJECT_MAP_PRO: !!window.ODIN_PROJECT_MAP_PRO,
      ODIN_VISUAL_GRAPH: !!window.ODIN_VISUAL_GRAPH
    };

    const result = {
      status: Object.values(deps).every(Boolean) ? "OK" : "WARN",
      version: this.version,
      operations: Object.keys(this.operations),
      dependencies: deps,
      missing: Object.entries(deps).filter(([k, v]) => !v).map(([k]) => k),
      timestamp: new Date().toISOString()
    };

    this.log("ENGINE_DEPENDENCY_CHECK", `missing=${result.missing.length}`);
    this.renderResult(result);
    return result;
  },

  log(type, message) {
    try {
      if (window.ODIN_STATE?.log) {
        ODIN_STATE.log(type, message);
        ODIN_STATE.save?.();
      }
    } catch (e) {
      console.warn("ODIN_ENGINE_LOG_FAIL", e);
    }
  },

  renderStatus(status, message) {
    const statusEl = document.getElementById("engineCoreStatus");
    const msgEl = document.getElementById("engineCoreMessage");
    const opsEl = document.getElementById("engineCoreOps");

    if (statusEl) statusEl.textContent = status;
    if (msgEl) msgEl.textContent = message;
    if (opsEl) opsEl.textContent = Object.keys(this.operations).length;
  },

  renderResult(result) {
    this.renderStatus(result.status, result.data?.message || result.message || result.error || result.operation || "—");
    const box = document.getElementById("engineCoreResultBox");
    if (box) box.textContent = JSON.stringify(result, null, 2);
  },

  copyResult() {
    const box = document.getElementById("engineCoreResultBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  }
};

window.ODIN_ENGINE = ODIN_ENGINE;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => window.ODIN_ENGINE.init(), 900);
});


/* === V04.0.5.2 — UI INTENT OPERATIONS === */
(function(){
  if (!window.ODIN_ENGINE) return;

  ODIN_ENGINE.systemSnapshot = function() {
    let tasks = [];
    try { tasks = this.getTasks ? this.getTasks() : (ODIN_STATE?.getActiveProject?.()?.tasks || []); } catch(e) {}

    const git = window.ODIN_STATE?.data?.git || {};
    const diff = git.diff_plan || null;
    const safe = git.safe_push_checklist || null;
    const pkg = git.push_package || null;

    return {
      tasks_total: tasks.length,
      tasks_open: tasks.filter(t => (t.status || "OPEN") === "OPEN").length,
      diff_total: diff?.counts?.total || 0,
      safe_status: safe?.status || "UNKNOWN",
      package_status: pkg?.status || "UNKNOWN",
      push_ready: pkg?.status === "READY_FOR_MANUAL_PUSH",
      timestamp: new Date().toISOString()
    };
  };

  ODIN_ENGINE.intentNextStep = function(s) {
    if (!s.tasks_total) return "CREATE_OR_RESTORE_TASKS";
    if (!s.diff_total) return "BUILD_PLAN";
    if (s.safe_status !== "READY_FOR_MANUAL_PUSH") return "PREPARE_PUSH";
    if (s.package_status !== "READY_FOR_MANUAL_PUSH") return "EXPORT_PACKAGE";
    return "READY_FOR_MANUAL_PUSH";
  };

  ODIN_ENGINE.register("ui_analyze", () => {
    const snapshot = ODIN_ENGINE.systemSnapshot();
    const next = ODIN_ENGINE.intentNextStep(snapshot);
    return {
      status: "OK",
      message: "UI_ANALYZE_DONE",
      snapshot,
      next_step: next
    };
  });

  ODIN_ENGINE.register("ui_build_plan", () => {
    const before = ODIN_ENGINE.systemSnapshot();

    if (!before.tasks_total) {
      return {
        status: "BLOCKED",
        message: "NO_TASKS_FOR_PLAN",
        snapshot: before,
        next_step: "CREATE_OR_RESTORE_TASKS"
      };
    }

    if (window.ODIN_GIT_CONTROL?.renderPlan) ODIN_GIT_CONTROL.renderPlan();
    if (window.ODIN_DIFF_PLANNER?.render) ODIN_DIFF_PLANNER.render();

    const after = ODIN_ENGINE.systemSnapshot();
    return {
      status: after.diff_total > 0 ? "OK" : "WARN",
      message: after.diff_total > 0 ? "PLAN_AND_DIFF_READY" : "PLAN_BUILT_BUT_DIFF_EMPTY",
      before,
      after,
      next_step: ODIN_ENGINE.intentNextStep(after)
    };
  });

  ODIN_ENGINE.register("ui_prepare_push", () => {
    const before = ODIN_ENGINE.systemSnapshot();

    if (!before.diff_total) {
      return {
        status: "BLOCKED",
        message: "NO_DIFF_FOR_SAFE_PUSH",
        snapshot: before,
        next_step: "BUILD_PLAN"
      };
    }

    if (window.ODIN_SAFE_PUSH?.render) ODIN_SAFE_PUSH.render();

    const after = ODIN_ENGINE.systemSnapshot();

    if (after.safe_status === "READY_FOR_MANUAL_PUSH" && window.ODIN_PUSH_PACKAGE_EXPORT?.render) {
      ODIN_PUSH_PACKAGE_EXPORT.render();
    }

    const final = ODIN_ENGINE.systemSnapshot();

    return {
      status: final.package_status === "READY_FOR_MANUAL_PUSH" ? "OK" : "BLOCKED",
      message: final.package_status === "READY_FOR_MANUAL_PUSH" ? "PUSH_READY" : "SAFE_GATE_NOT_READY",
      before,
      after: final,
      next_step: ODIN_ENGINE.intentNextStep(final)
    };
  });

  ODIN_ENGINE.register("ui_export", () => {
    const before = ODIN_ENGINE.systemSnapshot();

    if (window.ODIN_PUSH_PACKAGE_EXPORT?.render) ODIN_PUSH_PACKAGE_EXPORT.render();
    const after = ODIN_ENGINE.systemSnapshot();

    return {
      status: after.package_status === "READY_FOR_MANUAL_PUSH" ? "OK" : "BLOCKED",
      message: after.package_status === "READY_FOR_MANUAL_PUSH" ? "EXPORT_READY" : "EXPORT_BLOCKED_NOT_READY",
      before,
      after,
      next_step: ODIN_ENGINE.intentNextStep(after)
    };
  });
})();
