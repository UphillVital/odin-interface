# README_v03_121_0 — Unified Data Model Schema v1

## Призначення пакету

Цей пакет додає першу єдину схему даних ODIN.

## Що додається

- `dev/V03/odin_unified_data_model_schema_v1.json`;
- оновлений `control_center.html` з переглядом / копіюванням schema;
- core types:
  - module;
  - record;
  - gate;
  - lock;
  - check;
  - action;
- unified record shape;
- safety rules;
- migration targets.

## Головний принцип

```text
LOGIC → DATA MODEL → UI
```

А не:

```text
UI → scattered JS logic
```

## Наступний крок

```text
PACKAGE 122 — Data Model Schema Validator v1
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `dev/V03/odin_unified_data_model_schema_v1.json` | `dev/V03/odin_unified_data_model_schema_v1.json` |
| `README_v03_121_0.md` | `README_v03_121_0.md` |
| `CHANGELOG_v03_121_0.md` | `CHANGELOG_v03_121_0.md` |
| `MANIFEST_v03_121_0.md` | `MANIFEST_v03_121_0.md` |
| `QA_REPORT_v03_121_0.md` | `QA_REPORT_v03_121_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_unified_data_model_schema_v1.json README_v03_121_0.md CHANGELOG_v03_121_0.md MANIFEST_v03_121_0.md QA_REPORT_v03_121_0.md
git commit -m "ODIN V03.121.0 — додано Unified Data Model Schema"
git push origin feature/odin-interface-v03
```
