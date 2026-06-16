/* ODIN V03.5.3 — CORE STATE */

const ODIN_STATE = window.ODIN_STATE || {
  version: "V03.5.3",
  storageKey: "odin_core_state_v0351",

  data: {
    active_project_id: null,
    projects: {},
    system: {
      status: "IDLE",
      mode: null,
      stage: null,
      last_action: null,
      errors: [],
      guards: []
    },
    logs: [],
    registry: { modes: {}, actions: {} },
    tree: {
      base_path: "ODIN_TREE_PROJECT_v1",
      files: [],
      index: {},
      unknown_files: []
    },
    git: {
      changed_files: [],
      staged_files: [],
      last_commit: null,
      ready: false
    }
  },

  load() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) this.data = JSON.parse(saved);
    } catch (error) {
      console.error("ODIN_STATE load error:", error);
    }
    return this.data;
  },

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    return this.data;
  },

  log(type, message, extra = {}) {
    this.data.logs.unshift({ time: new Date().toLocaleString(), type, message, extra });
    this.data.logs = this.data.logs.slice(0, 200);
    this.save();
  },

  createProject(project = {}) {
    const id = project.id || ("project_" + Date.now());
    this.data.projects[id] = {
      id,
      name: project.name || "ODIN Main Project",
      type: project.type || "ODIN",
      mode: null,
      stage: null,
      status: "IDLE",
      tasks: [],
      log: [],
      history: [],
      context: { input: null, topic: null, files: [] },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.data.active_project_id = id;
    this.log("PROJECT_CREATED", id);
    this.save();
    return this.data.projects[id];
  },

  ensureProject() {
    return this.getActiveProject() || this.createProject({ name: "ODIN Main Project", type: "ODIN" });
  },

  selectProject(projectId) {
    if (!this.data.projects[projectId]) return null;
    this.data.active_project_id = projectId;
    this.log("PROJECT_SELECTED", projectId);
    this.save();
    return this.data.projects[projectId];
  },

  getActiveProject() {
    return this.data.projects[this.data.active_project_id] || null;
  },

  updateSystem(patch = {}) {
    this.data.system = { ...this.data.system, ...patch };
    this.save();
    return this.data.system;
  },

  setStage(stage) {
    this.data.system.stage = stage;
    this.data.system.last_action = "STAGE_CHANGED";
    const project = this.ensureProject();
    project.stage = stage;
    project.updated_at = new Date().toISOString();
    this.log("STAGE_CHANGED", stage);
    this.save();
  },

  setMode(mode) {
    this.data.system.mode = mode;
    this.data.system.last_action = "MODE_SELECTED";
    const project = this.ensureProject();
    project.mode = mode;
    project.updated_at = new Date().toISOString();
    this.log("MODE_SELECTED", mode);
    this.save();
  },

  addTask(task = {}) {
    const project = this.ensureProject();
    const newTask = {
      id: task.id || ("task_" + Date.now()),
      name: task.name || "New Task",
      type: task.type || "GENERAL",
      status: task.status || "NEW",
      stage: task.stage || "PLAN",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      result: null
    };
    project.tasks.unshift(newTask);
    project.updated_at = new Date().toISOString();
    this.log("TASK_CREATED", newTask.name);
    this.save();
    return newTask;
  },

  handleEvent(event) {
    switch (event.name) {
      case "PROJECT_CREATED": this.createProject(event.payload); break;
      case "PROJECT_SELECTED": this.selectProject(event.payload.project_id); break;
      case "MODE_SELECTED": this.setMode(event.payload.mode); break;
      case "STAGE_CHANGED": this.setStage(event.payload.stage); break;
      case "TASK_CREATED": this.addTask(event.payload); break;
      case "ENGINE_STARTED":
        this.updateSystem({ status: "RUNNING", last_action: "ENGINE_STARTED" });
        this.log("ENGINE_STARTED", event.payload.mode || "");
        break;
      case "ENGINE_DONE":
        this.updateSystem({ status: "ENGINE_DONE", last_action: "ENGINE_DONE" });
        this.log("ENGINE_DONE", event.payload.mode || "");
        break;
      case "QA_PASSED":
        this.updateSystem({ status: "QA_PASSED", last_action: "QA_PASSED" });
        this.log("QA_PASSED", "QA passed");
        break;
      case "QA_FAILED":
        this.updateSystem({ status: "QA_FAILED", last_action: "QA_FAILED" });
        this.log("QA_FAILED", "QA failed", event.payload);
        break;
      case "ERROR":
        this.data.system.errors.unshift(event.payload);
        this.updateSystem({ status: "ERROR", last_action: "ERROR" });
        this.log("ERROR", event.payload.message || "Unknown error", event.payload);
        break;
      default:
        this.log(event.name, "Unhandled event", event.payload);
    }
    this.save();
  }
};

ODIN_STATE.load();
window.ODIN_STATE = ODIN_STATE;
