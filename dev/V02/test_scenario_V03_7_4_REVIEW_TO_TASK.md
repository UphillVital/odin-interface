# TEST — ODIN V03.7.4 REVIEW TO TASK

## Запуск

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

## Кроки

1. Unknown Detector має показати items.
2. Unknown Review має мати confirmed items.
3. У Review → Task Center Integration натиснути GENERATE TASKS.
4. Очікувано:
   - Candidates >= 1
   - Created >= 1 або Skipped, якщо задачі вже створені
5. Натиснути VIEW LAST REPORT.
6. Перевірити Task Center:
   - Task Count збільшився
   - є tasks типу UNKNOWN_REVIEW

## Повторний запуск

Повторний запуск не має дублювати задачі.

Очікувано:

```text
Skipped > 0
reason: DUPLICATE_SKIPPED
```
