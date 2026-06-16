# ODIN v3.19.4 HERO RU FIX

Точковий фікс після v3.19.3:

Проблема:
- Перший Hero-блок під меню:
  "ODIN / DT УРОК-СТАНДАРТ ..."
  мав текст тільки українською при перемиканні RU.

Fix:
- Hero label обгорнуто в inline-lang ua/ru.
- Goal text у Hero має UA/RU fallback.
- Повтор goal у блоці "Що вивчаємо" також має UA/RU fallback.

Тест:
1. Створити стандартний урок.
2. Натиснути UA/RU.
3. Перевірити перший блок під меню.
4. Інші робочі частини не змінювались.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_19_4.md
git commit -m "v3.19.4 fix hero ru text"
git push
