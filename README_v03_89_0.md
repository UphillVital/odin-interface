# README_v03_89_0 — System Continuity / New Chat Transfer Package v1

## Призначення пакету

Цей пакет додає System Continuity / New Chat Transfer Package у Control Center.

## Що додається

- `Build New Chat Transfer`;
- `Copy New Chat Transfer`;
- transfer package textarea;
- transfer package містить:
  - recoveryLayerLock;
  - controlSurface;
  - nextAction;
  - full ODIN state snapshot;
  - startupInstruction;
  - mandatoryRules;
  - nextStep.

## Призначення

Пакет потрібен для переходу в новий чат без втрати стану ODIN.

## Start command

```text
ODIN SYSTEM — CONTINUE FROM TRANSFER PACKAGE
```

## Правило

Transfer Package не запускає restore автоматично.  
Він тільки переносить контрольний стан і правила продовження.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_89_0.md` | `README_v03_89_0.md` |
| `CHANGELOG_v03_89_0.md` | `CHANGELOG_v03_89_0.md` |
| `MANIFEST_v03_89_0.md` | `MANIFEST_v03_89_0.md` |
| `QA_REPORT_v03_89_0.md` | `QA_REPORT_v03_89_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_89_0.md CHANGELOG_v03_89_0.md MANIFEST_v03_89_0.md QA_REPORT_v03_89_0.md
git commit -m "ODIN V03.89.0 — додано пакет переходу в новий чат"
git push origin feature/odin-interface-v03
```
