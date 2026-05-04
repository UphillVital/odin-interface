# README_v03_91_0 — New Chat Handoff Lock v1

## Призначення пакету

Цей пакет додає lock-рівень для переходу в новий чат.

## Що додається

- `Build Handoff Lock`;
- `Copy Handoff Lock`;
- статуси:
  - `NEW_CHAT_HANDOFF_LOCKED`;
  - `NEW_CHAT_HANDOFF_BLOCKED`;
- startCommand;
- handoffRule;
- blockedReason;
- nextStep.

## Start command

```text
ODIN SYSTEM — CONTINUE FROM TRANSFER PACKAGE
```

## Правило

Handoff дозволений тільки якщо:

```text
New Chat Transfer Validation = TRANSFER_VALID
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_91_0.md` | `README_v03_91_0.md` |
| `CHANGELOG_v03_91_0.md` | `CHANGELOG_v03_91_0.md` |
| `MANIFEST_v03_91_0.md` | `MANIFEST_v03_91_0.md` |
| `QA_REPORT_v03_91_0.md` | `QA_REPORT_v03_91_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_91_0.md CHANGELOG_v03_91_0.md MANIFEST_v03_91_0.md QA_REPORT_v03_91_0.md
git commit -m "ODIN V03.91.0 — додано New Chat Handoff Lock"
git push origin feature/odin-interface-v03
```
