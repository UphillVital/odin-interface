# ODIN V03.7.4.1 REVIEW DECISION SYNC FIXATION v1

## Проблема

V03.7.4 показав:

```text
candidates = 0
created = 0
skipped = 0
```

при наявних confirmed review decisions.

---

## Причина

Review → Task не стабільно читав saved decisions із:

```text
localStorage["odin_unknown_review_v0373"]
```

---

## Рішення

[FIXED]
review_to_task.js тепер напряму читає localStorage decisions і мержить їх з Unknown Detector rows.

---

## Очікувана поведінка

Для confirmed `CREATE_TASK`:

```text
Candidates = 1
Created = 1
```

Повторний запуск:

```text
Created = 0
Skipped = 1
DUPLICATE_SKIPPED
```

---

## Правила

[RULE]
Не створювати дублікати задач.

[RULE]
Не редагувати файли.

[RULE]
Не виконувати Git.

[RULE]
Task generation = backlog only.
