# TEST — ODIN V03.9.1 MODULE DETECTION FIX

1. Open admin.html
2. Project Map Pro → BUILD PROJECT MAP
3. Check:
   - Router/Engine should be RUNTIME_ONLY on admin page, not UNKNOWN/MISSING
   - Snapshot should be LOADED if snapshot_file.js exists
   - risks should not mention runtime-only modules as critical
