# ODIN V03 ERROR PREVENTION v1

## Known Risks

### Risk 1 — Replacing instead of extending
Fix: preserve Package 10 baseline before applying any UI change.

### Risk 2 — Empty folders in packages
Fix: packages must include only files with content.

### Risk 3 — Manual code copy
Fix: user receives ready package, not code fragments.

### Risk 4 — Design breaking logic
Fix: UI polish must not remove OIS, Work Zones, System Map, or Assisted Mode.

### Risk 5 — Map falling behind files
Fix: every package must update or explicitly validate System Map / Architecture / Tree.

## Prevention Rule
If the assistant is uncertain whether a change is safe, the package must be split into a smaller controlled update.
