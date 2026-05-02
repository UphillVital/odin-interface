# STATE_WORKFLOW.md

## Життєвий цикл

```text
Package → Test → Approve → Commit → Tag → Changelog → State Registry → State Workspace
```

## Коли ODIN має пропонувати State

- після статусу Workflow = Approved;
- після важливого UI lock;
- після завершення великої підсистеми;
- перед початком ризикової інтеграції.

## Restore Workflow

```text
View State → Generate Restore Commands → User runs commands manually
```
