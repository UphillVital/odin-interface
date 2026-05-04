# README_v03_82_0 — ODIN State Snapshot Import / Restore v1

## Призначення пакету

Цей пакет додає імпорт і відновлення повного ODIN State Snapshot.

## Що додається

- `Import ODIN State Snapshot`;
- `Clear Snapshot Box`;
- snapshot textarea тепер працює як export/import поле;
- імпорт відновлює:
  - runtime entry/execution state;
  - rules;
  - decision history;
  - integration result;
  - action queue;
  - action archive.

## Правило безпеки

Snapshot Import не виконує задачі, не пише файли і не запускає git.  
Він тільки відновлює локальний стан у `localStorage`.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_82_0.md` | `README_v03_82_0.md` |
| `CHANGELOG_v03_82_0.md` | `CHANGELOG_v03_82_0.md` |
| `MANIFEST_v03_82_0.md` | `MANIFEST_v03_82_0.md` |
| `QA_REPORT_v03_82_0.md` | `QA_REPORT_v03_82_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- Build ODIN State Snapshot;
- скопіювати snapshot;
- очистити runtime/queue або відкрити в іншому браузері;
- вставити snapshot;
- Import ODIN State Snapshot;
- перевірити відновлення queue/archive/runtime/integration.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_82_0.md CHANGELOG_v03_82_0.md MANIFEST_v03_82_0.md QA_REPORT_v03_82_0.md
git commit -m "ODIN V03.82.0 — додано імпорт і відновлення ODIN State Snapshot"
git push origin feature/odin-interface-v03
```
