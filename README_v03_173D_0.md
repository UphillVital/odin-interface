# README_v03_173D_0 — Real Write Preflight Gate v1

## Призначення пакету

Додає Real Write Preflight Gate після Manual Approval Gate.

173D не виконує real write.  
Він лише перевіряє, що всі умови перед майбутнім Controlled Write Engine виконані.

## Головне правило

```text
PREFLIGHT_ONLY_NO_REAL_WRITE
REAL_WRITE_ALLOWED_FOR_ENGINE = FALSE
```

## Що додається

- `dev/V03/odin_real_write_preflight_gate_v03_173D.json`;
- UI-блок `Real Write Preflight Gate v1`;
- кнопки:
  - `Build Real Write Preflight Gate`;
  - `Load Sample Manual Approval Report`;
  - `Run Real Write Preflight`;
  - `Copy Current Output`.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Real Write Preflight Gate v1`.
3. Натиснути `Build Real Write Preflight Gate`.
4. Очікувано:
   - `Status = REAL_WRITE_PREFLIGHT_GATE_READY`;
   - `Mode = PREFLIGHT_ONLY_NO_REAL_WRITE`;
   - `Real Write = false`.
5. Натиснути `Load Sample Manual Approval Report`.
6. Очікувано:
   - `Loaded Approval = APPROVAL_GRANTED_FOR_NEXT_GATE`;
   - `Manual Approval = true`;
   - `Real Write = false`;
   - `Next State = MANUAL_APPROVAL_VERIFIED`.
7. Натиснути `Run Real Write Preflight`.
8. Очікувано:
   - `status = REAL_WRITE_PREFLIGHT_PASSED`;
   - `Failed = 0`;
   - `realWriteAllowedForEngine = false`;
   - `nextState = PREFLIGHT_VERIFIED`.
9. Якщо `realWriteAllowedForEngine=true` — не переходити до 174D.

## Заборонено

- perform real write in preflight gate;
- set `realWriteAllowedForEngine` to true in this package;
- skip manual approval verification;
- skip dry run QA verification;
- skip rollback plan requirement;
- skip pre-write audit;
- skip post-write audit;
- execute git;
- delete files;
- mutate Data Model.

## Наступний крок

```text
PACKAGE 174D — Controlled Write Engine Preview v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_real_write_preflight_gate_v03_173D.json README_v03_173D_0.md CHANGELOG_v03_173D_0.md MANIFEST_v03_173D_0.md QA_REPORT_v03_173D_0.md
git commit -m "ODIN V03.173D — додано Real Write Preflight Gate"
git push origin feature/odin-interface-v03
```
