# ODIN v3.8 QA SYSTEM 100

Install:
1. Copy dev/index.html into your local repository:
   odin-interface/dev/index.html
2. Open dev/index.html with Live Server.
3. Test:
   - RUNNING -> PLAN_DONE -> PIPELINE_DONE -> LESSON_DONE -> QA_PASSED -> EXPORT_DONE -> DONE
   - QA checklist is visible.
   - Export is blocked if required data is missing.
   - Download button appears only after QA_PASSED.

Git:
git add dev/index.html
git commit -m "v3.8 QA system 100"
git push
