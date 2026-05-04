# README_v03_43_0 — External Rules JSON v1

## Призначення пакету

Цей пакет виносить стандартні правила Control Center у зовнішній JSON-файл.

## Що додається

- `dev/V03/_data/control_center_rules_v1.json`;
- завантаження правил через `fetch`;
- fallback на вбудовані правила, якщо JSON недоступний;
- `Reload External Rules`;
- Rule Editor/localStorage лишається робочим override.

## Логіка

```text
External Rules JSON = стартові правила
localStorage Rules = робочі зміни / override
Reset Rules = повернення до External Rules JSON
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/_data/control_center_rules_v1.json` | `dev/V03/_data/control_center_rules_v1.json` |
| `README_v03_43_0.md` | `README_v03_43_0.md` |
| `CHANGELOG_v03_43_0.md` | `CHANGELOG_v03_43_0.md` |
| `MANIFEST_v03_43_0.md` | `MANIFEST_v03_43_0.md` |
| `QA_REPORT_v03_43_0.md` | `QA_REPORT_v03_43_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- Rules JSON підключено;
- Rule Engine показує правила;
- Reload External Rules працює;
- Reset Rules повертає правила з JSON;
- Rule Editor далі працює;
- Run/Retry контролюються правилами.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/_data/control_center_rules_v1.json README_v03_43_0.md CHANGELOG_v03_43_0.md MANIFEST_v03_43_0.md QA_REPORT_v03_43_0.md
git commit -m "ODIN V03.43.0 — винесено правила Control Center у зовнішній JSON"
git push origin feature/odin-interface-v03
```
