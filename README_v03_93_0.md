# README_v03_93_0 — New Chat Start Prompt QA / Lock v1

## Призначення пакету

Цей пакет додає QA та lock для стартового промту нового чату.

## Що додається

- `Run Start Prompt QA`;
- `Copy Start Prompt QA`;
- `Build Start Prompt Lock`;
- `Copy Start Prompt Lock`;
- перевірки:
  - start command;
  - українська мова;
  - no automatic restore;
  - no automatic git;
  - README / CHANGELOG / MANIFEST / QA rule;
  - Handoff Lock section;
  - Transfer Package section;
  - snapshot integrity rule.

## Статуси

```text
START_PROMPT_QA_PASSED
START_PROMPT_QA_FAILED
START_PROMPT_LOCKED
START_PROMPT_LOCK_BLOCKED
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_93_0.md CHANGELOG_v03_93_0.md MANIFEST_v03_93_0.md QA_REPORT_v03_93_0.md
git commit -m "ODIN V03.93.0 — додано QA та Lock для New Chat Start Prompt"
git push origin feature/odin-interface-v03
```
