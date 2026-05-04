# README_v03_107_0 — UI Polish Lock / Consistency Checkpoint v1

## Призначення пакету

Цей пакет додає фінальний checkpoint для UI Polish / Consistency Pass.

## Що додається

- `Build UI Polish Lock`;
- `Copy UI Polish Lock`;
- об'єднана перевірка:
  - UI Polish Router;
  - UI Matrix Audit;
  - Control Center / File Workspace Alignment Audit;
  - Quick Settings / Language Switch Regression Gate;
  - language switch protection;
  - Master Start protection;
  - V03.100 locked base rule.

## Статуси

```text
UI_POLISH_LOCKED
UI_POLISH_LOCK_BLOCKED
```

## Зафіксовані UI-правила

- Quick Settings має зберігати перемикач мов.
- Quick Settings має зберігати `ODIN SYSTEM — MASTER START`.
- Master Start має залишатись gated через registry/final lock.
- Control Center і File Workspace мають виглядати як одна система.
- V03.100 locked base не ламати.
- Restore / task execution / file write / git — не запускати автоматично.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_107_0.md` | `README_v03_107_0.md` |
| `CHANGELOG_v03_107_0.md` | `CHANGELOG_v03_107_0.md` |
| `MANIFEST_v03_107_0.md` | `MANIFEST_v03_107_0.md` |
| `QA_REPORT_v03_107_0.md` | `QA_REPORT_v03_107_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_107_0.md CHANGELOG_v03_107_0.md MANIFEST_v03_107_0.md QA_REPORT_v03_107_0.md
git commit -m "ODIN V03.107.0 — зафіксовано UI Polish Lock та Consistency Checkpoint"
git push origin feature/odin-interface-v03
```
