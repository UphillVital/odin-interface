# ODIN v3.9.2 MODE CONTROL / AUTO-RUN GUARD

Призначення:
Це керівний шар ODIN, який повертає режимну дисципліну і автоматизує запуск перевірок перед великими діями.

AUTO-RUN ланцюг:
СОН → QA → NN → PLAN → BUILD → TEST → FIX → GIT

Що контролює:
- СОН: системний огляд перед великим кроком.
- QA: перевірка якості постановки задачі.
- NN: "нічого не зламати", працюємо тільки в dev.
- PLAN: дія має план.
- BUILD: побудова тільки після gates.
- TEST: обовʼязковий Live Server тест.
- FIX: фіксація стабільної точки.
- GIT: команди для commit/push.

Тест:
1. Замінити dev/index.html, dev/style.css, dev/app.js.
2. Відкрити dev/index.html через Live Server.
3. Натиснути "Запустити AUTO-RUN GUARD".
4. Очікувано:
   AUTO_RUN_GUARD_STARTED
   RUN_MODE: SON
   RUN_MODE: QA
   RUN_MODE: NN
   RUN_MODE: PLAN
   RUN_MODE: BUILD
   RUN_MODE: TEST
   RUN_MODE: FIX
   RUN_MODE: GIT
   AUTO_RUN_GUARD_PASSED

Git:
git add dev/index.html dev/style.css dev/app.js README_v3_9_2.md
git commit -m "v3.9.2 mode control auto-run guard"
git push
