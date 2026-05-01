# PACKAGE 19 — File Workspace UX Fix + Build Control Preparation

## Purpose
This package fixes the File Workspace comparison UX and records two new system requirements:
1. Build Snapshots / rollback points.
2. Internal Previewer for generated builds and files.

## Changes in prototype
- Editor and Original comparison panels now grow together visually.
- Original block remains read-only and mirrors the Editor panel height.
- Editor input no longer re-renders the full workspace on every keystroke.
- This fixes the "one character input" behavior caused by full re-render during typing.

## Not changed
- Style 13.2 remains unchanged.
- UA / EN / DE i18n remains unchanged.
- Theme logic remains unchanged.
- Quick Settings remains unchanged.
- Projects / Workflow remains unchanged.

## Test
1. Open File Workspace.
2. Select a project.
3. Load sample or choose a text file.
4. Type several words continuously in Editor.
5. Resize Editor vertically.
6. Confirm Original grows with the comparison row.
7. Confirm Original is read-only.
