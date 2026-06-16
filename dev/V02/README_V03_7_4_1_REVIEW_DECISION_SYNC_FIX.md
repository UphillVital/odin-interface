# ODIN V03.7.4.1 — REVIEW DECISION SYNC FIX

## Що виправляє

У V03.7.4 Review → Task показав:

```text
candidates: 0
created: 0
skipped: 0
```

хоча Unknown Review мав confirmed decisions, включно з `CREATE_TASK`.

Причина:

```text
review_to_task.js не стабільно підхоплював confirmed decisions із localStorage.
```

---

## Рішення

V03.7.4.1 читає confirmed decisions напряму з:

```text
localStorage["odin_unknown_review_v0373"]
```

і мержить їх з актуальним Unknown Detector report.

---

## Очікувано після fix

Якщо confirmed містить:

```text
CREATE_TASK = 1
```

то після `GENERATE TASKS` має бути:

```text
Candidates = 1
Created = 1
Skipped = 0
```

При повторному запуску:

```text
Candidates = 1
Created = 0
Skipped = 1
reason: DUPLICATE_SKIPPED
```

---

## Куди класти

Розпакувати у корінь репозиторію:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface
```

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Fix V03.7.4 review decision sync"
git push origin dev
