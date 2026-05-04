# README_v03_46_0 — Decision History / Audit Trail v1

## Призначення пакету

Цей пакет додає журнал історії рішень до Control Center.

## Що додається

- `Decision History / Audit Trail`;
- збереження історії змін рішень у `localStorage`;
- `Copy Decision History`;
- `Clear Decision History`;
- історія фіксує:
  - час;
  - ID запису;
  - старе рішення;
  - нове рішення;
  - причину;
  - Entry Status;
  - Execution Status.

## Що НЕ змінюється

- Control Center dataset не змінюється;
- Rules JSON не змінюється;
- реального редагування файлів немає.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_46_0.md` | `README_v03_46_0.md` |
| `CHANGELOG_v03_46_0.md` | `CHANGELOG_v03_46_0.md` |
| `MANIFEST_v03_46_0.md` | `MANIFEST_v03_46_0.md` |
| `QA_REPORT_v03_46_0.md` | `QA_REPORT_v03_46_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- є блок Decision History / Audit Trail;
- зміни Entry/Execution створюють записи історії;
- Copy Decision History копіює JSON;
- Clear Decision History очищує журнал.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_46_0.md CHANGELOG_v03_46_0.md MANIFEST_v03_46_0.md QA_REPORT_v03_46_0.md
git commit -m "ODIN V03.46.0 — додано Decision History та Audit Trail для Control Center"
git push origin feature/odin-interface-v03
```
