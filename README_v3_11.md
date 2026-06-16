# ODIN v3.11 UX CONTROL LAYER

Призначення:
Додати UX-рівень поверх v3.10 без руйнування pipeline.

Pipeline:
INPUT → MODE GUARD → ENGINE → HARD QA → UX CONTROL → EXPORT

Що нового:
- Study Mode: DE + СД.
- Test Mode: тільки DE.
- Full Mode: DE + ДП + СД.
- Глобальні кнопки ДП/СД.
- Локальний toggle в кожному прикладі всередині preview.
- UX_CONTROL_READY в логах.

Тест:
1. Відкрити dev/index.html через Live Server.
2. Натиснути "Створити урок через ODIN Pipeline".
3. Очікувано:
   MODE_GUARD_PASSED
   LESSON_DONE
   QA_PASSED або QA_PASSED_WITH_WARNINGS
   EXPORT_DONE
   UX_CONTROL_READY
   DONE
4. Перевірити:
   - Показати/Сховати ДП
   - Показати/Сховати СД
   - Study Mode
   - Test Mode
   - Full Mode
   - локальний toggle у кожному прикладі preview
5. Перевірити export.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_11.md
git commit -m "v3.11 UX control layer"
git push
