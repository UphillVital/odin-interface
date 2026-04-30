# TEST — ODIN V03.7 FILE CONTROL B

## Ціль

Перевірити, що ODIN бачить файли, пропонує зміни і генерує Git-команди.

---

## Запуск

Відкрити:

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

---

## Кроки

1. Знайти блок `File Control B`.
2. Натиснути `REFRESH FILES`.
3. Перевірити Known Files > 0.
4. Вибрати 1 або 2 файли.
5. Натиснути `PROPOSE UPDATE`.
6. Перевірити блок `Proposed Change`.
7. Перевірити блок `Git Commands`.

---

## Очікувано

Git Commands має містити:

```text
git add ...
git commit -m "Update selected ODIN files"
git push origin dev
```

---

## Важливо

`PROPOSE REMOVE` не видаляє файли.

Він тільки формує пропозицію і Git-команди.

Видалення можливе тільки в майбутньому через CONFIRM.
