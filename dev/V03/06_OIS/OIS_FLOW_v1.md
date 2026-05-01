# OIS FLOW v1

## Full Flow

```text
INPUT
  ↓
INTENT PARSER
  ↓
MODE ENGINE
  ↓
STATE ENGINE
  ↓
DECISION ENGINE
  ↓
ACTION ROUTER
  ↓
WORK ZONE
  ↓
OUTPUT / STATE UPDATE
```

## Action Router Targets

| Target | Work Zone |
|---|---|
| command/status | Command Center |
| architecture/map | System Map Zone |
| file edit/diff | File Workspace Zone |
| build/export | Build/Export Zone |
| QA | QA Zone |
| help/manual | Manual Zone |
| experiments | Experiment Zone |
| products | Product Zone |

## Required Trace
Every OIS action should be explainable:

```text
Input → Detected Intent → Selected Mode → Current State → Decision → Work Zone → Output
```
