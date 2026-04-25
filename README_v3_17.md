# ODIN v3.17 SMART REVIEW

Pipeline:
INPUT → MODE GUARD → ENGINE → HARD QA → UX → HIGHLIGHT → EXPORT → DATA → REVIEW → TOPICS → PROGRESSION → SMART REVIEW

Що нового:
- Кнопка: "Що мені вчити зараз?"
- Алгоритм пріоритетів:
  - NEW має високий пріоритет
  - REVIEW має високий пріоритет
  - LEARNED має середній пріоритет
  - MASTERED має низький пріоритет
  - уроки без повторень піднімаються вище
  - уроки, які давно не повторювались, піднімаються вище
- Показує ТОП-5 уроків для повторення.
- Кнопка "Відкрити" прямо зі Smart Review.
- Кнопка "Auto Progress після повторення".

Тест:
1. Створити і зберегти кілька уроків.
2. Змінити їм статуси NEW / REVIEW / LEARNED / MASTERED.
3. Натиснути "Що мені вчити зараз?"
4. Має зʼявитись список пріоритетів.
5. Відкрити урок зі Smart Review.
6. Натиснути Auto Progress.
7. Перевірити, що статус/лічильник оновились.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_17.md
git commit -m "v3.17 smart review system"
git push
