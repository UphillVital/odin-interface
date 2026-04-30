/* ODIN V03.6 — STATE BRIDGE FOR ADMIN */

const ODIN_STATE_BRIDGE = {
  createDefaultProject() {
    if (!window.ODIN_STATE) return;
    if (!ODIN_STATE.getActiveProject()) {
      if (window.ODIN_EVENT_BUS) {
        ODIN_EVENT_BUS.emit("PROJECT_CREATED", { name: "ODIN Main Project", type: "ODIN" });
      } else {
        ODIN_STATE.createProject({ name: "ODIN Main Project", type: "ODIN" });
      }
    }
    this.refresh();
  },

  emitTestEvent() {
    this.createDefaultProject();
    if (window.ODIN_EVENT_BUS) {
      ODIN_EVENT_BUS.emit("MODE_SELECTED", { mode: "MODE_TEST" });
      ODIN_EVENT_BUS.emit("STAGE_CHANGED", { stage: "PLAN" });
      ODIN_EVENT_BUS.emit("TASK_CREATED", {
        name: "Перевірка ODIN_STATE + TASK_CENTER",
        type: "STATE_TEST",
        status: "RUNNING",
        stage: "TEST"
      });
      ODIN_EVENT_BUS.emit("QA_PASSED", {});
    }
    this.refresh();
  },

  refresh() {
    if (!window.ODIN_STATE) return;
    ODIN_STATE.load();

    const data = ODIN_STATE.data;
    const active = ODIN_STATE.getActiveProject();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("coreActiveProject", active ? active.name : "—");
    setText("coreProjectCount", Object.keys(data.projects || {}).length);
    setText("coreSystemStatus", data.system?.status || "IDLE");
    setText("coreStage", data.system?.stage || "—");

    const box = document.getElementById("coreStateBox");
    if (box) {
      box.textContent = JSON.stringify({
        version: ODIN_STATE.version,
        active_project_id: data.active_project_id,
        active_project: active,
        system: data.system,
        logs: (data.logs || []).slice(0, 8),
        unknown_files: data.tree?.unknown_files || []
      }, null, 2);
    }
  }
};

window.ODIN_STATE_BRIDGE = ODIN_STATE_BRIDGE;

document.addEventListener("DOMContentLoaded", () => {
  ODIN_STATE_BRIDGE.refresh();
});
