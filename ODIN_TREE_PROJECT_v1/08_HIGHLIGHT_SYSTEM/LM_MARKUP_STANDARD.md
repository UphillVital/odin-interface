# LM MARKUP STANDARD

## Що це
Стандарт мовної розмітки `lm-*`.

## Основні класи
- `lm-word`
- `lm-verb`
- `lm-prefix`
- `lm-pronoun`
- `lm-noun`
- `lm-preposition`
- `lm-article`
- `lm-vocab`
- `lm-unknown`

## Основні data-атрибути
- `data-lemma`
- `data-pos`
- `data-person`
- `data-number`
- `data-case`
- `data-gender`
- `data-accuracy`
- `data-role`
- `data-prefix`

## Приклад
```html
<span class="lm-word lm-verb lm-separable"
      data-lemma="aufstehen"
      data-pos="verb"
      data-verb-type="separable"
      data-tense="present"
      data-person="1"
      data-number="singular"
      data-accuracy="exact">stehe</span>
```

## Правило
Кожне важливе німецьке слово має бути розмічене як `lm-word`.
