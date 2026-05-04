# README_v03_120R_0 — Rollback Lock / Invalid Branch Cut v1

## Призначення пакету

Цей пакет фіксує відкат після проблемної гілки PACKAGE 120–123.

## Валідна база

```text
ODIN_V03_PACKAGE_119_0_V03_118_COMBINED_STABILITY_CHECKPOINT_V1.zip
```

## Недійсні пакети

```text
ODIN_V03_PACKAGE_120_0_DATA_MODEL_HARDENING_ROUTER_V1.zip
ODIN_V03_PACKAGE_121_0_UNIFIED_DATA_MODEL_SCHEMA_V1.zip
ODIN_V03_PACKAGE_122_0_DATA_MODEL_SCHEMA_VALIDATOR_V1.zip
ODIN_V03_PACKAGE_123_0_DATA_MODEL_REGISTRY_MIGRATION_MAP_V1.zip
```

## Причина

PACKAGE 120 був аварійно перезібраний мінімальним stub-файлом після збою передачі.  
PACKAGE 121–123 були побудовані вже від пошкодженої гілки.

## Правило

Продовжувати тільки з PACKAGE 119 або з цього rollback-lock пакету, який базується на PACKAGE 119.

## Наступний правильний крок

```text
PACKAGE 120C — Corrected Data Model Hardening Router from Stable Base v1
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_120R_0.md` | `README_v03_120R_0.md` |
| `CHANGELOG_v03_120R_0.md` | `CHANGELOG_v03_120R_0.md` |
| `MANIFEST_v03_120R_0.md` | `MANIFEST_v03_120R_0.md` |
| `QA_REPORT_v03_120R_0.md` | `QA_REPORT_v03_120R_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_120R_0.md CHANGELOG_v03_120R_0.md MANIFEST_v03_120R_0.md QA_REPORT_v03_120R_0.md
git commit -m "ODIN V03.120R — зафіксовано відкат до PACKAGE 119"
git push origin feature/odin-interface-v03
```
