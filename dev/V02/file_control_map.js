/* ODIN V03.7.1 — FILE CONTROL MAP
   Призначення:
   - побудувати view-only карту взаємодії файлів
   - НЕ видаляти
   - НЕ писати у файли
   - НЕ робити diff
*/

const ODIN_FILE_CONTROL_MAP = {
  rules: [
    {
      id: "ui-runtime",
      name: "Lesson Runtime UI",
      files: ["index.html", "viewer.js", "style.css"],
      role: "Запуск lesson runtime, preview, робота з engine-екраном."
    },
    {
      id: "admin-control",
      name: "Admin / Control Center",
      files: ["admin.html", "app.js", "odin_admin_state.js", "task_center.js", "file_control.js"],
      role: "Керування системою, Task Center, File Control, Git proposal."
    },
    {
      id: "state-events",
      name: "State + Events",
      files: ["odin_state.js", "event_bus.js", "odin_state_bridge.js"],
      role: "Спільний стан, події, синхронізація між index.html та admin.html."
    },
    {
      id: "mode-engine",
      name: "Mode → Engine Bridge",
      files: ["mode_registry.js", "global_engine_fix.js", "odin_router_adapter.js", "smart_router.js"],
      role: "MODE запускає існуючий engine через adapter/router."
    },
    {
      id: "lesson-engine",
      name: "Lesson Engine",
      files: ["content_engine.js", "lesson_generator.js", "semantic.js"],
      role: "Extraction, semantic layer, lesson generation."
    },
    {
      id: "tree-files",
      name: "Tree + File View",
      files: ["auto_tree.html", "odin_auto_tree.js", "odin_tree_data.js", "odin_file_index.js", "odin_file_viewer.js", "odin_files_raw.txt", "ODIN AUTO TREE.txt"],
      role: "Дерево, індекс файлів, перегляд файлів."
    },
    {
      id: "qa-export",
      name: "QA + Export",
      files: ["odin_qa_layer.js", "odin_export_system.js", "odin_package_builder.js", "odin_template_control.js"],
      role: "QA, template control, package/export preview."
    },
    {
      id: "docs-status",
      name: "Docs / Status / Package History",
      patterns: ["README", "PACKAGE_MANIFEST", "PACKAGE_STATUS", "ODIN_V", "STABILIZATION"],
      role: "Документація, маніфести, статуси, checkpoints."
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

  buildMap() {
    const files = this.getKnownFiles();
    const mapped = [];
    const unmapped = [];

    files.forEach(file => {
      const path = file.path || "";
      const title = file.title || path.split("/").pop();
      const filename = title || path.split("/").pop();

      const rule = this.rules.find(rule => {
        if (rule.files && rule.files.some(name => filename === name || path.endsWith("/" + name) || path.includes(name))) return true;
        if (rule.patterns && rule.patterns.some(pattern => filename.includes(pattern) || path.includes(pattern))) return true;
        return false;
      });

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
        files.slice(0, 50).forEach(f => lines.push("  - " + f.path));
        if (files.length > 50) lines.push("  ... +" + (files.length - 50) + " more");
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
      ODIN_STATE.log("FILE_MAP_RENDERED", "File interaction map rendered", {
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
    const text = "FILE CONTROL MAP\n\n" + (box?.textContent || "") + "\n\nUNMAPPED\n" + (extra?.textContent || "");
    navigator.clipboard?.writeText(text);
  }
};

window.ODIN_FILE_CONTROL_MAP = ODIN_FILE_CONTROL_MAP;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => ODIN_FILE_CONTROL_MAP.render(), 400);
});
