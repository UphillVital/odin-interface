# README_v03_83_0 — Snapshot Integrity Validator v1

## Призначення пакету

Цей пакет додає перевірку цілісності ODIN State Snapshot перед імпортом.

## Що додається

- `Validate Snapshot`;
- `Snapshot Integrity Report`;
- імпорт snapshot тепер блокується, якщо integrity validation failed;
- перевірки:
  - valid JSON;
  - correct snapshot type;
  - runtime section;
  - rules section;
  - decisions section;
  - actionQueueState;
  - safety flags;
  - manualRestoreOnly.

## Статуси

```text
SNAPSHOT_VALID
SNAPSHOT_INVALID
NOT_RUN
```

## Правило

Snapshot Restore дозволений тільки якщо:

```text
snapshotIntegrity.status = SNAPSHOT_VALID
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_83_0.md` | `README_v03_83_0.md` |
| `CHANGELOG_v03_83_0.md` | `CHANGELOG_v03_83_0.md` |
| `MANIFEST_v03_83_0.md` | `MANIFEST_v03_83_0.md` |
| `QA_REPORT_v03_83_0.md` | `QA_REPORT_v03_83_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_83_0.md CHANGELOG_v03_83_0.md MANIFEST_v03_83_0.md QA_REPORT_v03_83_0.md
git commit -m "ODIN V03.83.0 — додано Snapshot Integrity Validator"
git push origin feature/odin-interface-v03
```
