# TEST — ODIN V03.7.3 UNKNOWN REVIEW ACTIONS

## Запуск

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

## Кроки

1. RUN UNKNOWN DETECTOR.
2. Перейти до Unknown Review + Actions.
3. Натиснути REFRESH REVIEW.
4. Перевірити:
   - Total Items = кількість unknown
   - Pending > 0
5. Для 2–3 item натиснути DOCUMENT або FIX_LATER.
6. Перевірити Confirmed збільшився.
7. Натиснути EXPORT REVIEW PLAN.

## Очікувано

Review Plan JSON містить:

```text
total_items
confirmed
pending
actions
rows
```
