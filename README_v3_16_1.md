# ODIN v3.16.1 PROGRESSION PARSE FIX

Проблема v3.16:
- QA показував:
  ERROR: Потрібно мінімум 5 прикладів.
  ERROR: Потрібно мінімум 5 слів у словнику.
- Хоча в textarea приклади і словник були.
- Причина: parseRows розділяв текст по literal `\n`, а не по реальних нових рядках.

Fix:
- parseRows тепер правильно читає реальні нові рядки через /\n+/.
- Після створення уроку має бути QA_PASSED або QA_PASSED_WITH_WARNINGS.
- Після цього кнопка "💾 Зберегти поточний урок" має працювати.

Тест:
1. Замінити dev/index.html, dev/style.css, dev/app.js.
2. Відкрити через Live Server.
3. Перевірити Data Status:
   PARSER_FIX_ACTIVE
   APP_READY_v3.16.1_PARSE_FIX
4. Натиснути "Створити урок через ODIN Pipeline".
5. Очікувано:
   QA_PASSED або QA_PASSED_WITH_WARNINGS
   EXPORT_DONE
   PROGRESSION_LAYER_READY_PARSE_FIXED
   DONE
6. Натиснути "💾 Зберегти поточний урок".
7. У Saved Lessons має зʼявитись урок.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_16_1.md
git commit -m "v3.16.1 fix progression parser"
git push
