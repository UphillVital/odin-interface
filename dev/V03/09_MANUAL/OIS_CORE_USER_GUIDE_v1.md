# OIS Core User Guide v1

## What OIS does
OIS helps ODIN understand what you want and route work into the correct mode and zone.

## Simple Example
User: `Готово!!!`

ODIN reads context: package was just installed → continue next planned layer.

## Command Example
User:

```text
ODIN
QA
```

ODIN switches to QA mode, checks current target, reports status, and blocks export if QA fails.

## When you are lost
Use:

```text
STATUS
MAP
HELP
```

or simply ask:

```text
Що далі?
```

ODIN should activate Assisted Mode.
