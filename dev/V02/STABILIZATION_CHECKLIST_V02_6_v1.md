# STABILIZATION CHECKLIST V02.6 v1

## Login
- [ ] `index.html` відкривається
- [ ] redirect працює
- [ ] `login.html` відкривається
- [ ] пароль `ODIN` пускає в `admin.html`
- [ ] logout повертає на login

## Tree
- [ ] дерево ODIN видно зліва
- [ ] вибір вузлів працює
- [ ] active state змінюється
- [ ] selected title/path оновлюється

## File Viewer
- [ ] OPEN працює
- [ ] path/type/mode показуються
- [ ] для файлів GitHub raw пробує завантаження
- [ ] fallback показується якщо файл недоступний

## QA Layer
- [ ] QA CHECK працює
- [ ] QA показує PASS / WARN / FAIL
- [ ] checklist відображається
- [ ] результат пишеться в log

## Template Control
- [ ] TEMPLATE button працює
- [ ] ROUTE CHECK показує routing table
- [ ] LESSON LOCK показує TEMPLATE_BASE_v1.html
- [ ] ADMIN LOCK працює
- [ ] ROUTER QA працює

## Package Builder
- [ ] PACKAGE button працює
- [ ] README генерується
- [ ] MANIFEST генерується
- [ ] STATUS генерується
- [ ] COPY buttons працюють або чесно показують browser limitation

## Export System
- [ ] EXPORT button працює
- [ ] PREPARE EXPORT працює
- [ ] DOWNLOAD README працює
- [ ] DOWNLOAD MANIFEST працює
- [ ] DOWNLOAD STATUS працює
- [ ] DOWNLOAD EXPORT HTML працює

## Log / Sync
- [ ] Admin Log пише дії
- [ ] SNAPSHOT працює
- [ ] SYNC працює
- [ ] RESET LOG працює

## Stable Gate
- [ ] критичних помилок немає
- [ ] V01 не зачеплено
- [ ] V02 працює
- [ ] git status clean після push
