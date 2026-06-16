/* ODIN V03.6 — TASK CENTER + LIVE STATUS
   Admin reads ODIN_STATE created/updated by index.html.
   No engine logic here.
*/

const ODIN_TASK_CENTER = {
  refresh() {
    if (!window.ODIN_STATE) return;

    ODIN_STATE.load();
    const data = ODIN_STATE.data || {};
    const active = ODIN_STATE.getActiveProject ? ODIN_STATE.getActiveProject() : null;
    const system = data.system || {};
    const tasks = active?.tasks || [];
    const logs = data.logs || [];

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("taskCurrentMode", system.mode || active?.mode || "—");
    setText("taskCurrentStage", system.stage || active?.stage || "—");
    setText("taskCurrentStatus", system.status || active?.status || "—");
    setText("taskCount", tasks.length);

    const taskBox = document.getElementById("taskListBox");
    if (taskBox) {
      taskBox.textContent = tasks.length
        ? tasks.map((t, i) => `${i + 1}. ${t.name}\n   type=${t.type} | status=${t.status} | stage=${t.stage}\n   created=${t.created_at}`).join("\n\n")
        : "Поки немає задач.";
    }

    const logBox = document.getElementById("executionLogBox");
    if (logBox) {
      logBox.textContent = logs.length
        ? logs.slice(0, 40).map(l => `${l.time} — ${l.type} — ${l.message}`).join("\n")
        : "Поки немає подій.";
    }

    if (window.ODIN_STATE_BRIDGE) ODIN_STATE_BRIDGE.refresh();
  },

  clearView() {
    const taskBox = document.getElementById("taskListBox");
    const logBox = document.getElementById("executionLogBox");
    if (taskBox) taskBox.textContent = "View cleared. State не змінено.";
    if (logBox) logBox.textContent = "View cleared. State не змінено.";
  }
};

window.ODIN_TASK_CENTER = ODIN_TASK_CENTER;

document.addEventListener("DOMContentLoaded", () => {
  ODIN_TASK_CENTER.refresh();
  setInterval(() => ODIN_TASK_CENTER.refresh(), 2000);
});
