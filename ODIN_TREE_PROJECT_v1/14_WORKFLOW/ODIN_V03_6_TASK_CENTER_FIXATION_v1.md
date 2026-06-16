# ODIN V03.6 TASK CENTER FIXATION v1

## Рішення

[DECISION]
admin.html = Control Center / Live Status.

[DECISION]
index.html = Engine / Lesson Runtime.

[FIXED]
Task Center читає ODIN_STATE і показує:

- active mode
- current stage
- current status
- task count
- active tasks
- execution log

---

## Архітектура

index.html
→ MODE TEST / MODE PRO
→ EVENT BUS
→ ODIN_STATE
→ localStorage

admin.html
→ ODIN_STATE.load()
→ Task Center
→ Live Status / Execution Log

---

## Правила

[RULE]
Task Center не виконує engine.

[RULE]
Task Center тільки читає state і показує процес.

[RULE]
Engine лишається в index.html runtime.

---

## Наступний крок

Після підтвердження V03.6:

V03.7 — File Interaction / Unknown Files / Diff Planning.
