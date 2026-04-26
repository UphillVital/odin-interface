# HIGHLIGHT MODES

## Що це
Режими роботи кнопки 💡.

## Режими
- `off` — підсвітка вимкнена;
- `theme` — підсвічується тільки тема уроку;
- `all` — підсвічується вся мовна розмітка.

## У v3.22
Кнопка:
```html
<button class="btn is-off" id="glowToggle">💡0</button>
```

Стан:
```html
body[data-hl-mode="off"]
body[data-hl-mode="theme"]
body[data-hl-mode="all"]
```

## Логіка
```text
💡0 → 💡1 → 💡2 → 💡0
```

## Правило
Режим підсвітки має бути глобальним для уроку.
