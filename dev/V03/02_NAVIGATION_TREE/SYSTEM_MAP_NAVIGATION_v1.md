# SYSTEM MAP AS NAVIGATION v1

Status: mandatory ODIN Interface principle

---

## 1. Core Principle

Navigation must not be a passive list.

```text
SYSTEM MAP = NAVIGATION + RELATIONSHIPS + DEPENDENCIES
```

---

## 2. Requirements

The system map must show:

- system layers;
- products;
- modules;
- work zones;
- files;
- dependencies;
- active state;
- blocked or risky areas.

---

## 3. Initial Tree

```text
ODIN Interface V03
├─ Command Center
├─ MASTER START
├─ System Map
│  ├─ ODIN Core
│  ├─ OIS
│  ├─ Engine
│  ├─ Pipeline
│  ├─ QA / СЯ
│  ├─ File Workspace
│  └─ Design System
├─ Products
│  └─ Deutsch Trainer
├─ Lessons
│  ├─ ІШ
│  ├─ ІССУ
│  └─ ССУДТ
├─ Modules
├─ Experiments
├─ Decisions / Locks
├─ Packages
└─ Manual / Help
```

---

## 4. Click Behavior

Clicking a node must activate the correct Work Zone and update the Context Panel.

Example:

```text
Click: File Workspace
→ Main Work Zone: Editor/Diff/Approval
→ Context Panel: rules, dependencies, risks
```

---

## 5. Assisted Navigation

If a user selects a complex node, ODIN should explain:

- what it is;
- what it affects;
- what can be done here;
- recommended next step.
