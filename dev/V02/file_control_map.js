/* ODIN V03.7.1.1 — FILE CONTROL MAP EXPANSION
   Призначення:
   - розширити semantic map правил
   - краще розкласти ODIN_TREE_PROJECT_v1 по системних шарах
   - view-only
   - без unknown detector / diff / delete
*/

const ODIN_FILE_CONTROL_MAP = {
  rules: [
    {
      id: "core-system",
      name: "00 CORE SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/00_CORE/",
      role: "Ядро ODIN: принципи, state, recovery, SON, quality gate, protocol, router policy.",
      keywords: ["ODIN_CORE", "ODIN_STATE", "ODIN_SON", "ODIN_RECOVERY", "ODIN_100_QUALITY", "ODIN_MEMORY", "ODIN_TEAM", "ODIN_TEMPLATE", "ARCHITECTURE_SEPARATION"]
    },
    {
      id: "interface-system",
      name: "01 ODIN INTERFACE SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/01_ODIN_INTERFACE/",
      role: "Інтерфейс ODIN: UI layer, data layer, status stack, execution bridge, export ready.",
      keywords: ["ODIN_INTERFACE", "ODIN_UI", "ODIN_DATA", "ODIN_EXECUTION", "ODIN_STATUS", "ODIN_EXPORT"]
    },
    {
      id: "module-system",
      name: "02 MODULE SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/02_MODULES/",
      role: "Модульна система: registry, module system, lesson/export/QA/header modules.",
      keywords: ["MODULE", "LESSON_ENGINE_MODULE", "QA_ENGINE_MODULE", "EXPORT_MODULE", "HEADER_LOCK_MODULE"]
    },
    {
      id: "header-lock",
      name: "03 HEADER LOCK",
      folder: "ODIN_TREE_PROJECT_v1/03_HEADER_LOCK/",
      role: "Header lock / правила шапки інтерфейсів і уроків.",
      keywords: ["HEADER"]
    },
    {
      id: "qa-system",
      name: "04 QA SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/04_QA_SYSTEM/",
      role: "QA система: структура, переклад, markup, audio, final gate.",
      keywords: ["QA_", "QA_SYSTEM", "FINAL_GATE", "MARKUP", "STRUCTURE", "TRANSLATION"]
    },
    {
      id: "lesson-system",
      name: "05 LESSON SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/05_LESSON_SYSTEM/",
      role: "Lesson system: lesson engine, interface, output, structure, overview.",
      keywords: ["LESSON_", "LESSON_SYSTEM", "LESSON_ENGINE", "LESSON_OUTPUT", "LESSON_STRUCTURE"]
    },
    {
      id: "issu-ssudt",
      name: "06 ISSU / SSUDT",
      folder: "ODIN_TREE_PROJECT_v1/06_ISSU_SSUDT/",
      role: "ІССУ / ССУДТ integration layer.",
      keywords: ["ISSU", "SSUDT", "ССУДТ", "ІССУ"]
    },
    {
      id: "template-system",
      name: "07 UNIFIED LESSON TEMPLATE",
      folder: "ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/",
      role: "Unified lesson template: TEMPLATE_BASE, requirements, rules, map, extraction.",
      keywords: ["TEMPLATE_", "TEMPLATE_BASE", "UNIFIED_TEMPLATE", "EXTRACTION_REPORT"]
    },
    {
      id: "highlight-system",
      name: "08 HIGHLIGHT SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/08_HIGHLIGHT_SYSTEM/",
      role: "Highlight system: grammar, markup, modes, QA, template integration.",
      keywords: ["HIGHLIGHT", "LM_MARKUP", "GRAMMAR_HIGHLIGHT", "DATA_ACCURACY"]
    },
    {
      id: "translation-system",
      name: "09 TRANSLATION SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/09_TRANSLATION_SYSTEM/",
      role: "Translation system: RN/DP/SD, literal/semantic, lock, toggle, QA.",
      keywords: ["TRANSLATION", "RN_DP_SD", "LITERAL_SEMANTIC"]
    },
    {
      id: "audio-voice-system",
      name: "10 AUDIO / VOICE SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/10_AUDIO_VOICE_SYSTEM/",
      role: "Audio / voice system: engine, template integration, markup, QA.",
      keywords: ["AUDIO", "VOICE"]
    },
    {
      id: "export-system",
      name: "11 EXPORT SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/11_EXPORT_SYSTEM/",
      role: "Export system: download logic, QA, ready gate, GitHub deploy export, HTML/package export.",
      keywords: ["EXPORT", "DOWNLOAD", "HTML_EXPORT", "GITHUB_DEPLOY", "PACKAGE_EXPORT"]
    },
    {
      id: "git-deployment",
      name: "12 GIT DEPLOYMENT",
      folder: "ODIN_TREE_PROJECT_v1/12_GIT_DEPLOYMENT/",
      role: "Git deployment: branches, checkpoints, push standard, rollback, status, GitHub Pages.",
      keywords: ["GIT_", "GITHUB", "DEPLOYMENT", "ROLLBACK", "PUSH", "BRANCHES"]
    },
    {
      id: "team-system",
      name: "13 TEAM SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/13_TEAM/",
      role: "Team system: roles, sync, clerk, critic, assembler, quality rules.",
      keywords: ["TEAM", "SYNC", "CLERK", "CRITIC", "ASSEMBLER"]
    },
    {
      id: "workflow-system",
      name: "14 WORKFLOW SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/14_WORKFLOW/",
      role: "Workflow: SON, PLAN, BUILD, TEST, QA, FIX, EXPORT, PUSH, FIXATION, package workflow.",
      keywords: ["WORKFLOW", "SON_STAGE", "PLAN_STAGE", "BUILD_STAGE", "TEST_STAGE", "FIX_STAGE", "EXPORT_STAGE", "PUSH_STAGE", "FIXATION_STAGE"]
    },
    {
      id: "packages-system",
      name: "15 PACKAGES SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/15_PACKAGES/",
      role: "Packages system: naming, structure, types, QA, recovery, release packages.",
      keywords: ["PACKAGE", "PACKAGES", "RECOVERY", "RELEASE"]
    },
    {
      id: "rules-system",
      name: "16 RULES SYSTEM",
      folder: "ODIN_TREE_PROJECT_v1/16_RULES/",
      role: "Rules system: no break, quality 100, package first, truth, user format, git style.",
      keywords: ["RULE", "NO_BREAK", "QUALITY", "TRUTH", "ETALON", "STOP_AND_ROLLBACK"]
    },
    {
      id: "odin-root",
      name: "ODIN ROOT FILES",
      folder: "ODIN_TREE_PROJECT_v1/",
      rootOnly: true,
      role: "Root status and navigation files: GIT_PUSH, ODIN_STATUS, ODIN_TREE, system status.",
      keywords: ["GIT_PUSH", "ODIN_STATUS", "ODIN_TREE", "ODIN_SYSTEM_STATUS"]
    },
    {
      id: "dev-runtime-ui",
      name: "DEV V02 RUNTIME UI",
      folder: "dev/V02/",
      role: "Runtime / admin UI files in dev/V02.",
      keywords: ["index.html", "admin.html", "viewer.js", "app.js", "style.css", "task_center.js", "file_control.js"]
    },
    {
      id: "docs-status-history",
      name: "DOCS / STATUS / PACKAGE HISTORY",
      patterns: ["README", "PACKAGE_MANIFEST", "PACKAGE_STATUS", "STABILIZATION", "CHECKPOINT"],
      role: "Документація, маніфести, статуси, checkpoints. Застосовується якщо файл не потрапив у точнішу системну групу."
    }
  ],

  getKnownFiles() {
    if (window.ODIN_FILE_CONTROL && typeof ODIN_FILE_CONTROL.getAllKnownFiles === "function") {
      return ODIN_FILE_CONTROL.getAllKnownFiles();
    }

    try {
      if (typeof ODIN_TREE_DATA !== "undefined") {
        return ODIN_TREE_DATA.flatMap(group => (group.items || []).map(item => ({
          ...item,
          group: group.group || "UNKNOWN"
        })));
      }
    } catch(e) {}

    return [];
  },

  matchRule(file) {
    const path = file.path || "";
    const title = file.title || path.split("/").pop();
    const filename = title || path.split("/").pop();

    // First: exact folder groups, except docs fallback
    const folderRule = this.rules.find(rule => {
      if (!rule.folder) return false;
      if (rule.rootOnly) {
        const withoutRoot = path.replace("ODIN_TREE_PROJECT_v1/", "");
        return path.startsWith(rule.folder) && !withoutRoot.includes("/");
      }
      return path.startsWith(rule.folder);
    });

    if (folderRule && folderRule.id !== "odin-root") return folderRule;

    // Second: root files
    if (folderRule && folderRule.id === "odin-root") return folderRule;

    // Third: keyword rules
    const keywordRule = this.rules.find(rule => {
      if (!rule.keywords) return false;
      return rule.keywords.some(k => filename.includes(k) || path.includes(k));
    });
    if (keywordRule) return keywordRule;

    // Fourth: docs/status fallback
    const patternRule = this.rules.find(rule => {
      if (!rule.patterns) return false;
      return rule.patterns.some(pattern => filename.includes(pattern) || path.includes(pattern));
    });
    if (patternRule) return patternRule;

    return null;
  },

  buildMap() {
    const files = this.getKnownFiles();
    const mapped = [];
    const unmapped = [];

    files.forEach(file => {
      const path = file.path || "";
      const title = file.title || path.split("/").pop();
      const rule = this.matchRule(file);

      const record = {
        title,
        path,
        layer: file.layer || file.group || "UNKNOWN",
        type: file.type || "file",
        source: file.source || "TREE",
        map_group: rule ? rule.name : "Unmapped / Needs Review",
        map_role: rule ? rule.role : "Файл є у структурі, але ще не привʼязаний до карти взаємодії."
      };

      if (rule) mapped.push(record);
      else unmapped.push(record);
    });

    return {
      version: "V03.7.1.1",
      created_at: new Date().toISOString(),
      total_files: files.length,
      mapped_count: mapped.length,
      unmapped_count: unmapped.length,
      groups: this.groupBy(mapped, "map_group"),
      unmapped
    };
  },

  groupBy(items, key) {
    return items.reduce((acc, item) => {
      const k = item[key] || "UNKNOWN";
      if (!acc[k]) acc[k] = [];
      acc[k].push(item);
      return acc;
    }, {});
  },

  render() {
    const map = this.buildMap();

    const count = document.getElementById("fileMapCount");
    const mapped = document.getElementById("fileMapMapped");
    const unmapped = document.getElementById("fileMapUnmapped");
    const box = document.getElementById("fileMapBox");
    const unmappedBox = document.getElementById("fileMapUnmappedBox");

    if (count) count.textContent = map.total_files;
    if (mapped) mapped.textContent = map.mapped_count;
    if (unmapped) unmapped.textContent = map.unmapped_count;

    if (box) {
      const lines = [];
      Object.entries(map.groups).forEach(([group, files]) => {
        lines.push("## " + group);
        lines.push("Files: " + files.length);
        lines.push("Role: " + (files[0]?.map_role || ""));
        files.slice(0, 80).forEach(f => lines.push("  - " + f.path));
        if (files.length > 80) lines.push("  ... +" + (files.length - 80) + " more");
        lines.push("");
      });
      box.textContent = lines.join("\n") || "Карта порожня.";
    }

    if (unmappedBox) {
      unmappedBox.textContent = map.unmapped.length
        ? map.unmapped.map(f => "- " + f.path).join("\n")
        : "Немає unmapped files у поточній карті.";
    }

    if (window.ODIN_STATE) {
      ODIN_STATE.data.tree.file_map = map;
      ODIN_STATE.log("FILE_MAP_EXPANDED", "Expanded file interaction map rendered", {
        total: map.total_files,
        mapped: map.mapped_count,
        unmapped: map.unmapped_count
      });
      ODIN_STATE.save();
    }
  },

  copyMap() {
    const box = document.getElementById("fileMapBox");
    const extra = document.getElementById("fileMapUnmappedBox");
    const text = "FILE CONTROL MAP V03.7.1.1\n\n" + (box?.textContent || "") + "\n\nUNMAPPED\n" + (extra?.textContent || "");
    navigator.clipboard?.writeText(text);
  }
};

window.ODIN_FILE_CONTROL_MAP = ODIN_FILE_CONTROL_MAP;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => ODIN_FILE_CONTROL_MAP.render(), 400);
});
