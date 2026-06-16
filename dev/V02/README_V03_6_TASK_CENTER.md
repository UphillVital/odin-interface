# ODIN V03.6 — TASK CENTER + LIVE STATUS

## Що це

Пакет додає у `admin.html` живий Task Center.

Мета:

```text
admin.html = Control Center / Live Status
index.html = Engine / Lesson Runtime
ODIN_STATE = спільний стан між ними
```

---

## Що додається

У `dev\V02`:

```text
admin.html
odin_state_bridge.js
task_center.js
README_V03_6_TASK_CENTER.md
test_scenario_V03_6_TASK_CENTER.md
PACKAGE_MANIFEST_V03_6_TASK_CENTER.md
```

У БАЗУ:

```text
ODIN_TREE_PROJECT_v1\14_WORKFLOW\ODIN_V03_6_TASK_CENTER_FIXATION_v1.md
```

---

## Що НЕ змінюється

Не чіпаємо engine:

```text
content_engine.js
lesson_generator.js
smart_router.js
```

---

## Як тестувати

1. Відкрити:

```text
http://127.0.0.1:5500/dev/V02/index.html
```

2. Натиснути:

```text
MODE TEST
```

3. Відкрити:

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

4. У блоці `Task Center / Live Status` має бути видно:

```text
Current Mode = MODE_TEST
Current Stage = BUILD або PLAN
Current Status = ENGINE_DONE / QA_PASSED
Task Count > 0
Execution Log заповнений
```

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Add V03.6 task center live status"
git push origin dev
