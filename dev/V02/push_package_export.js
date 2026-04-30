/* ODIN V03.8.5 — PUSH PACKAGE EXPORT
   Final export package before manual git push.
   Includes commands, diff plan, safe checklist, snapshot, commit metadata.
   No auto-exec.
*/

const ODIN_PUSH_PACKAGE_EXPORT = {
  buildPackage() {
    const gitPlan = window.ODIN_STATE?.data?.git?.last_plan || (window.ODIN_GIT_CONTROL?.buildPlan ? ODIN_GIT_CONTROL.buildPlan() : null);
    const diffPlan = window.ODIN_STATE?.data?.git?.diff_plan || (window.ODIN_DIFF_PLANNER?.buildDiffPlan ? ODIN_DIFF_PLANNER.buildDiffPlan() : null);
    const safeChecklist = window.ODIN_STATE?.data?.git?.safe_push_checklist || (window.ODIN_SAFE_PUSH?.check ? ODIN_SAFE_PUSH.check() : null);
    const snapshot = window.ODIN_SNAPSHOT_FILE?.buildSnapshot ? ODIN_SNAPSHOT_FILE.buildSnapshot() : {
      odin_state: window.ODIN_STATE?.data || null
    };
    const commands = (document.getElementById("gitCommandsBox")?.textContent || "").trim();

    const pkg = {
      version: "V03.8.5",
      created_at: new Date().toISOString(),
      package_type: "PUSH_PACKAGE_EXPORT",
      auto_exec: false,
      manual_push_only: true,
      status: safeChecklist?.status === "READY_FOR_MANUAL_PUSH" ? "READY_FOR_MANUAL_PUSH" : "NOT_READY",
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
        safe_gate_ready: safeChecklist?.status === "READY_FOR_MANUAL_PUSH",
        auto_push_allowed: false
      }
    };

    if (window.ODIN_STATE) {
      ODIN_STATE.data.git = ODIN_STATE.data.git || {};
      ODIN_STATE.data.git.push_package = pkg;
      ODIN_STATE.log("PUSH_PACKAGE_EXPORTED", pkg.status);
      ODIN_STATE.save();
    }

    return pkg;
  },

  extractCommitMessage(commands) {
    const m = String(commands || "").match(/git commit -m "([^"]+)"/);
    return m ? m[1] : "";
  },

  render() {
    const pkg = this.buildPackage();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    setText("pushPackageStatus", pkg.status);
    setText("pushPackageReady", pkg.final_check.safe_gate_ready ? "YES" : "NO");
    setText("pushPackageHasCommands", pkg.final_check.has_commands ? "YES" : "NO");

    const human = document.getElementById("pushPackageHumanBox");
    if (human) human.textContent = this.humanText(pkg);

    const json = document.getElementById("pushPackageJsonBox");
    if (json) json.textContent = JSON.stringify(pkg, null, 2);
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

    return lines.join("\n");
  },

  downloadJson() {
    const pkg = this.buildPackage();
    const blob = new Blob([JSON.stringify(pkg, null, 2)], {type: "application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ODIN_PUSH_PACKAGE_v03_8_5.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
  },

  downloadTxt() {
    const pkg = this.buildPackage();
    const blob = new Blob([this.humanText(pkg)], {type: "text/plain"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ODIN_PUSH_PACKAGE_v03_8_5.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
  },

  copyJson() {
    const box = document.getElementById("pushPackageJsonBox");
    navigator.clipboard?.writeText(box?.textContent || JSON.stringify(this.buildPackage(), null, 2));
  },

  copyHuman() {
    const box = document.getElementById("pushPackageHumanBox");
    navigator.clipboard?.writeText(box?.textContent || this.humanText(this.buildPackage()));
  }
};

window.ODIN_PUSH_PACKAGE_EXPORT = ODIN_PUSH_PACKAGE_EXPORT;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (document.getElementById("pushPackageHumanBox")) ODIN_PUSH_PACKAGE_EXPORT.render();
  }, 1900);
});
