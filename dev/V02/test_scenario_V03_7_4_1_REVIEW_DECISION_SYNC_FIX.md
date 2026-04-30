# TEST — ODIN V03.7.4.1 REVIEW DECISION SYNC FIX

## Запуск

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

## Кроки

1. Переконатися, що Unknown Review має confirmed CREATE_TASK.
2. У Review → Task Center Integration натиснути GENERATE TASKS.
3. Очікувано:
   - Candidates >= 1
   - Created >= 1 або Skipped, якщо задача вже була створена.
4. Натиснути GENERATE TASKS ще раз.
5. Очікувано:
   - Created = 0
   - Skipped >= 1
   - reason = DUPLICATE_SKIPPED
