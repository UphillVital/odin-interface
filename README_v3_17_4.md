# ODIN v3.17.4 EXPORT LAMP EMBED

Проблема:
- У головному ODIN Preview підсвітка працювала.
- Але в створеному/збереженому/export уроці підсвітка не працювала після відкриття як окремого HTML.
- Причина: highlight engine був у головній оболонці ODIN, але не був вшитий у HTML самого уроку.

Fix:
- У generated lesson HTML додано власний embedded lamp engine.
- У самому уроці тепер є блок:
  💡 Підсвітка в уроці
  - Topic
  - All Rules
  - OFF
- При відкритті окремого HTML уроку Topic highlight вмикається автоматично.
- Кнопки підсвітки працюють всередині export/saved lesson.

Тест:
1. Створити урок через ODIN Pipeline.
2. Перевірити Preview.
3. Натиснути "Завантажити урок".
4. Відкрити завантажений HTML окремо.
5. Очікувано:
   - Topic highlight видно одразу.
   - У самому уроці є кнопки Topic / All Rules / OFF.
   - All Rules підсвічує підмет + дієслово + частку.
   - OFF прибирає підсвітку.
6. Зберегти урок у Saved Lessons.
7. Відкрити збережений урок.
8. Підсвітка має бути в самому уроці.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_17_4.md
git commit -m "v3.17.4 embed lamp in exported lessons"
git push
