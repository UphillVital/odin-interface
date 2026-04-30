# TEST — ODIN V03.7.6 RECOVERY FULL PACKAGE

## 1. Перевірити index

```text
http://127.0.0.1:5500/dev/V02/index.html
```

Має відкриватися.

---

## 2. Перевірити admin

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

Має відкриватися.

---

## 3. Перевірити snapshot

У `admin.html` знайти:

```text
Snapshot File Export
```

Натиснути:

```text
EXPORT SNAPSHOT JSON
DOWNLOAD SNAPSHOT FILE
```

---

## 4. Очікувано

JSON містить:

```text
odin_state
review_decisions
review_to_task_report
unknown_review
unknown_semantic
```
