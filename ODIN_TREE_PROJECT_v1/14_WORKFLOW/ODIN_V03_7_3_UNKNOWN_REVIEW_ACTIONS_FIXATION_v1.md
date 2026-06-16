# ODIN V03.7.3 UNKNOWN REVIEW ACTIONS FIXATION v1

## Причина

V03.7.2 Unknown Detector показав:

```text
Total Unknown = 53
Conflict = 52
Orphan = 1
```

---

## Рішення

[DECISION]
Додати review/action layer перед будь-якими змінами.

---

## Дії

- KEEP
- IGNORE
- DOCUMENT
- FIX_LATER
- CREATE_TASK
- MOVE_REVIEW

---

## Правила

[RULE]
Нічого не змінювати автоматично.

[RULE]
Нічого не видаляти автоматично.

[RULE]
Review decisions зберігати як план.

[RULE]
Будь-який refactor — тільки після review + confirm.

---

## План

[PLAN]
V03.7.3 додано в roadmap як обовʼязковий етап після Unknown Detector.

---

## Наступний крок

Після тесту V03.7.3:

V03.7.4 — Review Plan → Task Center integration
або
V03.7.4 — Diff Planning.
