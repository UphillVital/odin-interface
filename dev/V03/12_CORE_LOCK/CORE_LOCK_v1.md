# ODIN V03 CORE LOCK v1

## Purpose
CORE LOCK protects the working V03 prototype from accidental structural damage.

## Locked Baseline
The following V03 capabilities are treated as stable baseline after Package 10:

- Light theme as default
- Dark theme available
- UA / EN language switching
- Assisted Mode hints and explanations
- Live System Map navigation
- Work Zones
- MASTER START entry point
- OIS-driven interaction model

## Non-Breaking Rule
Any future package must preserve the baseline unless the package is explicitly marked as a controlled migration.

## Forbidden
- Removing existing Work Zones without replacement
- Removing UA/EN support
- Removing Light/Dark theme support
- Replacing the full prototype without QA notes
- Adding empty folders
- Shipping files without README and changelog

## Required
Every package after this point must include:

1. README
2. CHANGELOG
3. QA checklist
4. Clear integration scope
5. Confirmation that Package 10 baseline remains intact
