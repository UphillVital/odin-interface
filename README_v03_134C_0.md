# README_v03_134C_0 — Adapter Activation Strategy v1

## Призначення пакету

Цей пакет додає стратегію майбутньої активації adapter-layer.

## Важливо

Source-of-truth НЕ активується.

```text
MANUAL_STAGED_ACTIVATION_ONLY
SOURCE_OF_TRUTH_NOT_ACTIVE
```

## Стратегія

1. Read-only observe.
2. Shadow compare.
3. Single-panel adapter input.
4. Source-of-truth activation — BLOCKED у цьому пакеті.

## Дозволено зараз

- read-only preview;
- copy reports;
- manual comparison;
- planning next adapter QA.

## Заборонено зараз

- activate source-of-truth;
- replace Control Center runtime;
- auto-migrate registry;
- auto-write data files;
- auto-delete legacy code;
- execute git;
- use invalid packages 120–123.

## Наступний крок

```text
PACKAGE 135C — Adapter Activation Strategy QA Gate v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_adapter_activation_strategy_v03_134C.json README_v03_134C_0.md CHANGELOG_v03_134C_0.md MANIFEST_v03_134C_0.md QA_REPORT_v03_134C_0.md
git commit -m "ODIN V03.134C — додано Adapter Activation Strategy"
git push origin feature/odin-interface-v03
```
