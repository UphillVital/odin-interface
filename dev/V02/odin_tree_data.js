const ODIN_TREE_DATA = [
  { group:"SYSTEM", items:[
    {id:"dashboard", title:"Dashboard", path:"ODIN SYSTEM", type:"system", status:"READY", layer:"ODIN", description:"Global Control Center для ODIN-ADMIN V02.1."},
    {id:"status", title:"System Status", path:"ODIN_TREE_PROJECT_v1/ODIN_SYSTEM_STATUS_v1.md", type:"md", status:"STABLE", layer:"STATUS", description:"Фіксація стабільної бази ODIN SYSTEM."},
    {id:"router", title:"Template Router", path:"ODIN_TREE_PROJECT_v1/00_CORE/ODIN_TEMPLATE_ROUTER_v1.md", type:"md", status:"LOCKED", layer:"CORE", description:"Визначає шаблон за task_type. Lesson → TEMPLATE_BASE_v1.html."},
    {id:"priority", title:"Template Priority", path:"ODIN_TREE_PROJECT_v1/00_CORE/ODIN_TEMPLATE_PRIORITY_POLICY_v1.md", type:"md", status:"LOCKED", layer:"CORE", description:"Hard lock + priority policy для шаблонів."}
  ]},
  { group:"ODIN TREE", items:[
    {id:"core", title:"00 CORE", path:"ODIN_TREE_PROJECT_v1/00_CORE", type:"folder", status:"DONE", layer:"CORE", description:"Ядро, state, memory, recovery, СОН, 100% Gate."},
    {id:"interface", title:"01 INTERFACE", path:"ODIN_TREE_PROJECT_v1/01_ODIN_INTERFACE", type:"folder", status:"DONE", layer:"INTERFACE", description:"ODIN interface v3.22 base, UI/data/execution bridge."},
    {id:"modules", title:"02 MODULES", path:"ODIN_TREE_PROJECT_v1/02_MODULES", type:"folder", status:"DONE", layer:"MODULES", description:"QA, lesson, header lock, export modules."},
    {id:"header", title:"03 HEADER LOCK", path:"ODIN_TREE_PROJECT_v1/03_HEADER_LOCK", type:"folder", status:"PARTIAL", layer:"HEADER", description:"Header lock система. Потребує повної інтеграції."},
    {id:"qa", title:"04 QA SYSTEM", path:"ODIN_TREE_PROJECT_v1/04_QA_SYSTEM", type:"folder", status:"DONE", layer:"QA", description:"Structure, translation, markup, audio, final gate."},
    {id:"lesson", title:"05 LESSON SYSTEM", path:"ODIN_TREE_PROJECT_v1/05_LESSON_SYSTEM", type:"folder", status:"DONE", layer:"LESSON", description:"Lesson engine, interface, output, structure."},
    {id:"issu", title:"06 ISSU / SSUDT", path:"ODIN_TREE_PROJECT_v1/06_ISSU_SSUDT", type:"folder", status:"PARTIAL", layer:"LESSON SYSTEMS", description:"ІССУ + ССУДТ. Потребує наповнення."},
    {id:"template", title:"07 TEMPLATE", path:"ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE", type:"folder", status:"DONE", layer:"TEMPLATE", description:"Real template extraction з еталонного уроку v3.22.1."},
    {id:"template_file", title:"TEMPLATE_BASE_v1.html", path:"ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html", type:"html", status:"LOCKED", layer:"TEMPLATE", description:"Єдиний дозволений шаблон сторінки уроку."},
    {id:"highlight", title:"08 HIGHLIGHT", path:"ODIN_TREE_PROJECT_v1/08_HIGHLIGHT_SYSTEM", type:"folder", status:"DONE", layer:"HIGHLIGHT", description:"lm-* markup, glow modes, data accuracy."},
    {id:"translation", title:"09 TRANSLATION", path:"ODIN_TREE_PROJECT_v1/09_TRANSLATION_SYSTEM", type:"folder", status:"DONE", layer:"TRANSLATION", description:"РН / ДП / СД, toggles, QA, lock."},
    {id:"audio", title:"10 AUDIO VOICE", path:"ODIN_TREE_PROJECT_v1/10_AUDIO_VOICE_SYSTEM", type:"folder", status:"DONE", layer:"AUDIO", description:"data-tts, audio buttons, audio QA."},
    {id:"export", title:"11 EXPORT", path:"ODIN_TREE_PROJECT_v1/11_EXPORT_SYSTEM", type:"folder", status:"DONE", layer:"EXPORT", description:"HTML export, download, packages, EXPORT_READY."},
    {id:"git", title:"12 GIT DEPLOYMENT", path:"ODIN_TREE_PROJECT_v1/12_GIT_DEPLOYMENT", type:"folder", status:"DONE", layer:"GIT", description:"Git push, rollback, checkpoints, GitHub Pages."},
    {id:"team", title:"13 TEAM", path:"ODIN_TREE_PROJECT_v1/13_TEAM", type:"folder", status:"DONE", layer:"TEAM", description:"Ролі, sync, critic, clerk, assembler."},
    {id:"workflow", title:"14 WORKFLOW", path:"ODIN_TREE_PROJECT_v1/14_WORKFLOW", type:"folder", status:"DONE", layer:"WORKFLOW", description:"СОН → PLAN → BUILD → TEST → QA → FIX → EXPORT → PUSH → FIXATION."},
    {id:"packages", title:"15 PACKAGES", path:"ODIN_TREE_PROJECT_v1/15_PACKAGES", type:"folder", status:"DONE", layer:"PACKAGES", description:"Package-first правила, manifests, statuses, release/recovery."},
    {id:"rules", title:"16 RULES", path:"ODIN_TREE_PROJECT_v1/16_RULES", type:"folder", status:"DONE", layer:"RULES", description:"Truth, no-break, etalon, package-first, Git style."}
  ]},
  { group:"DEV VERSIONS", items:[
    {id:"v01", title:"V01 Stable", path:"dev/V01", type:"folder", status:"LOCKED", layer:"DEV", description:"Стара стабільна версія. Не чіпати."},
    {id:"v02", title:"V02 ODIN-ADMIN", path:"dev/V02", type:"folder", status:"ACTIVE", layer:"DEV", description:"Нова admin-система керування ODIN SYSTEM."}
  ]}
];
