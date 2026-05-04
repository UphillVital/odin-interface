# README_v03_136C_0 — Activation Readiness Lock v1

## Призначення пакету

Цей пакет фіксує readiness lock для майбутньої ручної поетапної активації adapter-layer.

## Важливо

Це НЕ активація source-of-truth.

```text
ACTIVATION_STATUS = NOT_ACTIVATED
```

## Дозволено

- manual staged activation planning;
- read-only observe stage;
- shadow compare planning;
- copy activation reports;
- prepare rollback plan.

## Заборонено

- activate source-of-truth;
- replace Control Center runtime;
- auto-migrate registry;
- auto-write data files;
- auto-delete legacy code;
- execute git;
- use invalid packages 120–123.

## Наступний крок

```text
PACKAGE 137C — Activation Rollback Plan v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_adapter_activation_strategy_v03_134C.json dev/V03/odin_adapter_activation_strategy_qa_gate_v03_135C.json dev/V03/odin_activation_readiness_lock_v03_136C.json README_v03_136C_0.md CHANGELOG_v03_136C_0.md MANIFEST_v03_136C_0.md QA_REPORT_v03_136C_0.md
git commit -m "ODIN V03.136C — зафіксовано Activation Readiness Lock"
git push origin feature/odin-interface-v03
```
