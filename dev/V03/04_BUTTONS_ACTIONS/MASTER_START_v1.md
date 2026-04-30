# ODIN SYSTEM — MASTER START v1

## Button Name

`ODIN SYSTEM — MASTER START`

## Purpose

Generate and launch the correct ODIN start package by rules.

## Behavior

1. User opens Command Center.
2. User selects product/system variant from ODIN Product List.
3. System checks:
   - selected product
   - required files
   - current state
   - workflow rules
   - locked rules
4. System generates correct MASTER START package.
5. System launches workflow end-to-end.
6. System reports result.

## Product Selection

Initial variants:
- ODIN Core
- ODIN Interface
- Deutsch Trainer
- Lesson System
- ISSU Photo Lesson
- Recovery / Revival Package
- QA / Validation Package

## No Fake Logic Rule

The button must not pretend to work.

If the action cannot be executed, it must show:
- what is missing
- what is blocked
- what must be prepared
