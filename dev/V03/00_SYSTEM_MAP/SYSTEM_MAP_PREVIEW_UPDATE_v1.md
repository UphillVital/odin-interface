# SYSTEM MAP UPDATE — PREVIEW SYSTEM v1

## Новий вузол

ODIN → File Workspace → Internal Previewer

## Зв'язки

- File Workspace передає поточний вміст у Previewer.
- Previewer повертає візуальний стан: ready / generated / unsupported / error.
- Workflow використовує Preview як крок перед Approve.

## Правило

Preview System є частиною контрольованого циклу роботи з файлами, а не окремою декоративною сторінкою.
