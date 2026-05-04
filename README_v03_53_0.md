# README_v03_53_0 — Approval Gate UI v1

## Призначення пакету

Цей пакет додає ручний Approval Gate у File Workspace.

## Що додається

- `Approval Gate UI v1`;
- кнопка `Approve`;
- кнопка `Reject`;
- поле коментаря;
- `Copy Approval Report`;
- збереження approval state у `localStorage`;
- approval state інтегрується у:
  - File Change Plan;
  - File Diff Preview;
  - Approval Report.

## Правило безпеки

Жодна наступна implementation/action стадія не дозволена, якщо:

```text
approval.status !== APPROVED
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_53_0.md` | `README_v03_53_0.md` |
| `CHANGELOG_v03_53_0.md` | `CHANGELOG_v03_53_0.md` |
| `MANIFEST_v03_53_0.md` | `MANIFEST_v03_53_0.md` |
| `QA_REPORT_v03_53_0.md` | `QA_REPORT_v03_53_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Перевірити:
- Approval Status спочатку WAITING_APPROVAL;
- Approve змінює статус на APPROVED;
- Reject змінює статус на REJECTED;
- Copy Approval Report копіює JSON;
- Change Plan / Diff Preview містять approvalGate.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_53_0.md CHANGELOG_v03_53_0.md MANIFEST_v03_53_0.md QA_REPORT_v03_53_0.md
git commit -m "ODIN V03.53.0 — додано Approval Gate UI у File Workspace"
git push origin feature/odin-interface-v03
```
