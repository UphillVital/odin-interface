# TEMPLATE RULES v1

## Main rule
Do not redesign the lesson interface.

## Locked system parts
- `.topbar`
- `.center-actions`
- `#homeBtn`
- `#menuBtn`
- `#glowToggle`
- `#literalToggle`
- `#langToggle`
- `#navModal`
- `.audio-mini`
- `.lm-word`
- `.literal`
- `.translation`
- `data-i18n`
- `data-lang`
- `data-tts`
- `data-lemma`
- `data-pos`
- `data-accuracy`

## Replaceable content parts
Only placeholders in square brackets may be replaced.

## Used by
- ІССУ
- ССУДТ
- Lesson Engine
- QA Engine

## Quality rule
Every generated lesson from this template must pass:
- structure QA
- translation QA
- markup QA
- audio marker QA
- export gate
