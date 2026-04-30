/* ODIN V03.7.6 — SNAPSHOT FILE EXPORT / IMPORT
   Призначення:
   - зберегти ODIN state/review/tasks у JSON файл
   - відновити з JSON
   - не писати напряму в repo
   - не виконувати git
*/

const ODIN_SNAPSHOT_FILE = {
  buildSnapshot() {
    let reviewDecisions = {};
    try {
      reviewDecisions = JSON.parse(localStorage.getItem("odin_unknown_review_v0373")) || {};
    } catch (e) {}

    if (window.ODIN_STATE?.load) ODIN_STATE.load();

    return {
      version: "V03.7.6",
      created_at: new Date().toISOString(),
      origin: location.origin,
      path: location.pathname,
      odin_state: window.ODIN_STATE?.data || null,
      review_decisions: reviewDecisions,
      review_to_task_report: window.ODIN_STATE?.data?.tree?.review_to_task_report || null,
      unknown_review: window.ODIN_STATE?.data?.tree?.unknown_review || null,
      unknown_semantic: window.ODIN_STATE?.data?.tree?.unknown_semantic || null,
      task_control_snapshot: (() => {
        try {
          return JSON.parse(localStorage.getItem("odin_task_control_snapshot_v0375")) || null;
        } catch (e) { return null; }
      })()
    };
  },

  exportJSON() {
    const snap = this.buildSnapshot();
    const box = document.getElementById("snapshotFileBox");
    if (box) box.textContent = JSON.stringify(snap, null, 2);

    if (window.ODIN_STATE) {
      ODIN_STATE.log("SNAPSHOT_JSON_EXPORTED", "Snapshot JSON exported to UI");
      ODIN_STATE.save();
    }
  },

  downloadFile() {
    const snap = this.buildSnapshot();
    const blob = new Blob([JSON.stringify(snap, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ODIN_SYSTEM_SNAPSHOT_v03_7_6.json";
    document.body.appendChild(a);
    a.click();
    a.remove();

    if (window.ODIN_STATE) {
      ODIN_STATE.log("SNAPSHOT_FILE_DOWNLOADED", "ODIN_SYSTEM_SNAPSHOT_v03_7_6.json");
      ODIN_STATE.save();
    }
  },

  restoreFromBox() {
    const box = document.getElementById("snapshotFileBox");
    if (!box || !box.textContent.trim()) {
      alert("SNAPSHOT BOX EMPTY");
      return;
    }

    try {
      const data = JSON.parse(box.textContent);

      if (data.review_decisions) {
        localStorage.setItem("odin_unknown_review_v0373", JSON.stringify(data.review_decisions, null, 2));
      }

      if (data.task_control_snapshot) {
        localStorage.setItem("odin_task_control_snapshot_v0375", JSON.stringify(data.task_control_snapshot, null, 2));
      }

      if (data.odin_state && window.ODIN_STATE) {
        ODIN_STATE.data = data.odin_state;
        ODIN_STATE.log("SNAPSHOT_RESTORED", "Snapshot restored from JSON box");
        ODIN_STATE.save();
      }

      if (window.ODIN_TASK_CENTER?.refresh) ODIN_TASK_CENTER.refresh();
      if (window.ODIN_TASK_CONTROL?.render) ODIN_TASK_CONTROL.render();

      alert("SNAPSHOT RESTORED");
    } catch (e) {
      alert("RESTORE ERROR: " + e.message);
    }
  },

  copySnapshot() {
    const box = document.getElementById("snapshotFileBox");
    const text = box?.textContent || JSON.stringify(this.buildSnapshot(), null, 2);
    navigator.clipboard?.writeText(text);
  }
};

window.ODIN_SNAPSHOT_FILE = ODIN_SNAPSHOT_FILE;
