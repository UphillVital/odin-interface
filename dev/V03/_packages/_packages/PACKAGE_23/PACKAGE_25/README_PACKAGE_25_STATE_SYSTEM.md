# PACKAGE 25 — ODIN STATE SYSTEM FOUNDATION

## Призначення

Пакет додає основу State System: системний реєстр станів, людські описи, правила, workflow і тестову сторінку State Workspace.

## Що додано

- `dev/V03/STATE_REGISTRY.json`
- `dev/V03/16_STATE_SYSTEM/`
- `dev/V03/_states/`
- `dev/V03/11_PROTOTYPE_SYSTEM_UI/state_workspace.html`
- `dev/V03/_packages/PACKAGE_25/`

## Як тестувати

Відкрити:

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/state_workspace.html
```

Перевірити:

- список станів;
- деталі стану;
- current state;
- генерацію restore-команд;
- перемикання теми та мови.

## Важливо

Пакет не змінює основний `index.html` і не виконує Git-команди автоматично.
