# README_v03_68_0 — Cleanup Map / Integration Registry v1

## Призначення пакету

Цей пакет додає Cleanup Map / Integration Registry у Control Center.

## Що додається

- `Cleanup Map / Integration Registry v1`;
- `Build Cleanup Map`;
- `Copy Cleanup Map`;
- registry для:
  - `control_center.html`;
  - `state_workspace.html`;
  - `commit_builder.html`;
  - `control_center_dataset_v1.json`;
  - `control_center_rules_v1.json`;
- actions для подальшого cleanup/integration.

## Головне правило

Standalone / experimental pages не повинні залишатися постійним сміттям у дереві.

```text
temporary page → extract useful functionality → integrate → delete temporary file
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_68_0.md` | `README_v03_68_0.md` |
| `CHANGELOG_v03_68_0.md` | `CHANGELOG_v03_68_0.md` |
| `MANIFEST_v03_68_0.md` | `MANIFEST_v03_68_0.md` |
| `QA_REPORT_v03_68_0.md` | `QA_REPORT_v03_68_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_68_0.md CHANGELOG_v03_68_0.md MANIFEST_v03_68_0.md QA_REPORT_v03_68_0.md
git commit -m "ODIN V03.68.0 — додано Cleanup Map та Integration Registry"
git push origin feature/odin-interface-v03
```
