# MULTI-LANGUAGE SYSTEM v1

## Core rule
ODIN products must not be limited to hardcoded UA/EN translations.

ODIN must support a scalable language system:

```text
LANGUAGE SYSTEM
├─ UA
├─ EN
├─ DE
└─ future languages
```

## Required platform behavior
- All visible UI text must be stored in one language dictionary.
- UI components must request text by keys, not hardcode strings.
- Dynamic content must use the same dictionary as static content.
- Tooltips and Assisted Mode must also be translated.
- Adding a new language should not require rewriting component logic.

## Current implementation
Prototype Package 15 implements:
- `ua`
- `en`
- `de`

## Locked rule
No partial translations.
No mixed-language UI state.
No hardcoded UI strings in generated Work Zones.
