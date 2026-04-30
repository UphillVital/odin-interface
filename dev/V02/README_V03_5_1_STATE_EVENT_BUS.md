# ODIN V03.5.1 — STATE + EVENT BUS PACKAGE

## Призначення

Додати CORE STATE та EVENT BUS до dev\V02 без зміни engine.

Цей пакет НЕ змінює:

- content_engine.js
- lesson_generator.js
- smart_router.js
- odin_admin_state.js

odin_admin_state.js залишається UI STATE + LOG.

Новий CORE STATE додається окремо:

- odin_state.js
- event_bus.js
- odin_state_bridge.js

---

## Куди класти

Розпакувати пакет у корінь репозиторію:

C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface

Після розпакування файли мають бути тут:

dev\V02\admin.html
dev\V02\event_bus.js
dev\V02\odin_state.js
dev\V02\odin_state_bridge.js

А фіксація рішення — тут:

ODIN_TREE_PROJECT_v1\14_WORKFLOW\ODIN_STATE_EVENT_BUS_FIXATION_v1.md

---

## Що зміниться в admin.html

Додається блок:

ODIN Core State

Кнопки:

- CREATE DEFAULT PROJECT
- TEST EVENT
- REFRESH STATE

---

## Як тестувати

1. Відкрити через Live Server:

dev/V02/admin.html

2. Натиснути:

CREATE DEFAULT PROJECT

3. Натиснути:

TEST EVENT

4. Очікувано:

- Active Project = ODIN Main Project
- Project Count = 1
- System Status = QA_PASSED
- Stage = PLAN
- у Core State Box видно JSON

---

## Важливо

Це ще не Mode Registry.

Це фундамент для Mode Registry, Project Manager, Task Center, File Control, Git Control.

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Add V03.5.1 ODIN state and event bus"
git push origin dev
