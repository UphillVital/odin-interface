# README_v03_160D_0 — Controlled Action Request Layer v1

## Призначення пакету

Додає перший шар контрольованих action requests.

Це НЕ execution engine.  
Це тільки шар створення запиту на дію.

## Головне правило

```text
UI MAY REQUEST
UI MAY NOT EXECUTE WRITE
```

## Що додається

- `dev/V03/odin_controlled_action_request_layer_v03_160D.json`;
- UI-блок `Controlled Action Request Layer v1`;
- кнопки:
  - `Build Action Request Layer`;
  - `Generate Sample Action Request`;
  - `Copy Action Request Layer`.

## Життєвий цикл request

```text
DRAFT → PENDING_REVIEW → VALIDATION_REQUIRED → QA_REQUIRED → APPROVED_FOR_EXECUTION → REJECTED / ARCHIVED
```

## Дозволено

- створити контрольований request;
- створити READ/COPY request;
- створити WRITE_CANDIDATE request як запит;
- скопіювати request для аналізу.

## Заборонено

- execute write request directly;
- change `executionAllowed` to true from UI;
- skip validation;
- skip QA;
- bypass Action Request Layer;
- bypass Runtime Interaction Lock;
- bypass active Data Model;
- execute git;
- delete data model files.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Перед цим бажано в блоці `System Audit Engine v1` натиснути `Run System Audit`.
3. Очікувано:
   - `SYSTEM_SECURE`;
   - `Failed = 0`.
4. Знайти блок `Controlled Action Request Layer v1`.
5. Натиснути `Build Action Request Layer`.
6. Очікувано:
   - `Status = CONTROLLED_ACTION_REQUEST_LAYER_READY`;
   - `Mode = REQUEST_ONLY_NO_EXECUTION`.
7. Натиснути `Generate Sample Action Request`.
8. Очікувано:
   - `status = PENDING_REVIEW`;
   - `type = WRITE_CANDIDATE`;
   - `requiresValidation = true`;
   - `requiresQa = true`;
   - `executionAllowed = false`.
9. Перевірити, що sample request не виконує жодного запису.
10. Якщо `executionAllowed=true` або щось записується автоматично — зупинка, повернення до 159D.

## Наступний крок

```text
PACKAGE 161D — Action Queue System v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_controlled_action_request_layer_v03_160D.json README_v03_160D_0.md CHANGELOG_v03_160D_0.md MANIFEST_v03_160D_0.md QA_REPORT_v03_160D_0.md
git commit -m "ODIN V03.160D — додано Controlled Action Request Layer"
git push origin feature/odin-interface-v03
```
