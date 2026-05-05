# README_v03_171D_0 — Write Dry Run QA Gate v1

## Призначення пакету

Додає QA Gate для Write Dry Run Engine.

171D не виконує real write.  
Він тільки перевіряє, що dry-run simulation безпечна і sandbox preview сформовано.

## Головне правило

```text
DRY_RUN_QA_ONLY_NO_REAL_WRITE
REAL_WRITE_ALLOWED_FOR_NEXT = FALSE
```

## Що додається

- `dev/V03/odin_write_dry_run_qa_gate_v03_171D.json`;
- UI-блок `Write Dry Run QA Gate v1`;
- кнопки:
  - `Build Write Dry Run QA Gate`;
  - `Load Sample Dry Run Report`;
  - `Run Write Dry Run QA`;
  - `Copy Current Output`.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Write Dry Run QA Gate v1`.
3. Натиснути `Build Write Dry Run QA Gate`.
4. Очікувано:
   - `Status = WRITE_DRY_RUN_QA_GATE_READY`;
   - `Mode = DRY_RUN_QA_ONLY_NO_REAL_WRITE`.
5. Натиснути `Load Sample Dry Run Report`.
6. Очікувано:
   - `Loaded Dry Run = WRITE_DRY_RUN_PASSED`;
   - `Failed = 0`;
   - `Sandbox Preview = true`;
   - `Real Write = false`.
7. Натиснути `Run Write Dry Run QA`.
8. Очікувано:
   - `status = WRITE_DRY_RUN_QA_PASSED`;
   - `Failed = 0`;
   - `realWriteAllowedForNext = false`;
   - `nextState = DRY_RUN_QA_VERIFIED`.
9. Перевірити, що:
   - `realWritePerformed=false`;
   - `dataModelMutated=false`;
   - `sandboxPreviewGenerated=true`;
   - `gitExecuted=false`;
   - `deletePerformed=false`.
10. Якщо будь-який safety-прапор неправильний — не переходити до 172D.

## Заборонено

- accept dry run if `realWritePerformed=true`;
- accept dry run if `dataModelMutated=true`;
- accept dry run if `sandboxPreviewGenerated=false`;
- accept dry run if `gitExecuted=true`;
- accept dry run if `deletePerformed=true`;
- promote dry run to real write execution;
- skip dry run QA;
- bypass manual approval gate.

## Наступний крок

```text
PACKAGE 172D — Manual Approval Gate v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_write_dry_run_qa_gate_v03_171D.json README_v03_171D_0.md CHANGELOG_v03_171D_0.md MANIFEST_v03_171D_0.md QA_REPORT_v03_171D_0.md
git commit -m "ODIN V03.171D — додано Write Dry Run QA Gate"
git push origin feature/odin-interface-v03
```
