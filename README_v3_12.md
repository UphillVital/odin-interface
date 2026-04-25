# ODIN v3.12 GRAMMAR HIGHLIGHT SYSTEM — ЛАМПА

Призначення:
Додати grammar highlight layer поверх v3.11 UX без руйнування pipeline.

Pipeline:
INPUT → MODE GUARD → ENGINE → HARD QA → UX CONTROL → HIGHLIGHT → EXPORT

Що нового:
- 💡 Лампа: Topic — підсвічує головну тему уроку.
- 💡 All Rules — підсвічує тему + підмет + дієслово.
- Highlight OFF — вимикає підсвітку.
- Study Mode автоматично вмикає Topic highlight.
- Test Mode ховає переклади і вимикає highlight.
- Full Mode показує все і вмикає All Rules.
- QA перевіряє наявність highlight markup.

Тест:
1. Відкрити dev/index.html через Live Server.
2. Натиснути "Створити урок через ODIN Pipeline".
3. Очікувано:
   MODE_GUARD_PASSED
   LESSON_DONE
   QA_PASSED або QA_PASSED_WITH_WARNINGS
   EXPORT_DONE
   HIGHLIGHT_LAYER_READY
   DONE
4. Перевірити:
   - 💡 Лампа: Topic
   - 💡 All Rules
   - Highlight OFF
   - Study Mode
   - Test Mode
   - Full Mode
   - локальний toggle у кожному прикладі Preview
5. Перевірити export.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_12.md
git commit -m "v3.12 grammar highlight lamp"
git push
