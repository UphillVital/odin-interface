# README_v03_71_0 — Clean ODIN Lock v1

## Призначення пакету

Цей пакет додає Clean ODIN Lock у Control Center.

## Що додається

- `Clean ODIN Lock v1`;
- `Build Clean ODIN Lock`;
- `Copy Clean ODIN Lock`;
- lock statuses:
  - `CLEAN_ODIN_LOCKED`;
  - `CLEAN_ODIN_CONDITIONAL_LOCK`;
  - `CLEAN_ODIN_LOCK_BLOCKED`;
- lockScope;
- conditionalItems;
- blockedItems;
- Clean ODIN rules.

## Логіка

```text
blocked > 0      → CLEAN_ODIN_LOCK_BLOCKED
conditional > 0  → CLEAN_ODIN_CONDITIONAL_LOCK
else             → CLEAN_ODIN_LOCKED
```

## Важливо

Через `commit_builder.html` поточний lock очікувано може бути `CLEAN_ODIN_CONDITIONAL_LOCK`, поки не буде вирішено його долю.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_71_0.md` | `README_v03_71_0.md` |
| `CHANGELOG_v03_71_0.md` | `CHANGELOG_v03_71_0.md` |
| `MANIFEST_v03_71_0.md` | `MANIFEST_v03_71_0.md` |
| `QA_REPORT_v03_71_0.md` | `QA_REPORT_v03_71_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_71_0.md CHANGELOG_v03_71_0.md MANIFEST_v03_71_0.md QA_REPORT_v03_71_0.md
git commit -m "ODIN V03.71.0 — додано Clean ODIN Lock"
git push origin feature/odin-interface-v03
```
