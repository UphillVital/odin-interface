# ODIN V03 SYNC RULES v1

## Purpose

Prevent V03 from becoming inconsistent as packages are added.

## Rule 1 — Package changes must be registered

Every package must include:

- README
- CHANGELOG
- affected files list
- integration instructions
- sync notes if structure or logic changes

## Rule 2 — No empty folders after Package 01

Package 01 may create the foundation structure.

All later packages must contain only:

- new content files
- changed content files
- README / changelog / registry notes

Forbidden:

- empty folders
- duplicated tree for decoration
- placeholder files without purpose

## Rule 3 — System Map sync

Update System Map when a package changes:

- modules
- zones
- flows
- dependencies
- prototype structure

## Rule 4 — Navigation Tree sync

Update Navigation Tree when:

- a new Work Zone is added
- a new module appears
- a module changes purpose
- a new entry point is added

## Rule 5 — Architecture sync

Update architecture docs when:

- interaction model changes
- layout changes
- OIS changes
- File Workspace changes
- design rules change

## Rule 6 — Change visibility

No hidden changes.

Every change must be understandable from:

- changelog
- affected files list
- map/tree/architecture update

## Rule 7 — Safety

If a package may overwrite existing work:

```text
MODE = MERGE
NO BLIND REPLACE
DIFF FIRST
```

## Rule 8 — Done definition

A package is DONE only if:

```text
files integrated
map checked
tree checked
architecture checked
changelog present
README present
```

## Lock

If map/tree/architecture are not synchronized, the package is not 100%.
