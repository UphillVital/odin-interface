# ODIN v3.19.1 STANDARD ENGINE SCRIPT FIX

Проблема v3.19:
- Урок генерувався.
- Але в standalone/export уроці не працювали кнопки шапки:
  🏠, ☰, 💡, +, UA
- Не працювала озвучка 🔊.

Причина:
- Внутрішній script у згенерованому HTML міг не закриватися як справжній </script>.
- Через це JavaScript уроку не запускався.
- Текст уроку був, але керування було “мертве”.

Fix:
- Внутрішній lesson script тепер закривається коректним </script>.
- Додано marker:
  window.DT_STANDARD_LESSON_READY = true
- Кнопки шапки й audio мають працювати в:
  Preview
  Saved Lesson
  Export HTML
  Standalone HTML

Тест:
1. Замінити dev/index.html dev/style.css dev/app.js.
2. Відкрити через Live Server.
3. Натиснути "Створити стандартний урок".
4. У Preview перевірити кнопки всередині уроку:
   🏠, ☰, 💡, +, UA, 🔊
5. Натиснути "Завантажити стандартний урок".
6. Відкрити HTML окремо.
7. Повторити перевірку:
   🏠, ☰, 💡, +, UA, 🔊
8. Очікувано:
   усі кнопки працюють.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_19_1.md
git commit -m "v3.19.1 fix standard lesson script"
git push
