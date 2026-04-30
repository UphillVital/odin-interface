# ODIN SYSTEM MAP v1

## Top Level

ODIN = Core System  
Deutsch Trainer = Product built on ODIN

```text
ODIN CORE
├─ OIS — ODIN Interaction System
├─ Engine
├─ Pipeline
├─ UI System
├─ QA System
├─ File Workspace
├─ Product Layer
│  └─ Deutsch Trainer
├─ Lesson Systems
│  ├─ ІШ
│  ├─ ССУДТ
│  └─ ІССУ
├─ Documentation
├─ Experiments
└─ Packages
```

## Key Separation

ODIN Interface is not the same as a lesson template.

- Lesson Template = product learning page
- ODIN Interface = control workspace for system management

## Design Relationship

The lesson template may provide visual DNA:
- dark theme
- harmony
- cards
- glow
- clear sections
- smooth controls

But the control interface must have its own architecture and must not reuse lesson structure blindly.
