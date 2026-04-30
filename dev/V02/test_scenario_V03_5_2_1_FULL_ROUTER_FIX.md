# TEST — ODIN V03.5.2.1 FULL ROUTER FIX

## Ціль

Перевірити, що Router Adapter бачить `ODIN_SMART_ROUTER`.

---

## Запуск

Відкрити:

```text
http://127.0.0.1:5500/dev/V02/index.html
```

---

## Крок

Натиснути:

```text
MODE TEST
```

---

## Очікувано

Не має бути:

```text
ERROR: ODIN_SMART_ROUTER not found
```

Має бути:

```text
MODE SELECTED: MODE TEST
INPUT UPDATED: MODE_TEST
AUTO SELECT CORE: DONE
CONTENT EXTRACTION: DONE
LESSON GENERATOR: DONE
RESULT: ENGINE DONE
```

---

## Додаткова перевірка

Відкрити консоль браузера.

Має бути повідомлення:

```text
[ODIN V03.5.2.1] Router globals exposed
```

і значення:

```text
ODIN_SMART_ROUTER: true
autoSelect: true
```
