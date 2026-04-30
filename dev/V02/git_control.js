/* ODIN V03.8.1 — GIT CONTROL PRO FULL
   Призначення:
   - побудувати logical change plan з ODIN_STATE tasks
   - згенерувати git commands
   - нічого не виконувати автоматично
*/

const ODIN_GIT_CONTROL = {
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

    if (!path) return null;

    if (action === "CREATE_TASK") return { bucket: "review", path, reason: "CREATE_TASK review item" };
    if (action === "FIX_LATER") return { bucket: "update", path, reason: "FIX_LATER review item" };
    if (action === "DOCUMENT") return { bucket: "docs", path, reason: "DOCUMENT review item" };
    if (type === "FILE_CONTROL") return { bucket: "update", path, reason: "File Control proposal" };

    return { bucket: "review", path, reason: "General task path" };
  },

  buildPlan() {
    const tasks = this.getTasks();
    const plan = {
      version: "V03.8.1",
      created_at: new Date().toISOString(),
      confirm_required: true,
      auto_exec: false,
      source_tasks: tasks.length,
      add: [],
      update: [],
      docs: [],
      review: [],
      ignored: []
    };

    const seen = new Set();

    tasks.forEach(task => {
      const c = this.classifyTask(task);
      if (!c || !c.path) {
        plan.ignored.push({ task: task.name || task.id, reason: "no path" });
        return;
      }

      const key = c.bucket + "::" + c.path;
      if (seen.has(key)) return;
      seen.add(key);

      plan[c.bucket].push({
        path: c.path,
        task: task.name || task.id,
        status: task.status || "UNKNOWN",
        priority: task.priority || "UNKNOWN",
        reason: c.reason
      });
    });

    if (window.ODIN_STATE) {
      ODIN_STATE.data.git = ODIN_STATE.data.git || {};
      ODIN_STATE.data.git.last_plan = plan;
      ODIN_STATE.log("GIT_CONTROL_PLAN_BUILT", `add=${plan.add.length}; update=${plan.update.length}; docs=${plan.docs.length}; review=${plan.review.length}`);
      ODIN_STATE.save();
    }

    return plan;
  },

  uniquePaths(items) {
    return [...new Set((items || []).map(x => x.path).filter(Boolean))];
  },

  buildCommands(plan = null) {
    plan = plan || this.buildPlan();

    const paths = [
      ...this.uniquePaths(plan.add),
      ...this.uniquePaths(plan.update),
      ...this.uniquePaths(plan.docs),
      ...this.uniquePaths(plan.review)
    ];

    const unique = [...new Set(paths)];

    if (!unique.length) {
      return [
        "# No file paths found in ODIN task backlog",
        "# Create or confirm tasks first, then regenerate Git commands."
      ];
    }

    const commitMessage = this.commitMessage(plan);

    return [
      "git add " + unique.join(" "),
      'git commit -m "' + commitMessage + '"',
      "git push origin dev"
    ];
  },

  commitMessage(plan) {
    const parts = [];
    if (plan.update.length) parts.push(`update-${plan.update.length}`);
    if (plan.docs.length) parts.push(`docs-${plan.docs.length}`);
    if (plan.review.length) parts.push(`review-${plan.review.length}`);
    if (plan.add.length) parts.push(`add-${plan.add.length}`);

    return "ODIN V03.8 git control " + (parts.join(" ") || "sync");
  },

  renderPlan() {
    const plan = this.buildPlan();
    const box = document.getElementById("gitPlanBox");
    if (box) box.textContent = JSON.stringify(plan, null, 2);

    const commands = this.buildCommands(plan);
    const cmdBox = document.getElementById("gitCommandsBox");
    if (cmdBox) cmdBox.textContent = commands.join("\n");

    this.updateStats(plan);
  },

  generateCommands() {
    this.renderPlan();
  },

  updateStats(plan) {
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    setText("gitPlanAdd", plan.add.length);
    setText("gitPlanUpdate", plan.update.length);
    setText("gitPlanDocs", plan.docs.length);
    setText("gitPlanReview", plan.review.length);
  },

  copyCommands() {
    const box = document.getElementById("gitCommandsBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  },

  copyPlan() {
    const box = document.getElementById("gitPlanBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  }
};

window.ODIN_GIT_CONTROL = ODIN_GIT_CONTROL;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (document.getElementById("gitPlanBox")) ODIN_GIT_CONTROL.renderPlan();
  }, 1300);
});
