# ODIN v3.19.2 HEADER LANG HIGHLIGHT FIX

Виправлено після тесту v3.19.1:

1. Меню "Розділи уроку"
- відкривається
- пункти тепер переходять до секцій через smooth scroll
- меню закривається після кліку

2. UA/RU
- меню має UA/RU підписи
- основні заголовки/службові тексти уроку мають UA/RU варіанти
- приклади поки дублюють введені ДП/СД, бо в input немає окремого RU-перекладу

3. 💡 Highlight
- кнопка показує режим:
  💡0 = off
  💡1 = theme
  💡2 = all
- режим 2 тепер видимий:
  - hl-move / hl-place
  - lm-verb
  - lm-noun
  - lm-pronoun

4. Залишено робоче:
- 🏠
- +
- 🔊 audio

Тест:
1. Створити стандартний урок.
2. У Preview перевірити:
   🏠, ☰, 💡0/1/2, +, UA/RU, 🔊
3. Завантажити HTML.
4. Відкрити standalone HTML.
5. Повторити ті самі перевірки.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_19_2.md
git commit -m "v3.19.2 fix lesson menu language and highlight modes"
git push
