/* ODIN V03.5.1 — STATE BRIDGE
   Призначення: безпечно показати CORE STATE в admin.html.
   Не виконує engine. Не змінює content_engine / lesson_generator.
*/

const ODIN_STATE_BRIDGE = {
  createDefaultProject() {
    if (!ODIN_STATE.getActiveProject()) {
      ODIN_EVENT_BUS.emit("PROJECT_CREATED", {
        name: "ODIN Main Project",
        type: "ODIN"
      });
    } else {
      ODIN_STATE.log("INFO", "Default project already exists");
      this.refresh();
    }
  },

  emitTestEvent() {
    if (!ODIN_STATE.getActiveProject()) this.createDefaultProject();

    ODIN_EVENT_BUS.emit("MODE_SELECTED", { mode: "MODE_TEST" });
    ODIN_EVENT_BUS.emit("STAGE_CHANGED", { stage: "PLAN" });
    ODIN_EVENT_BUS.emit("TASK_CREATED", {
      name: "Перевірка ODIN_STATE + EVENT_BUS",
      type: "STATE_TEST",
      status: "RUNNING",
      stage: "TEST"
    });
    ODIN_EVENT_BUS.emit("QA_PASSED", {});
  },

  refresh() {
    const data = ODIN_STATE.data;
    const active = ODIN_STATE.getActiveProject();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("coreActiveProject", active ? active.name : "—");
    setText("coreProjectCount", Object.keys(data.projects).length);
    setText("coreSystemStatus", data.system.status || "IDLE");
    setText("coreStage", data.system.stage || "—");

    const box = document.getElementById("coreStateBox");
    if (box) {
      box.textContent = JSON.stringify({
        version: data.version || ODIN_STATE.version,
        active_project_id: data.active_project_id,
        active_project: active,
        system: data.system,
        logs: data.logs.slice(0, 8),
        unknown_files: data.tree.unknown_files
      }, null, 2);
    }
  }
};

window.ODIN_STATE_BRIDGE = ODIN_STATE_BRIDGE;

document.addEventListener("DOMContentLoaded", () => {
  ODIN_STATE_BRIDGE.refresh();
});
