# ODIN V03.7.5 TASK CONTROL + PERSISTENT STORAGE FIXATION v1

## Рішення

[DECISION]
Після Review → Task потрібен backlog control.

---

## Реалізовано

- Task backlog view
- filters by status / priority / type
- status update
- priority update
- export snapshot
- import snapshot from box

---

## Snapshot містить

- odin_state
- review_decisions
- review_to_task_report
- unknown_review
- unknown_semantic

---

## Правила

[RULE]
Task Control не змінює файли проєкту.

[RULE]
Task Control не виконує Git.

[RULE]
Snapshot — це контроль памʼяті / відновлення, не автоматичний filesystem write.

---

## Наступний крок

V03.8 — Git Control Pro
або
V03.7.6 — Task persistence export file package.
