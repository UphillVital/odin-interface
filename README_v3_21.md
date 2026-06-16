# ODIN v3.21 FULL INTEGRATION

Інтегровано:
- DT_LESSON_STANDARD_v1
- TRANSLATION_STANDARD_v2
- HIGHLIGHT_STANDARD_CORE_v1
- LANGUAGE_MARKUP_STANDARD_v1
- QA_STANDARD_v1

Що нового:
- Поля Title UA / RU.
- Поля Goal UA / RU.
- Examples: DE | Literal UA | Semantic UA | Literal RU | Semantic RU.
- Vocabulary: DE | UA | RU.
- Output використовує body[data-ui-lang] + data-i18n + data-lang.
- Без autoRu fallback для введених даних.
- Highlight: data-hl-mode off/theme/all.
- Markup: lm-word + data-lemma + data-pos.
- Audio: data-tts + speechSynthesis de-DE.
- QA блокує export при ERROR.
- Standalone HTML має працювати автономно.

Тест:
1. Відкрити dev/index.html через Live Server.
2. Натиснути "Створити інтегрований урок".
3. Перевірити QA_PASSED або QA_PASSED_WITH_WARNINGS.
4. У Preview:
   - UA / RU
   - ДП toggle
   - 💡0 / 💡1 / 💡2
   - ☰ меню всередині уроку
   - 🔊 audio
5. Завантажити урок.
6. Відкрити HTML окремо і повторити тест.
7. Зберегти урок і відкрити Saved Lesson.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_21.md
git commit -m "v3.21 full integration"
git push
