# ODIN v3.17.3 LAMP ENGINE REBUILD

Проблема:
- Кнопки 💡 Лампа: Topic / 💡 All Rules писали статус, але текст у Preview не підсвічувався.
- Значить функція викликалась, але Preview не мав стабільних token-маркерів для підсвітки.

Fix:
- Лампа більше не залежить від попередньої розмітки.
- При натисканні вона сама сканує `.de` речення в iframe Preview.
- Розбиває текст на слова.
- Створює нові span-маркери:
  - lamp-topic
  - lamp-subject
  - lamp-verb
- Після цього напряму задає inline стилі.
- OFF очищує inline стилі.
- Кнопки перепідключені через onclick override після завантаження DOM.

Тест:
1. Відкрити через Live Server.
2. Натиснути "Створити урок через ODIN Pipeline".
3. Натиснути 💡 Лампа: Topic.
   Очікувано: підсвітяться відокремлювані частки: auf / zu / ein / an.
4. Натиснути 💡 All Rules.
   Очікувано: підсвітяться підмети + дієслова + частки.
5. Натиснути Highlight OFF.
   Очікувано: підсвітка зникне.
6. У Status має бути:
   LAMP_TOPIC_MODE_FIXED_v3.17.3 tokens:...
   LAMP_ALL_RULES_MODE_FIXED_v3.17.3 tokens:...

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_17_3.md
git commit -m "v3.17.3 rebuild lamp highlight engine"
git push
