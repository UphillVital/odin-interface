# README_v03_161D_0 — Action Queue System v1

## Призначення пакету

Додає чергу контрольованих дій після Controlled Action Request Layer.

Це НЕ execution engine.  
Це тільки queue-system для review / validation / QA / approval.

## Головне правило

```text
REQUEST → QUEUE → REVIEW → VALIDATION → QA → APPROVAL
NO EXECUTION IN 161D
```

## Що додається

- `dev/V03/odin_action_queue_system_v03_161D.json`;
- UI-блок `Action Queue System v1`;
- кнопки:
  - `Build Action Queue System`;
  - `Generate Sample Queue Item`;
  - `Copy Queue System`.

## Queue states

```text
PENDING_REVIEW
IN_REVIEW
VALIDATION_REQUIRED
QA_REQUIRED
APPROVED_FOR_EXECUTION
REJECTED
ARCHIVED
```

## Важливо

`APPROVED_FOR_EXECUTION` ще не означає виконано.  
Execution engine буде окремим пакетом після validation/QA.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Action Queue System v1`.
3. Натиснути `Build Action Queue System`.
4. Очікувано:
   - `Status = ACTION_QUEUE_SYSTEM_READY`;
   - `Mode = QUEUE_ONLY_NO_EXECUTION`;
   - `States = 7`.
5. Натиснути `Generate Sample Queue Item`.
6. Очікувано:
   - `status = PENDING_REVIEW`;
   - `type = WRITE_CANDIDATE`;
   - `executionAllowed = false`;
   - `requiresValidation = true`;
   - `requiresQa = true`.
7. Перевірити `history`: має бути запис про створення `PENDING_REVIEW`.
8. Перевірити `blockedActions`:
   - execute queued action;
   - skip queue;
   - skip validation;
   - skip QA;
   - change executionAllowed to true;
   - direct data model mutation;
   - execute git;
   - delete data model files.
9. Якщо queued action виконується напряму — зупинитись і повернутись до 160D.

## Наступний крок

```text
PACKAGE 162D — Action Validator v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_action_queue_system_v03_161D.json README_v03_161D_0.md CHANGELOG_v03_161D_0.md MANIFEST_v03_161D_0.md QA_REPORT_v03_161D_0.md
git commit -m "ODIN V03.161D — додано Action Queue System"
git push origin feature/odin-interface-v03
```
