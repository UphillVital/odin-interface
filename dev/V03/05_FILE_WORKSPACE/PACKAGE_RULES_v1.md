# PACKAGE RULES v1

## Purpose

Define how ODIN V03 packages must be delivered.

## Package Types

### Foundation Package

Allowed to create folders and initial structure.

### Content Package

Adds or changes meaningful files only.

### Sync Package

Updates map, architecture, navigation, registry and changelog.

### Prototype Package

Adds runnable UI files, but must include QA notes and conflict checks.

## Package Content Requirements

Each package must include:

```text
README_PACKAGE.md
CHANGELOG.md
AFFECTED_FILES.md
```

If the package affects system structure, it must also update:

```text
00_SYSTEM_MAP/
01_INTERFACE_ARCHITECTURE/
02_NAVIGATION_TREE/
```

## Forbidden

- empty folders after foundation
- duplicate folders without new files
- silent overwrites
- unclear destination
- archive with only visual structure and no content

## Integration Mode

Default:

```text
MERGE WITH CONTROL
```

Not allowed:

```text
REPLACE ALL
```

Unless explicitly approved.

## Standard Push Format

```bash
git add dev/V03/
git commit -m "<message>"
git push origin dev
```

## Lock

A package must be understandable before it is installed.
