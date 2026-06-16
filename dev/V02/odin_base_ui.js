/* ODIN V04.0.5.1 — BASE UI STRUCTURE */

const ODIN_BASE_UI = {
  refresh() {
    if (window.ODIN_I18N) ODIN_I18N.apply();
  },

  analyze() {
    if (window.ODIN_ENGINE?.run) {
      const result = ODIN_ENGINE.run("ui_analyze");
      this.renderSmartResult(result);
      if (window.ODIN_I18N) ODIN_I18N.updateSmartPanel();
      return result;
    }
  },

  buildPlan() {
    if (window.ODIN_ENGINE?.run) {
      const result = ODIN_ENGINE.run("ui_build_plan");
      this.renderSmartResult(result);
      if (window.ODIN_I18N) ODIN_I18N.updateSmartPanel();
      return result;
    }
  },

  preparePush() {
    if (window.ODIN_ENGINE?.run) {
      const result = ODIN_ENGINE.run("ui_prepare_push");
      this.renderSmartResult(result);
      if (window.ODIN_I18N) ODIN_I18N.updateSmartPanel();
      return result;
    }
  },

  exportPackage() {
    if (window.ODIN_ENGINE?.run) {
      const result = ODIN_ENGINE.run("ui_export");
      this.renderSmartResult(result);
      if (window.ODIN_I18N) ODIN_I18N.updateSmartPanel();
      return result;
    }
  },

  renderResult(result) {
    const box = document.getElementById("odinUiResultBox");
    if (box) box.textContent = JSON.stringify(result, null, 2);
  },

  toggleAdvanced() {
    const previousScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const shell = document.querySelector(".odin-control-shell");
    const shellTopBefore = shell ? shell.getBoundingClientRect().top : null;

    const body = document.body;
    const open = body.getAttribute("data-advanced-open") === "true";
    body.setAttribute("data-advanced-open", open ? "false" : "true");

    const btn = document.getElementById("odinAdvancedToggle");
    if (btn && window.ODIN_I18N) {
      btn.textContent = window.ODIN_I18N.t(open ? "show_advanced" : "hide_advanced");
    }

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
  }
};

window.ODIN_BASE_UI = ODIN_BASE_UI;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => ODIN_BASE_UI.refresh(), 900);
});
