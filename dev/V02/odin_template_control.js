const ODIN_TEMPLATE_CONTROL = {
  lessonTemplate: "ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html",

  routes: {
    admin: "dev/V02/admin.html",
    admin_login: "dev/V02/login.html",
    interface: "dev/V01 or dev/V02 depending on context",
    lesson: "ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html",
    photo_lesson: "ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html",
    issu_photo_lesson: "ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html",
    ssudt_lesson: "ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html",
    qa_tool: "QA tool template",
    docs_package: "README / MD package structure",
    recovery_package: "recovery package structure"
  },

  forbiddenForLessons: [
    "dev/index.html",
    "ODIN Interface",
    "ODIN-ADMIN",
    "admin.html"
  ],

  routeCheck(){
    const lines = Object.entries(this.routes).map(([task, tpl]) => `${task} → ${tpl}`);
    document.getElementById("templateRouterView").textContent = lines.join("\n");
    this.log("ROUTE_CHECK", "Template routing table shown.");
  },

  lessonLock(){
    const text = [
      "LESSON HARD LOCK: ACTIVE",
      "",
      "Required template:",
      this.lessonTemplate,
      "",
      "Applies to:",
      "- lesson",
      "- photo_lesson",
      "- issu_photo_lesson",
      "- ssudt_lesson",
      "",
      "Forbidden:",
      ...this.forbiddenForLessons.map(x => "- " + x)
    ].join("\n");

    document.getElementById("templateLockView").textContent = text;
    this.log("LESSON_LOCK", "Lesson hard lock confirmed.");
  },

  adminLock(){
    const text = [
      "ADMIN LOCK: ACTIVE",
      "",
      "Admin UI:",
      "dev/V02/admin.html",
      "",
      "Login:",
      "dev/V02/login.html",
      "",
      "Rule:",
      "Admin templates must not be used as lesson templates.",
      "Lesson template must not be used as admin shell."
    ].join("\n");

    document.getElementById("templateLockView").textContent = text;
    this.log("ADMIN_LOCK", "Admin template lock confirmed.");
  },

  routerQA(){
    const text = document.getElementById("filePreview")?.textContent || "";
    const checks = [];

    function add(level, title, note){ checks.push({level,title,note}); }

    add("pass", "CONTROL_LOADED", "Template Control System активний.");

    if(text.includes("TEMPLATE_BASE_v1") || text.includes("lesson →")){
      add("pass", "LESSON_ROUTE_PRESENT", "У відкритому файлі/preview є route до TEMPLATE_BASE_v1.");
    } else {
      add("warn", "LESSON_ROUTE_NOT_VISIBLE", "У поточному preview не видно route до TEMPLATE_BASE_v1. Відкрий Template Router і повтори.");
    }

    if(text.includes("FORBIDDEN") || text.includes("ODIN-ADMIN") || text.includes("dev/index.html")){
      add("pass", "FORBIDDEN_RULES_PRESENT", "Є заборони для неправильних шаблонів.");
    } else {
      add("warn", "FORBIDDEN_RULES_NOT_VISIBLE", "Не видно правил заборони. Перевір ODIN_TEMPLATE_ROUTER_v1.md.");
    }

    const errors = checks.filter(x => x.level === "fail").length;
    const warnings = checks.filter(x => x.level === "warn").length;
    const result = errors ? "TEMPLATE_QA_FAILED" : warnings ? "TEMPLATE_QA_WARNINGS" : "TEMPLATE_QA_PASSED";

    document.getElementById("templateRouterView").textContent = checks.map(x => `[${x.level.toUpperCase()}] ${x.title} — ${x.note}`).join("\n");
    document.getElementById("templateLockView").textContent = result;

    this.log("ROUTER_QA", result);
    return {result, checks};
  },

  routeFor(taskType){
    return this.routes[taskType] || "SAFE_MODE";
  },

  log(type, message){
    if(window.ODIN_ADMIN_STATE){
      ODIN_ADMIN_STATE.addLog(type, message);
      if(window.ODIN_ADMIN) ODIN_ADMIN.render();
    }
  }
};
