# README_v03_111_0 — Commit Builder Function Extraction Plan v1

## Призначення пакету

Цей пакет додає план витягнення корисної функціональності з `commit_builder.html`.

## Що додається

- `Build Commit Builder Extraction Plan`;
- `Copy Extraction Plan`;
- extraction items:
  - git command draft generation;
  - commit message composition;
  - included files list builder;
  - copy git commands;
  - standalone page removal candidate.

## Головне правило

`commit_builder.html` НЕ видаляється у цьому пакеті.

```text
extract plan → integration draft → QA → only then possible delete package
```

## Заборони

- Не виконувати git.
- Не stage файли автоматично.
- Не видаляти commit_builder.html.
- Не ламати V03.100 locked base.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_111_0.md` | `README_v03_111_0.md` |
| `CHANGELOG_v03_111_0.md` | `CHANGELOG_v03_111_0.md` |
| `MANIFEST_v03_111_0.md` | `MANIFEST_v03_111_0.md` |
| `QA_REPORT_v03_111_0.md` | `QA_REPORT_v03_111_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_111_0.md CHANGELOG_v03_111_0.md MANIFEST_v03_111_0.md QA_REPORT_v03_111_0.md
git commit -m "ODIN V03.111.0 — додано план витягнення функцій Commit Builder"
git push origin feature/odin-interface-v03
```
