/* ODIN V03.5.2.1 — ROUTER GLOBAL FIX
   Призначення:
   зробити ODIN_SMART_ROUTER і autoSelect доступними глобально для Router Adapter.

   Чому потрібно:
   smart_router.js оголошує const ODIN_SMART_ROUTER,
   але Router Adapter перевіряє window.ODIN_SMART_ROUTER.
*/

(function(){
  if (typeof ODIN_SMART_ROUTER !== "undefined") {
    window.ODIN_SMART_ROUTER = ODIN_SMART_ROUTER;
  }

  if (typeof autoSelect === "function") {
    window.autoSelect = autoSelect;
  }

  console.log("[ODIN V03.5.2.1] Router globals exposed:", {
    ODIN_SMART_ROUTER: !!window.ODIN_SMART_ROUTER,
    autoSelect: !!window.autoSelect
  });
})();
