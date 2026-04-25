# ODIN v3.22.1 MARKUP QA FIX

Проблема v3.22:
- QA блокував Export через:
  ERROR: ACCURACY: dativ not detected
- Але урок про відокремлювані дієслова не зобовʼязаний мати Dativ.
- Відмінки мають перевірятися залежно від теми уроку.

Fix:
- Dativ/Akkusativ переведено з ERROR у WARNING.
- Export більше не блокується, якщо тема уроку не потребує Dativ/Akkusativ.
- Додано INFO:
  CASE_CHECKS_ARE_TOPIC_DEPENDENT_v3.22.1

Очікувано:
- QA_PASSED або QA_PASSED_WITH_WARNINGS.
- EXPORT_READY.
- Markup Stats працює.
- Кнопки працюють.

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_22_1.md
git commit -m "v3.22.1 fix topic-dependent markup QA"
git push

Або:
.\scripts\release.ps1 patch -Message "v3.22.1 fix topic-dependent markup QA"
