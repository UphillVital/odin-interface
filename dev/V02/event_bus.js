/* ODIN V03.5.3 — EVENT BUS */

const ODIN_EVENT_BUS = window.ODIN_EVENT_BUS || {
  listeners: {},

  on(eventName, handler) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    this.listeners[eventName].push(handler);
  },

  emit(eventName, payload = {}) {
    const event = { name: eventName, payload, time: new Date().toISOString() };

    if (window.ODIN_STATE && typeof ODIN_STATE.handleEvent === "function") {
      ODIN_STATE.handleEvent(event);
    }

    (this.listeners[eventName] || []).forEach(handler => {
      try { handler(event); }
      catch (error) { console.error("ODIN_EVENT_BUS handler error:", error); }
    });

    return event;
  }
};

window.ODIN_EVENT_BUS = ODIN_EVENT_BUS;
