/* ODIN V03.8.5.1 — PUSH PACKAGE EXPORT FIX
   Robust render: no silent failure if state/snapshot/safe-check is missing.
   No auto-exec.
*/

(function () {
  function safeText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value);
  }

  function safeJson(value) {
    try { return JSON.stringify(value, null, 2); }
    catch (e) { return JSON.stringify({ error: e.message }, null, 2); }
  }

  const ODIN_PUSH_PACKAGE_EXPORT = {
    getCommands() {
      return (document.getElementById("gitCommandsBox")?.textContent || "").trim();
    },

    getGitPlan() {
      try {
        if (window.ODIN_GIT_CONTROL?.buildPlan) return window.ODIN_GIT_CONTROL.buildPlan();
      } catch (e) {
        return { error: "GIT_PLAN_ERROR", message: e.message };
      }
      return window.ODIN_STATE?.data?.git?.last_plan || null;
    },

    getDiffPlan() {
      try {
        if (window.ODIN_DIFF_PLANNER?.buildDiffPlan) return window.ODIN_DIFF_PLANNER.buildDiffPlan();
      } catch (e) {
        return { error: "DIFF_PLAN_ERROR", message: e.message };
      }
      return window.ODIN_STATE?.data?.git?.diff_plan || null;
    },

    getSafeChecklist() {
      try {
        if (window.ODIN_SAFE_PUSH?.check) return window.ODIN_SAFE_PUSH.check();
      } catch (e) {
        return { status: "ERROR", error: "SAFE_PUSH_ERROR", message: e.message };
      }
      return window.ODIN_STATE?.data?.git?.safe_push_checklist || null;
    },

    getSnapshot() {
      try {
        if (window.ODIN_SNAPSHOT_FILE?.buildSnapshot) return window.ODIN_SNAPSHOT_FILE.buildSnapshot();
      } catch (e) {
        return { error: "SNAPSHOT_ERROR", message: e.message };
      }
      return { odin_state: window.ODIN_STATE?.data || null };
    },

    extractCommitMessage(commands) {
      const m = String(commands || "").match(/git commit -m "([^"]+)"/);
      return m ? m[1] : "";
    },

    buildPackage() {
      const commands = this.getCommands();
      const gitPlan = this.getGitPlan();
      const diffPlan = this.getDiffPlan();
      const safeChecklist = this.getSafeChecklist();
      const snapshot = this.getSnapshot();

      const safeReady = safeChecklist?.status === "READY_FOR_MANUAL_PUSH";

      const pkg = {
        version: "V03.8.5.1",
        created_at: new Date().toISOString(),
        package_type: "PUSH_PACKAGE_EXPORT",
        auto_exec: false,
        manual_push_only: true,
        status: safeReady ? "READY_FOR_MANUAL_PUSH" : "NOT_READY",
        commit_message: this.extractCommitMessage(commands),
        git_commands: commands,
        git_plan: gitPlan,
        diff_plan: diffPlan,
        safe_push_checklist: safeChecklist,
        snapshot,
        final_check: {
          has_commands: !!commands,
          has_diff_plan: !!diffPlan,
          has_safe_checklist: !!safeChecklist,
          safe_gate_ready: safeReady,
          auto_push_allowed: false
        }
      };

      try {
        if (window.ODIN_STATE) {
          if (!ODIN_STATE.data) ODIN_STATE.load?.();
          if (!ODIN_STATE.data) ODIN_STATE.data = {};
          ODIN_STATE.data.git = ODIN_STATE.data.git || {};
          ODIN_STATE.data.git.push_package = pkg;
          ODIN_STATE.log?.("PUSH_PACKAGE_EXPORTED", pkg.status);
          ODIN_STATE.save?.();
        }
      } catch (e) {
        pkg.state_save_error = e.message;
      }

      return pkg;
    },

    humanText(pkg) {
      const lines = [];
      lines.push("PUSH PACKAGE EXPORT — " + pkg.version);
      lines.push("Status: " + pkg.status);
      lines.push("Manual push only: " + pkg.manual_push_only);
      lines.push("");

      lines.push("## FINAL CHECK");
      Object.entries(pkg.final_check || {}).forEach(([k, v]) => lines.push(`${v ? "✔" : "✘"} ${k}`));
      lines.push("");

      lines.push("## COMMIT MESSAGE");
      lines.push(pkg.commit_message || "—");
      lines.push("");

      lines.push("## GIT COMMANDS");
      lines.push(pkg.git_commands || "—");
      lines.push("");

      lines.push("## DIFF SUMMARY");
      if (pkg.diff_plan?.counts) {
        Object.entries(pkg.diff_plan.counts).forEach(([k, v]) => lines.push(`  ${k}: ${v}`));
      } else {
        lines.push("  — no diff plan");
      }
      lines.push("");

      lines.push("## SAFE PUSH STATUS");
      lines.push(pkg.safe_push_checklist?.status || "—");

      if (pkg.state_save_error) {
        lines.push("");
        lines.push("## STATE SAVE WARNING");
        lines.push(pkg.state_save_error);
      }

      return lines.join("\n");
    },

    render() {
      try {
        const pkg = this.buildPackage();

        safeText("pushPackageStatus", pkg.status);
        safeText("pushPackageReady", pkg.final_check.safe_gate_ready ? "YES" : "NO");
        safeText("pushPackageHasCommands", pkg.final_check.has_commands ? "YES" : "NO");

        safeText("pushPackageHumanBox", this.humanText(pkg));
        safeText("pushPackageJsonBox", safeJson(pkg));
      } catch (e) {
        safeText("pushPackageStatus", "ERROR");
        safeText("pushPackageReady", "NO");
        safeText("pushPackageHasCommands", "NO");
        safeText("pushPackageHumanBox", "PUSH PACKAGE ERROR:\n" + e.message + "\n\n" + (e.stack || ""));
        safeText("pushPackageJsonBox", safeJson({ error: e.message, stack: e.stack }));
      }
    },

    downloadJson() {
      const pkg = this.buildPackage();
      const blob = new Blob([safeJson(pkg)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "ODIN_PUSH_PACKAGE_v03_8_5_1.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },

    downloadTxt() {
      const pkg = this.buildPackage();
      const blob = new Blob([this.humanText(pkg)], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "ODIN_PUSH_PACKAGE_v03_8_5_1.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },

    copyJson() {
      const box = document.getElementById("pushPackageJsonBox");
      navigator.clipboard?.writeText(box?.textContent || safeJson(this.buildPackage()));
    },

    copyHuman() {
      const box = document.getElementById("pushPackageHumanBox");
      navigator.clipboard?.writeText(box?.textContent || this.humanText(this.buildPackage()));
    }
  };

  window.ODIN_PUSH_PACKAGE_EXPORT = ODIN_PUSH_PACKAGE_EXPORT;

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (document.getElementById("pushPackageHumanBox")) {
        window.ODIN_PUSH_PACKAGE_EXPORT.render();
      }
    }, 500);
  });
})();
