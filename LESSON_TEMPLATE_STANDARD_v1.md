# LESSON_TEMPLATE_STANDARD_v1

## 0. Статус

Цей документ фіксує єдиний стандарт HTML-уроку Deutsch Trainer для:

- ІССУ
- ССУДТ
- ODIN
- standalone HTML lesson
- future Deutsch Trainer platform

Документ повинен працювати разом з:

```text
HIGHLIGHT_STANDARD_CORE_v1.md
AUDIO_STANDARD_v1.md
HEADER_CONTROL_STANDARD_v1.md
TRANSLATION_STANDARD_v1.md
EXPORT_STANDALONE_STANDARD_v1.md
```

---

## 1. СОН-рішення

Урок має бути не просто HTML-сторінкою, а автономним навчальним продуктом.

Це означає:

```text
Preview = Saved Lesson = Export HTML = Standalone HTML
```

У всіх режимах урок повинен:

- відкриватися без ODIN shell
- мати власну шапку
- мати меню розділів
- мати власну підсвітку
- мати власну озвучку
- мати власний переклад
- мати власні кнопки керування
- не залежати від зовнішнього JavaScript ODIN

---

## 2. Головна структура HTML

Кожен урок повинен мати структуру:

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>...</title>
  <style>
    /* full standalone CSS */
  </style>
</head>

<body class="show-literal" data-hl-mode="off" data-lang="ua">
  <header class="topbar">...</header>

  <div class="modal" id="navModal">...</div>

  <main class="wrap">
    ...
  </main>

  <script>
    /* full standalone JS */
  </script>
</body>
</html>
```

Обовʼязково:

```text
CSS всередині HTML
JS всередині HTML
жодних зовнішніх залежностей
```

---

## 3. Body attributes

Обовʼязкові атрибути:

```html
<body class="show-literal" data-hl-mode="off" data-lang="ua">
```

### `class="show-literal"`

Керує видимістю дослівного перекладу.

### `data-hl-mode`

Керує мовною підсвіткою.

Дозволені значення:

```text
off
theme
all
```

### `data-lang`

Керує мовою інтерфейсу / перекладу.

Дозволені значення v1:

```text
ua
ru
```

Майбутнє розширення:

```text
ua-de
ru-de
en-de
```

---

## 4. Header Standard

Кожен урок має sticky header:

```html
<header class="topbar">
  <div class="topbar-inner">
    <div class="brand">...</div>

    <div class="center-actions">
      <button class="btn" id="homeBtn" title="Додому">🏠</button>
      <button class="btn" id="menuBtn" title="Меню">☰</button>
      <button class="btn" id="glowToggle" title="Підсвітка">💡</button>
      <button class="btn" id="literalToggle" title="Дослівний">+</button>
      <button class="btn" id="langToggle" title="UA / RU">UA</button>
    </div>

    <div></div>
  </div>
</header>
```

### Обовʼязкові кнопки

```text
🏠 homeBtn       → повернення нагору
☰ menuBtn       → меню розділів
💡 glowToggle   → off/theme/all
+ literalToggle → показ/сховати дослівний переклад
UA langToggle   → UA/RU або майбутній режим перекладу
```

---

## 5. Menu Standard

Кожен урок має модальне меню розділів:

```html
<div class="modal" id="navModal">
  <div class="panel compact">
    <div class="panel-head">
      <div class="panel-title">Розділи уроку</div>
      <button class="close-btn" id="closeNav">✕</button>
    </div>

    <div class="nav-list">
      <a class="nav-item" href="#summary">1. Суть теми</a>
      ...
    </div>
  </div>
</div>
```

Правило:

```text
кожен пункт меню веде до реального id секції
після кліку меню закривається
header не перекриває секцію
```

Для цього в CSS:

```css
[id] {
  scroll-margin-top: 84px;
}
```

---

## 6. Базовий порядок блоків уроку

Рекомендований порядок v1:

```text
0. Hero / тема уроку
1. Суть теми
2. Основні приклади
3. Розбір і значення
4. Правило
5. Швидка карта-шпаргалка
6. Питання → відповіді
7. Додаткові приклади
8. Діалоги
9. Словник
10. Конструкції
11. Не плутай
12. Мікродрил
13. Після уроку ти маєш зрозуміти
14. Практика голосом
15. Розширення теми
16. Домашнє завдання
```

Цей порядок може розширюватись, але не ламатись.

---

## 7. Hero block

Hero має містити:

```text
- system label
- title
- topic focus
- level
- short lesson purpose
- 2–4 learning goals
```

Приклад:

```html
<section class="hero" id="top">
  <div class="su">ODIN / DT LESSON / FULL PACKAGE</div>
  <h1>Wo? / Wohin?</h1>
  <div class="theme-text">A1 → A2 · Місце і напрямок</div>
  <p>...</p>

  <div class="goal">
    <div>...</div>
    <div>...</div>
    <div>...</div>
  </div>
</section>
```

---

## 8. Section block standard

Кожна секція:

```html
<section class="card" id="summary">
  <div class="section-head">
    <span class="sec-num">1</span>
    <h2>Суть теми</h2>
  </div>

  ...
</section>
```

Правило:

```text
id обовʼязковий
section-head обовʼязковий
sec-num обовʼязковий
h2 обовʼязковий
```

---

## 9. German sentence standard

Кожне німецьке речення:

```html
<div class="de">
  Ich bin <span class="hl-place">in der</span> Stadt.
  <button class="audio-mini" data-tts="Ich bin in der Stadt.">🔊</button>
</div>
```

Правила:

```text
.de = контейнер мови, що вивчається
data-tts = чистий німецький текст без HTML
highlight spans = всередині .de
audio button = поруч з німецьким реченням
```

---

## 10. Translation standard

Для навчальних прикладів бажано:

```html
<div class="literal">Дослівно: Я є в місті.</div>
<div class="translation">Я в місті.</div>
```

Якщо є UA/RU:

```html
<div class="literal">
  <span class="inline-lang ua">Дослівно: ...</span>
  <span class="inline-lang ru">Дословно: ...</span>
</div>

<div class="translation">
  <span class="inline-lang ua">...</span>
  <span class="inline-lang ru">...</span>
</div>
```

---

## 11. Highlight standard link

Урок має використовувати тільки HIGHLIGHT_STANDARD_CORE:

```text
body[data-hl-mode]
hl-topic
hl-place
hl-move
hl-case
```

Заборонено:

```text
dt-lang-topic-mode
dt-lang-all-mode
dt-lang-off
JS-generated highlight як основа
```

---

## 12. Audio standard link

Кожен важливий німецький приклад, діалог, слово в словнику може мати:

```html
<button class="audio-mini" data-tts="...">🔊</button>
```

Озвучка:

```text
speechSynthesis
lang = de-DE
rate = 0.95
```

---

## 13. Vocabulary block standard

Словник має бути структурований колонками:

```html
<section class="card" id="vocab">
  <div class="section-head">
    <span class="sec-num">9</span>
    <h2>Словник</h2>
  </div>

  <div class="vocab-columns">
    <div class="subcard">
      <div class="vocab-line">
        <span class="vocab-word">die Stadt</span> —
        місто
        <button class="audio-mini" data-tts="die Stadt">🔊</button>
      </div>
    </div>
  </div>
</section>
```

Правило:

```text
кожне слово має DE
кожне слово має переклад
кожне слово може мати audio
```

---

## 14. Dialog block standard

Діалог:

```html
<div class="dialog-row">
  <div class="de">
    A: Entschuldigung, wo ist die Post?
    <button class="audio-mini" data-tts="Entschuldigung, wo ist die Post?">🔊</button>
  </div>
  <div class="translation">...</div>
</div>
```

Правило:

```text
speaker marker може бути частиною .de
data-tts не повинен містити A: / B:, якщо це заважає природній озвучці
```

---

## 15. Practice / homework standard

Кожен урок має мати:

```text
Практика голосом
Мікродрил
Домашнє завдання
Після уроку ти маєш зрозуміти
```

Це обовʼязкові блоки для навчальної цінності.

---

## 16. CSS layout standard

Базові класи:

```text
topbar
topbar-inner
brand
center-actions
btn
wrap
hero
card
section-head
sec-num
grid
subcard
sentence
example
dialog-row
de
literal
translation
audio-mini
modal
panel
nav-list
nav-item
```

Заборонено робити нову систему класів без потреби.

---

## 17. JS standard

Урок має мати мінімальний standalone JS:

```text
homeBtn
menuBtn
closeNav
literalToggle
glowToggle
langToggle
speechSynthesis audio
```

JS не повинен бути залежним від ODIN.

---

## 18. QA критерії

Урок проходить TEMPLATE QA, якщо:

```text
1. Є header
2. Є menu modal
3. Є glowToggle
4. Є literalToggle
5. Є langToggle або майбутній translation toggle
6. Є data-hl-mode
7. Є show-literal logic
8. Є speechSynthesis або audio layer
9. Є мінімум 10 структурованих секцій
10. Є словник
11. Є практика голосом
12. Є домашнє завдання
13. Export HTML відкривається автономно
14. Saved Lesson = Export Lesson = Preview
```

---

## 19. Заборонено

```text
- генерувати урок без header
- генерувати урок без меню
- робити підсвітку тільки в Preview
- робити озвучку тільки через зовнішню систему
- робити урок залежним від ODIN shell
- змішувати різні highlight systems
- видаляти обовʼязкові блоки без спеціального рішення
```

---

## 20. СОН-фіксація

LESSON_TEMPLATE_STANDARD_v1 є базовим стандартом форми уроку.

Він не замінює:

```text
HIGHLIGHT_STANDARD_CORE
AUDIO_STANDARD
TRANSLATION_STANDARD
HEADER_CONTROL_STANDARD
```

Він збирає їх у єдину структуру.

---

## 21. Наступний крок

Після цього потрібно створити:

```text
AUDIO_STANDARD_v1.md
HEADER_CONTROL_STANDARD_v1.md
TRANSLATION_STANDARD_v1.md
EXPORT_STANDALONE_STANDARD_v1.md
```

Після створення цих файлів можна зібрати:

```text
DT_LESSON_STANDARD_v1
```
