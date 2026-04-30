/* ODIN V03.8.4 — SAFE PUSH CHECKLIST
   Final manual gate before git push.
   No auto-exec.
*/

const ODIN_SAFE_PUSH = {
  acceptedRisk: false,
  snapshotConfirmed: false,

  getDiffPlan() {
    if (window.ODIN_DIFF_PLANNER?.buildDiffPlan) return ODIN_DIFF_PLANNER.buildDiffPlan();
    return window.ODIN_STATE?.data?.git?.diff_plan || null;
  },

  getGitCommands() {
    const box = document.getElementById("gitCommandsBox");
    return (box?.textContent || "").trim();
  },

  check() {
    const diff = this.getDiffPlan();
    const commands = this.getGitCommands();

    const checks = {
      diff_exists: !!diff,
      diff_has_items: !!diff && (diff.counts?.total || 0) > 0,
      commands_ready: !!commands && commands.includes("git add") && commands.includes("git commit") && commands.includes("git push"),
      snapshot_saved: this.snapshotConfirmed,
      risk_accepted: this.acceptedRisk,
      no_auto_push: true
    };

    const highRisk = diff?.counts?.high || 0;
    const warnings = [...(diff?.warnings || [])];

    if (highRisk > 0) warnings.push("HIGH_RISK_REQUIRES_EXTRA_REVIEW");
    if (!checks.snapshot_saved) warnings.push("SNAPSHOT_NOT_CONFIRMED");
    if (!checks.risk_accepted) warnings.push("RISK_NOT_ACCEPTED");
    if (!checks.commands_ready) warnings.push("GIT_COMMANDS_NOT_READY");

    const passed = Object.values(checks).every(Boolean) && warnings.filter(w => w !== "HIGH_RISK_REQUIRES_EXTRA_REVIEW").length === 0;

    const report = {
      version: "V03.8.4",
      created_at: new Date().toISOString(),
      status: passed ? "READY_FOR_MANUAL_PUSH" : "BLOCKED",
      checks,
      warnings,
      diff_summary: diff?.counts || null,
      gate: {
        auto_push_allowed: false,
        manual_push_allowed: passed,
        confirm_required: true
      },
      commands
    };

    if (window.ODIN_STATE) {
      ODIN_STATE.data.git = ODIN_STATE.data.git || {};
      ODIN_STATE.data.git.safe_push_checklist = report;
      ODIN_STATE.log("SAFE_PUSH_CHECKLIST_RUN", report.status);
      ODIN_STATE.save();
    }

    return report;
  },

  confirmSnapshot() {
    this.snapshotConfirmed = true;
    this.render();
  },

  acceptRisk() {
    this.acceptedRisk = true;
    this.render();
  },

  resetGate() {
    this.acceptedRisk = false;
    this.snapshotConfirmed = false;
    this.render();
  },

  render() {
    const report = this.check();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    setText("safePushStatus", report.status);
    setText("safePushManual", report.gate.manual_push_allowed ? "YES" : "NO");
    setText("safePushWarnings", report.warnings.length);

    const human = document.getElementById("safePushHumanBox");
    if (human) human.textContent = this.humanText(report);

    const json = document.getElementById("safePushJsonBox");
    if (json) json.textContent = JSON.stringify(report, null, 2);
  },

  humanText(report) {
    const lines = [];
    lines.push("SAFE PUSH CHECKLIST — " + report.version);
    lines.push("Status: " + report.status);
    lines.push("");

    lines.push("## CHECKS");
    Object.entries(report.checks).forEach(([k, v]) => {
      lines.push(`${v ? "✔" : "✘"} ${k}`);
    });
    lines.push("");

    lines.push("## WARNINGS");
    if (!report.warnings.length) lines.push("  — none");
    report.warnings.forEach(w => lines.push("  - " + w));
    lines.push("");

    lines.push("## DIFF SUMMARY");
    if (report.diff_summary) {
      Object.entries(report.diff_summary).forEach(([k, v]) => lines.push(`  ${k}: ${v}`));
    } else {
      lines.push("  — no diff plan");
    }
    lines.push("");

    lines.push("## GIT COMMANDS");
    lines.push(report.commands || "  — no commands");
    lines.push("");

    lines.push("## GATE");
    lines.push("manual_push_allowed: " + report.gate.manual_push_allowed);
    lines.push("auto_push_allowed: " + report.gate.auto_push_allowed);
    lines.push("confirm_required: " + report.gate.confirm_required);

    return lines.join("\n");
  },

  copyChecklist() {
    const box = document.getElementById("safePushHumanBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  },

  copyJson() {
    const box = document.getElementById("safePushJsonBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  }
};

window.ODIN_SAFE_PUSH = ODIN_SAFE_PUSH;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (document.getElementById("safePushHumanBox")) ODIN_SAFE_PUSH.render();
  }, 1700);
});
