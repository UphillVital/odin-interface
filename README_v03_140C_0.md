# README_v03_140C_0 — Controlled Activation Entry Gate v1

## Призначення пакету

Цей пакет додає вхідний gate для ручної контрольованої підготовки до активації.

## Важливо

Цей пакет НЕ активує source-of-truth.

```text
ACTIVATION_STATUS = NOT_ACTIVATED
ENTRY_MODE = MANUAL_PRE_ACTIVATION_GATE_ONLY
```

## Дозволено

- manual readiness review;
- manual rollback review;
- manual activation checklist preparation;
- copy gate report.

## Заборонено

- activate source-of-truth;
- replace runtime;
- auto migrate data;
- write files;
- delete files;
- execute git;
- use invalid packages 120–123.

## Наступний крок

```text
PACKAGE 141C — Manual Activation Checklist v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_controlled_activation_entry_gate_v03_140C.json README_v03_140C_0.md CHANGELOG_v03_140C_0.md MANIFEST_v03_140C_0.md QA_REPORT_v03_140C_0.md
git commit -m "ODIN V03.140C — додано Controlled Activation Entry Gate"
git push origin feature/odin-interface-v03
```
