# ODIN v3.8.2 HARD QA SYSTEM

Файли:
- dev/index.html
- dev/style.css
- dev/app.js
- README_v3_8_2.md

Що нового:
- ERROR / WARNING / INFO.
- ERROR блокує export.
- WARNING не блокує export, але показує ризики.
- Мінімум 5 прикладів.
- Мінімум 5 слів у словнику.
- Перевірка ДП / СД.
- Перевірка дублікатів.
- Перевірка обовʼязкових блоків HTML.
- Авто-нормалізація порожніх рядків і пробілів.

Тест:
1. Відкрити dev/index.html через Live Server.
2. Натиснути "Створити урок".
3. Очікуваний лог:
   RUNNING
   PLAN_DONE
   PIPELINE_DONE
   LESSON_DONE
   QA_PASSED або QA_PASSED_WITH_WARNINGS
   EXPORT_DONE
   DONE
4. Видалити 1-2 приклади.
5. Має бути:
   QA_FAILED
   EXPORT_BLOCKED

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_8_2.md
git commit -m "v3.8.2 hard QA system"
git push
