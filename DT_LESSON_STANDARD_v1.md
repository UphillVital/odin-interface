# DT_LESSON_STANDARD_v1

## 0. Статус

MASTER STANDARD для всієї системи Deutsch Trainer.

Цей документ обʼєднує:

- HIGHLIGHT_STANDARD_CORE_v1
- LESSON_TEMPLATE_STANDARD_v1
- LANGUAGE_MARKUP_STANDARD_v1
- QA_STANDARD_v1

---

## 1. СОН-висновок

```text
Deutsch Trainer = система генерації стандартизованих уроків
```

Кожен урок має бути:

```text
✔ однаковий по структурі
✔ однаковий по логіці
✔ однаковий по даним
✔ однаковий по поведінці
✔ перевірений QA
✔ автономний (standalone HTML)
```

---

## 2. Архітектура уроку

```text
LESSON = TEMPLATE + HIGHLIGHT + MARKUP + AUDIO + TRANSLATION + QA
```

---

## 3. TEMPLATE (форма)

Урок повинен:

```text
✔ мати header (topbar)
✔ мати menu (navModal)
✔ мати ≥10 секцій
✔ мати hero блок
✔ мати словник
✔ мати практику
✔ мати домашнє завдання
✔ мати standalone CSS + JS
```

---

## 4. HIGHLIGHT (візуалізація)

Єдиний стандарт:

```text
body[data-hl-mode="off | theme | all"]
```

Класи:

```text
hl-topic
hl-place
hl-move
hl-case
```

JS тільки перемикає режим.

CSS керує підсвіткою.

---

## 5. LANGUAGE MARKUP (дані)

Кожне слово:

```text
lm-word
data-lemma
data-pos
```

Розширення:

```text
verb → tense, person, number, type
noun → gender, case, number
preposition → role, question, case
```

---

## 6. AUDIO

```text
speechSynthesis
lang = de-DE
data-tts для кожного важливого прикладу
```

---

## 7. TRANSLATION

```text
literal (дослівний)
translation (смисловий)
UA/RU toggle
```

---

## 8. QA (контроль якості)

Урок проходить:

```text
STRUCTURE QA
HIGHLIGHT QA
MARKUP QA
AUDIO QA
TRANSLATION QA
STANDALONE QA
```

Правило:

```text
QA_FAILED → EXPORT_BLOCKED
```

---

## 9. STANDALONE

```text
✔ працює без ODIN
✔ відкривається як HTML
✔ має свій JS
✔ має свій CSS
✔ має всі кнопки
```

---

## 10. ОДИН СТАНДАРТ ДЛЯ ВСІХ

```text
ІССУ
ССУДТ
ODIN
```

ВСІ генерують:

```text
ОДИН І ТОЙ САМИЙ HTML
```

---

## 11. PIPELINE

```text
INPUT → GENERATE → QA → EXPORT
```

---

## 12. КРИТИЧНЕ ПРАВИЛО

```text
НІЯКИХ ВИКЛЮЧЕНЬ
```

---

## 13. РЕЗУЛЬТАТ

```text
✔ стабільність
✔ масштабування
✔ автоматизація
✔ аналітика
✔ побудова курсу
```

---

## 14. СОН-ФІКСАЦІЯ

```text
DT_LESSON_STANDARD_v1 = ядро системи
```

Все інше — реалізація цього стандарту.
