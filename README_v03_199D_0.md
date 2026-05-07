# README_v03_199D_0 — Secure Export Release QA Gate v1

## Що тестувати

1. Build Release QA Gate
2. Load Export RC Report
3. Run Release QA
4. Validate Release QA Hash
5. Generate Release QA Report

Очікувано:
- SECURE_EXPORT_RELEASE_QA_GATE_READY
- SECURE_EXPORT_RELEASE_QA_PASSED
- releaseQaPassed=true
- finalReleaseAllowed=false
- releaseQaHashValid=true

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/odin_secure_export_release_qa_gate_v03_199D.json README_v03_199D_0.md CHANGELOG_v03_199D_0.md MANIFEST_v03_199D_0.md QA_REPORT_v03_199D_0.md
git commit -m "ODIN V03.199D — додано Secure Export Release QA Gate"
git push origin feature/odin-interface-v03
```
