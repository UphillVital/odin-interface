/* ODIN V03.8.5.2 — PUSH PACKAGE CIRCULAR SNAPSHOT FIX
   Fixes:
   - removes circular reference from snapshot/odin_state before saving push_package
   - treats auto_push_allowed=false as PASS because push must remain manual
   - visible final check remains robust
*/

(function () {
  function safeText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value);
  }

  function safeClone(obj) {
    const seen = new WeakSet();
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      if (key === "push_package") return undefined; // critical: avoid self-reference
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]";
        seen.add(value);
      }
      return value;
    }));
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
        if (window.ODIN_GIT_CONTROL?.buildPlan) return safeClone(window.ODIN_GIT_CONTROL.buildPlan());
      } catch (e) {
        return { error: "GIT_PLAN_ERROR", message: e.message };
      }
      return safeClone(window.ODIN_STATE?.data?.git?.last_plan || null);
    },

    getDiffPlan() {
      try {
        if (window.ODIN_DIFF_PLANNER?.buildDiffPlan) return safeClone(window.ODIN_DIFF_PLANNER.buildDiffPlan());
      } catch (e) {
        return { error: "DIFF_PLAN_ERROR", message: e.message };
      }
      return safeClone(window.ODIN_STATE?.data?.git?.diff_plan || null);
    },

    getSafeChecklist() {
      try {
        if (window.ODIN_SAFE_PUSH?.check) return safeClone(window.ODIN_SAFE_PUSH.check());
      } catch (e) {
        return { status: "ERROR", error: "SAFE_PUSH_ERROR", message: e.message };
      }
      return safeClone(window.ODIN_STATE?.data?.git?.safe_push_checklist || null);
    },

    getSnapshot() {
      try {
        if (window.ODIN_SNAPSHOT_FILE?.buildSnapshot) {
          const snap = safeClone(window.ODIN_SNAPSHOT_FILE.buildSnapshot());
          if (snap?.odin_state?.git?.push_package) delete snap.odin_state.git.push_package;
          return snap;
        }
      } catch (e) {
        return { error: "SNAPSHOT_ERROR", message: e.message };
      }

      const clonedState = safeClone(window.ODIN_STATE?.data || null);
      if (clonedState?.git?.push_package) delete clonedState.git.push_package;
      return { odin_state: clonedState };
    },

    extractCommitMessage(commands) {
      const m = String(commands || "").match(/git commit -m "([^"]+)"/);
      return m ? m[1] : "";
    },

    isCommandsReady(commands) {
      return !!commands && commands.includes("git add") && commands.includes("git commit") && commands.includes("git push") && !commands.includes("No included file paths");
    },

    buildPackage() {
      const commands = this.getCommands();
      const gitPlan = this.getGitPlan();
      const diffPlan = this.getDiffPlan();
      const safeChecklist = this.getSafeChecklist();
      const snapshot = this.getSnapshot();

      const safeReady = safeChecklist?.status === "READY_FOR_MANUAL_PUSH";
      const commandsReady = this.isCommandsReady(commands);

      const finalCheck = {
        has_commands: commandsReady,
        has_diff_plan: !!diffPlan && !diffPlan.error,
        has_safe_checklist: !!safeChecklist && !safeChecklist.error,
        safe_gate_ready: safeReady,
        auto_push_disabled: true
      };

      const pkg = {
        version: "V03.8.5.2",
        created_at: new Date().toISOString(),
        package_type: "PUSH_PACKAGE_EXPORT",
        auto_exec: false,
        manual_push_only: true,
        status: (finalCheck.has_commands && finalCheck.has_diff_plan && finalCheck.has_safe_checklist && finalCheck.safe_gate_ready && finalCheck.auto_push_disabled)
          ? "READY_FOR_MANUAL_PUSH"
          : "NOT_READY",
        commit_message: this.extractCommitMessage(commands),
        git_commands: commands,
        git_plan: gitPlan,
        diff_plan: diffPlan,
        safe_push_checklist: safeChecklist,
        snapshot,
        final_check: finalCheck
      };

      try {
        if (window.ODIN_STATE) {
          if (!ODIN_STATE.data) ODIN_STATE.load?.();
          if (!ODIN_STATE.data) ODIN_STATE.data = {};
          ODIN_STATE.data.git = ODIN_STATE.data.git || {};
          // save package WITHOUT snapshot to avoid massive recursive payload
          ODIN_STATE.data.git.push_package = {
            version: pkg.version,
            created_at: pkg.created_at,
            status: pkg.status,
            commit_message: pkg.commit_message,
            git_commands: pkg.git_commands,
            final_check: pkg.final_check,
            diff_summary: pkg.diff_plan?.counts || null
          };
          ODIN_STATE.log?.("PUSH_PACKAGE_EXPORTED", pkg.status);
          ODIN_STATE.save?.();
        }
      } catch (e) {
        pkg.state_save_warning = e.message;
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

      if (pkg.state_save_warning) {
        lines.push("");
        lines.push("## STATE SAVE WARNING");
        lines.push(pkg.state_save_warning);
      }

      return lines.join("\n");
    },

    render() {
      try {
        const pkg = this.buildPackage();

        safeText("pushPackageStatus", pkg.status);
        safeText("pushPackageReady", pkg.status === "READY_FOR_MANUAL_PUSH" ? "YES" : "NO");
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
      a.download = "ODIN_PUSH_PACKAGE_v03_8_5_2.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },

    downloadTxt() {
      const pkg = this.buildPackage();
      const blob = new Blob([this.humanText(pkg)], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "ODIN_PUSH_PACKAGE_v03_8_5_2.txt";
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
