# TEMPLATE CONFLICT QA v1

Purpose: Prevent conflicts between ODIN Interface, lesson templates, DT product UI, and future products.

---

## 1. Required Pre-Prototype Check

Before any first HTML prototype, verify:

- no forbidden dependence on lesson template logic;
- no duplicate UI standard;
- no conflict with DT product UI;
- no conflict with ІШ / ІССУ / ССУДТ lesson template rules;
- no hardcoded assumptions that block other templates;
- dark and light theme support planned;
- work zones mapped;
- file workspace rules included;
- MASTER START location and role defined.

---

## 2. Template Separation Rule

```text
ODIN System UI ≠ DT Product UI ≠ Lesson UI
```

They may share design DNA but must not share uncontrolled structural logic.

---

## 3. Approval Gate

Prototype is allowed only when:

```text
Architecture defined
Work zones defined
Navigation map defined
Design DNA defined
Conflict QA checklist passed
```
