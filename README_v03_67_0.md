# README_v03_67_0 — System Cleanup / Integration Hardening v1

## Призначення пакету

Цей пакет додає cleanup/hardening контроль після Stable Workflow Lock.

## Що додається

- `System Cleanup / Integration Hardening v1`;
- `Build Cleanup Check`;
- `Copy Cleanup Report`;
- контроль:
  - no auto-write;
  - no auto-git;
  - UI Matrix;
  - temporary pages;
  - documentation package;
  - language switch safeguard;
  - next cleanup action.

## Важливе правило

Тимчасові/експериментальні сторінки не повинні назавжди забруднювати дерево.  
Після інтеграції функціоналу експериментальні файли треба видаляти.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_67_0.md` | `README_v03_67_0.md` |
| `CHANGELOG_v03_67_0.md` | `CHANGELOG_v03_67_0.md` |
| `MANIFEST_v03_67_0.md` | `MANIFEST_v03_67_0.md` |
| `QA_REPORT_v03_67_0.md` | `QA_REPORT_v03_67_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_67_0.md CHANGELOG_v03_67_0.md MANIFEST_v03_67_0.md QA_REPORT_v03_67_0.md
git commit -m "ODIN V03.67.0 — додано System Cleanup та Integration Hardening"
git push origin feature/odin-interface-v03
```
