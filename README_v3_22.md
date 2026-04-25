# ODIN v3.22 MARKUP ACCURACY ENGINE

Що нового:
- Граматичний словник GRAMMAR_DB.
- Точніші мітки:
  - data-lemma
  - data-pos
  - data-verb-type
  - data-tense
  - data-person
  - data-number
  - data-gender
  - data-case
  - data-role
  - data-question
  - data-governs-case
  - data-accuracy
- Статистика:
  - words
  - uniqueLemmas
  - verbs
  - modalVerbs
  - separableVerbs
  - nouns
  - masculine/feminine/neuter
  - dativ/akkusativ
  - exact/unknown
- QA перевіряє точність розмітки.
- У Saved Lessons видно words/lemmas.

Тест:
1. Відкрити dev/index.html через Live Server.
2. Натиснути "Створити урок з точними мітками".
3. Перевірити Markup Stats.
4. Перевірити QA.
5. У Preview перевірити:
   - UA/RU
   - 💡0/1/2
   - audio
   - меню
6. Завантажити standalone HTML і повторити тест.
7. Зберегти урок.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_22.md
git commit -m "v3.22 markup accuracy engine"
git push

Або через release:
.\scripts\release.ps1 minor -Message "v3.22 markup accuracy engine"
