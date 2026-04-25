# HIGHLIGHT_STANDARD_CORE_v1

## 0. Статус

Єдиний стандарт підсвітки для ІССУ, ССУДТ, ODIN, standalone HTML lesson і майбутньої платформи Deutsch Trainer.

База:
- Lesson_Wo_Wohin_Stadt_A1_PRO_v5_FULL_MENU_FIXED.html
- ODIN v3.18.2 standalone highlight stability

---

## 1. СОН-висновок

Підсвітка має бути розділена:

### TEMPLATE HIGHLIGHT
Підсвітка інтерфейсу: кнопки, активні режими, блоки, статуси, оболонка ODIN / Lesson Shell.

### LANGUAGE HIGHLIGHT
Підсвітка мови, що вивчається: слова, конструкції, відмінки, рух/місце, тема уроку, граматичні ролі.

Правило:

> TEMPLATE HIGHLIGHT не змішувати з LANGUAGE HIGHLIGHT.

---

## 2. Єдиний механізм керування

Стандарт:

```html
<body data-hl-mode="off">
<body data-hl-mode="theme">
<body data-hl-mode="all">
```

JS не малює підсвітку. JS тільки перемикає стан.

```js
body.dataset.hlMode = "off";
body.dataset.hlMode = "theme";
body.dataset.hlMode = "all";
```

CSS керує результатом.

---

## 3. Три режими кнопки 💡

### 0 — OFF

```text
data-hl-mode="off"
```

Уся мовна підсвітка вимкнена.

### 1 — THEME

```text
data-hl-mode="theme"
```

Підсвічуються тільки слова / конструкції теми уроку.

### 2 — ALL

```text
data-hl-mode="all"
```

Підсвічуються всі правила, позначені в прикладі.

---

## 4. Обовʼязкові класи v1

```text
hl-topic  = головна тема уроку
hl-place  = місце / стан / Wo?
hl-move   = напрямок / рух / Wohin?
hl-case   = відмінок / граматична форма
```

Приклади:

```html
Ich bin <span class="hl-place">in der</span> Stadt.
Ich gehe <span class="hl-move">in die</span> Stadt.
<span class="hl-case">Dativ</span>
<span class="hl-topic">bei / zu / zum / zur</span>
```

---

## 5. CSS-стандарт v1

```css
.hl-topic,
.hl-case,
.hl-move,
.hl-place {
  border-radius: 6px;
  padding: 0 4px;
}

body[data-hl-mode="off"] .hl-topic,
body[data-hl-mode="off"] .hl-case,
body[data-hl-mode="off"] .hl-move,
body[data-hl-mode="off"] .hl-place {
  background: transparent;
  color: inherit;
  box-shadow: none;
}

body[data-hl-mode="theme"] .hl-topic,
body[data-hl-mode="all"] .hl-topic {
  background: #fff7ed;
  color: #92400e;
}

body[data-hl-mode="all"] .hl-case {
  background: #eef2ff;
  color: #4338ca;
}

body[data-hl-mode="all"] .hl-move {
  background: #fee2e2;
  color: #b91c1c;
}

body[data-hl-mode="all"] .hl-place {
  background: #ecfeff;
  color: #0f766e;
}

body[data-hl-mode="theme"] .hl-case,
body[data-hl-mode="theme"] .hl-move,
body[data-hl-mode="theme"] .hl-place {
  background: transparent;
  color: inherit;
  box-shadow: none;
}
```

---

## 6. JS-стандарт кнопки 💡

Рекомендований порядок:

```text
off → theme → all → off
```

```js
glowToggle.addEventListener("click", () => {
  const mode = body.dataset.hlMode;

  body.dataset.hlMode =
    mode === "off" ? "theme" :
    mode === "theme" ? "all" :
    "off";

  glowToggle.classList.toggle("is-off", body.dataset.hlMode === "off");
});
```

---

## 7. Стандарт прикладів

Кожне речення німецькою має бути в `.de`.

```html
<div class="de">
  Ich bin <span class="hl-place">in der</span> Stadt.
</div>
```

Якщо є озвучка:

```html
<button class="audio-mini" data-tts="Ich bin in der Stadt.">🔊</button>
```

Правило:

> `data-tts` має містити чистий німецький текст без HTML.

---

## 8. Стандарт перекладів

```html
<div class="literal">Дослівно: ...</div>
<div class="translation">...</div>
```

```css
.literal { display:none; }
body.show-literal .literal { display:block; }
```

---

## 9. UA/RU майбутній стандарт

```html
<body data-lang="ua">
<body data-lang="ru">
```

```css
[data-lang-block] { display:none; }
body[data-lang="ua"] [data-lang-block="ua"] { display:block; }
body[data-lang="ru"] [data-lang-block="ru"] { display:block; }

.inline-lang { display:none; }
body[data-lang="ua"] .inline-lang.ua { display:inline; }
body[data-lang="ru"] .inline-lang.ru { display:inline; }
```

---

## 10. Аудіо-стандарт

```html
<button class="audio-mini" data-tts="Ich gehe in die Stadt.">🔊</button>
```

```js
function speak(text){
  if(!("speechSynthesis" in window)){
    alert("Озвучка не підтримується.");
    return;
  }

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

document.querySelectorAll("[data-tts]").forEach(btn => {
  btn.addEventListener("click", () => speak(btn.getAttribute("data-tts")));
});
```

---

## 11. Header Standard

Обовʼязкова шапка:

```text
🏠 Додому
☰ Меню
💡 Підсвітка
+ Дослівний
UA/RU або майбутній UA-DE / RU-DE
```

---

## 12. Заборонено

### Заборонено змішувати системи

Не використовувати паралельно:

```text
data-hl-mode
dt-lang-topic-mode
dt-lang-all-mode
dt-lang-off
```

Стандарт — тільки:

```text
data-hl-mode
```

### Заборонено JS-підсвітку як основу

Правильно:

```text
HTML уже має span-класи.
CSS показує/ховає підсвітку.
JS тільки перемикає режим.
```

### Заборонено підсвічувати тільки в Preview

Урок має бути автономним:

```text
Preview
Saved Lesson
Export HTML
Standalone HTML
```

---

## 13. Принцип еталону для ІССУ + ССУДТ

ІССУ і ССУДТ можуть мати різну логіку створення уроку.

Але вихідний HTML має бути однаковий за стандартом:

```text
одна шапка
одні класи підсвітки
один data-hl-mode
один audio-standard
один translation-standard
один export-standard
```

---

## 14. СОН-рішення

Еталон треба будувати як ядро стандартів:

```text
LESSON_TEMPLATE_STANDARD
HIGHLIGHT_STANDARD_CORE
AUDIO_STANDARD
HEADER_CONTROL_STANDARD
TRANSLATION_STANDARD
EXPORT_STANDALONE_STANDARD
```

Поточний файл `Lesson_Wo_Wohin_Stadt_A1_PRO_v5_FULL_MENU_FIXED.html` є сильним кандидатом на основу еталону, бо містить:

```text
header
menu
data-hl-mode
highlight classes
UA/RU
literal toggle
TTS
full lesson structure
```

---

## 15. Наступний крок

Створити технічний пакет:

```text
DT_LESSON_STANDARD_v1
```

Склад:

```text
HIGHLIGHT_STANDARD_CORE_v1.md
AUDIO_STANDARD_v1.md
HEADER_CONTROL_STANDARD_v1.md
TRANSLATION_STANDARD_v1.md
LESSON_TEMPLATE_STANDARD_v1.md
```

Після цього ODIN, ІССУ і ССУДТ мають генерувати уроки тільки через цей стандарт.
