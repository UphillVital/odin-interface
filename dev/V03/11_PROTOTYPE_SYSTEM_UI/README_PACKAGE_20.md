# PACKAGE 20 — LAYOUT BEHAVIOR STABILIZATION

## Purpose

This package stabilizes the ODIN Interface V03 layout behavior after the real File Workspace integration.

## Changes

- Header is fixed/sticky and remains visible.
- The three main columns have independent smart scrolling.
- Left tree, central Work Zone, and Assisted panel can scroll independently.
- File Workspace action controls are sticky inside the central column.
- The upper information blocks scroll away, while the buttons and workflow strip remain available.
- Editor and Original comparison panels keep synchronized sizing behavior.

## Protected areas

This package must not change:

- style direction from Package 13.2;
- UA/EN/DE i18n system;
- Quick Settings;
- theme logic;
- contextual help model;
- File Workspace business logic.

## Test checklist

1. Open `dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html`.
2. Confirm the header stays visible.
3. Scroll the center column independently.
4. Open File Workspace.
5. Confirm the top info text scrolls away.
6. Confirm the buttons/workflow strip stay visible while scrolling.
7. Resize Editor; Original should follow the comparison layout.
8. Check Light/Dark and UA/EN/DE still work.
