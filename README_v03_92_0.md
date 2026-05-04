# README_v03_92_0 — New Chat Start Prompt Builder v1

## Призначення пакету

Цей пакет додає генератор стартового промту для нового чату.

## Що додається

- `Build Start Prompt`;
- `Copy Start Prompt`;
- textarea з готовим prompt;
- prompt містить:
  - start command;
  - правила продовження;
  - Handoff Lock;
  - Transfer Package, якщо він є у полі.

## Start command

```text
ODIN SYSTEM — CONTINUE FROM TRANSFER PACKAGE
```

## Правило

Start Prompt не запускає restore автоматично.  
Він тільки дає новому чату правильний стартовий контекст і правила.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_92_0.md` | `README_v03_92_0.md` |
| `CHANGELOG_v03_92_0.md` | `CHANGELOG_v03_92_0.md` |
| `MANIFEST_v03_92_0.md` | `MANIFEST_v03_92_0.md` |
| `QA_REPORT_v03_92_0.md` | `QA_REPORT_v03_92_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_92_0.md CHANGELOG_v03_92_0.md MANIFEST_v03_92_0.md QA_REPORT_v03_92_0.md
git commit -m "ODIN V03.92.0 — додано New Chat Start Prompt Builder"
git push origin feature/odin-interface-v03
```
