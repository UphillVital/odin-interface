# ODIN V03.5 INTEGRATION PLAN v1

## 1. Призначення

V03.5 має зібрати наявні шари dev\V02 в одну керовану систему.

Це не новий engine.

Це Integration Layer.

---

## 2. Головний принцип

[FIXED]
ODIN не створюється з нуля.
ODIN збирається з уже існуючих шарів.

---

## 3. План до аналізу V02

Стара модель:

V03.5 — MODE REGISTRY
V03.5.1 — ODIN STATE
V03.5.2 — PROJECT MANAGER
V03.6 — TASK CENTER
V03.7 — FILE EDIT + DIFF
V03.8 — GIT CONTROL
V03.9 — ODIN TREE VIEW

Проблема:

план був логічно правильний, але вважав, що багато речей ще треба створювати.

---

## 4. Після першого СОН

[SON RESULT]
dev\V02 вже має 70% ODIN system.

Виявлені існуючі шари:

- admin.html
- odin_admin_state.js
- odin_file_viewer.js
- odin_file_index.js
- odin_auto_tree.js
- odin_tree_data.js
- odin_qa_layer.js
- odin_export_system.js
- odin_template_control.js
- content_engine.js
- lesson_generator.js

Перший висновок:

не створювати нове, а використовувати існуюче.

---

## 5. Після другого СОН

[SON RESULT]
Потрібен Integration Layer.

Правильна архітектура:

admin.html / index.html
→ CONTROL LAYER
→ odin_admin_state.js
→ smart_router.js
→ content_engine.js
→ lesson_generator.js
→ odin_qa_layer.js
→ odin_export_system.js

---

## 6. Контрольний СОН

Ризики:

1. Зламати V03.4
2. Змішати admin.html та index.html
3. Створити ще один state
4. Втратити результати розмови

Рішення:

- content_engine.js і lesson_generator.js не чіпати напряму
- index.html = runtime lesson interface
- admin.html = control/workspace center
- odin_admin_state.js аудитити перед розширенням
- результати фіксувати в ODIN_TREE_PROJECT_v1

---

## 7. Оновлений план V03.5

### Крок 1 — V02 SYSTEM MAP

Зафіксувати карту файлів V02.

Статус:

цей документ створено як частина пакету.

---

### Крок 2 — INTEGRATION PLAN

Зафіксувати, що V03.5 = Integration Layer.

Статус:

цей документ створено як частина пакету.

---

### Крок 3 — STATE AUDIT

Проаналізувати:

dev\V02\odin_admin_state.js

Перед тим як писати ODIN_STATE.

---

### Крок 4 — MODE REGISTRY PLAN

Описати, як MODE REGISTRY працює через:

mode_registry
→ smart_router
→ content_engine
→ lesson_generator

---

### Крок 5 — Після затвердження

Робити пакет:

V03.5_INTEGRATION_LAYER

---

## 8. Ролі майбутньої інтеграції

### MODE REGISTRY

Не engine.
Керує режимами.

---

### ODIN STATE

Центр стану.
Має бути multi-project.

---

### PROJECT MANAGER

Керує проєктами.

---

### TASK CENTER

Показує workflow, status, logs.

---

### FILE CONTROL

Редагування, diff, confirm, undo.
Майбутній шар.

---

### GIT CONTROL

Генерація git-команд.
Майбутній шар.

---

### ODIN TREE VIEW

Використати auto_tree / odin_auto_tree / odin_tree_data.

---

## 9. Заборонено

[RULE]
Не створювати новий generator.

[RULE]
Не створювати новий pipeline.

[RULE]
Не дублювати QA.

[RULE]
Не дублювати export.

[RULE]
Не дублювати tree.

[RULE]
Не дублювати file viewer.

[RULE]
Не писати код до завершення STATE AUDIT.

---

## 10. Git після фіксації

git add ODIN_TREE_PROJECT_v1/
git commit -m "Add V03.5 ODIN integration planning"
git push origin dev
