# ТЕСТ V03.5.1 — ODIN STATE + EVENT BUS

## Передумова

Live Server запущено з кореня репозиторію:

C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface

---

## Запуск

Відкрити:

http://127.0.0.1:5500/dev/V02/admin.html

---

## Кроки

1. Натиснути CREATE DEFAULT PROJECT
2. Натиснути TEST EVENT
3. Перевірити блок ODIN Core State

---

## Очікувано

Active Project:

ODIN Main Project

Project Count:

1

System Status:

QA_PASSED

Stage:

PLAN

У JSON видно:

- active_project_id
- projects
- system
- logs
- unknown_files

---

## Якщо щось не працює

Перевірити, що в dev\V02 є:

- event_bus.js
- odin_state.js
- odin_state_bridge.js

І що admin.html підключає ці файли перед app.js.
