/* ODIN V03.7.2 — UNKNOWN DETECTOR
   Semantic quality layer.

   Це НЕ видалення файлів.
   Це НЕ diff.
   Це НЕ auto-fix.

   Мета:
   знайти слабкі місця карти:
   - UNKNOWN_WEAK_MATCH
   - UNKNOWN_NO_ROLE
   - UNKNOWN_CONFLICT
   - UNKNOWN_ORPHAN
*/

const ODIN_UNKNOWN_DETECTOR = {
  analyze() {
    if (!window.ODIN_FILE_CONTROL_MAP || typeof ODIN_FILE_CONTROL_MAP.buildMap !== "function") {
      return this.emptyReport("ODIN_FILE_CONTROL_MAP not found");
    }

    const map = ODIN_FILE_CONTROL_MAP.buildMap();
    const allFiles = [];

    Object.entries(map.groups || {}).forEach(([groupName, files]) => {
      (files || []).forEach(file => allFiles.push({
        ...file,
        map_group: groupName
      }));
    });

    (map.unmapped || []).forEach(file => allFiles.push({
      ...file,
      map_group: "Unmapped / Needs Review"
    }));

    const results = allFiles.map(file => this.classify(file)).filter(Boolean);

    const report = {
      version: "V03.7.2",
      created_at: new Date().toISOString(),
      total_files: allFiles.length,
      total_unknown: results.length,
      weak_match: results.filter(x => x.type === "UNKNOWN_WEAK_MATCH").length,
      no_role: results.filter(x => x.type === "UNKNOWN_NO_ROLE").length,
      conflict: results.filter(x => x.type === "UNKNOWN_CONFLICT").length,
      orphan: results.filter(x => x.type === "UNKNOWN_ORPHAN").length,
      results
    };

    if (window.ODIN_STATE) {
      ODIN_STATE.data.tree.unknown_semantic = report;
      ODIN_STATE.log("UNKNOWN_DETECTOR_RUN", "Semantic unknown detector executed", {
        total_unknown: report.total_unknown,
        weak_match: report.weak_match,
        no_role: report.no_role,
        conflict: report.conflict,
        orphan: report.orphan
      });
      ODIN_STATE.save();
    }

    return report;
  },

  emptyReport(reason) {
    return {
      version: "V03.7.2",
      created_at: new Date().toISOString(),
      total_files: 0,
      total_unknown: 1,
      weak_match: 0,
      no_role: 0,
      conflict: 0,
      orphan: 1,
      results: [{
        type: "UNKNOWN_ORPHAN",
        path: "SYSTEM",
        reason
      }]
    };
  },

  classify(file) {
    const path = file.path || "";
    const title = file.title || path.split("/").pop() || "";
    const group = file.map_group || "";
    const role = file.map_role || "";
    const reasons = [];

    // 1. fallback/group too generic
    if (
      group.includes("DOCS / STATUS") ||
      group.includes("Unmapped") ||
      group.includes("Needs Review")
    ) {
      reasons.push("fallback_or_review_group");
    }

    // 2. generic/no role
    if (
      !role ||
      role.length < 15 ||
      role.includes("ще не привʼязаний") ||
      role.includes("Документація, маніфести") && !this.isPurePackageDoc(path)
    ) {
      reasons.push("weak_or_generic_role");
    }

    // 3. conflict: path/name matches multiple semantic layers
    const possible = this.possibleGroups(path, title);
    if (possible.length > 1) {
      reasons.push("multi_group_conflict: " + possible.join(", "));
    }

    // 4. root/orphan
    if (path.startsWith("ODIN_TREE_PROJECT_v1/")) {
      const rest = path.replace("ODIN_TREE_PROJECT_v1/", "");
      if (!rest.includes("/") && !this.isKnownRoot(path)) {
        reasons.push("root_file_without_strong_role");
      }
    }

    // 5. suspicious package/history docs are not error if only docs/status
    if (this.isPurePackageDoc(path) && reasons.length === 1 && reasons[0] === "fallback_or_review_group") {
      return null;
    }

    if (!reasons.length) return null;

    let type = "UNKNOWN_WEAK_MATCH";
    if (reasons.some(r => r.includes("multi_group_conflict"))) type = "UNKNOWN_CONFLICT";
    else if (reasons.includes("weak_or_generic_role")) type = "UNKNOWN_NO_ROLE";
    else if (reasons.includes("root_file_without_strong_role")) type = "UNKNOWN_ORPHAN";

    return {
      type,
      path,
      title,
      map_group: group,
      map_role: role,
      reasons
    };
  },

  isPurePackageDoc(path) {
    const name = path.split("/").pop() || "";
    return (
      name.includes("README") ||
      name.includes("PACKAGE_MANIFEST") ||
      name.includes("PACKAGE_STATUS") ||
      name.includes("STABILIZATION") ||
      name.includes("CHECKPOINT")
    );
  },

  isKnownRoot(path) {
    const name = path.split("/").pop() || "";
    return [
      "GIT_PUSH.md",
      "ODIN_STATUS.json",
      "ODIN_SYSTEM_STATUS_v1.md",
      "ODIN_TREE.md"
    ].includes(name);
  },

  possibleGroups(path, title) {
    const text = (path + " " + title).toUpperCase();
    const groups = [];

    const checks = [
      ["CORE", ["ODIN_CORE", "ODIN_STATE", "RECOVERY", "SON", "QUALITY_GATE"]],
      ["INTERFACE", ["INTERFACE", "UI_LAYER", "DATA_LAYER", "EXECUTION_BRIDGE"]],
      ["MODULE", ["MODULE"]],
      ["QA", ["QA_", "QA_SYSTEM", "FINAL_GATE"]],
      ["LESSON", ["LESSON_"]],
      ["TEMPLATE", ["TEMPLATE"]],
      ["HIGHLIGHT", ["HIGHLIGHT", "LM_MARKUP"]],
      ["TRANSLATION", ["TRANSLATION", "RN_DP_SD", "LITERAL_SEMANTIC"]],
      ["AUDIO", ["AUDIO", "VOICE"]],
      ["EXPORT", ["EXPORT", "DOWNLOAD"]],
      ["GIT", ["GIT_", "GITHUB", "DEPLOYMENT", "PUSH"]],
      ["TEAM", ["TEAM", "SYNC", "CLERK", "CRITIC", "ASSEMBLER"]],
      ["WORKFLOW", ["WORKFLOW", "STAGE"]],
      ["RULES", ["RULE", "TRUTH", "NO_BREAK", "QUALITY_100"]]
    ];

    checks.forEach(([group, keys]) => {
      if (keys.some(k => text.includes(k))) groups.push(group);
    });

    return [...new Set(groups)];
  },

  render() {
    const report = this.analyze();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    setText("unknownTotal", report.total_unknown);
    setText("unknownWeak", report.weak_match);
    setText("unknownNoRole", report.no_role);
    setText("unknownConflict", report.conflict);
    setText("unknownOrphan", report.orphan);

    const box = document.getElementById("unknownReportBox");
    if (box) {
      box.textContent = report.results.length
        ? report.results.map(item => [
          `[${item.type}] ${item.path}`,
          `  group: ${item.map_group || "—"}`,
          `  reasons: ${(item.reasons || []).join("; ")}`
        ].join("\n")).join("\n\n")
        : "Semantic unknown не знайдено.";
    }
  },

  copyReport() {
    const box = document.getElementById("unknownReportBox");
    const text = "UNKNOWN DETECTOR V03.7.2\n\n" + (box?.textContent || "");
    navigator.clipboard?.writeText(text);
  }
};

window.ODIN_UNKNOWN_DETECTOR = ODIN_UNKNOWN_DETECTOR;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => ODIN_UNKNOWN_DETECTOR.render(), 700);
});
