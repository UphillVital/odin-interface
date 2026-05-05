# README_v03_168D_0 — Controlled Write Plan QA Gate v1

## Призначення пакету

Додає QA Gate для Controlled Write Planning Layer.

168D не виконує real write.  
Він тільки перевіряє, що write plan безпечний і готовий до майбутнього safety lock / dry-run pipeline.

## Головне правило

```text
WRITE_PLAN_QA_ONLY_NO_EXECUTION
REAL_WRITE_ALLOWED_FOR_NEXT = FALSE
```

## Що додається

- `dev/V03/odin_controlled_write_plan_qa_gate_v03_168D.json`;
- UI-блок `Controlled Write Plan QA Gate v1`;
- кнопки:
  - `Build Write Plan QA Gate`;
  - `Load Sample Write Candidate`;
  - `Run Write Plan QA`;
  - `Copy Current Output`.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Controlled Write Plan QA Gate v1`.
3. Натиснути `Build Write Plan QA Gate`.
4. Очікувано:
   - `Status = CONTROLLED_WRITE_PLAN_QA_GATE_READY`;
   - `Mode = WRITE_PLAN_QA_ONLY_NO_EXECUTION`.
5. Натиснути `Load Sample Write Candidate`.
6. Очікувано:
   - `Loaded Candidate = WRITE_PLANNING`;
   - `Operation = PATCH`;
   - `Real Write Allowed = false`;
   - `Manual Approval = true`.
7. Натиснути `Run Write Plan QA`.
8. Очікувано:
   - `status = WRITE_PLAN_QA_PASSED`;
   - `Failed = 0`;
   - `realWriteAllowedForNext = false`;
   - `nextState = WRITE_PLAN_VERIFIED`.
9. Якщо `WRITE_PLAN_QA_FAILED` — не переходити до 169D.
10. Якщо `realWriteAllowedForNext=true` — зупинка, повернення до 167D.

## Заборонено

- approve write plan with `realWriteAllowed=true`;
- approve write plan without rollback;
- approve write plan without dry run requirement;
- approve write plan without manual approval requirement;
- approve unknown operation;
- approve unknown target;
- perform real write during plan QA;
- mutate Data Model during plan QA;
- execute git during plan QA;
- delete files during plan QA.

## Наступний крок

```text
PACKAGE 169D — Controlled Write Safety Lock v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_controlled_write_plan_qa_gate_v03_168D.json README_v03_168D_0.md CHANGELOG_v03_168D_0.md MANIFEST_v03_168D_0.md QA_REPORT_v03_168D_0.md
git commit -m "ODIN V03.168D — додано Controlled Write Plan QA Gate"
git push origin feature/odin-interface-v03
```
