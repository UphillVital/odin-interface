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
