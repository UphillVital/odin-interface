/* ODIN V03.5.3 — MODE REGISTRY */

const ODIN_MODE_REGISTRY = {
  modes: {
    MODE_TEST: {
      id: "MODE_TEST",
      name: "MODE TEST",
      description: "Швидка перевірка зв’язку MODE → STATE → ROUTER → ENGINE.",
      input_type: "demo",
      quality_level: "test",
      template_policy: "soft",
      qa_policy: "basic",
      export_policy: "none",
      router_action: "GENERATE_LESSON_TEST",
      topic: "ODIN MODE TEST",
      task: "Перевірити запуск engine через Mode Registry та Router Adapter."
    },
    MODE_TOPIC: {
      id: "MODE_TOPIC",
      name: "MODE TOPIC",
      description: "Створити урок з теми, яку користувач ввів у Lesson Input.",
      input_type: "topic",
      quality_level: "standard",
      template_policy: "standard",
      qa_policy: "standard",
      export_policy: "html_ready",
      router_action: "GENERATE_LESSON_TOPIC"
    },
    MODE_PRO: {
      id: "MODE_PRO",
      name: "MODE PRO",
      description: "Розширений урок 100% з ІШ, РН/ДП/СД, підсвіткою, QA і домашнім завданням.",
      input_type: "topic/content",
      quality_level: "PRO",
      template_policy: "strict",
      qa_policy: "full",
      export_policy: "html_ready",
      router_action: "GENERATE_LESSON_PRO",
      task: "Створи урок 100% у нашому основному шаблоні з РН / ДП / СД, підсвіткою, QA і домашнім завданням."
    },
    MODE_TEMPLATE_STRICT: {
      id: "MODE_TEMPLATE_STRICT",
      name: "TEMPLATE STRICT",
      description: "Жорстке дотримання TEMPLATE_BASE / ІШ.",
      input_type: "topic/content",
      quality_level: "strict",
      template_policy: "hard_lock",
      qa_policy: "template_full",
      export_policy: "html_ready",
      router_action: "GENERATE_LESSON_TEMPLATE_STRICT",
      task: "Створи урок строго за TEMPLATE_BASE_v1 / ІШ без відхилень."
    }
  },
  get(id) { return this.modes[id] || null; },
  list() { return Object.values(this.modes); }
};

window.ODIN_MODE_REGISTRY = ODIN_MODE_REGISTRY;
