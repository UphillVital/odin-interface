/* ODIN V03.8.2 — GIT CONTROL PRO */

const ODIN_GIT_CONTROL = {
  excluded: new Set(),

  getProject() {
    if (!window.ODIN_STATE) return null;
    if (typeof ODIN_STATE.load === "function") ODIN_STATE.load();
    if (typeof ODIN_STATE.getActiveProject === "function") return ODIN_STATE.getActiveProject();
    return null;
  },

  getTasks() {
    const project = this.getProject();
    return project?.tasks || [];
  },

  classifyTask(task) {
    const action = task.action || "";
    const type = task.type || "";
    const path = task.path || "";

    if (!path) return { bucket: "ignored", path: "", reason: "no path", task };
    if (action === "FIX_LATER") return { bucket: "update", path, reason: "FIX_LATER → update existing file", task };
    if (action === "DOCUMENT") return { bucket: "docs", path, reason: "DOCUMENT → documentation update", task };
    if (action === "CREATE_TASK") return { bucket: "review", path, reason: "CREATE_TASK → review/change planning", task };
    if (type === "FILE_CONTROL") return { bucket: "update", path, reason: "FILE_CONTROL → proposed update", task };
    if (type === "UNKNOWN_REVIEW") return { bucket: "review", path, reason: "UNKNOWN_REVIEW → review item", task };
    return { bucket: "review", path, reason: "task path detected → review", task };
  },

  buildPlan() {
    const tasks = this.getTasks();

    const plan = {
      version: "V03.8.2",
      created_at: new Date().toISOString(),
      confirm_required: true,
      auto_exec: false,
      source_tasks: tasks.length,
      add: [],
      update: [],
      docs: [],
      review: [],
      ignored: [],
      warnings: []
    };

    const seen = new Set();

    tasks.forEach(task => {
      const c = this.classifyTask(task);

      if (!c.path) {
        plan.ignored.push({ task: task.name || task.id || "UNKNOWN_TASK", reason: c.reason });
        return;
      }

      const key = c.bucket + "::" + c.path;
      if (seen.has(key)) return;
      seen.add(key);

      const record = {
        path: c.path,
        task: task.name || task.id || "UNKNOWN_TASK",
        status: task.status || "UNKNOWN",
        priority: task.priority || "UNKNOWN",
        action: task.action || "UNKNOWN",
        type: task.type || "UNKNOWN",
        reason: c.reason,
        excluded: this.excluded.has(c.path)
      };

      plan[c.bucket].push(record);
    });

    const allIncluded = this.getIncludedPaths(plan);
    if (!allIncluded.length) plan.warnings.push("NO_INCLUDED_PATHS");
    if (allIncluded.length > 10) plan.warnings.push("LARGE_GIT_ADD_SET_" + allIncluded.length);

    if (window.ODIN_STATE) {
      ODIN_STATE.data.git = ODIN_STATE.data.git || {};
      ODIN_STATE.data.git.last_plan = plan;
      ODIN_STATE.log("GIT_CONTROL_PRO_PLAN_BUILT", `update=${plan.update.length}; docs=${plan.docs.length}; review=${plan.review.length}; included=${allIncluded.length}`);
      ODIN_STATE.save();
    }

    return plan;
  },

  getIncludedPaths(plan) {
    return [
      ...(plan.add || []),
      ...(plan.update || []),
      ...(plan.docs || []),
      ...(plan.review || [])
    ].filter(item => item.path && !item.excluded)
     .map(item => item.path)
     .filter((path, index, arr) => arr.indexOf(path) === index);
  },

  buildCommitMessage(plan) {
    const custom = document.getElementById("gitCommitMessageInput")?.value?.trim();
    if (custom) return custom.replaceAll('"', "'");

    const parts = [];
    const updateCount = plan.update.filter(x => !x.excluded).length;
    const docsCount = plan.docs.filter(x => !x.excluded).length;
    const reviewCount = plan.review.filter(x => !x.excluded).length;
    const addCount = plan.add.filter(x => !x.excluded).length;

    if (updateCount) parts.push(`update-${updateCount}`);
    if (docsCount) parts.push(`docs-${docsCount}`);
    if (reviewCount) parts.push(`review-${reviewCount}`);
    if (addCount) parts.push(`add-${addCount}`);

    return "ODIN V03.8.2 git control " + (parts.join(" ") || "sync");
  },

  buildCommands(plan = null) {
    plan = plan || this.buildPlan();
    const paths = this.getIncludedPaths(plan);

    if (!paths.length) {
      return [
        "# No included file paths found in ODIN task backlog.",
        "# Create/confirm tasks or remove exclusions, then regenerate commands."
      ];
    }

    const commitMessage = this.buildCommitMessage(plan);

    return [
      "git add \\",
      ...paths.map((p, idx) => "  " + p + (idx < paths.length - 1 ? " \\" : "")),
      'git commit -m "' + commitMessage + '"',
      "git push origin dev"
    ];
  },

  renderPlan() {
    const plan = this.buildPlan();
    this.updateStats(plan);
    this.renderHumanPlan(plan);

    const planBox = document.getElementById("gitPlanBox");
    if (planBox) planBox.textContent = JSON.stringify(plan, null, 2);

    const cmdBox = document.getElementById("gitCommandsBox");
    if (cmdBox) cmdBox.textContent = this.buildCommands(plan).join("\n");
  },

  generateCommands() {
    this.renderPlan();
  },

  renderHumanPlan(plan) {
    const box = document.getElementById("gitHumanPlanBox");
    if (!box) return;

    const lines = [];
    const renderGroup = (title, items) => {
      lines.push("## " + title);
      if (!items.length) {
        lines.push("  — empty");
        lines.push("");
        return;
      }

      items.forEach(item => {
        lines.push(`${item.excluded ? "[EXCLUDED]" : "[INCLUDED]"} ${item.path}`);
        lines.push(`  task: ${item.task}`);
        lines.push(`  action: ${item.action} | type: ${item.type} | status: ${item.status} | priority: ${item.priority}`);
        lines.push(`  reason: ${item.reason}`);
      });
      lines.push("");
    };

    renderGroup("UPDATE", plan.update);
    renderGroup("DOCS", plan.docs);
    renderGroup("REVIEW", plan.review);
    renderGroup("ADD", plan.add);

    if (plan.warnings.length) {
      lines.push("## WARNINGS");
      plan.warnings.forEach(w => lines.push("  - " + w));
      lines.push("");
    }

    box.textContent = lines.join("\n");
  },

  updateStats(plan) {
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    setText("gitPlanAdd", plan.add.filter(x => !x.excluded).length);
    setText("gitPlanUpdate", plan.update.filter(x => !x.excluded).length);
    setText("gitPlanDocs", plan.docs.filter(x => !x.excluded).length);
    setText("gitPlanReview", plan.review.filter(x => !x.excluded).length);
    setText("gitPlanWarnings", plan.warnings.length);
  },

  excludePathFromInput() {
    const input = document.getElementById("gitExcludePathInput");
    const path = input?.value?.trim();
    if (!path) return;
    this.excluded.add(path);
    if (input) input.value = "";
    this.renderPlan();
  },

  clearExclusions() {
    this.excluded.clear();
    this.renderPlan();
  },

  copyCommands() {
    const box = document.getElementById("gitCommandsBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  },

  copyPlan() {
    const box = document.getElementById("gitPlanBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  },

  copyHumanPlan() {
    const box = document.getElementById("gitHumanPlanBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  }
};

window.ODIN_GIT_CONTROL = ODIN_GIT_CONTROL;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (document.getElementById("gitPlanBox")) ODIN_GIT_CONTROL.renderPlan();
  }, 1300);
});
