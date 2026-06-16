const ODIN_QA_LAYER = {
  lastText: "",

  getCurrentText(){
    return document.getElementById("filePreview")?.textContent || "";
  },

  add(level, title, note){
    return { level, title, note };
  },

  run(node){
    const text = this.getCurrentText();
    const checks = [];

    if(!node){
      checks.push(this.add("fail", "NODE_MISSING", "Вузол не вибрано."));
      return this.render(checks);
    }

    checks.push(this.add("pass", "NODE_SELECTED", `Вибрано: ${node.path}`));

    if(node.path && node.path.includes("ODIN_TREE_PROJECT_v1")){
      checks.push(this.add("pass", "ODIN_TREE_PATH", "Вузол належить до бази знань ODIN_TREE_PROJECT_v1."));
    } else if(node.path && node.path.includes("dev/V02")){
      checks.push(this.add("warn", "DEV_V02_PATH", "Вузол належить до живого інтерфейсу V02, не до бази знань."));
    } else {
      checks.push(this.add("warn", "NON_STANDARD_PATH", "Шлях не належить до основної бази знань або V02."));
    }

    if(node.type === "folder"){
      checks.push(this.add("warn", "FOLDER_METADATA_ONLY", "Для папки доступна metadata QA. File QA потребує конкретного файлу."));
      return this.render(checks);
    }

    if(!text || text.trim().length < 20){
      checks.push(this.add("fail", "CONTENT_EMPTY", "Немає достатнього вмісту для QA. Спочатку натисни OPEN."));
      return this.render(checks);
    }

    if(text.includes("GITHUB RAW LOAD FAILED")){
      checks.push(this.add("warn", "RAW_LOAD_FAILED", "Файл не завантажився з GitHub raw, QA виконується по fallback preview."));
    } else {
      checks.push(this.add("pass", "CONTENT_LOADED", "Є вміст для аналізу."));
    }

    if(node.type === "md"){
      if(/^#\s+/m.test(text)) checks.push(this.add("pass", "MD_TITLE_PRESENT", "Markdown має заголовок."));
      else checks.push(this.add("warn", "MD_TITLE_MISSING", "Markdown без явного H1 заголовка."));

      if(/##\s+/m.test(text)) checks.push(this.add("pass", "MD_SECTIONS_PRESENT", "Markdown має секції."));
      else checks.push(this.add("warn", "MD_SECTIONS_WEAK", "Секції ## не знайдено."));

      if(/purpose|призначення|що це/i.test(text)) checks.push(this.add("pass", "PURPOSE_PRESENT", "Є опис призначення."));
      else checks.push(this.add("warn", "PURPOSE_MISSING", "Не знайдено явного опису призначення."));
    }

    if(node.type === "json"){
      try {
        JSON.parse(text);
        checks.push(this.add("pass", "JSON_VALID", "JSON валідний."));
      } catch(e){
        checks.push(this.add("fail", "JSON_INVALID", e.message));
      }
    }

    if(node.type === "html"){
      if(/<!doctype html>|<html/i.test(text)) checks.push(this.add("pass", "HTML_STRUCTURE_PRESENT", "HTML структура знайдена."));
      else checks.push(this.add("warn", "HTML_STRUCTURE_WEAK", "Не знайдено стандартного HTML старту."));

      if(/<script/i.test(text)) checks.push(this.add("pass", "SCRIPT_PRESENT", "Script layer присутній."));
      else checks.push(this.add("warn", "SCRIPT_MISSING", "Script layer не знайдено."));

      if(/<style|stylesheet/i.test(text)) checks.push(this.add("pass", "STYLE_PRESENT", "Style layer присутній."));
      else checks.push(this.add("warn", "STYLE_MISSING", "Style layer не знайдено."));
    }

    if(/README/i.test(node.path)) checks.push(this.add("pass", "README_FILE", "Це README файл."));
    if(/PACKAGE_MANIFEST/i.test(node.path)) checks.push(this.add("pass", "MANIFEST_FILE", "Це manifest файл."));
    if(/PACKAGE_STATUS/i.test(node.path)) checks.push(this.add("pass", "STATUS_FILE", "Це status файл."));

    if(/TEMPLATE_BASE_v1\.html/i.test(node.path)){
      if(/TEMPLATE_BASE_v1|Lesson Page Template|topbar|data-tts|lm-word/i.test(text)){
        checks.push(this.add("pass", "LESSON_TEMPLATE_MARKERS", "Є маркери шаблону уроку."));
      } else {
        checks.push(this.add("warn", "LESSON_TEMPLATE_MARKERS_WEAK", "Маркери шаблону уроку не знайдені або слабкі."));
      }
    }

    if(/ODIN_TEMPLATE_ROUTER_v1\.md/i.test(node.path)){
      if(/lesson|TEMPLATE_BASE_v1|FORBIDDEN|Hard lock/i.test(text)){
        checks.push(this.add("pass", "TEMPLATE_ROUTER_RULES_PRESENT", "Template Router містить ключові правила."));
      } else {
        checks.push(this.add("fail", "TEMPLATE_ROUTER_RULES_MISSING", "Template Router не містить ключових правил."));
      }
    }

    return this.render(checks);
  },

  render(checks){
    const errors = checks.filter(x => x.level === "fail").length;
    const warnings = checks.filter(x => x.level === "warn").length;
    const passed = checks.filter(x => x.level === "pass").length;

    let result = "QA_PASSED";
    if(errors) result = "QA_FAILED";
    else if(warnings) result = "QA_PASSED_WITH_WARNINGS";

    const badge = document.getElementById("qaResult");
    badge.textContent = result;
    badge.className = "qa-badge " + (errors ? "fail" : warnings ? "warn" : "pass");

    document.getElementById("qaCounts").textContent = `checks: ${checks.length} · passed: ${passed} · warnings: ${warnings} · errors: ${errors}`;

    document.getElementById("qaDetails").innerHTML = checks.map(x => `
      <div class="qa-item ${x.level}">
        <b>${x.level === "pass" ? "✅" : x.level === "warn" ? "⚠️" : "❌"} ${x.title}</b>
        <p>${x.note}</p>
      </div>
    `).join("");

    return { result, checks, passed, warnings, errors };
  }
};
