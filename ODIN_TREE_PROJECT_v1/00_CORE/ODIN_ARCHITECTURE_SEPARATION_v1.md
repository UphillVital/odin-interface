# ODIN ARCHITECTURE SEPARATION v1

## Головне розділення

```text
ODIN_TREE_PROJECT_v1 ≠ dev/V02
```

## ODIN_TREE_PROJECT_v1
Це база знань / узгоджене ядро ODIN.

Містить:
- правила;
- QA;
- workflow;
- template policy;
- документацію;
- еталони;
- статуси.

Не є:
- живим UI;
- admin panel;
- місцем запуску інтерфейсу.

## dev/V02
Це живий ODIN-ADMIN.

Містить:
- login;
- admin panel;
- дерево зліва;
- керування справа;
- sync/log/status.

Не є:
- базою знань;
- місцем системної документації.

## Правило
ODIN_TREE_PROJECT_v1 зберігає знання.
dev/V02 відображає і застосовує ці знання.
