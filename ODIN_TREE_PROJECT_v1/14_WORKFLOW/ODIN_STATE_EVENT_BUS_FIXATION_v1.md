# ODIN STATE + EVENT BUS FIXATION v1

## Рішення

[DECISION]
odin_admin_state.js не перетворюємо на CORE STATE.

[FIXED]
odin_admin_state.js = UI STATE + LOG.

[FIXED]
CORE STATE створюється окремим файлом:

dev\V02\odin_state.js

[FIXED]
EVENT BUS створюється окремим файлом:

dev\V02\event_bus.js

[FIXED]
Зв’язок з admin.html виконує:

dev\V02\odin_state_bridge.js

---

## Архітектура

admin.html
→ odin_admin_state.js
→ event_bus.js
→ odin_state.js
→ odin_state_bridge.js

---

## Що містить ODIN_STATE

- active_project_id
- projects
- system
- logs
- registry
- tree
- git

---

## Multi-project

[FIXED]
ODIN_STATE одразу підтримує multi-project модель.

Кожен проєкт має:

- id
- name
- type
- mode
- stage
- status
- tasks
- log
- history
- context

---

## Unknown files

[FIXED]
У ODIN_STATE.tree є unknown_files.

Призначення:

бачити файли, які не входять у дерево, щоб пізніше вирішувати:

- залишити
- ігнорувати
- видалити через CONFIRM

[RULE]
Нічого не видаляти автоматично.

---

## Наступний крок

Після тесту V03.5.1:

V03.5.2 — MODE REGISTRY підключити через EVENT BUS і ODIN_STATE.
