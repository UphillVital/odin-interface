# QA_STANDARD_v1

## 0. Статус

Цей документ фіксує стандарт перевірки якості уроків Deutsch Trainer.

QA_STANDARD_v1 працює над такими стандартами:

```text
HIGHLIGHT_STANDARD_CORE_v1.md
LESSON_TEMPLATE_STANDARD_v1.md
LANGUAGE_MARKUP_STANDARD_v1.md
AUDIO_STANDARD_v1.md
HEADER_CONTROL_STANDARD_v1.md
TRANSLATION_STANDARD_v1.md
EXPORT_STANDALONE_STANDARD_v1.md
```

Мета:

```text
не просто створити урок,
а гарантувати, що урок відповідає стандарту
```

---

## 1. Головний принцип QA

Кожен урок має пройти 4 рівні перевірки:

```text
1. STRUCTURE QA
2. HIGHLIGHT QA
3. LANGUAGE MARKUP QA
4. STANDALONE EXPORT QA
```

Якщо один критичний рівень не пройдено:

```text
EXPORT має бути заблокований
```

---

## 2. QA статуси

Дозволені статуси:

```text
QA_PASSED
QA_PASSED_WITH_WARNINGS
QA_FAILED
EXPORT_BLOCKED
```

### QA_PASSED

Урок повністю відповідає стандартам.

### QA_PASSED_WITH_WARNINGS

Урок придатний, але має не критичні попередження.

### QA_FAILED

Є критичні помилки.

### EXPORT_BLOCKED

Export не дозволено, доки критичні помилки не виправлені.

---

## 3. Severity levels

Кожна перевірка має рівень:

```text
ERROR
WARNING
INFO
```

### ERROR

Блокує export.

### WARNING

Не блокує export, але має бути показано в QA Report.

### INFO

Інформаційне повідомлення.

---

## 4. STRUCTURE QA

Перевіряє, чи урок має правильну HTML-структуру.

### Обовʼязкові перевірки

```text
DOCTYPE exists
html lang exists
head exists
meta charset exists
meta viewport exists
title exists
style exists
body exists
main.wrap exists
script exists
```

### Header checks

```text
.topbar exists
.topbar-inner exists
.brand exists
.center-actions exists
homeBtn exists
menuBtn exists
glowToggle exists
literalToggle exists
langToggle або майбутній translation toggle exists
```

### Menu checks

```text
navModal exists
nav-list exists
nav-item count >= 8
кожен nav-item href веде до існуючого id
```

### Section checks

Мінімальні секції:

```text
Hero / top
summary
text або examples
analysis
rule
vocab
homework або practice
after
```

PRO урок має мати:

```text
section count >= 10
vocab exists
practice voice exists
homework exists
dialog або examples exists
```

---

## 5. HIGHLIGHT QA

Перевіряє відповідність HIGHLIGHT_STANDARD_CORE.

### Body mode checks

```text
body має data-hl-mode
data-hl-mode ∈ off/theme/all
```

### Highlight class checks

Урок має використовувати тільки стандартні класи:

```text
hl-topic
hl-place
hl-move
hl-case
```

### Обовʼязкові перевірки

```text
hl-topic count >= 1
glowToggle exists
CSS має body[data-hl-mode="off"]
CSS має body[data-hl-mode="theme"]
CSS має body[data-hl-mode="all"]
JS перемикає body.dataset.hlMode
```

### Заборонені конфліктні системи

QA має давати ERROR, якщо знайдено:

```text
dt-lang-topic-mode
dt-lang-all-mode
dt-lang-off
lamp-token як основний стандарт
JS inline painting як головний механізм
```

---

## 6. LANGUAGE MARKUP QA

Перевіряє LANGUAGE_MARKUP_STANDARD.

### Мінімум для звичайного уроку

```text
lm-word count > 0
data-lemma count > 0
data-pos count > 0
```

### Мінімум для PRO уроку

```text
lm-word count >= 20
data-lemma count == lm-word count
data-pos count == lm-word count
мінімум 3 data-pos типи
мінімум 1 data-pos="verb"
мінімум 1 data-pos="noun"
```

### Дієслова

Якщо є:

```html
data-pos="verb"
```

тоді бажано:

```text
data-verb-type
data-tense
data-person
data-number
```

Для PRO уроку це WARNING або ERROR залежно від режиму.

### Іменники

Якщо є:

```html
data-pos="noun"
```

тоді бажано:

```text
data-gender
data-number
data-case
```

### Артиклі

Якщо є:

```html
data-pos="article"
```

тоді бажано:

```text
data-article-type
data-gender
data-number
data-case
```

### Прийменники

Якщо є:

```html
data-pos="preposition"
```

тоді бажано:

```text
data-role
data-question
data-governs-case
```

---

## 7. Sentence QA

Кожне німецьке речення має бути в:

```html
<div class="de">
```

Рекомендовано:

```text
data-sentence-id
data-topic
data-level
data-grammar
```

### Перевірки

```text
.de count >= 5
кожна .de має текст
кожна .de не повинна містити переклад
кожна .de бажано має data-tts поруч або всередині
```

---

## 8. Translation QA

Перевіряє переклади.

### Literal checks

```text
.literal exists
literalToggle exists
body.show-literal CSS exists
```

### Semantic translation checks

```text
.translation exists
translation count >= de count * 0.7
```

### UA/RU checks

Якщо є `data-lang`:

```text
body[data-lang] exists
inline-lang ua exists
inline-lang ru exists
CSS for body[data-lang="ua"] exists
CSS for body[data-lang="ru"] exists
langToggle exists
```

---

## 9. AUDIO QA

Перевіряє озвучку.

### Обовʼязкові перевірки

```text
audio-mini exists
data-tts exists
speechSynthesis used
SpeechSynthesisUtterance used
u.lang = "de-DE"
```

### Якість data-tts

```text
data-tts не порожній
data-tts не містить HTML tags
data-tts містить німецький текст
```

### PRO урок

```text
audio coverage >= 70% для .de
vocab audio coverage >= 50%
```

---

## 10. VOCAB QA

Перевіряє словник.

### Обовʼязково

```text
vocab section exists
vocab-line count >= 5
vocab-word count >= 5
```

### Для PRO

```text
vocab-word count >= 15
кожне vocab-word має переклад
кожне важливе vocab-word бажано має data-tts
```

---

## 11. PRACTICE QA

Перевіряє навчальні блоки.

Обовʼязково для PRO:

```text
practice voice або homework exists
drill exists
after exists
confuse або не плутай exists
```

Мінімум:

```text
мікродрил або домашнє завдання
```

---

## 12. STANDALONE EXPORT QA

Перевіряє, чи урок автономний.

### Обовʼязково

```text
CSS inline inside <style>
JS inline inside <script>
no external CSS dependency
no external JS dependency
no dependency on ODIN shell
no dependency on localStorage for core lesson behavior
```

Дозволено:

```text
speechSynthesis
pure browser APIs
```

Не бажано:

```text
external CDN
external JS files
external CSS files
external images без fallback
```

---

## 13. DATA QA

Перевіряє, чи урок може бути джерелом статистики.

### Мінімум

```text
data-lesson-id або identifiable title
data-level або visible level
data-topic або visible topic
lm-word
data-lemma
data-pos
```

### Для курсу

```text
кожен урок має lesson id
кожен урок має course level
кожен урок має topic
кожен урок має version
```

---

## 14. COURSE STATS QA

Якщо уроки використовуються в курсі, система має вміти рахувати:

```js
document.querySelectorAll(".lm-word").length
document.querySelectorAll("[data-pos='verb']").length
document.querySelectorAll("[data-verb-type='modal']").length
document.querySelectorAll("[data-verb-type='separable']").length
document.querySelectorAll("[data-pos='noun']").length
document.querySelectorAll("[data-gender='feminine']").length
document.querySelectorAll("[data-case='dativ']").length
document.querySelectorAll("[data-question='wo']").length
document.querySelectorAll("[data-question='wohin']").length
```

QA має перевіряти, що такі селектори мають сенс.

---

## 15. QA Report Format

QA Report має бути структурований:

```text
STRUCTURE QA
- PASS / WARNING / ERROR

HIGHLIGHT QA
- PASS / WARNING / ERROR

LANGUAGE MARKUP QA
- PASS / WARNING / ERROR

AUDIO QA
- PASS / WARNING / ERROR

TRANSLATION QA
- PASS / WARNING / ERROR

STANDALONE QA
- PASS / WARNING / ERROR

FINAL STATUS
- QA_PASSED / QA_PASSED_WITH_WARNINGS / QA_FAILED
```

---

## 16. Machine-readable QA result

Результат QA бажано зберігати як обʼєкт:

```js
{
  status: "QA_PASSED",
  passed: true,
  errors: [],
  warnings: [],
  info: [],
  checks: [
    {
      group: "HIGHLIGHT",
      name: "body has data-hl-mode",
      level: "ERROR",
      passed: true
    }
  ]
}
```

---

## 17. Export Gate

Правило:

```js
if (!qaResult.passed) {
  throw new Error("EXPORT blocked: QA failed");
}
```

Export дозволено тільки якщо:

```text
errors.length === 0
```

Warnings не блокують export, але мають бути видимі.

---

## 18. QA Modes

Дозволені режими QA:

```text
BASIC
PRO
STRICT
SON
```

### BASIC

Перевіряє мінімальну структуру.

### PRO

Перевіряє всі навчальні блоки.

### STRICT

Блокує export при неповній markup-системі.

### SON

Глибокий режим:

```text
перевіряє архітектуру
шукає конфлікти стандартів
шукає regressions
перевіряє standalone
перевіряє сумісність ІССУ / ССУДТ / ODIN
```

---

## 19. SON QA

SON QA має перевіряти:

```text
чи не змішано системи підсвітки
чи не залежить урок від ODIN shell
чи однаково працює Preview / Saved / Export / Standalone
чи lesson HTML самодостатній
чи є статистичні дані для курсу
чи lesson відповідає DT_LESSON_STANDARD
```

---

## 20. Regression QA

Перед кожним новим шаром перевірити, що не зламано:

```text
header
menu
literal toggle
highlight toggle
lang toggle
audio
navigation
lesson structure
saved lesson
export lesson
standalone lesson
```

---

## 21. Мінімальна автоперевірка JS

```js
function qaCheckLesson(documentRoot = document) {
  const errors = [];
  const warnings = [];
  const info = [];

  const exists = (selector) => Boolean(documentRoot.querySelector(selector));
  const count = (selector) => documentRoot.querySelectorAll(selector).length;

  if (!exists("body[data-hl-mode]")) errors.push("Missing body[data-hl-mode]");
  if (!exists(".topbar")) errors.push("Missing header .topbar");
  if (!exists("#glowToggle")) errors.push("Missing glowToggle");
  if (!exists("#literalToggle")) errors.push("Missing literalToggle");
  if (!exists("#menuBtn")) errors.push("Missing menuBtn");
  if (!exists("#navModal")) errors.push("Missing navModal");

  if (count(".de") < 5) errors.push("Too few German sentences");
  if (count(".translation") < 3) warnings.push("Few semantic translations");
  if (count(".literal") < 3) warnings.push("Few literal translations");

  if (count(".hl-topic") < 1) errors.push("Missing hl-topic");
  if (count(".lm-word") < 1) warnings.push("Missing language markup lm-word");
  if (count("[data-lemma]") < 1) warnings.push("Missing data-lemma");
  if (count("[data-pos]") < 1) warnings.push("Missing data-pos");

  if (count("[data-tts]") < 1) warnings.push("Missing audio data-tts");
  if (count(".vocab-word") < 5) warnings.push("Vocabulary may be too small");

  return {
    status: errors.length ? "QA_FAILED" : warnings.length ? "QA_PASSED_WITH_WARNINGS" : "QA_PASSED",
    passed: errors.length === 0,
    errors,
    warnings,
    info
  };
}
```

---

## 22. Обовʼязковий результат для ODIN

ODIN не повинен просто генерувати файл.

ODIN має генерувати:

```text
lesson.html
qa-report.json або qa-report-block
status log
export package
```

---

## 23. Обовʼязковий результат для ІССУ / ССУДТ

ІССУ і ССУДТ мають проходити той самий QA.

Не може бути:

```text
ІССУ має одні вимоги
ССУДТ має інші вимоги
ODIN має третю логіку
```

Має бути:

```text
один стандарт
один QA
один результат
```

---

## 24. Критичні блокери

Export блокується, якщо:

```text
немає header
немає main content
немає data-hl-mode
немає glowToggle
немає .de
немає .translation
немає lesson structure
HTML не відкривається standalone
є конфлікт highlight systems
```

---

## 25. Warnings

Warnings не блокують export:

```text
мало audio
не всі слова мають lm-word
не всі слова мають data-lemma
не всі слова мають data-pos
мало словника
мало домашньої практики
не всі речення мають sentence-id
```

Але в режимі STRICT або SON частина warnings може ставати errors.

---

## 26. СОН-рішення

QA_STANDARD_v1 — це gatekeeper.

Без QA_STANDARD:

```text
стандарти існують, але не гарантуються
```

З QA_STANDARD:

```text
кожен урок або відповідає DT стандарту,
або export блокується
```

---

## 27. Наступний крок

Після QA_STANDARD_v1 потрібно створити:

```text
DT_LESSON_STANDARD_v1.md
```

Цей файл має зібрати всі стандарти в один master-standard:

```text
HIGHLIGHT_STANDARD_CORE_v1
LESSON_TEMPLATE_STANDARD_v1
LANGUAGE_MARKUP_STANDARD_v1
QA_STANDARD_v1
AUDIO_STANDARD_v1
HEADER_CONTROL_STANDARD_v1
TRANSLATION_STANDARD_v1
EXPORT_STANDALONE_STANDARD_v1
```
