# ODIN STATE AUDIT PLAN v1

## 1. Призначення

Перед створенням або розширенням ODIN_STATE потрібно проаналізувати існуючий файл:

dev\V02\odin_admin_state.js

Мета:

- не створити другий state
- не зламати admin/control layer
- зрозуміти, що вже є
- підготувати multi-project state правильно

---

## 2. Чому це критично

[SON WARNING]
Без єдиного state система розвалиться на окремі частини.

[FIXED]
ODIN_STATE має бути центром:

MODE
TASK
QA
GIT
LOG
PROJECT
UI

---

## 3. Що треба перевірити в odin_admin_state.js

### 3.1 Які об’єкти стану вже є

Перевірити:

- current task
- current mode
- current status
- logs
- history
- package state
- file state
- user / admin state
- sync state

---

### 3.2 Як state оновлюється

Перевірити:

- напряму
- через functions
- через events
- через localStorage
- через global object

---

### 3.3 Чи є persistence

Перевірити:

- localStorage
- JSON
- export/import
- sync with files
- reset

---

### 3.4 Чи є multi-project

Перевірити:

- active_project_id
- projects
- project list
- project context
- ізольовані logs/history

---

### 3.5 Чи можна розширити без переписування

Потрібно визначити:

- що можна додати
- що не можна міняти
- які functions треба обгорнути
- чи потрібен adapter

---

## 4. Бажана модель ODIN_STATE

active_project_id

projects:
  project_id:
    name
    type
    current_mode
    current_stage
    status
    log
    history
    task_list
    context
    files
    git

global:
  version
  system_status
  active_view
  guards
  errors

---

## 5. Event model

Бажана модель:

EVENT
→ STATE UPDATE
→ UI UPDATE

Приклади подій:

- PROJECT_CREATED
- PROJECT_SELECTED
- MODE_SELECTED
- TASK_STARTED
- STEP_STARTED
- STEP_COMPLETED
- QA_PASSED
- QA_FAILED
- EXPORT_READY
- GIT_READY
- FILE_EDIT_STARTED
- FILE_CHANGE_CONFIRMED
- TASK_DONE

---

## 6. Рішення після аудиту

Після аудиту треба вирішити:

1. odin_admin_state.js залишається основою.
2. Чи створити event_bus.js.
3. Чи створити odin_state_adapter.js.
4. Чи розширювати odin_admin_state.js прямо.
5. Як не зламати admin.html.

---

## 7. Заборонено до аудиту

[RULE]
Не створювати новий odin_state.js до аналізу odin_admin_state.js.

[RULE]
Не видаляти odin_admin_state.js.

[RULE]
Не змінювати admin.html без плану.

---

## 8. Очікуваний результат аудиту

Документ:

ODIN_STATE_AUDIT_RESULT_v1.md

У БАЗІ:

ODIN_TREE_PROJECT_v1\14_WORKFLOW\

Після цього можна робити V03.5.1 ODIN STATE.
