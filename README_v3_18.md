# ODIN v3.18 LANGUAGE HIGHLIGHT CORE

Архітектурне рішення:
Розділено 2 різні системи:

1. TEMPLATE HIGHLIGHT
   - підсвітка UI, блоків, статусів, оболонки ODIN

2. LANGUAGE HIGHLIGHT
   - підсвітка німецького тексту всередині самого уроку

Ключове правило:
LANGUAGE HIGHLIGHT живе всередині lesson HTML, а не тільки в ODIN shell.

Що нового:
- Німецький текст генерується одразу з:
  - dt-lang-token
  - dt-lang-topic
  - dt-lang-subject
  - dt-lang-verb
- У самому уроці є власний блок:
  💡 Мовна підсвітка
  Topic / All Rules / OFF
- Export HTML відкривається з підсвіткою.
- Saved Lesson відкривається з підсвіткою.
- Preview використовує ту саму внутрішню мовну підсвітку.
- QA перевіряє наявність мовних токенів і внутрішніх кнопок.

Тест:
1. Створити урок через ODIN Pipeline.
2. У Preview має бути мовна підсвітка Topic.
3. Натиснути Language: All Rules — мають підсвітитись підмет, дієслово, частка.
4. Натиснути Language Highlight OFF — підсвітка зникає.
5. Зберегти урок.
6. Відкрити збережений урок — підсвітка має бути всередині уроку.
7. Завантажити урок.
8. Відкрити HTML окремо — підсвітка і кнопки Topic / All Rules / OFF мають працювати.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_18.md
git commit -m "v3.18 language highlight core"
git push
