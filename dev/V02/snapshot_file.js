
const ODIN_SNAPSHOT_FILE = {
  buildSnapshot() {
    return {
      version: "V03.7.6",
      created_at: new Date().toISOString(),
      odin_state: window.ODIN_STATE?.data || null,
      review_decisions: JSON.parse(localStorage.getItem("odin_unknown_review_v0373") || "{}"),
      review_to_task: window.ODIN_STATE?.data?.tree?.review_to_task_report || null,
      unknown_review: window.ODIN_STATE?.data?.tree?.unknown_review || null,
      unknown_semantic: window.ODIN_STATE?.data?.tree?.unknown_semantic || null
    };
  },

  exportJSON() {
    const snap = this.buildSnapshot();
    document.getElementById("snapshotBox").textContent = JSON.stringify(snap, null, 2);
  },

  downloadFile() {
    const snap = this.buildSnapshot();
    const blob = new Blob([JSON.stringify(snap, null, 2)], {type: "application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ODIN_SYSTEM_SNAPSHOT_v03_7_6.json";
    a.click();
  },

  restoreFromBox() {
    try {
      const data = JSON.parse(document.getElementById("snapshotBox").textContent);

      if (data.review_decisions) {
        localStorage.setItem("odin_unknown_review_v0373", JSON.stringify(data.review_decisions));
      }

      if (data.odin_state && window.ODIN_STATE) {
        ODIN_STATE.data = data.odin_state;
        ODIN_STATE.save();
      }

      alert("RESTORED");
    } catch(e) {
      alert("ERROR: " + e.message);
    }
  }
};

window.ODIN_SNAPSHOT_FILE = ODIN_SNAPSHOT_FILE;
