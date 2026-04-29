# ODIN V05.2 PRO — REAL LESSON GENERATOR

## 1. ЩО ЦЕ

Це повний пакет V05.2 PRO.

Він переводить ODIN з тестового HTML у перший реальний генератор уроку за структурою DT / ІШ.

---

## 2. ГОЛОВНЕ ПРАВИЛО

НЕ чіпати базу:

C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\ODIN_TREE_PROJECT_v1

Працюємо тільки в робочій папці:

C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V02

---

## 3. КУДИ КЛАСТИ

Розпакувати ВМІСТ пакету прямо сюди:

C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V02

Після розпакування має бути так:

dev\V02
│
├── index.html
├── README.md
├── test_scenario.md
└── src
    ├── lesson_builder.js
    ├── pipeline.js
    ├── execution_bridge.js
    └── control_integration_hook.js

---

## 4. ЩО РОБИТИ

1. Відкрити папку:

C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V02

2. Відкрити файл:

index.html

3. Натиснути кнопку:

Запустити V05.2 PRO

---

## 5. ОЧІКУВАНИЙ РЕЗУЛЬТАТ

На сторінці має зʼявитися урок:

- Ціль уроку
- Основне правило
- Основні приклади уроку
- ДП — дослівний переклад
- СД — смисловий переклад
- Практика
- Домашнє завдання

У статусі має бути:

STATUS: QA_PASSED
QA PASS: true
MISSING: немає

---

## 6. ЩО НЕ ТРЕБА РОБИТИ

Не редагувати index.html вручну.
Не редагувати script-підключення.
Не переносити файли в ODIN_TREE_PROJECT_v1.
Не видаляти папку src.
Не змінювати V04.7.

---

## 7. ВІДКАТ

Якщо потрібно повернутись до V05.1:

1. Замінити вміст dev\V02 на попередній робочий пакет V05.1.
2. Або взяти резервну копію dev\V02, якщо вона була зроблена перед копіюванням.

База ODIN_TREE_PROJECT_v1 не чіпається, тому еталон не пошкоджується.

---

## 8. GIT PUSH

git add dev/V02/
git commit -m "V05.2 PRO real lesson generator"
git push origin dev
