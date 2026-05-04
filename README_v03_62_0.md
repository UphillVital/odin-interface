# README_v03_62_0 — Control Center Integration Summary v1

## Призначення пакету

Цей пакет додає зворотний summary-flow між File Workspace і Control Center.

## Що додається

### У File Workspace

- `Build Integration Summary`;
- `Copy Integration Summary`;
- summary містить:
  - lockStatus;
  - gates;
  - blocked;
  - safety;
  - nextAllowedStep;
  - sourceSystemLock.

### У Control Center

- блок `File Workspace Integration Result`;
- `Import Integration Summary`;
- `Copy Integration Result`;
- `Clear Integration Result`;
- збереження result у localStorage.

## Правило безпеки

Integration Summary не є реальним виконанням файлів.  
Це контрольований результат workflow для повернення в Control Center.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_62_0.md` | `README_v03_62_0.md` |
| `CHANGELOG_v03_62_0.md` | `CHANGELOG_v03_62_0.md` |
| `MANIFEST_v03_62_0.md` | `MANIFEST_v03_62_0.md` |
| `QA_REPORT_v03_62_0.md` | `QA_REPORT_v03_62_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/state_workspace.html
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- у File Workspace працює `Copy Integration Summary`;
- у Control Center можна вставити summary;
- `Import Integration Summary` показує status/lock/next/blocked;
- Copy/Clear Integration Result працюють.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_62_0.md CHANGELOG_v03_62_0.md MANIFEST_v03_62_0.md QA_REPORT_v03_62_0.md
git commit -m "ODIN V03.62.0 — додано Integration Summary між File Workspace і Control Center"
git push origin feature/odin-interface-v03
```
