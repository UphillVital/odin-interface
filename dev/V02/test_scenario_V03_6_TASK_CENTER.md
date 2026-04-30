# TEST — ODIN V03.6 TASK CENTER

## Ціль

Перевірити, що admin.html бачить події, які створює index.html.

---

## Крок 1

Відкрити:

```text
http://127.0.0.1:5500/dev/V02/index.html
```

Натиснути:

```text
MODE TEST
```

Очікувано:

```text
RESULT: ENGINE DONE
```

---

## Крок 2

Відкрити:

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

Перевірити блок:

```text
Task Center / Live Status
```

Очікувано:

- Current Mode не порожній
- Current Status не порожній
- Task Count більше 0
- Execution Log показує події

---

## Якщо Task Center порожній

1. Перевірити, що MODE TEST був запущений в index.html.
2. Натиснути REFRESH TASK CENTER.
3. Перевірити, що Live Server відкритий з одного і того самого origin:
   http://127.0.0.1:5500
