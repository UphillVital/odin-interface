# README_v03_70_0 — Clean ODIN Admission Gate v1

## Призначення пакету

Цей пакет додає Clean ODIN Admission Gate у Control Center.

## Що додається

- `Clean ODIN Admission Gate v1`;
- `Build Admission Gate`;
- `Copy Admission Gate`;
- admission statuses:
  - `ADMITTED`;
  - `CONDITIONAL`;
  - `BLOCKED`;
- cleanOdinRules;
- nextStep для очищення системи.

## Логіка

```text
APPROVED_ACTIVE → ADMITTED
TEMPORARY_REVIEW → CONDITIONAL
missing required fields → BLOCKED
```

## Важливо

`commit_builder.html` поки залишається умовним модулем.  
Його функціональність треба пізніше інтегрувати або видалити файл після перенесення корисного функціоналу.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_70_0.md` | `README_v03_70_0.md` |
| `CHANGELOG_v03_70_0.md` | `CHANGELOG_v03_70_0.md` |
| `MANIFEST_v03_70_0.md` | `MANIFEST_v03_70_0.md` |
| `QA_REPORT_v03_70_0.md` | `QA_REPORT_v03_70_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_70_0.md CHANGELOG_v03_70_0.md MANIFEST_v03_70_0.md QA_REPORT_v03_70_0.md
git commit -m "ODIN V03.70.0 — додано Clean ODIN Admission Gate"
git push origin feature/odin-interface-v03
```
