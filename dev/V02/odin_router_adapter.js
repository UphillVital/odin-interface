/* ODIN V03.5.2 — ROUTER ADAPTER
   Призначення:
   MODE → EVENT BUS → ODIN_STATE → smart_router.js → content_engine.js → lesson_generator.js

   Не замінює:
   - smart_router.js
   - content_engine.js
   - lesson_generator.js
*/

const ODIN_ROUTER_ADAPTER = {
  setStatus(text) {
    const box = document.getElementById("modeStatus");
    if (box) box.textContent = text;
  },

  appendStatus(text) {
    const box = document.getElementById("modeStatus");
    if (box) box.textContent += "\n" + text;
  },

  ensureCoreSession() {
    if (typeof autoSelect === "function") {
      autoSelect();
      this.appendStatus("AUTO SELECT CORE: DONE");
    } else {
      this.appendStatus("AUTO SELECT CORE: function autoSelect() not found");
    }
  },

  applyModeToInputs(mode) {
    const topicEl = document.getElementById("lessonTopic");
    const taskEl = document.getElementById("lessonTask");

    if (mode.topic && topicEl) topicEl.value = mode.topic;
    if (mode.task && taskEl) taskEl.value = mode.task;

    this.appendStatus("INPUT UPDATED: " + mode.id);
  },

  async routeToEngine(mode) {
    if (!window.ODIN_SMART_ROUTER) {
      throw new Error("ODIN_SMART_ROUTER not found. Перевір smart_router.js.");
    }

    if (!window.ODIN_CONTENT_ENGINE) {
      throw new Error("ODIN_CONTENT_ENGINE not found. Перевір content_engine.js.");
    }

    if (!window.ODIN_LESSON_GENERATOR) {
      throw new Error("ODIN_LESSON_GENERATOR not found. Перевір lesson_generator.js.");
    }

    this.appendStatus("ROUTER ACTION: " + mode.router_action);

    // smart_router у V03.4 відповідає за autoSelect core через autoSelect().
    this.ensureCoreSession();

    if (window.ODIN_EVENT_BUS) {
      ODIN_EVENT_BUS.emit("STAGE_CHANGED", { stage: "BUILD" });
      ODIN_EVENT_BUS.emit("ENGINE_STARTED", { mode: mode.id, action: mode.router_action });
    }

    this.appendStatus("CONTENT EXTRACTION: START");
    await ODIN_CONTENT_ENGINE.extract();
    this.appendStatus("CONTENT EXTRACTION: DONE");

    this.appendStatus("LESSON GENERATOR: START");
    await ODIN_LESSON_GENERATOR.generate();
    this.appendStatus("LESSON GENERATOR: DONE");

    if (window.ODIN_EVENT_BUS) {
      ODIN_EVENT_BUS.emit("QA_PASSED", { mode: mode.id });
      ODIN_EVENT_BUS.emit("ENGINE_DONE", { mode: mode.id, action: mode.router_action });
    }

    this.appendStatus("RESULT: ENGINE DONE");
  },

  async runMode(modeId) {
    const mode = ODIN_MODE_REGISTRY.get(modeId);

    if (!mode) {
      this.setStatus("ERROR: MODE not found: " + modeId);
      return;
    }

    try {
      this.setStatus("MODE SELECTED: " + mode.name + "\n" + mode.description);

      if (window.ODIN_STATE && typeof ODIN_STATE.ensureProject === "function") {
        ODIN_STATE.ensureProject();
      }

      if (window.ODIN_EVENT_BUS) {
        ODIN_EVENT_BUS.emit("MODE_SELECTED", { mode: mode.id, router_action: mode.router_action });
        ODIN_EVENT_BUS.emit("TASK_CREATED", {
          name: "Run " + mode.name,
          type: "MODE_RUN",
          status: "RUNNING",
          stage: "PLAN"
        });
        ODIN_EVENT_BUS.emit("STAGE_CHANGED", { stage: "PLAN" });
      }

      this.applyModeToInputs(mode);
      await this.routeToEngine(mode);
    } catch (error) {
      console.error(error);
      this.appendStatus("ERROR: " + error.message);

      if (window.ODIN_EVENT_BUS) {
        ODIN_EVENT_BUS.emit("ERROR", {
          message: error.message,
          mode: modeId
        });
      }
    }
  }
};

window.ODIN_ROUTER_ADAPTER = ODIN_ROUTER_ADAPTER;
