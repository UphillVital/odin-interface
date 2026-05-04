# README_v03_48_0 — State Package Import / Restore v1

## Призначення пакету

Цей пакет додає імпорт і відновлення State Package у Control Center.

## Що додається

- `Import State Package`;
- перевірка структури пакету;
- відновлення:
  - `runtimeState.entryState`;
  - `runtimeState.executionState`;
  - `rules.items`;
  - `history.decisionHistory`;
- оновлення Rule Validation Matrix;
- оновлення Auto Decision;
- оновлення Decision History.

## Правило безпеки

Імпорт не змінює:
- `control_center_dataset_v1.json`;
- `control_center_rules_v1.json`;
- файли проєкту.

Відновлення працює тільки через `localStorage`.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_48_0.md` | `README_v03_48_0.md` |
| `CHANGELOG_v03_48_0.md` | `CHANGELOG_v03_48_0.md` |
| `MANIFEST_v03_48_0.md` | `MANIFEST_v03_48_0.md` |
| `QA_REPORT_v03_48_0.md` | `QA_REPORT_v03_48_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- `Preview State Package`;
- `Copy State Package`;
- очистити Runtime State / Decision History;
- вставити State Package у поле;
- `Import State Package`;
- перевірити, що Entry/Execution, Rules, History відновились.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_48_0.md CHANGELOG_v03_48_0.md MANIFEST_v03_48_0.md QA_REPORT_v03_48_0.md
git commit -m "ODIN V03.48.0 — додано імпорт і відновлення State Package для Control Center"
git push origin feature/odin-interface-v03
```
