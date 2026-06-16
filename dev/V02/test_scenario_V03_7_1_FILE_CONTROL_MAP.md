# TEST — ODIN V03.7.1 FILE CONTROL MAP

## Ціль

Перевірити, що ODIN будує view-only карту взаємодії файлів.

---

## Запуск

Відкрити:

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

---

## Кроки

1. Знайти блок `File Control Map`.
2. Натиснути `REFRESH MAP`.
3. Перевірити:
   - Total Files > 0
   - Mapped > 0
   - Interaction Map не порожня
4. Перевірити `Unmapped / Needs Review`.

---

## Очікувано

Карта має містити групи:

```text
Lesson Runtime UI
Admin / Control Center
State + Events
Mode → Engine Bridge
Lesson Engine
Tree + File View
QA + Export
Docs / Status / Package History
```
