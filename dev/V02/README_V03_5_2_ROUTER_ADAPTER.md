# ODIN V03.5.2 — ROUTER ADAPTER PACKAGE

## Призначення

Зробити повний ланцюг:

MODE
→ EVENT BUS
→ ODIN_STATE
→ ROUTER ADAPTER
→ smart_router.js
→ content_engine.js
→ lesson_generator.js

Цей пакет не створює новий engine.

---

## Що змінює пакет

У dev\V02 додає / оновлює:

- index.html
- event_bus.js
- odin_state.js
- mode_registry.js
- odin_router_adapter.js
- README_V03_5_2_ROUTER_ADAPTER.md
- test_scenario_V03_5_2_ROUTER_ADAPTER.md
- PACKAGE_MANIFEST_V03_5_2_ROUTER_ADAPTER.md

У БАЗУ додає:

ODIN_TREE_PROJECT_v1\14_WORKFLOW\ODIN_ROUTER_ADAPTER_FIXATION_v1.md

---

## Що НЕ змінює

Пакет не змінює:

- smart_router.js
- content_engine.js
- lesson_generator.js
- session.js
- viewer.js

---

## Куди класти

Розпакувати пакет у корінь репозиторію:

C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface

---

## Як тестувати

1. Відкрити через Live Server:

http://127.0.0.1:5500/dev/V02/index.html

2. Натиснути:

MODE TEST

3. Потім перевірити:

- modeStatus показує RUN
- Extraction Report оновився
- Generated Lesson Preview оновився

4. Потім можна тестувати:

MODE TOPIC
MODE PRO
TEMPLATE STRICT

---

## Очікуваний результат

MODE має реально запустити engine:

- AUTO SELECT CORE
- CONTENT EXTRACTION
- LESSON GENERATOR
- QA_PASSED
- ENGINE_DONE

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Add V03.5.2 router adapter mode integration"
git push origin dev
