# INTENT PARSER v1

## Purpose
The Intent Parser identifies what the user wants before any action is executed.

## Input Types

| Type | Example | Meaning |
|---|---|---|
| Discussion | “Поспілкуємось” | Analyze, clarify, design |
| Command | `BUILD V04.6` | Explicit system action |
| Product task | “Створи урок” | Launch product workflow |
| Fix request | “Підсвітка не працює” | Diagnose + repair |
| QA request | “Перевір” | Validate state/result |
| File request | “Покажи зміни” | File Workspace action |
| Navigation | “Де це лежить?” | Locate in System Map |
| Meta/system | “Запиши правило” | Store/update system rules |

## Parsing Order
1. Detect explicit command.
2. Detect mode declaration.
3. Detect product/system target.
4. Detect requested action.
5. Detect constraints.
6. Detect expected output.
7. Detect missing critical context.

## Command Override Rule
If an explicit command is detected, it has priority over Smart interpretation.

## Smart Intent Rule
If no command is explicit, ODIN infers intent from context and current state.
