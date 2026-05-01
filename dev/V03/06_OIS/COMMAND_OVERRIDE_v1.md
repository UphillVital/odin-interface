# COMMAND OVERRIDE v1

## Core Rule

```text
DEFAULT = Smart System
OVERRIDE = Commands
```

## Initial Command Set

| Command | Meaning |
|---|---|
| ODIN | activate system context |
| CONTINUE | continue from current state |
| DISCUSS | enter discussion/design mode |
| PLAN | create plan before action |
| BUILD | create artifact/system piece |
| FIX | diagnose and repair |
| QA | verify/check |
| EXPORT | package/download result |
| LOCK | fix a rule/decision as mandatory |
| STATUS | show current state |
| MAP | show system map/navigation |
| MASTER START | launch product/system start flow |

## Command Format

```text
ODIN
COMMAND: <command>
TARGET: <system/product/file>
MODE: <mode>
OUTPUT: <expected result>
```

## Conflict Rule
If command conflicts with current state, command does not blindly execute. It triggers conflict handling.
