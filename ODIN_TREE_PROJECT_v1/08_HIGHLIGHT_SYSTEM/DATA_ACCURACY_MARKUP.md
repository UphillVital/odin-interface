# DATA ACCURACY MARKUP

## Що це
Рівень точності мовної розмітки.

## Значення
- `exact` — точна розмітка;
- `dictionary` — з довідника;
- `inferred` — виведено з контексту;
- `unknown` — невідомо.

## Приклад
```html
data-accuracy="exact"
```

## QA правило
Якщо багато `unknown`, QA має давати warning.

## Мета
Зробити розмітку чесною: краще `unknown`, ніж вигадати.
