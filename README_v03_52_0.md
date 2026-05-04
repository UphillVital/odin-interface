# README_v03_52_0 — File Diff Preview v1

## Призначення пакету

Цей пакет додає у File Workspace безпечний попередній перегляд змін.

## Що додається

- `File Diff Preview v1`;
- поля:
  - Original / before text;
  - Proposed / after text;
- `Preview Diff`;
- `Copy Diff Preview`;
- `Generate Sample From Plan`;
- summary:
  - removed;
  - added;
  - warnings;
- approvalGate = WAITING_APPROVAL.

## Правило безпеки

Diff Preview v1 нічого не записує у файли.  
Це тільки симуляційний перегляд змін перед approval gate.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_52_0.md` | `README_v03_52_0.md` |
| `CHANGELOG_v03_52_0.md` | `CHANGELOG_v03_52_0.md` |
| `MANIFEST_v03_52_0.md` | `MANIFEST_v03_52_0.md` |
| `QA_REPORT_v03_52_0.md` | `QA_REPORT_v03_52_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Перевірити:
- `Generate Sample From Plan` заповнює поля;
- `Preview Diff` формує summary;
- `Copy Diff Preview` копіює JSON;
- warnings показуються, якщо target/original/proposed неповні.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_52_0.md CHANGELOG_v03_52_0.md MANIFEST_v03_52_0.md QA_REPORT_v03_52_0.md
git commit -m "ODIN V03.52.0 — додано File Diff Preview у File Workspace"
git push origin feature/odin-interface-v03
```
