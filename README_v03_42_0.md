# README_v03_42_0 — Rule Editor v1

## Призначення пакету

Цей пакет додає безпечний Rule Editor у Control Center.

## Що додається

- блок `Rule Editor`;
- додавання нового правила;
- вмикання / вимикання правил;
- `Reset Rules`;
- `Copy Rules`;
- збереження правил у `localStorage`.

## Важливо

Rule Editor v1 не виконує довільний код.  
Поля `condition` та `result` поки описові.  
Реальна логіка працює тільки через відомі `action`:

```text
block_run
allow_run
allow_retry
block_execution
reset_execution
```

## Що НЕ змінюється

- JSON dataset не змінюється;
- реального редагування файлів немає;
- runtime state лишається в localStorage.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_42_0.md` | `README_v03_42_0.md` |
| `CHANGELOG_v03_42_0.md` | `CHANGELOG_v03_42_0.md` |
| `MANIFEST_v03_42_0.md` | `MANIFEST_v03_42_0.md` |
| `QA_REPORT_v03_42_0.md` | `QA_REPORT_v03_42_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- Rule Editor відкрився;
- Disable/Enable змінює статус правила;
- Add Rule додає нове правило;
- Reset Rules повертає стандартні правила;
- Copy Rules копіює список правил.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_42_0.md CHANGELOG_v03_42_0.md MANIFEST_v03_42_0.md QA_REPORT_v03_42_0.md
git commit -m "ODIN V03.42.0 — додано Rule Editor v1 для керування правилами Control Center"
git push origin feature/odin-interface-v03
```
