# README_v03_172D_0 — Manual Approval Gate v1

## Призначення пакету

Додає Manual Approval Gate після Write Dry Run QA Gate.

172D не виконує real write.  
Навіть після simulated/manual approval у цьому пакеті `realWriteAllowed=false`.

## Головне правило

```text
MANUAL_APPROVAL_REQUIRED_NO_REAL_WRITE
```

## Що додається

- `dev/V03/odin_manual_approval_gate_v03_172D.json`;
- UI-блок `Manual Approval Gate v1`;
- кнопки:
  - `Build Manual Approval Gate`;
  - `Load Sample Dry Run QA Report`;
  - `Generate Approval Request`;
  - `Simulate Manual Approval For Next Gate`;
  - `Copy Current Output`.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Manual Approval Gate v1`.
3. Натиснути `Build Manual Approval Gate`.
4. Очікувано:
   - `Status = MANUAL_APPROVAL_GATE_READY`;
   - `Mode = MANUAL_APPROVAL_REQUIRED_NO_REAL_WRITE`;
   - `Manual Approval = true`.
5. Натиснути `Load Sample Dry Run QA Report`.
6. Очікувано:
   - `Loaded Dry Run QA = WRITE_DRY_RUN_QA_PASSED`;
   - `Failed = 0`;
   - `Next State = DRY_RUN_QA_VERIFIED`;
   - `Real Write For Next = false`.
7. Натиснути `Generate Approval Request`.
8. Очікувано:
   - `status = APPROVAL_PENDING`;
   - `manualApprovalGiven = false`;
   - `realWriteAllowed = false`;
   - `nextState = AWAITING_MANUAL_APPROVAL`.
9. Натиснути `Simulate Manual Approval For Next Gate`.
10. Очікувано:
   - `status = APPROVAL_GRANTED_FOR_NEXT_GATE`;
   - `manualApprovalGiven = true`;
   - `realWriteAllowed = false`;
   - `nextState = MANUAL_APPROVAL_VERIFIED`.
11. Якщо `realWriteAllowed=true` — не переходити до 173D.

## Заборонено

- perform real write in manual approval gate;
- set `realWriteAllowed` to true in this package;
- treat approval as execution;
- skip manual approval;
- approve failed dry run QA;
- approve dry run QA with `realWriteAllowedForNext=true`;
- execute git;
- delete files;
- mutate Data Model.

## Наступний крок

```text
PACKAGE 173D — Real Write Preflight Gate v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_manual_approval_gate_v03_172D.json README_v03_172D_0.md CHANGELOG_v03_172D_0.md MANIFEST_v03_172D_0.md QA_REPORT_v03_172D_0.md
git commit -m "ODIN V03.172D — додано Manual Approval Gate"
git push origin feature/odin-interface-v03
```
