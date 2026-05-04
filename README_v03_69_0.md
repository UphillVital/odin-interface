# README_v03_69_0 — Module Ownership / Entry Control Registry v1

## Призначення пакету

Цей пакет додає реєстр модулів і entry control для допуску в Чистий ОДІН.

## Що додається

- `Module Ownership / Entry Control Registry v1`;
- `Build Module Registry`;
- `Copy Module Registry`;
- реєстр модулів:
  - Control Center;
  - File Workspace;
  - Commit Builder;
  - Control Center Dataset;
  - Rules JSON;
- entry control:
  - entryGate;
  - cleanOdinAdmission;
  - note.

## Принцип

Кожен модуль повинен мати:

```text
name
purpose
owner
dependencies
entryGate
status
```

Без цього модуль не вважається повністю допущеним у Чистий ОДІН.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_69_0.md` | `README_v03_69_0.md` |
| `CHANGELOG_v03_69_0.md` | `CHANGELOG_v03_69_0.md` |
| `MANIFEST_v03_69_0.md` | `MANIFEST_v03_69_0.md` |
| `QA_REPORT_v03_69_0.md` | `QA_REPORT_v03_69_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_69_0.md CHANGELOG_v03_69_0.md MANIFEST_v03_69_0.md QA_REPORT_v03_69_0.md
git commit -m "ODIN V03.69.0 — додано Module Ownership та Entry Control Registry"
git push origin feature/odin-interface-v03
```
