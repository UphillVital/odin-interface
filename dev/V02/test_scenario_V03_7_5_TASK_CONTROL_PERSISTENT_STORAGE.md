# TEST — ODIN V03.7.5 TASK CONTROL + PERSISTENT STORAGE

## Запуск

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

## Кроки

1. Переконатися, що Review → Task створив хоча б одну задачу.
2. Відкрити Task Control / Persistent Storage.
3. Натиснути REFRESH TASK CONTROL.
4. Перевірити:
   - Total Tasks > 0
   - Visible > 0
5. Змінити status однієї задачі на IN_PROGRESS.
6. Змінити priority на HIGH.
7. Застосувати фільтр Priority = HIGH.
8. Натиснути EXPORT SNAPSHOT.
9. Перевірити, що snapshot містить:
   - odin_state
   - review_decisions
   - review_to_task_report

## Очікувано

Task Control працює як backlog manager.
