# TRANSLATION_STANDARD_v2

## 0. Статус

TRANSLATION_STANDARD_v2 фіксує системну багатомовну модель для Deutsch Trainer.

Мета:

```text
не UA/RU fallback,
а повноцінна language-layer система
```

Стандарт має працювати для:

```text
UA → DE
RU → DE
EN → DE
PL → DE
будь-яка L1 → DE
```

---

## 1. Головна ідея

Урок має мати:

```text
1. мову, що вивчається = target language
2. мову пояснення = interface/source language
3. дослівний переклад
4. смисловий переклад
5. службові тексти UI
```

Для Deutsch Trainer:

```text
target language = DE
source/interface language = UA / RU / EN / PL ...
```

---

## 2. Заборонена стара логіка

Заборонено:

```text
UA текст → autoRu fallback
```

Це тимчасовий костиль.

Правильно:

```text
кожен текстовий елемент має окремі мовні слоти
```

---

## 3. Body language model

```html
<body data-ui-lang="ua" data-target-lang="de">
```

### data-ui-lang

Мова інтерфейсу / пояснень:

```text
ua
ru
en
pl
```

### data-target-lang

Мова, що вивчається:

```text
de
en
fr
pl
```

Для поточного продукту:

```text
data-target-lang="de"
```

---

## 4. Text slot standard

Кожен перекладений UI або lesson text має формат:

```html
<span data-i18n="lesson.title" data-lang="ua">Відокремлювані дієслова</span>
<span data-i18n="lesson.title" data-lang="ru">Отделяемые глаголы</span>
<span data-i18n="lesson.title" data-lang="en">Separable verbs</span>
```

CSS:

```css
[data-lang] {
  display: none;
}

body[data-ui-lang="ua"] [data-lang="ua"] {
  display: inline;
}

body[data-ui-lang="ru"] [data-lang="ru"] {
  display: inline;
}

body[data-ui-lang="en"] [data-lang="en"] {
  display: inline;
}
```

---

## 5. Block slot standard

Для великих блоків:

```html
<div data-i18n-block="lesson.goal" data-lang="ua">
  Зрозуміти правило...
</div>

<div data-i18n-block="lesson.goal" data-lang="ru">
  Понять правило...
</div>

<div data-i18n-block="lesson.goal" data-lang="en">
  Understand the rule...
</div>
```

CSS:

```css
[data-i18n-block] {
  display: none;
}

body[data-ui-lang="ua"] [data-i18n-block][data-lang="ua"] {
  display: block;
}

body[data-ui-lang="ru"] [data-i18n-block][data-lang="ru"] {
  display: block;
}
```

---

## 6. German target text

Мова, що вивчається, НЕ перемикається UI-кнопкою.

```html
<div class="de" data-target-lang="de">
  Ich stehe um sechs Uhr auf.
</div>
```

Правило:

```text
DE текст завжди залишається DE
UA/RU/EN змінюють тільки пояснення і переклади
```

---

## 7. Example translation model

Кожен приклад має:

```text
target text
literal translation per UI language
semantic translation per UI language
```

HTML:

```html
<div class="sentence">
  <div class="de" data-target-lang="de">
    Ich stehe um sechs Uhr auf.
  </div>

  <div class="literal">
    <span data-i18n="ex001.literal" data-lang="ua">Дослівно: Я встаю о шостій годині вгору.</span>
    <span data-i18n="ex001.literal" data-lang="ru">Дословно: Я встаю в шесть часов вверх.</span>
    <span data-i18n="ex001.literal" data-lang="en">Literally: I stand at six o’clock up.</span>
  </div>

  <div class="translation">
    <span data-i18n="ex001.semantic" data-lang="ua">Я встаю о шостій годині.</span>
    <span data-i18n="ex001.semantic" data-lang="ru">Я встаю в шесть часов.</span>
    <span data-i18n="ex001.semantic" data-lang="en">I get up at six o’clock.</span>
  </div>
</div>
```

---

## 8. Data model for generator

ODIN / ІССУ / ССУДТ мають працювати з таким model:

```js
{
  targetLang: "de",
  uiLangs: ["ua", "ru"],
  lesson: {
    title: {
      ua: "Відокремлювані дієслова",
      ru: "Отделяемые глаголы"
    },
    goal: {
      ua: "Зрозуміти правило...",
      ru: "Понять правило..."
    }
  },
  examples: [
    {
      de: "Ich stehe um sechs Uhr auf.",
      literal: {
        ua: "Дослівно: Я встаю о шостій годині вгору.",
        ru: "Дословно: Я встаю в шесть часов вверх."
      },
      semantic: {
        ua: "Я встаю о шостій годині.",
        ru: "Я встаю в шесть часов."
      }
    }
  ],
  vocab: [
    {
      de: "aufstehen",
      translation: {
        ua: "вставати",
        ru: "вставать"
      }
    }
  ]
}
```

---

## 9. Input standard for ODIN

Замість одного поля:

```text
Назва уроку
Ціль уроку
Приклади DE | ДП | СД
Словник DE | UA
```

v2 має мати:

```text
Title UA
Title RU
Goal UA
Goal RU

Examples:
DE | Literal UA | Semantic UA | Literal RU | Semantic RU

Vocabulary:
DE | UA | RU
```

Для майбутнього:

```text
DE | Literal UA | Semantic UA | Literal RU | Semantic RU | Literal EN | Semantic EN
```

---

## 10. UI language toggle

Кнопка не повинна бути просто `UA`.

Правильно:

```html
<button id="langToggle">UA</button>
```

JS:

```js
const langs = ["ua", "ru", "en"];
let currentIndex = langs.indexOf(body.dataset.uiLang || "ua");

langToggle.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % langs.length;
  body.dataset.uiLang = langs[currentIndex];
  langToggle.textContent = langs[currentIndex].toUpperCase();
});
```

---

## 11. Fallback rules

Fallback дозволений тільки як аварійний режим.

Порядок fallback:

```text
requested lang → ua → first available → [MISSING_TRANSLATION]
```

Функція:

```js
function t(value, lang, fallback = "ua") {
  if (typeof value === "string") return value;
  return value?.[lang] || value?.[fallback] || Object.values(value || {})[0] || "[MISSING_TRANSLATION]";
}
```

QA має показувати WARNING, якщо використано fallback.

---

## 12. QA rules

TRANSLATION QA має перевіряти:

```text
кожен lesson.title має всі required uiLangs
кожен lesson.goal має всі required uiLangs
кожен example.literal має всі required uiLangs
кожен example.semantic має всі required uiLangs
кожен vocab.translation має всі required uiLangs
немає [MISSING_TRANSLATION]
fallback count = 0 для PRO
```

---

## 13. Required languages

Для поточного етапу:

```text
required uiLangs = ["ua", "ru"]
targetLang = "de"
```

Для майбутнього:

```text
required uiLangs = ["ua", "ru", "en"]
```

---

## 14. Translation coverage

Для PRO уроку:

```text
title coverage = 100%
goal coverage = 100%
examples literal coverage = 100%
examples semantic coverage = 100%
vocab coverage = 100%
UI labels coverage = 100%
menu coverage = 100%
```

---

## 15. Translation IDs

Кожен перекладений елемент має мати стабільний id:

```text
lesson.title
lesson.goal
menu.summary
menu.examples
section.summary.title
ex001.literal
ex001.semantic
vocab001.translation
```

Це потрібно для:

```text
оновлення перекладів
експорту
бази даних
порівняння версій
перевірки QA
```

---

## 16. UI labels dictionary

Урок має мати вбудований UI словник або готові spans.

Приклад dictionary:

```js
const UI_TEXT = {
  menuTitle: {
    ua: "Розділи уроку",
    ru: "Разделы урока",
    en: "Lesson sections"
  },
  literalLabel: {
    ua: "Дослівно:",
    ru: "Дословно:",
    en: "Literally:"
  },
  homework: {
    ua: "Домашнє завдання",
    ru: "Домашнее задание",
    en: "Homework"
  }
};
```

---

## 17. Export rule

Standalone HTML має містити всі мовні слоти.

Не можна експортувати тільки активну мову.

Правильно:

```text
export містить UA + RU + EN слоти
кнопка перемикає видимість
```

---

## 18. Relationship with other standards

```text
LESSON_TEMPLATE_STANDARD = структура
HIGHLIGHT_STANDARD_CORE = підсвітка
LANGUAGE_MARKUP_STANDARD = граматичні дані
TRANSLATION_STANDARD_v2 = мовні слоти
QA_STANDARD = перевірка покриття
```

---

## 19. Заборонено

```text
- тримати RU як autoRu fallback для PRO
- перемикати тільки label “Дослівно”
- залишати hero / menu / homework тільки UA
- експортувати HTML без усіх мовних слотів
- змішувати data-lang старого типу з data-ui-lang без міграції
```

---

## 20. Migration from v1

Старе:

```html
<body data-lang="ua">
<span class="inline-lang ua">...</span>
<span class="inline-lang ru">...</span>
```

Нове:

```html
<body data-ui-lang="ua" data-target-lang="de">
<span data-i18n="..." data-lang="ua">...</span>
<span data-i18n="..." data-lang="ru">...</span>
```

Допускається тимчасово:

```text
inline-lang ua/ru
```

але master standard v2 має перейти на:

```text
data-i18n + data-lang
```

---

## 21. SON decision

TRANSLATION_STANDARD_v2 переводить систему з:

```text
UA lesson + RU partial fallback
```

до:

```text
multi-language lesson model
```

Це потрібно, щоб уроки можна було масштабувати на різні мови без переписування шаблону.

---

## 22. Наступний крок

Оновити ODIN:

```text
v3.20 — TRANSLATION v2 ENGINE
```

Що має змінитись:

```text
input fields:
Title UA / RU
Goal UA / RU
Examples DE | Literal UA | Semantic UA | Literal RU | Semantic RU
Vocab DE | UA | RU

output:
body[data-ui-lang]
data-i18n slots
QA translation coverage
no RU fallback in PRO
```
