# ODIN v3.14 REVIEW SYSTEM

Призначення:
Додати REVIEW layer поверх DATA layer.

Pipeline:
INPUT → MODE GUARD → ENGINE → HARD QA → UX → HIGHLIGHT → EXPORT → DATA → REVIEW

Що нового:
- Статуси уроку: NEW / REVIEW / LEARNED.
- Фільтри: All / NEW / REVIEW / LEARNED.
- Кнопки для кожного збереженого уроку:
  - Відкрити
  - Export
  - Повторити
  - Вивчено
  - Новий
  - Видалити
- reviewCount і lastReviewed.
- REVIEW_LAYER_READY в логах.

Тест:
1. Створити урок.
2. Зберегти поточний урок.
3. У Saved Lessons має зʼявитись статус NEW.
4. Натиснути "Повторити" → статус REVIEW.
5. Натиснути "Вивчено" → статус LEARNED.
6. Перевірити фільтри.
7. Перезавантажити сторінку — статуси мають зберегтись.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_14.md
git commit -m "v3.14 review system"
git push
