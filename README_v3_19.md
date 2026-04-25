# ODIN v3.19 STANDARD ENGINE

Призначення:
ODIN починає генерувати урок через DT_LESSON_STANDARD_v1.

Standard Stack:
- HIGHLIGHT_STANDARD_CORE_v1
- LESSON_TEMPLATE_STANDARD_v1
- LANGUAGE_MARKUP_STANDARD_v1
- QA_STANDARD_v1

Що нового:
- Генерація standalone HTML уроку.
- Header + menu + highlight + literal + lang toggle.
- body[data-hl-mode="off/theme/all"].
- lm-word + data-lemma + data-pos.
- data-tts + speechSynthesis de-DE.
- QA gate.
- EXPORT_BLOCKED при QA_FAILED.
- Save дозволено тільки після QA passed.
- Preview / Saved / Export / Standalone мають працювати однаково.

Тест:
1. Відкрити dev/index.html через Live Server.
2. Натиснути "Створити стандартний урок".
3. Перевірити Status:
   - STANDARD_STACK_LOADED
   - LESSON_DONE
   - QA_PASSED або QA_PASSED_WITH_WARNINGS
   - EXPORT_READY
   - STANDARD_ENGINE_DONE
4. Перевірити Preview:
   - 💡 OFF
   - 💡 THEME
   - 💡 ALL
   - ДП toggle
   - аудіо 🔊 всередині уроку
   - меню ☰ всередині уроку
5. Завантажити урок.
6. Відкрити HTML окремо.
7. Перевірити автономність.
8. Зберегти урок.
9. Відкрити збережений урок.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_19.md
git commit -m "v3.19 standard engine"
git push
