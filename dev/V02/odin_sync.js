const ODIN_SYNC = {
  snapshot(){
    const data = {
      time: new Date().toISOString(),
      selected: ODIN_ADMIN_STATE.selected,
      logCount: ODIN_ADMIN_STATE.getLog().length,
      status: "SNAPSHOT_SAVED"
    };
    localStorage.setItem(ODIN_ADMIN_STATE.snapshotKey, JSON.stringify(data, null, 2));
    ODIN_ADMIN_STATE.addLog("SNAPSHOT", "Snapshot збережено в localStorage.");
    ODIN_ADMIN.render();
  },
  sync(){
    localStorage.setItem("odin_admin_v02_sync_time", new Date().toISOString());
    ODIN_ADMIN_STATE.addLog("SYNC", "Local sync виконано. Backend/Git sync буде наступним шаром.");
    ODIN_ADMIN.render();
  }
};
