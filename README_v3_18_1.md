# ODIN v3.18.1 INTERNAL LESSON LAMP FIX

Проблема v3.18:
- У Preview зовнішні кнопки Language: Topic / All Rules / OFF працювали.
- У самому створеному/export/saved уроці блок "💡 Мовна підсвітка" був, але кнопки Topic / All Rules / OFF могли бути неактивні.
- Причина: внутрішній script уроку був занадто складно екранований у buildLesson.

Fix:
- Внутрішній lesson script переписаний як простий template string.
- Він живе прямо всередині HTML уроку.
- Він не залежить від ODIN shell.
- Кнопки всередині уроку:
  - Topic
  - All Rules
  - OFF
  працюють і в Preview, і в Saved Lesson, і в Export HTML.

Тест:
1. Створити урок через ODIN Pipeline.
2. У Preview натиснути Language: All Rules — працює.
3. У самому Preview в блоці "💡 Мовна підсвітка" натиснути:
   - Topic
   - All Rules
   - OFF
4. Зберегти урок.
5. Відкрити збережений урок.
6. У збереженому уроці кнопки Topic / All Rules / OFF мають працювати.
7. Завантажити урок.
8. Відкрити HTML окремо в браузері.
9. У окремому HTML кнопки Topic / All Rules / OFF мають працювати.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_18_1.md
git commit -m "v3.18.1 fix internal lesson lamp buttons"
git push
