# ODIN v3.17.1 UI LAYOUT + PREVIEW CONTROL FIX

Проблеми v3.17:
1. При натисканні UX/Highlight кнопок блок Status розтягувався вправо, а Lesson Input стискався.
2. UX/Highlight кнопки не впливали на Preview.
3. У Status могли показуватись literal `\n`.

Fix:
- CSS: grid children отримали min-width:0.
- CSS: pre/log/dataLog мають max-width, overflow-wrap:anywhere, word-break.
- JS: log використовує нормальний перенос рядка.
- JS: додано setPreviewHtml(), iframe onload і refreshPreviewControls().
- JS: applyMode/applyHighlightMode чекають готовності iframe і повторюють застосування.

Тест:
1. Відкрити через Live Server.
2. Натиснути "Створити урок через ODIN Pipeline".
3. Натискати:
   - Показати/Сховати ДП
   - Показати/Сховати СД
   - Study Mode
   - Test Mode
   - Full Mode
   - 💡 Лампа: Topic
   - 💡 All Rules
   - Highlight OFF
4. Status не має розтягувати сторінку вправо.
5. Lesson Input не має стискатися.
6. Preview має реагувати на UX/Highlight кнопки.
7. Кнопка "Завантажити урок" має працювати.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_17_1.md
git commit -m "v3.17.1 fix UI layout and preview controls"
git push
