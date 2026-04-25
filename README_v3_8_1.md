# ODIN v3.8.1 QA SYSTEM 100 — SPLIT VERSION

Файли:
- dev/index.html
- dev/style.css
- dev/app.js

Чому split:
- JavaScript більше не знаходиться всередині HTML як великий inline-блок.
- Це прибирає проблему, коли JS-код випадково показується внизу сторінки.

Тест:
1. Відкрити dev/index.html через Live Server.
2. Натиснути "Створити урок".
3. Очікуваний лог:
   RUNNING
   PLAN_DONE
   PIPELINE_DONE
   LESSON_DONE
   QA_PASSED
   EXPORT_DONE
   DONE
4. Видалити один приклад або словник.
5. Export має блокуватись: EXPORT_BLOCKED.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_8_1.md
git commit -m "v3.8.1 QA system split files"
git push
