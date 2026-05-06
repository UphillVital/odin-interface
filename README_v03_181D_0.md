# README_v03_181D_0 — Protected Write Recovery Plan v1

## Призначення пакету

Додає recovery plan після Protected Write System Checkpoint 180D.

181D не виконує mutation/write.  
Він описує безпечний recovery pipeline для sandbox write / protected write chain.

## Головне правило

```text
RECOVERY_PLAN_ONLY_NO_MUTATION
REAL_WRITE_RECOVERY_ALLOWED = FALSE
PRODUCTION_MUTATION_ALLOWED = FALSE
```

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Protected Write Recovery Plan v1`.
3. Натиснути `Build Recovery Plan`.
4. Очікувано:
   - `Status = PROTECTED_WRITE_RECOVERY_PLAN_READY`;
   - `Rollback = true`;
   - `Real Write Recovery = false`.
5. Натиснути `Simulate Recovery Scenario`.
6. Очікувано:
   - `status = RECOVERY_SCENARIO_SIMULATED`;
   - `productionAffected = false`;
   - `rollbackAvailable = true`.
7. Натиснути `Run Recovery Plan QA`.
8. Очікувано:
   - `status = RECOVERY_PLAN_QA_PASSED`;
   - `Failed = 0`;
   - `realWriteRecoveryAllowed = false`;
   - `automaticProductionMutationAllowed = false`.
9. Натиснути `Generate Recovery Report`.
10. Очікувано:
   - `status = RECOVERY_REPORT_READY`;
   - `productionMutationPerformed = false`;
   - `immutableRegistryMutationPerformed = false`;
   - `runtimeProtectedMutationPerformed = false`.
11. Якщо recovery дозволяє production mutation — зупинка, повернення до 180D.

## Наступний крок

```text
PACKAGE 182D — Protected Write Recovery QA Gate v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_protected_write_recovery_plan_v03_181D.json README_v03_181D_0.md CHANGELOG_v03_181D_0.md MANIFEST_v03_181D_0.md QA_REPORT_v03_181D_0.md
git commit -m "ODIN V03.181D — додано Protected Write Recovery Plan"
git push origin feature/odin-interface-v03
```
