/* ODIN V03.9.1.1 — SNAPSHOT MODULE LOAD FIX
   Ensures window.ODIN_SNAPSHOT_FILE exists on admin.html.
   View/export/import only. No filesystem write. No git exec.
*/

(function () {
  const ODIN_SNAPSHOT_FILE = {
    version: "V03.9.1.1",

    buildSnapshot() {
      let reviewDecisions = {};
      try {
        reviewDecisions = JSON.parse(localStorage.getItem("odin_unknown_review_v0373")) || {};
      } catch (e) {
        reviewDecisions = { error: e.message };
      }

      if (window.ODIN_STATE?.load) {
        try { ODIN_STATE.load(); } catch (e) {}
      }

      const state = window.ODIN_STATE?.data || null;

      return {
        version: this.version,
        created_at: new Date().toISOString(),
        origin: location.origin,
        path: location.pathname,
        odin_state: state,
        review_decisions: reviewDecisions,
        review_to_task_report: state?.tree?.review_to_task_report || null,
        unknown_review: state?.tree?.unknown_review || null,
        unknown_semantic: state?.tree?.unknown_semantic || null,
        git: state?.git || null,
        active_project_id: state?.active_project_id || null
      };
    },

    exportJSON() {
      const snap = this.buildSnapshot();
      const box = document.getElementById("snapshotFileBox") || document.getElementById("taskSnapshotBox");
      if (box) box.textContent = JSON.stringify(snap, null, 2);

      if (window.ODIN_STATE) {
        ODIN_STATE.log?.("SNAPSHOT_JSON_EXPORTED", "Snapshot JSON exported to UI");
        ODIN_STATE.save?.();
      }

      return snap;
    },

    downloadFile() {
      const snap = this.buildSnapshot();
      const blob = new Blob([JSON.stringify(snap, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "ODIN_SYSTEM_SNAPSHOT_v03_9_1_1.json";
      document.body.appendChild(a);
      a.click();
      a.remove();

      if (window.ODIN_STATE) {
        ODIN_STATE.log?.("SNAPSHOT_FILE_DOWNLOADED", "ODIN_SYSTEM_SNAPSHOT_v03_9_1_1.json");
        ODIN_STATE.save?.();
      }
    },

    restoreFromBox() {
      const box = document.getElementById("snapshotFileBox") || document.getElementById("taskSnapshotBox");
      if (!box || !box.textContent.trim()) {
        alert("SNAPSHOT BOX EMPTY");
        return;
      }

      try {
        const data = JSON.parse(box.textContent);

        if (data.review_decisions) {
          localStorage.setItem("odin_unknown_review_v0373", JSON.stringify(data.review_decisions, null, 2));
        }

        if (data.odin_state && window.ODIN_STATE) {
          ODIN_STATE.data = data.odin_state;
          ODIN_STATE.log?.("SNAPSHOT_RESTORED", "Snapshot restored from JSON box");
          ODIN_STATE.save?.();
        }

        if (window.ODIN_TASK_CENTER?.refresh) ODIN_TASK_CENTER.refresh();
        if (window.ODIN_TASK_CONTROL?.render) ODIN_TASK_CONTROL.render();

        alert("SNAPSHOT RESTORED");
      } catch (e) {
        alert("RESTORE ERROR: " + e.message);
      }
    },

    copySnapshot() {
      const box = document.getElementById("snapshotFileBox") || document.getElementById("taskSnapshotBox");
      const text = box?.textContent || JSON.stringify(this.buildSnapshot(), null, 2);
      navigator.clipboard?.writeText(text);
    }
  };

  window.ODIN_SNAPSHOT_FILE = ODIN_SNAPSHOT_FILE;

  document.addEventListener("DOMContentLoaded", () => {
    if (window.ODIN_STATE) {
      ODIN_STATE.log?.("SNAPSHOT_MODULE_LOADED", "ODIN_SNAPSHOT_FILE available");
      ODIN_STATE.save?.();
    }
  });
})();
