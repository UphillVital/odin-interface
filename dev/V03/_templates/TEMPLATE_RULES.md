# TEMPLATE_RULES — ODIN V03.31.4

## Еталон

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html
```

## Обов’язкові підключення для робочих сторінок у `dev/V03/`

```html
<link rel="stylesheet" href="11_PROTOTYPE_SYSTEM_UI/styles.css" />
<script src="11_PROTOTYPE_SYSTEM_UI/app.js"></script>
```

## Заборонено

- `17_UI_CORE/` у робочих сторінках.
- локальний `<style>`.
- inline `style="..."`.
- дублікати робочих сторінок у `dev/V03/11_PROTOTYPE_SYSTEM_UI/`.

## Дозволено

- змінювати тільки контент `workZone` і сторінковий JS у `dev/V03/_page_scripts/`.
