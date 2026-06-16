/* ODIN V03.8.3 — REAL DIFF PLANNING */

const ODIN_DIFF_PLANNER = {
  buildSourcePlan() {
    if (window.ODIN_GIT_CONTROL?.buildPlan) return ODIN_GIT_CONTROL.buildPlan();
    return { version: "V03.8.3", add: [], update: [], docs: [], review: [], ignored: [], warnings: ["GIT_CONTROL_PLAN_NOT_AVAILABLE"] };
  },

  riskFor(path, bucket) {
    const p = String(path || "").toLowerCase();
    if (p.includes("template_base") || p.endsWith(".html")) return "HIGH";
    if (p.includes("core") || p.includes("state") || p.includes("router") || p.includes("engine")) return "HIGH";
    if (bucket === "docs") return "LOW";
    if (bucket === "update" || bucket === "review") return "MEDIUM";
    return "MEDIUM";
  },

  buildDiffPlan() {
    const source = this.buildSourcePlan();
    const groups = { added: [], modified: [], docs: [], review: [], ignored: source.ignored || [] };

    const push = (bucket, target, item) => {
      if (!item || !item.path || item.excluded) return;
      const risk = this.riskFor(item.path, bucket);
      groups[target].push({
        path: item.path,
        from_bucket: bucket,
        task: item.task || "—",
        action: item.action || "—",
        status: item.status || "—",
        priority: item.priority || "—",
        reason: item.reason || "—",
        risk,
        check_required: risk !== "LOW"
      });
    };

    (source.add || []).forEach(item => push("add", "added", item));
    (source.update || []).forEach(item => push("update", "modified", item));
    (source.docs || []).forEach(item => push("docs", "docs", item));
    (source.review || []).forEach(item => push("review", "review", item));

    const all = [...groups.added, ...groups.modified, ...groups.docs, ...groups.review];
    const high = all.filter(x => x.risk === "HIGH").length;
    const medium = all.filter(x => x.risk === "MEDIUM").length;
    const low = all.filter(x => x.risk === "LOW").length;
    const warnings = [...(source.warnings || [])];

    if (!all.length) warnings.push("NO_DIFF_ITEMS");
    if (high) warnings.push("HIGH_RISK_FILES_" + high);
    if (all.length > 10) warnings.push("LARGE_CHANGE_SET_" + all.length);

    const plan = {
      version: "V03.8.3",
      created_at: new Date().toISOString(),
      mode: "LOGICAL_DIFF_PLAN",
      auto_exec: false,
      confirm_required: true,
      source_git_plan_version: source.version || "UNKNOWN",
      counts: {
        total: all.length,
        added: groups.added.length,
        modified: groups.modified.length,
        docs: groups.docs.length,
        review: groups.review.length,
        high,
        medium,
        low
      },
      warnings,
      groups,
      safe_push_gate: {
        status: warnings.some(w => w.startsWith("HIGH_RISK")) ? "REVIEW_REQUIRED" : "READY_FOR_MANUAL_PUSH",
        requires_user_confirmation: true,
        auto_push_allowed: false
      }
    };

    if (window.ODIN_STATE) {
      ODIN_STATE.data.git = ODIN_STATE.data.git || {};
      ODIN_STATE.data.git.diff_plan = plan;
      ODIN_STATE.log("DIFF_PLAN_BUILT", `total=${plan.counts.total}; high=${high}; warnings=${warnings.length}`);
      ODIN_STATE.save();
    }

    return plan;
  },

  render() {
    const plan = this.buildDiffPlan();
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    setText("diffTotal", plan.counts.total);
    setText("diffAdded", plan.counts.added);
    setText("diffModified", plan.counts.modified);
    setText("diffDocs", plan.counts.docs);
    setText("diffReview", plan.counts.review);
    setText("diffHighRisk", plan.counts.high);
    setText("diffGateStatus", plan.safe_push_gate.status);

    const human = document.getElementById("diffHumanPlanBox");
    if (human) human.textContent = this.humanText(plan);

    const json = document.getElementById("diffJsonPlanBox");
    if (json) json.textContent = JSON.stringify(plan, null, 2);
  },

  humanText(plan) {
    const lines = [];
    lines.push("DIFF PLAN — " + plan.version);
    lines.push("Gate: " + plan.safe_push_gate.status);
    lines.push("");

    const renderGroup = (title, items) => {
      lines.push("## " + title);
      if (!items.length) {
        lines.push("  — empty");
        lines.push("");
        return;
      }
      items.forEach(item => {
        lines.push(`[${item.risk}] ${item.path}`);
        lines.push(`  action: ${item.action} | status: ${item.status} | priority: ${item.priority}`);
        lines.push(`  reason: ${item.reason}`);
        lines.push(`  check_required: ${item.check_required}`);
      });
      lines.push("");
    };

    renderGroup("ADDED", plan.groups.added);
    renderGroup("MODIFIED", plan.groups.modified);
    renderGroup("DOCS", plan.groups.docs);
    renderGroup("REVIEW", plan.groups.review);

    lines.push("## WARNINGS");
    if (!plan.warnings.length) lines.push("  — none");
    plan.warnings.forEach(w => lines.push("  - " + w));
    lines.push("");

    lines.push("## SAFE PUSH GATE");
    lines.push("  status: " + plan.safe_push_gate.status);
    lines.push("  confirm_required: " + plan.safe_push_gate.requires_user_confirmation);
    lines.push("  auto_push_allowed: " + plan.safe_push_gate.auto_push_allowed);

    return lines.join("\n");
  },

  copyHuman() {
    const box = document.getElementById("diffHumanPlanBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  },

  copyJson() {
    const box = document.getElementById("diffJsonPlanBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  }
};

window.ODIN_DIFF_PLANNER = ODIN_DIFF_PLANNER;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (document.getElementById("diffHumanPlanBox")) ODIN_DIFF_PLANNER.render();
  }, 1500);
});
