# ODIN V04.0.5.1.1 UI SCROLL + CONTRAST FIXATION v1

[BUG]
Level 1/2/3 clicks could push the page back to the top/header after repeated clicks.

[CAUSE]
Level switching changes document height by hiding/showing blocks.

[FIXED]
- preserve viewport on level switch
- preserve viewport on advanced toggle
- add button type safety
- improve dark-panel text contrast

[RULE]
UI level changes must not move the user unexpectedly.
