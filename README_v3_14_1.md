# ODIN v3.14.1 REVIEW SYSTEM FIX

Проблема v3.14:
- Головні кнопки могли не спрацьовувати через ризикову генерацію inline onclick у review list.

Fix:
- Всі дії списку уроків переведені на data-action.
- Додано один event listener на #lessonsList.
- Статичні кнопки підключені через bindStaticButtons().
- При старті має зʼявлятися DATA log: APP_READY_v3.14.1.

Тест:
1. Замінити dev/index.html, dev/style.css, dev/app.js.
2. Відкрити через Live Server.
3. Перевірити DATA log: APP_READY_v3.14.1.
4. Натиснути "Створити урок через ODIN Pipeline".
5. Очікувано:
   RUNNING
   MODE_GUARD_PASSED
   LESSON_DONE
   QA_PASSED або QA_PASSED_WITH_WARNINGS
   EXPORT_DONE
   REVIEW_LAYER_READY
   DONE
6. Натиснути "💾 Зберегти поточний урок".
7. Перевірити NEW / REVIEW / LEARNED.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_14_1.md
git commit -m "v3.14.1 fix review system buttons"
git push
