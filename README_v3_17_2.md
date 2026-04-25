# ODIN v3.17.2 LAMP FIX

Проблема v3.17.1:
- Працювали UX-кнопки.
- Але кнопки:
  - 💡 Лампа: Topic
  - 💡 All Rules
  не давали видимого ефекту в Preview.

Fix:
- applyHighlightMode переведено на direct iframe styling fallback.
- Тепер лампа не залежить тільки від CSS class на body.
- TOPIC напряму підсвічує .hl-topic.
- ALL напряму підсвічує .hl-topic + .hl-subject + .hl-verb.
- OFF напряму очищує стилі.

Тест:
1. Відкрити через Live Server.
2. Натиснути "Створити урок через ODIN Pipeline".
3. Натиснути:
   - 💡 Лампа: Topic
   - 💡 All Rules
   - Highlight OFF
4. Очікувано:
   - Topic підсвічує відокремлювані частки.
   - All Rules додає підмет/дієслово/частку.
   - OFF прибирає підсвітку.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_17_2.md
git commit -m "v3.17.2 fix grammar highlight lamp"
git push
