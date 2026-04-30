# ODIN V02 SYSTEM MAP v1

## 1. Призначення

Цей документ фіксує реальну структуру dev\V02 після аналізу.

Мета:

- зрозуміти, які файли вже існують
- не дублювати готові шари
- не ламати V03.4
- правильно планувати V03.5 Integration Layer

---

## 2. Головний висновок

[FIXED]
dev\V02 вже містить значну частину ODIN system.

[FIXED]
Далі треба не створювати нові системи з нуля, а інтегрувати наявні файли.

---

## 3. Основні групи файлів V02

### 3.1 Runtime / UI

- index.html
- style.css
- viewer.js
- app.js

Роль:

- головний інтерфейс
- відображення
- runtime-запуск
- preview
- UI control

---

### 3.2 Admin / Control

- admin.html
- odin_admin_state.js
- odin_sync.js
- odin_repo_config.js
- auth.js
- login.html

Роль:

- майбутній Control Center / Workspace
- стан адміністративної частини
- синхронізація
- конфігурація репозиторію
- контроль доступу

[IMPORTANT]
admin.html розглядати як основу майбутнього WORKSPACE / CONTROL CENTER.

---

### 3.3 Engine

- content_engine.js
- lesson_generator.js
- semantic.js
- v036_engine.js
- v041_engine.js
- v042_engine.js
- v043_engine.js
- v0431_engine.js
- v044_engine.js
- v045_engine.js
- v046_engine.js

Роль:

- content extraction
- lesson generation
- semantic depth
- версійні engine-шари

[FIXED]
Головна стабільна основа зараз:

content_engine.js
lesson_generator.js

---

### 3.4 Session / Routing

- session.js
- smart_router.js

Роль:

- session data
- маршрутизація дій
- зв’язок між UI та engine

[IMPORTANT]
MODE REGISTRY у майбутньому має працювати через smart_router.js, а не обходити його.

---

### 3.5 QA

- odin_qa_layer.js

Роль:

- перевірка
- QA status
- контроль якості

[RULE]
Не створювати новий QA, поки не проведено аудит odin_qa_layer.js.

---

### 3.6 Export

- odin_export_system.js
- odin_package_builder.js

Роль:

- export
- package building
- підготовка результатів

[RULE]
Не створювати новий export engine.

---

### 3.7 Template Control

- odin_template_control.js
- templates\TEMPLATE_BASE_v1.html

Роль:

- контроль шаблону
- робота з lesson template

[NOTE]
TEMPLATE_BASE_v1 у dev\V02 може бути runtime-копією або історичним шаром.
Джерело істини по шаблону лишається в ODIN_TREE_PROJECT_v1\07_UNIFIED_LESSON_TEMPLATE.

---

### 3.8 Tree / File System View

- auto_tree.html
- odin_auto_tree.js
- odin_tree_data.js
- ODIN AUTO TREE.txt
- odin_file_viewer.js
- odin_file_index.js
- odin_files_raw.txt

Роль:

- генерація дерева
- перегляд структури
- file viewer
- file index
- база для ODIN TREE VIEW

[FIXED]
ODIN TREE система вже частково існує.

---

### 3.9 Documentation / Status / Manifest

- README.md
- README.txt
- ODIN_V02_STATUS.md
- ODIN_V02_STABLE_CHECKPOINT_v1.json
- ODIN_V04_ARCHITECTURE.md
- ODIN_V04_CONTROL_LOGIC.md
- ODIN_V04_EXPORT_SPEC.md
- ODIN_V04_FULL_CHECKPOINT.md
- ODIN_V04_QA_RULES.md
- ODIN_V04_SYSTEM_LOCK.md
- ODIN_V04_VERSION_STATE.json
- ODIN_V04_WORKFLOW_LOCK.md
- PACKAGE_MANIFEST_*.md
- PACKAGE_STATUS_*.json

Роль:

- історія пакетів
- checkpoints
- workflow locks
- status tracking

[IMPORTANT]
Ці файли допомагають відновити логіку розвитку системи.

---

## 4. Не дублювати

[RULE]
Не створювати нові паралельні версії:

- generator
- pipeline
- QA
- export
- tree
- file viewer
- state
- template router

поки не проведено аудит існуючих файлів.

---

## 5. Правильна модель V02

index.html / admin.html
→ app.js / viewer.js
→ smart_router.js
→ content_engine.js
→ lesson_generator.js
→ odin_qa_layer.js
→ odin_export_system.js

Для керування:

admin.html
→ odin_admin_state.js
→ odin_sync.js
→ odin_repo_config.js

Для дерева:

auto_tree.html
→ odin_auto_tree.js
→ odin_tree_data.js

Для файлів:

odin_file_index.js
→ odin_file_viewer.js

---

## 6. Рішення

[DECISION]
V03.5 має бути Integration Layer, а не новий engine.

[DECISION]
Спочатку документувати і аудитити, потім додавати код.

[DECISION]
Результати аналізу фіксувати в ODIN_TREE_PROJECT_v1.
