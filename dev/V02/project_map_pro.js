/* ODIN V03.9.1 — MODULE DETECTION FIX
   Fixes V03.9 false UNKNOWN statuses:
   - separates admin modules vs runtime/index modules
   - supports statuses: LOADED, PARTIAL, ADMIN_ONLY, RUNTIME_ONLY, NOT_REQUIRED_HERE, MISSING
   - runtime modules not loaded in admin.html are not counted as critical risk
   - no auto-exec
*/

const ODIN_PROJECT_MAP_PRO = {
  currentPage() {
    const p = location.pathname || "";
    if (p.includes("admin.html")) return "ADMIN";
    if (p.includes("index.html")) return "RUNTIME";
    return "UNKNOWN_PAGE";
  },

  modules: [
    {
      id: "state",
      name: "ODIN State",
      files: ["odin_state.js", "odin_admin_state.js", "odin_state_bridge.js"],
      scope: "SHARED",
      role: "Central state / persistence / project data",
      depends_on: [],
      feeds: ["task", "mode", "git", "snapshot"],
      risk: "HIGH"
    },
    {
      id: "event_bus",
      name: "Event Bus",
      files: ["event_bus.js"],
      scope: "SHARED",
      role: "Runtime communication layer",
      depends_on: ["state"],
      feeds: ["router", "engine"],
      risk: "MEDIUM"
    },
    {
      id: "mode",
      name: "Mode Registry",
      files: ["mode_registry.js"],
      scope: "ADMIN_RUNTIME_BRIDGE",
      role: "Mode selection and mode execution entry",
      depends_on: ["state", "event_bus"],
      feeds: ["router"],
      risk: "MEDIUM"
    },
    {
      id: "router",
      name: "Router Adapter",
      files: ["odin_router_adapter.js", "smart_router.js"],
      scope: "RUNTIME",
      role: "MODE → STATE → ROUTER → ENGINE bridge",
      depends_on: ["mode", "state", "event_bus"],
      feeds: ["engine"],
      risk: "HIGH"
    },
    {
      id: "engine",
      name: "Content / Lesson Engine",
      files: ["content_engine.js", "lesson_generator.js", "semantic.js"],
      scope: "RUNTIME",
      role: "Content extraction and lesson generation",
      depends_on: ["router"],
      feeds: ["qa", "export"],
      risk: "HIGH"
    },
    {
      id: "map",
      name: "File Map",
      files: ["file_control_map.js"],
      scope: "ADMIN",
      role: "File role map and system layer classification",
      depends_on: ["state"],
      feeds: ["unknown"],
      risk: "MEDIUM"
    },
    {
      id: "unknown",
      name: "Unknown Detector / Review",
      files: ["unknown_detector.js", "unknown_review.js"],
      scope: "ADMIN",
      role: "Semantic weak/conflict/orphan detection and review actions",
      depends_on: ["map", "state"],
      feeds: ["task"],
      risk: "MEDIUM"
    },
    {
      id: "task",
      name: "Task Control",
      files: ["task_center.js", "review_to_task.js", "task_control.js"],
      scope: "ADMIN",
      role: "Backlog and review-to-task control",
      depends_on: ["unknown", "state"],
      feeds: ["git"],
      risk: "MEDIUM"
    },
    {
      id: "snapshot",
      name: "Snapshot",
      files: ["snapshot_file.js"],
      scope: "ADMIN",
      role: "State/review/task snapshot export/import",
      depends_on: ["state", "task"],
      feeds: ["safe_push", "push_package"],
      risk: "HIGH"
    },
    {
      id: "git",
      name: "Git Control Pro",
      files: ["git_control.js"],
      scope: "ADMIN",
      role: "Logical git command planning",
      depends_on: ["task", "state"],
      feeds: ["diff"],
      risk: "MEDIUM"
    },
    {
      id: "diff",
      name: "Diff Planning",
      files: ["diff_planner.js"],
      scope: "ADMIN",
      role: "Logical diff plan and risk classification",
      depends_on: ["git"],
      feeds: ["safe_push"],
      risk: "MEDIUM"
    },
    {
      id: "safe_push",
      name: "Safe Push Checklist",
      files: ["safe_push_checklist.js"],
      scope: "ADMIN",
      role: "Persistent final manual push gate",
      depends_on: ["diff", "snapshot", "git"],
      feeds: ["push_package"],
      risk: "HIGH"
    },
    {
      id: "push_package",
      name: "Push Package Export",
      files: ["push_package_export.js"],
      scope: "ADMIN",
      role: "Final push package: commands + diff + safe + snapshot",
      depends_on: ["git", "diff", "safe_push", "snapshot"],
      feeds: [],
      risk: "HIGH"
    }
  ],

  getState() {
    try {
      if (window.ODIN_STATE?.load) ODIN_STATE.load();
      return window.ODIN_STATE?.data || {};
    } catch (e) {
      return { error: e.message };
    }
  },

  getTasks() {
    try {
      const project = window.ODIN_STATE?.getActiveProject?.();
      return project?.tasks || [];
    } catch (e) {
      return [];
    }
  },

  moduleStatus(module) {
    const page = this.currentPage();
    const present = module.files.filter(f => this.fileLikelyLoaded(f));
    const loadedRatio = present.length / module.files.length;

    if (loadedRatio === 1) return "LOADED";
    if (loadedRatio > 0) return "PARTIAL";

    if (page === "ADMIN" && module.scope === "RUNTIME") return "RUNTIME_ONLY";
    if (page === "RUNTIME" && module.scope === "ADMIN") return "ADMIN_ONLY";

    if (page === "ADMIN" && module.scope === "ADMIN_RUNTIME_BRIDGE") {
      return "NOT_REQUIRED_HERE";
    }

    return "MISSING";
  },

  isProblemStatus(status) {
    return ["MISSING", "PARTIAL"].includes(status);
  },

  fileLikelyLoaded(file) {
    const checks = {
      "odin_state.js": () => !!window.ODIN_STATE,
      "odin_admin_state.js": () => !!window.ODIN_STATE,
      "odin_state_bridge.js": () => !!window.ODIN_STATE_BRIDGE || !!window.ODIN_STATE,
      "event_bus.js": () => !!window.ODIN_EVENT_BUS || !!window.EventBus || !!window.ODIN_BUS,
      "mode_registry.js": () => !!window.ODIN_MODE_REGISTRY,
      "odin_router_adapter.js": () => !!window.ODIN_ROUTER_ADAPTER,
      "smart_router.js": () => !!window.ODIN_SMART_ROUTER,
      "content_engine.js": () => !!window.ODIN_CONTENT_ENGINE,
      "lesson_generator.js": () => !!window.ODIN_LESSON_GENERATOR,
      "semantic.js": () => !!window.ODIN_SEMANTIC || !!window.ODIN_SEMANTIC_LAYER,
      "file_control_map.js": () => !!window.ODIN_FILE_CONTROL_MAP,
      "unknown_detector.js": () => !!window.ODIN_UNKNOWN_DETECTOR,
      "unknown_review.js": () => !!window.ODIN_UNKNOWN_REVIEW,
      "task_center.js": () => !!window.ODIN_TASK_CENTER,
      "review_to_task.js": () => !!window.ODIN_REVIEW_TO_TASK,
      "task_control.js": () => !!window.ODIN_TASK_CONTROL,
      "snapshot_file.js": () => !!window.ODIN_SNAPSHOT_FILE,
      "git_control.js": () => !!window.ODIN_GIT_CONTROL,
      "diff_planner.js": () => !!window.ODIN_DIFF_PLANNER,
      "safe_push_checklist.js": () => !!window.ODIN_SAFE_PUSH,
      "push_package_export.js": () => !!window.ODIN_PUSH_PACKAGE_EXPORT
    };
    return checks[file] ? checks[file]() : false;
  },

  buildMap() {
    const state = this.getState();
    const tasks = this.getTasks();
    const git = state.git || {};
    const page = this.currentPage();

    const nodes = this.modules.map(m => {
      const status = this.moduleStatus(m);
      return {
        ...m,
        status,
        problem: this.isProblemStatus(status),
        active_tasks: tasks.filter(t => {
          const p = t.path || "";
          return m.files.some(f => p.includes(f.replace(".js", ""))) || (t.type || "").toLowerCase().includes(m.id);
        }).length
      };
    });

    const links = [];
    nodes.forEach(n => {
      n.depends_on.forEach(dep => links.push({ from: dep, to: n.id, type: "depends_on" }));
      n.feeds.forEach(feed => links.push({ from: n.id, to: feed, type: "feeds" }));
    });

    const report = {
      version: "V03.9.1",
      created_at: new Date().toISOString(),
      page,
      system_status: state.system?.status || "UNKNOWN",
      active_project_id: state.active_project_id || "UNKNOWN",
      counts: {
        modules: nodes.length,
        links: links.length,
        tasks: tasks.length,
        high_risk_modules: nodes.filter(n => n.risk === "HIGH").length,
        missing_modules: nodes.filter(n => n.status === "MISSING").length,
        partial_modules: nodes.filter(n => n.status === "PARTIAL").length,
        runtime_only: nodes.filter(n => n.status === "RUNTIME_ONLY").length,
        not_required_here: nodes.filter(n => n.status === "NOT_REQUIRED_HERE").length
      },
      pipeline_status: {
        task_to_git: !!window.ODIN_GIT_CONTROL,
        git_to_diff: !!window.ODIN_DIFF_PLANNER,
        diff_to_safe: !!window.ODIN_SAFE_PUSH,
        safe_to_package: !!window.ODIN_PUSH_PACKAGE_EXPORT,
        last_push_package_status: git.push_package?.status || "UNKNOWN",
        last_safe_push_status: git.safe_push_checklist?.status || "UNKNOWN"
      },
      nodes,
      links,
      risks: this.buildRisks(nodes, git, tasks),
      next_actions: this.nextActions(nodes, git, tasks)
    };

    if (window.ODIN_STATE) {
      ODIN_STATE.data.project_map = report;
      ODIN_STATE.log?.("PROJECT_MAP_BUILT", `v=${report.version}; modules=${report.counts.modules}; missing=${report.counts.missing_modules}; runtime_only=${report.counts.runtime_only}`);
      ODIN_STATE.save?.();
    }

    return report;
  },

  buildRisks(nodes, git, tasks) {
    const risks = [];
    const missing = nodes.filter(n => n.status === "MISSING");
    const partial = nodes.filter(n => n.status === "PARTIAL");

    if (missing.length) risks.push("Some modules are MISSING on this page: " + missing.map(n => n.id).join(", "));
    if (partial.length) risks.push("Some modules are PARTIAL on this page: " + partial.map(n => n.id).join(", "));
    if ((git.safe_push_checklist?.status || "") !== "READY_FOR_MANUAL_PUSH") risks.push("Safe Push gate is not READY.");
    if ((git.push_package?.status || "") !== "READY_FOR_MANUAL_PUSH") risks.push("Push Package is not READY.");
    if (!tasks.length) risks.push("Task backlog is empty.");

    const highProblem = nodes.filter(n => n.risk === "HIGH" && this.isProblemStatus(n.status));
    if (highProblem.length) risks.push("Some HIGH-risk required modules are missing/partial: " + highProblem.map(n => n.id).join(", "));

    return risks;
  },

  nextActions(nodes, git, tasks) {
    const actions = [];
    if (!tasks.length) actions.push("Create or restore Task backlog.");
    if ((git.safe_push_checklist?.status || "") !== "READY_FOR_MANUAL_PUSH") actions.push("Run Safe Push Checklist and confirm persistent gate.");
    if ((git.push_package?.status || "") !== "READY_FOR_MANUAL_PUSH") actions.push("Build Push Package after safe gate is ready.");

    const missing = nodes.filter(n => n.status === "MISSING");
    const partial = nodes.filter(n => n.status === "PARTIAL");
    if (missing.length || partial.length) actions.push("Review MISSING/PARTIAL modules only; ignore RUNTIME_ONLY on admin page.");

    if (!actions.length) actions.push("System map stable. Ready for V03.9.2 visual graph.");
    return actions;
  },

  render() {
    const report = this.buildMap();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    setText("projectMapModules", report.counts.modules);
    setText("projectMapLinks", report.counts.links);
    setText("projectMapTasks", report.counts.tasks);
    setText("projectMapHighRisk", report.counts.high_risk_modules);
    setText("projectMapPushStatus", report.pipeline_status.last_push_package_status);

    const human = document.getElementById("projectMapHumanBox");
    if (human) human.textContent = this.humanText(report);

    const json = document.getElementById("projectMapJsonBox");
    if (json) json.textContent = JSON.stringify(report, null, 2);
  },

  humanText(report) {
    const lines = [];
    lines.push("PROJECT MAP PRO — " + report.version);
    lines.push("Page: " + report.page);
    lines.push("System: " + report.system_status);
    lines.push("Project: " + report.active_project_id);
    lines.push("");

    lines.push("## PIPELINE STATUS");
    Object.entries(report.pipeline_status).forEach(([k, v]) => lines.push(`  ${k}: ${v}`));
    lines.push("");

    lines.push("## COUNTS");
    Object.entries(report.counts).forEach(([k, v]) => lines.push(`  ${k}: ${v}`));
    lines.push("");

    lines.push("## MODULES");
    report.nodes.forEach(n => {
      lines.push(`[${n.status}] [${n.scope}] [${n.risk}] ${n.name}`);
      lines.push(`  id: ${n.id}`);
      lines.push(`  role: ${n.role}`);
      lines.push(`  depends_on: ${(n.depends_on || []).join(", ") || "—"}`);
      lines.push(`  feeds: ${(n.feeds || []).join(", ") || "—"}`);
      lines.push(`  files: ${(n.files || []).join(", ")}`);
      lines.push(`  active_tasks: ${n.active_tasks}`);
      lines.push(`  problem: ${n.problem}`);
    });
    lines.push("");

    lines.push("## RISKS");
    if (!report.risks.length) lines.push("  — none");
    report.risks.forEach(r => lines.push("  - " + r));
    lines.push("");

    lines.push("## NEXT ACTIONS");
    report.next_actions.forEach(a => lines.push("  - " + a));

    return lines.join("\n");
  },

  copyHuman() {
    const box = document.getElementById("projectMapHumanBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  },

  copyJson() {
    const box = document.getElementById("projectMapJsonBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  }
};

window.ODIN_PROJECT_MAP_PRO = ODIN_PROJECT_MAP_PRO;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (document.getElementById("projectMapHumanBox")) ODIN_PROJECT_MAP_PRO.render();
  }, 2100);
});
