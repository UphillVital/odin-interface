# ODIN v3.16 PROGRESSION SYSTEM

Pipeline:
INPUT → MODE GUARD → ENGINE → HARD QA → UX → HIGHLIGHT → EXPORT → DATA → REVIEW → TOPICS → PROGRESSION

Що нового:
- Поле рівня: A1 / A1-A2 / A2 / B1 / B2.
- Рівень зберігається в DATA.
- Фільтр по рівню.
- Новий статус MASTERED.
- Auto Progress:
  NEW → REVIEW
  REVIEW → LEARNED після повторень
  LEARNED → MASTERED після повторень
- Progress by Topic у відсотках.

Тест:
1. Створити урок.
2. Зберегти.
3. Перевірити level-pill.
4. Перевірити фільтр по рівню.
5. Натискати Auto Progress.
6. Перевірити NEW / REVIEW / LEARNED / MASTERED.
7. Перевірити Progress by Topic.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_16.md
git commit -m "v3.16 progression system"
git push
