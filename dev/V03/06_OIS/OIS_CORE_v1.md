# OIS CORE v1

## Model

```text
INPUT → INTENT → MODE → STATE → ACTION → OUTPUT
```

## Interaction Model

```text
DEFAULT = Smart System
OVERRIDE = Commands
```

## Meaning

Smart System:
- understands user intent
- selects mode
- checks state
- recommends/executes correct next action

Command Override:
- explicit commands have priority
- commands bypass guessing
- commands still obey safety and locked rules
