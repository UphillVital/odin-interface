/* ODIN V03.5.3 — FULL GLOBAL ENGINE FIX */

(function(){
  if (typeof ODIN_SMART_ROUTER !== "undefined") window.ODIN_SMART_ROUTER = ODIN_SMART_ROUTER;
  if (typeof autoSelect === "function") window.autoSelect = autoSelect;
  if (typeof ODIN_CONTENT_ENGINE !== "undefined") window.ODIN_CONTENT_ENGINE = ODIN_CONTENT_ENGINE;
  if (typeof ODIN_LESSON_GENERATOR !== "undefined") window.ODIN_LESSON_GENERATOR = ODIN_LESSON_GENERATOR;
  if (typeof ODIN_SESSION !== "undefined") window.ODIN_SESSION = ODIN_SESSION;

  console.log("[ODIN V03.5.3] GLOBAL ENGINE FIX:", {
    router: !!window.ODIN_SMART_ROUTER,
    autoSelect: !!window.autoSelect,
    content_engine: !!window.ODIN_CONTENT_ENGINE,
    lesson_generator: !!window.ODIN_LESSON_GENERATOR,
    session: !!window.ODIN_SESSION
  });
})();
