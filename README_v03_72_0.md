# README_v03_72_0 — ODIN Control Surface v1

## Призначення пакету

Цей пакет додає ODIN Control Surface у Control Center.

## Що додається

- `ODIN Control Surface v1`;
- `Build Control Surface`;
- `Copy Control Surface`;
- контрольний зріз:
  - Closed Loop;
  - Workflow Stabilization;
  - Stable Workflow Lock;
  - Cleanup / Hardening;
  - Cleanup Map;
  - Module Registry;
  - Clean ODIN Admission;
  - Clean ODIN Lock.

## Статуси

```text
CONTROL_SURFACE_READY
CONTROL_SURFACE_CONDITIONAL
CONTROL_SURFACE_BLOCKED
```

## Правило

Control Surface не змінює файли.  
Він тільки показує верхній контрольний стан ODIN і наступну дозволену дію.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_72_0.md` | `README_v03_72_0.md` |
| `CHANGELOG_v03_72_0.md` | `CHANGELOG_v03_72_0.md` |
| `MANIFEST_v03_72_0.md` | `MANIFEST_v03_72_0.md` |
| `QA_REPORT_v03_72_0.md` | `QA_REPORT_v03_72_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_72_0.md CHANGELOG_v03_72_0.md MANIFEST_v03_72_0.md QA_REPORT_v03_72_0.md
git commit -m "ODIN V03.72.0 — додано ODIN Control Surface"
git push origin feature/odin-interface-v03
```
