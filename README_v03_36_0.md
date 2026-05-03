# README_v03_36_0 — Control Center Action System v1

## Призначення пакету

Цей пакет додає до Control Center симуляційний **Action System v1**.

## Що додається

- `ACTION MODEL` для кожного запису;
- кнопка `Execute v1` — симуляція дії без редагування файлів;
- кнопка `Copy Action` — копіює структурований action-контекст;
- кнопка `File Workspace` — перехід до робочої зони;
- `ACTION LOG` у верхньому блоці.

## Важливо

Action System v1 нічого не змінює у файлах. Це безпечний рівень:

```text
ПЛАН → ДІЯ → КОНТРОЛЬ
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_36_0.md` | `README_v03_36_0.md` |
| `CHANGELOG_v03_36_0.md` | `CHANGELOG_v03_36_0.md` |
| `MANIFEST_v03_36_0.md` | `MANIFEST_v03_36_0.md` |
| `QA_REPORT_v03_36_0.md` | `QA_REPORT_v03_36_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- є `ACTION MODEL` у записах;
- `Execute v1` оновлює ACTION LOG;
- `Copy Action` копіює structured action;
- `File Workspace` веде на `state_workspace.html?from=control_center&record=...`;
- фільтри працюють;
- Quick Settings має UA / EN / DE.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_36_0.md CHANGELOG_v03_36_0.md MANIFEST_v03_36_0.md QA_REPORT_v03_36_0.md
git commit -m "ODIN V03.36.0 — додано симуляційний Action System v1 для Control Center"
git push origin feature/odin-interface-v03
```
