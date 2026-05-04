# README_v03_50_0 — File Workspace Context Receiver v1

## Призначення пакету

Цей пакет додає приймач контексту у File Workspace (`state_workspace.html`).

## Що додається

- прийом `record` через URL:
  - `state_workspace.html?from=control_center&record=...`
- поле для вставки Bridge Package JSON;
- `Load Bridge JSON`;
- `Copy Workspace Task`;
- формування безпечної задачі для роботи з файлами;
- без реального редагування файлів.

## Логіка

Control Center формує Bridge Package.  
File Workspace приймає Bridge Package і створює Safe File Workspace Task.

```text
Control Center → Bridge Package → File Workspace → Safe Task
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_50_0.md` | `README_v03_50_0.md` |
| `CHANGELOG_v03_50_0.md` | `CHANGELOG_v03_50_0.md` |
| `MANIFEST_v03_50_0.md` | `MANIFEST_v03_50_0.md` |
| `QA_REPORT_v03_50_0.md` | `QA_REPORT_v03_50_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Перевірити:
- з Control Center кнопка `File Workspace` відкриває `state_workspace.html?...record=...`;
- State Workspace показує Record ID;
- вставити Bridge Package JSON;
- `Load Bridge JSON` завантажує контекст;
- `Copy Workspace Task` копіює safe task.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_50_0.md CHANGELOG_v03_50_0.md MANIFEST_v03_50_0.md QA_REPORT_v03_50_0.md
git commit -m "ODIN V03.50.0 — додано File Workspace Context Receiver"
git push origin feature/odin-interface-v03
```
