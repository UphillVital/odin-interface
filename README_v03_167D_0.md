# README_v03_167D_0 — Controlled Write Planning Layer v1

## Призначення пакету

Додає planning layer для майбутнього controlled write.

167D не виконує real write.  
Це тільки планування scope, rollback, dry-run, QA і manual approval.

## Головне правило

```text
WRITE_PLANNING_ONLY_NO_EXECUTION
REAL_WRITE = NOT_ALLOWED
```

## Що додається

- `dev/V03/odin_controlled_write_planning_layer_v03_167D.json`;
- UI-блок `Controlled Write Planning Layer v1`;
- кнопки:
  - `Build Write Planning Layer`;
  - `Generate Sample Write Candidate`;
  - `Copy Current Output`.

## Майбутній write pipeline

```text
Write Plan
Write Plan QA Gate
Write Safety Lock
Write Dry Run
Dry Run QA Gate
Manual Approval Gate
Controlled Write Engine
Post-Write Audit
Write Completion Lock
```

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Controlled Write Planning Layer v1`.
3. Натиснути `Build Write Planning Layer`.
4. Очікувано:
   - `Status = CONTROLLED_WRITE_PLANNING_LAYER_READY`;
   - `Mode = WRITE_PLANNING_ONLY_NO_EXECUTION`;
   - `Real Write = NOT_ALLOWED`.
5. Натиснути `Generate Sample Write Candidate`.
6. Очікувано:
   - `status = WRITE_PLANNING`;
   - `operation = PATCH`;
   - `realWriteAllowed = false`;
   - `requiresPlanQa = true`;
   - `requiresDryRun = true`;
   - `requiresManualApproval = true`;
   - `rollbackPlan.required = true`.
7. Якщо `realWriteAllowed=true` — зупинитись і повернутись до 166D.
8. Якщо sample candidate виконує write — зупинитись і не переходити до 168D.

## Заборонено

- perform real write in planning layer;
- mutate Data Model in planning layer;
- execute git in planning layer;
- delete files in planning layer;
- skip write plan QA;
- skip dry run;
- skip manual approval;
- treat planning as execution;
- set `realWriteAllowed` to true.

## Наступний крок

```text
PACKAGE 168D — Controlled Write Plan QA Gate v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_controlled_write_planning_layer_v03_167D.json README_v03_167D_0.md CHANGELOG_v03_167D_0.md MANIFEST_v03_167D_0.md QA_REPORT_v03_167D_0.md
git commit -m "ODIN V03.167D — додано Controlled Write Planning Layer"
git push origin feature/odin-interface-v03
```
