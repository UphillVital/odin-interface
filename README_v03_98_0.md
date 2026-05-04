# README_v03_98_0 — Quick Settings Master Start Button v1

## Призначення пакету

Цей пакет додає дію `ODIN SYSTEM — MASTER START` у Quick Settings / системну зону Control Center.

## Що додається

- `ODIN SYSTEM — MASTER START`;
- `Copy Master Start Result`;
- Quick Settings Master Start Result;
- запуск через registry/lock:
  - Master Start Button Registry;
  - Master Start Final Lock;
  - Continuity Master Start.

## Правило

Кнопка не запускає restore автоматично.  
Вона тільки збирає контрольований Master Start package, якщо lock дозволяє.

## Умова дозволу

```text
button.enabled = true
Master Start Final Lock = MASTER_START_FINAL_LOCKED
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_98_0.md` | `README_v03_98_0.md` |
| `CHANGELOG_v03_98_0.md` | `CHANGELOG_v03_98_0.md` |
| `MANIFEST_v03_98_0.md` | `MANIFEST_v03_98_0.md` |
| `QA_REPORT_v03_98_0.md` | `QA_REPORT_v03_98_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_98_0.md CHANGELOG_v03_98_0.md MANIFEST_v03_98_0.md QA_REPORT_v03_98_0.md
git commit -m "ODIN V03.98.0 — додано кнопку Master Start у Quick Settings"
git push origin feature/odin-interface-v03
```
