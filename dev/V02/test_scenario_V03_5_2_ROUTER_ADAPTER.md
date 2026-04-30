# ТЕСТ V03.5.2 — ROUTER ADAPTER

## Ціль

Перевірити, що MODE запускає існуючий engine через adapter.

---

## Запуск

Відкрити:

http://127.0.0.1:5500/dev/V02/index.html

---

## Крок 1

Натиснути:

MODE TEST

Очікувано:

- modeStatus показує MODE SELECTED
- AUTO SELECT CORE DONE
- CONTENT EXTRACTION DONE
- LESSON GENERATOR DONE
- RESULT: ENGINE DONE

---

## Крок 2

Перевірити:

Extraction Report

має оновитися.

Generated Lesson Preview

має показати HTML урок.

---

## Крок 3

Натиснути:

MODE PRO

Очікувано:

- поле Lesson Task оновиться на PRO-завдання
- engine запуститься
- preview оновиться

---

## Якщо не працює

Перевірити, що у dev\V02 є:

- event_bus.js
- odin_state.js
- mode_registry.js
- odin_router_adapter.js

І що index.html підключає їх після lesson_generator.js.
