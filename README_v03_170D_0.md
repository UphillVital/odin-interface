# README_v03_170D_0 — Write Dry Run Engine v1

## Призначення пакету

Додає Write Dry Run Engine після Controlled Write Safety Lock.

170D не виконує real write.  
Він створює sandbox/preview report для майбутнього controlled write.

## Головне правило

```text
DRY_RUN_ONLY_NO_REAL_WRITE
REAL_WRITE = FALSE
DATA_MODEL_MUTATION = FALSE
```

## Що додається

- `dev/V03/odin_write_dry_run_engine_v03_170D.json`;
- UI-блок `Write Dry Run Engine v1`;
- кнопки:
  - `Build Write Dry Run Engine`;
  - `Load Sample Write Candidate`;
  - `Run Write Dry Run`;
  - `Copy Current Output`.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Write Dry Run Engine v1`.
3. Натиснути `Build Write Dry Run Engine`.
4. Очікувано:
   - `Status = WRITE_DRY_RUN_ENGINE_READY`;
   - `Mode = DRY_RUN_ONLY_NO_REAL_WRITE`;
   - `Real Write = false`.
5. Натиснути `Load Sample Write Candidate`.
6. Очікувано:
   - `Loaded Candidate = WRITE_PLAN_VERIFIED`;
   - `Operation = PATCH`;
   - `Real Write Allowed = false`;
   - `Rollback = true`.
7. Натиснути `Run Write Dry Run`.
8. Очікувано:
   - `status = WRITE_DRY_RUN_PASSED`;
   - `Failed = 0`;
   - `realWritePerformed = false`;
   - `dataModelMutated = false`;
   - `sandboxPreviewGenerated = true`;
   - `gitExecuted = false`;
   - `deletePerformed = false`;
   - `nextState = DRY_RUN_VERIFIED`.
9. Якщо будь-який real write/mutation/git/delete прапор = true — не переходити до 171D.

## Заборонено

- perform real write during dry run;
- mutate Data Model during dry run;
- execute git during dry run;
- delete files during dry run;
- skip rollback check;
- skip manual approval requirement;
- treat dry run as real execution;
- set `realWriteAllowed` to true.

## Наступний крок

```text
PACKAGE 171D — Write Dry Run QA Gate v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_write_dry_run_engine_v03_170D.json README_v03_170D_0.md CHANGELOG_v03_170D_0.md MANIFEST_v03_170D_0.md QA_REPORT_v03_170D_0.md
git commit -m "ODIN V03.170D — додано Write Dry Run Engine"
git push origin feature/odin-interface-v03
```
