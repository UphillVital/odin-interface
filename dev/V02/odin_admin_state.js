const ODIN_ADMIN_STATE = {
  selected: {
    id: "dashboard",
    title: "Dashboard",
    path: "ODIN SYSTEM",
    type: "system",
    status: "READY",
    layer: "ODIN",
    description: "ODIN-ADMIN V02 PRO Global Control Center"
  },
  logKey: "odin_admin_v02_log",
  snapshotKey: "odin_admin_v02_snapshot",
  getLog(){
    try { return JSON.parse(localStorage.getItem(this.logKey)) || []; } catch(e){ return []; }
  },
  saveLog(log){ localStorage.setItem(this.logKey, JSON.stringify(log.slice(0,120))); },
  addLog(type, message){
    const log = this.getLog();
    log.unshift({ time: new Date().toLocaleString(), type, selected: this.selected.path, message });
    this.saveLog(log);
  },
  clearLog(){ localStorage.removeItem(this.logKey); }
};
