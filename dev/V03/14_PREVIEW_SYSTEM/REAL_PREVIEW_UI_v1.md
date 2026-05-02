# REAL PREVIEW UI v1

## Статус
Реалізовано у `dev/V03/11_PROTOTYPE_SYSTEM_UI`.

## Модель

```text
Edit → Preview → Review → Approve → Save / Package
```

## Правила

1. Preview не замінює QA.
2. Preview показує результат перед затвердженням.
3. HTML переглядається як реальний рендер у `iframe`.
4. Текстові формати переглядаються як code/text preview.
5. Preview працює тільки з поточним draft у File Workspace.
6. Усі видимі тексти Preview мають проходити через i18n.

## Захист

Preview не має ламати:
- File Workspace;
- Layout;
- Quick Settings;
- Theme switching;
- UA / EN / DE;
- Contextual Help.
