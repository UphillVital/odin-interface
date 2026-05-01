# MODE ENGINE v1

## Purpose
The Mode Engine controls ODIN behavior.

## Core Modes

| Mode | Purpose | Output Style |
|---|---|---|
| DISCUSSION | Think, design, decide | structured reasoning, no code unless requested |
| BUILD | Create system/product artifact | files, package, implementation |
| FIX | Diagnose and repair | cause → fix → QA |
| QA | Verify quality | report, status, blockers |
| EXPORT | Package result | downloadable package |
| CONTROL | Manage system/interface state | status, routing, planning |
| MANUAL | Teach/explain usage | instructions, examples |
| EXPERIMENT | Safe exploration | isolated concepts, no stable overwrite |

## Default Mode Selection
- “поспілкуємось” → DISCUSSION
- artifact/file/package request → BUILD or EXPORT
- broken behavior → FIX
- “перевір” → QA
- “де/куди/як підключити” → CONTROL or MANUAL

## Safety Rule
Modes cannot silently modify stable systems.
