# LANGUAGE_MARKUP_STANDARD_v1

## 0. Статус

Цей документ фіксує стандарт мовної розмітки для Deutsch Trainer.

Він потрібен для:

- якісних уроків
- гнучкої підсвітки
- статистики по уроку
- статистики по темі
- статистики по всьому курсу
- фільтрації слів
- повторення
- майбутньої бази даних
- експорту в інші системи
- тренажерів і тестів

---

## 1. Головна ідея

HIGHLIGHT_STANDARD_CORE відповідає на питання:

```text
як підсвічувати?
```

LANGUAGE_MARKUP_STANDARD відповідає на питання:

```text
що саме позначено?
```

Тобто:

```text
highlight = візуальний шар
markup = мовний / граматичний шар
```

---

## 2. Навіщо це потрібно

Якщо кожне слово має мітки, система зможе рахувати:

```text
- скільки всього слів у курсі
- скільки унікальних слів
- скільки дієслів
- скільки простих дієслів
- скільки модальних дієслів
- скільки відокремлюваних дієслів
- скільки іменників
- скільки слів чоловічого / жіночого / середнього роду
- скільки прикладів у Dativ
- скільки прикладів в Akkusativ
- скільки конструкцій Wo?
- скільки конструкцій Wohin?
- які слова вже були в попередніх уроках
- які слова нові
- які слова треба повторити
```

---

## 3. Головний стандарт слова

Кожне важливе слово або конструкція повинні мати:

```html
<span
  class="lm-word ..."
  data-lemma="..."
  data-pos="..."
>
  ...
</span>
```

Мінімум:

```text
class="lm-word"
data-lemma
data-pos
```

---

## 4. Базова структура слова

### 4.1 Дієслово

```html
<span
  class="lm-word lm-verb"
  data-lemma="gehen"
  data-pos="verb"
  data-verb-type="simple"
  data-tense="present"
  data-person="1"
  data-number="singular">
  gehe
</span>
```

### 4.2 Модальне дієслово

```html
<span
  class="lm-word lm-verb lm-modal"
  data-lemma="müssen"
  data-pos="verb"
  data-verb-type="modal"
  data-tense="present"
  data-person="1"
  data-number="singular">
  muss
</span>
```

### 4.3 Відокремлюване дієслово

```html
<span
  class="lm-word lm-verb lm-separable"
  data-lemma="aufstehen"
  data-pos="verb"
  data-verb-type="separable"
  data-prefix="auf"
  data-tense="present"
  data-person="1"
  data-number="singular">
  stehe
</span>

<span
  class="lm-word lm-prefix"
  data-lemma="aufstehen"
  data-pos="verb-prefix"
  data-prefix="auf">
  auf
</span>
```

---

## 5. Іменник

```html
<span
  class="lm-word lm-noun"
  data-lemma="Stadt"
  data-pos="noun"
  data-gender="feminine"
  data-number="singular"
  data-case="dativ">
  Stadt
</span>
```

Обовʼязкові атрибути для іменника:

```text
data-lemma
data-pos="noun"
data-gender
data-number
data-case
```

Дозволені gender:

```text
masculine
feminine
neuter
plural
unknown
```

Дозволені case:

```text
nominative
akkusativ
dativ
genitiv
none
unknown
```

---

## 6. Артикль

```html
<span
  class="lm-word lm-article"
  data-lemma="der"
  data-pos="article"
  data-article-type="definite"
  data-gender="feminine"
  data-number="singular"
  data-case="dativ">
  der
</span>
```

Дозволені article-type:

```text
definite
indefinite
negative
possessive
none
```

---

## 7. Прийменник

```html
<span
  class="lm-word lm-preposition hl-place"
  data-lemma="in"
  data-pos="preposition"
  data-role="place"
  data-question="wo"
  data-governs-case="dativ">
  in
</span>
```

Для напрямку:

```html
<span
  class="lm-word lm-preposition hl-move"
  data-lemma="in"
  data-pos="preposition"
  data-role="movement"
  data-question="wohin"
  data-governs-case="akkusativ">
  in
</span>
```

---

## 8. Прикметник

```html
<span
  class="lm-word lm-adjective"
  data-lemma="klein"
  data-pos="adjective"
  data-degree="positive">
  kleine
</span>
```

Дозволені degree:

```text
positive
comparative
superlative
unknown
```

---

## 9. Займенник

```html
<span
  class="lm-word lm-pronoun"
  data-lemma="ich"
  data-pos="pronoun"
  data-pronoun-type="personal"
  data-person="1"
  data-number="singular"
  data-case="nominative">
  Ich
</span>
```

---

## 10. Прислівник

```html
<span
  class="lm-word lm-adverb"
  data-lemma="heute"
  data-pos="adverb"
  data-adverb-type="time">
  heute
</span>
```

Дозволені adverb-type:

```text
time
place
manner
frequency
degree
unknown
```

---

## 11. Сполучник

```html
<span
  class="lm-word lm-conjunction"
  data-lemma="und"
  data-pos="conjunction"
  data-conjunction-type="coordinating">
  und
</span>
```

---

## 12. Частка

```html
<span
  class="lm-word lm-particle"
  data-lemma="bitte"
  data-pos="particle">
  bitte
</span>
```

---

## 13. Конструкція

Іноді треба позначати не одне слово, а конструкцію.

Приклад:

```html
<span
  class="lm-phrase hl-place"
  data-phrase-type="prepositional-phrase"
  data-role="place"
  data-question="wo"
  data-case="dativ">
  in der Stadt
</span>
```

Або з внутрішньою деталізацією:

```html
<span class="lm-phrase hl-place" data-phrase-type="prepositional-phrase" data-role="place" data-question="wo" data-case="dativ">
  <span class="lm-word lm-preposition" data-lemma="in" data-pos="preposition" data-governs-case="dativ">in</span>
  <span class="lm-word lm-article" data-lemma="der" data-pos="article" data-gender="feminine" data-case="dativ">der</span>
  <span class="lm-word lm-noun" data-lemma="Stadt" data-pos="noun" data-gender="feminine" data-case="dativ">Stadt</span>
</span>
```

---

## 14. Речення

Кожне німецьке речення може мати metadata:

```html
<div
  class="de"
  data-sentence-id="L001-S003"
  data-topic="wo-wohin"
  data-level="A1"
  data-grammar="dativ,prepositions,place">
  ...
</div>
```

---

## 15. Урок

Кожен урок має metadata:

```html
<main
  class="wrap"
  data-course="A1"
  data-lesson-id="WO_WOHIN_STADT_A1"
  data-lesson-topic="wo-wohin"
  data-lesson-version="v1">
```

---

## 16. Обовʼязкові data-атрибути

### Для кожного слова

```text
data-lemma
data-pos
```

### Для дієслова

```text
data-verb-type
data-tense
data-person
data-number
```

### Для іменника

```text
data-gender
data-number
data-case
```

### Для артикля

```text
data-article-type
data-gender
data-number
data-case
```

### Для прийменника

```text
data-role
data-question
data-governs-case
```

---

## 17. Словник POS

Дозволені `data-pos`:

```text
verb
verb-prefix
noun
article
preposition
adjective
adverb
pronoun
conjunction
particle
numeral
interjection
phrase
unknown
```

---

## 18. Типи дієслів

Дозволені `data-verb-type`:

```text
simple
modal
separable
irregular
auxiliary
reflexive
compound
unknown
```

---

## 19. Часи

Дозволені `data-tense`:

```text
present
preterite
perfect
plusquamperfect
future1
future2
imperative
infinitive
participle1
participle2
unknown
```

---

## 20. Особи

Дозволені `data-person`:

```text
1
2
3
none
unknown
```

---

## 21. Число

Дозволені `data-number`:

```text
singular
plural
none
unknown
```

---

## 22. Ролі для підсвітки

`data-role` може бути:

```text
topic
place
movement
case
subject
verb
object
time
manner
reason
condition
negation
question
answer
unknown
```

---

## 23. Звʼязок з Highlight Standard

LANGUAGE_MARKUP_STANDARD не замінює HIGHLIGHT_STANDARD_CORE.

Правило:

```text
lm-* класи = граматична база
hl-* класи = візуальна підсвітка
```

Приклад:

```html
<span
  class="lm-word lm-preposition hl-move"
  data-lemma="zu"
  data-pos="preposition"
  data-role="movement"
  data-question="wohin"
  data-governs-case="dativ">
  zum
</span>
```

---

## 24. Статистика по уроку

Система може рахувати:

```js
document.querySelectorAll(".lm-word").length
document.querySelectorAll('[data-pos="verb"]').length
document.querySelectorAll('[data-verb-type="modal"]').length
document.querySelectorAll('[data-verb-type="separable"]').length
document.querySelectorAll('[data-pos="noun"]').length
document.querySelectorAll('[data-gender="feminine"]').length
document.querySelectorAll('[data-case="dativ"]').length
document.querySelectorAll('[data-question="wo"]').length
document.querySelectorAll('[data-question="wohin"]').length
```

---

## 25. Статистика по курсу

Якщо всі уроки мають однаковий стандарт, курс може рахувати:

```text
всього слів
унікальних lemma
нових lemma в уроці
повторених lemma
простих дієслів
модальних дієслів
відокремлюваних дієслів
іменників за родом
конструкцій за темою
прикладів за граматикою
```

---

## 26. Унікальність слова

Для статистики слово рахується по `data-lemma`, а не по формі.

Приклад:

```text
gehe
gehst
geht
gehen

lemma = gehen
```

Це одне слово в словнику, але різні форми.

---

## 27. Поверхнева форма

Поточний текст у span — це surface form.

```html
<span data-lemma="gehen">gehe</span>
```

```text
surface = gehe
lemma = gehen
```

---

## 28. Рівні розмітки

### Level 1 — мінімальний

```text
data-lemma
data-pos
```

### Level 2 — навчальний

```text
+ gender
+ case
+ tense
+ verb-type
+ role
```

### Level 3 — PRO

```text
+ sentence-id
+ topic
+ level
+ phrase metadata
+ review metadata
+ course statistics
```

---

## 29. Мінімальна вимога до PRO уроку

PRO урок має мати мінімум Level 2 markup.

Для ключових прикладів бажано Level 3.

---

## 30. Приклад повної розмітки

```html
<div
  class="de"
  data-sentence-id="WO_WOHIN_A1_S001"
  data-topic="wo-wohin"
  data-level="A1"
  data-grammar="place,dativ,preposition">

  <span
    class="lm-word lm-pronoun"
    data-lemma="ich"
    data-pos="pronoun"
    data-person="1"
    data-number="singular"
    data-case="nominative">Ich</span>

  <span
    class="lm-word lm-verb"
    data-lemma="sein"
    data-pos="verb"
    data-verb-type="auxiliary"
    data-tense="present"
    data-person="1"
    data-number="singular">bin</span>

  <span
    class="lm-phrase hl-place"
    data-phrase-type="prepositional-phrase"
    data-role="place"
    data-question="wo"
    data-case="dativ">

    <span
      class="lm-word lm-preposition"
      data-lemma="in"
      data-pos="preposition"
      data-role="place"
      data-question="wo"
      data-governs-case="dativ">in</span>

    <span
      class="lm-word lm-article"
      data-lemma="der"
      data-pos="article"
      data-article-type="definite"
      data-gender="feminine"
      data-number="singular"
      data-case="dativ">der</span>

    <span
      class="lm-word lm-noun"
      data-lemma="Stadt"
      data-pos="noun"
      data-gender="feminine"
      data-number="singular"
      data-case="dativ">Stadt</span>
  </span>.
</div>
```

---

## 31. Що заборонено

```text
- рахувати слова тільки по тексту без lemma
- мішати highlight-класи і grammar-класи без системи
- позначати одні уроки детально, а інші випадково
- створювати нові data-атрибути без внесення в стандарт
- робити статистику через ручні списки, якщо HTML уже може бути джерелом даних
```

---

## 32. СОН-рішення

Deutsch Trainer має будуватися так:

```text
HTML lesson = навчальний матеріал + граматична база + статистична база
```

Це дозволить:

```text
читати урок
слухати урок
підсвічувати урок
рахувати курс
будувати повторення
будувати тренажери
аналізувати прогрес
```

---

## 33. Наступний крок

Додати цей файл до стандартів:

```text
LANGUAGE_MARKUP_STANDARD_v1.md
```

Після цього оновити:

```text
LESSON_TEMPLATE_STANDARD_v1.md
```

щоб він посилався не тільки на HIGHLIGHT_STANDARD_CORE, а й на LANGUAGE_MARKUP_STANDARD.
