# ODIN v3.15 TOPICS SYSTEM

Призначення:
Додати TOPICS layer поверх REVIEW system.

Pipeline:
INPUT → MODE GUARD → ENGINE → HARD QA → UX → HIGHLIGHT → EXPORT → DATA → REVIEW → TOPICS

Що нового:
- Поле "Тема / Topic" при створенні уроку.
- Тема зберігається разом з уроком.
- У Saved Lessons показується topic-pill.
- Фільтр по темах: All Topics + всі збережені теми.
- Topic filter працює разом з REVIEW filter.
- QA перевіряє наявність теми.
- TOPICS_LAYER_READY в логах.

Тест:
1. Створити урок.
2. Зберегти поточний урок.
3. У Saved Lessons має зʼявитись тема.
4. Створити ще один урок з іншою темою.
5. Перевірити фільтр по темах.
6. Перевірити разом:
   - All / NEW / REVIEW / LEARNED
   - Topic filter
7. Перезавантажити сторінку — теми мають зберегтись.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_15.md
git commit -m "v3.15 topics system"
git push
