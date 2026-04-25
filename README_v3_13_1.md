# ODIN v3.13.1 DATA LAYER — INTEGRATED

Призначення:
Правильна інтеграція DATA layer у реальний pipeline v3.12.

Pipeline:
INPUT → MODE GUARD → ENGINE → HARD QA → UX CONTROL → HIGHLIGHT → EXPORT → DATA

Що нового:
- Збереження реального HTML уроку після QA.
- Збереження model + qaStatus.
- Кнопка "💾 Зберегти поточний урок".
- Панель "📚 Saved Lessons".
- Відкрити збережений урок назад у Preview.
- Export збереженого уроку.
- Видалити урок.
- Очистити всі уроки.
- SAVE блокується, якщо урок не створений або QA не пройдений.

Тест:
1. Відкрити dev/index.html через Live Server.
2. Натиснути "Створити урок через ODIN Pipeline".
3. Очікувано:
   MODE_GUARD_PASSED
   LESSON_DONE
   QA_PASSED або QA_PASSED_WITH_WARNINGS
   EXPORT_DONE
   DATA_LAYER_READY
   DONE
4. Натиснути "💾 Зберегти поточний урок".
5. У Saved Lessons має зʼявитись урок.
6. Натиснути "Відкрити" — урок має повернутись у Preview.
7. Натиснути "Export" — має зʼявитись кнопка завантаження.
8. Натиснути "Видалити" — урок має зникнути.
9. Перезавантажити сторінку — збережені уроки мають залишитись.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_13_1.md
git commit -m "v3.13.1 integrated data layer"
git push
