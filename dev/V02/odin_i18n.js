/* ODIN V04.0.5.1 — I18N CORE
   Global language service for ODIN UI.
   UA/EN minimum.
   Source of truth: ODIN_STATE.data.lang
*/

const ODIN_I18N = {
  version: "V04.0.5.1",
  defaultLang: "ua",
  lang: "ua",

  dict: {
    ua: {
      app_title: "ODIN Control Center",
      app_subtitle: "Ядро керування системою",
      lang_ua: "UA",
      lang_en: "EN",

      level_user: "Рівень 1 — Користувач",
      level_control: "Рівень 2 — Керування",
      level_system: "Рівень 3 — Система",

      status: "Статус",
      project: "Проєкт",
      current_step: "Поточний крок",
      ready: "Готово",
      blocked: "Заблоковано",
      running: "Виконується",
      unknown: "Невідомо",

      main_actions: "Головні дії",
      btn_analyze: "Аналіз",
      btn_build_plan: "Побудувати план",
      btn_prepare_push: "Підготувати push",
      btn_export: "Експорт",
      btn_engine_test: "Тест ядра",
      btn_dependency_check: "Перевірка залежностей",

      system_overview: "Огляд системи",
      engine_status: "Статус ядра",
      push_status: "Push статус",
      task_count: "Кількість задач",
      graph_status: "Граф",

      advanced_blocks: "Технічні блоки",
      show_advanced: "Показати технічне",
      hide_advanced: "Сховати технічне",

      msg_i18n_ready: "Мультимовність активна",
      msg_ui_ready: "Базова структура UI активна",
      msg_engine_ready: "Ядро готове",
      next_step: "Наступний крок",

      next_build_plan: "Побудуй план",
      next_prepare_push: "Підготуй push",
      next_system_ready: "Система готова"
    },

    en: {
      app_title: "ODIN Control Center",
      app_subtitle: "System control core",
      lang_ua: "UA",
      lang_en: "EN",

      level_user: "Level 1 — User",
      level_control: "Level 2 — Control",
      level_system: "Level 3 — System",

      status: "Status",
      project: "Project",
      current_step: "Current step",
      ready: "Ready",
      blocked: "Blocked",
      running: "Running",
      unknown: "Unknown",

      main_actions: "Main Actions",
      btn_analyze: "Analyze",
      btn_build_plan: "Build Plan",
      btn_prepare_push: "Prepare Push",
      btn_export: "Export",
      btn_engine_test: "Engine Test",
      btn_dependency_check: "Dependency Check",

      system_overview: "System Overview",
      engine_status: "Engine Status",
      push_status: "Push Status",
      task_count: "Task Count",
      graph_status: "Graph",

      advanced_blocks: "Advanced Blocks",
      show_advanced: "Show Advanced",
      hide_advanced: "Hide Advanced",

      msg_i18n_ready: "Multilingual mode is active",
      msg_ui_ready: "Base UI structure is active",
      msg_engine_ready: "Engine ready",
      next_step: "Next step",

      next_build_plan: "Build a plan",
      next_prepare_push: "Prepare push",
      next_system_ready: "System ready"
    }
  },

  init() {
    this.lang = this.getLang();
    this.apply();
    this.log("I18N_INIT", `lang=${this.lang}`);
  },

  getLang() {
    try {
      if (window.ODIN_STATE?.load) ODIN_STATE.load();
      const lang = window.ODIN_STATE?.data?.lang;
      if (lang && this.dict[lang]) return lang;
    } catch (e) {}

    try {
      const local = localStorage.getItem("odin_lang");
      if (local && this.dict[local]) return local;
    } catch (e) {}

    return this.defaultLang;
  },

  setLang(lang) {
    if (!this.dict[lang]) return false;

    this.lang = lang;

    try {
      localStorage.setItem("odin_lang", lang);
    } catch (e) {}

    try {
      if (window.ODIN_STATE) {
        if (ODIN_STATE.load) ODIN_STATE.load();
        ODIN_STATE.data = ODIN_STATE.data || {};
        ODIN_STATE.data.lang = lang;
        ODIN_STATE.log?.("I18N_LANG_SET", lang);
        ODIN_STATE.save?.();
      }
    } catch (e) {}

    this.apply();
    return true;
  },

  t(key) {
    return this.dict[this.lang]?.[key] || this.dict[this.defaultLang]?.[key] || key;
  },

  apply(root = document) {
    root.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = this.t(key);
    });

    root.querySelectorAll("[data-i18n-title]").forEach(el => {
      const key = el.getAttribute("data-i18n-title");
      el.setAttribute("title", this.t(key));
    });

    document.documentElement.setAttribute("data-odin-lang", this.lang);
    this.updateLangButtons();
    this.updateSmartPanel();
  },

  updateLangButtons() {
    document.querySelectorAll("[data-lang-switch]").forEach(btn => {
      const lang = btn.getAttribute("data-lang-switch");
      btn.classList.toggle("active", lang === this.lang);
    });
  },

  updateSmartPanel() {
    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    let state = {};
    try {
      state = window.ODIN_STATE?.data || {};
    } catch (e) {}

    const projectId = state.active_project_id || "—";
    const engineStatus = window.ODIN_ENGINE ? this.t("ready") : this.t("unknown");
    const pushStatus = state.git?.push_package?.status || "—";
    const taskCount = (() => {
      try {
        return window.ODIN_ENGINE?.taskSummaryData?.()?.total ?? "—";
      } catch (e) {
        return "—";
      }
    })();

    set("odinUiProject", projectId);
    set("odinUiEngineStatus", engineStatus);
    set("odinUiPushStatus", pushStatus);
    set("odinUiTaskCount", taskCount);
    set("odinUiNextStep", this.nextStepLabel(pushStatus, taskCount));
  },

  nextStepLabel(pushStatus, taskCount) {
    if (pushStatus === "READY_FOR_MANUAL_PUSH") return this.t("next_system_ready");
    if (Number(taskCount) > 0) return this.t("next_prepare_push");
    return this.t("next_build_plan");
  },

  log(type, message) {
    try {
      if (window.ODIN_STATE?.log) {
        ODIN_STATE.log(type, message);
        ODIN_STATE.save?.();
      }
    } catch (e) {}
  }
};

const ODIN_UI_LEVELS = {
  current: "control",

  set(level) {
    const previousScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const shell = document.querySelector(".odin-control-shell");
    const shellTopBefore = shell ? shell.getBoundingClientRect().top : null;

    this.current = level;
    document.body.setAttribute("data-odin-level", level);

    document.querySelectorAll("[data-level-switch]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-level-switch") === level);
      btn.setAttribute("type", "button");
    });

    try {
      localStorage.setItem("odin_ui_level", level);
    } catch (e) {}

    if (window.ODIN_STATE) {
      ODIN_STATE.data = ODIN_STATE.data || {};
      ODIN_STATE.data.ui_level = level;
      ODIN_STATE.log?.("UI_LEVEL_SET", level);
      ODIN_STATE.save?.();
    }

    // Scroll stability:
    // Level switch changes document height. Preserve the user's viewport.
    requestAnimationFrame(() => {
      try {
        if (shell && shellTopBefore !== null) {
          const shellTopAfter = shell.getBoundingClientRect().top;
          const delta = shellTopAfter - shellTopBefore;
          window.scrollTo({ top: Math.max(0, previousScrollY + delta), left: 0, behavior: "auto" });
        } else {
          window.scrollTo({ top: previousScrollY, left: 0, behavior: "auto" });
        }
      } catch (e) {
        window.scrollTo(0, previousScrollY);
      }
    });
  },

  init() {
    let level = "control";
    try {
      level = localStorage.getItem("odin_ui_level") || window.ODIN_STATE?.data?.ui_level || "control";
    } catch (e) {}
    this.set(level);
  }
};

window.ODIN_I18N = ODIN_I18N;
window.ODIN_UI_LEVELS = ODIN_UI_LEVELS;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    ODIN_UI_LEVELS.init();
    ODIN_I18N.init();
  }, 600);
});
