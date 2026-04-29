# ODIN V05.0 — SYNC MAP FOR V02 AND ODIN TREE

## 1. Статус документа

Версія: V05.0  
Тип: архітектурна синхронізація  
Призначення: зафіксувати правильний звʼязок між `dev\V02` і `ODIN_TREE_PROJECT_v1` перед наступними V05-пакетами.

Цей пакет НЕ змінює код.  
Цей пакет НЕ змінює `index.html`.  
Цей пакет НЕ змінює `src`.  
Цей пакет тільки фіксує правила інтеграції.

---

## 2. Головна фіксація

```text
dev\V02 = друга версія Інтерфейсу ODIN
ODIN_TREE_PROJECT_v1 = основа ODIN, дерево системи, зібране зі всього проекту
```

`dev\V02` не є повною системою ODIN.  
`dev\V02` — це робочий інтерфейс, який має використовувати основу з `ODIN_TREE_PROJECT_v1`.

---

## 3. Заборонено

```text
НЕ створювати паралельну систему в dev\V02
НЕ копіювати шаблон у dev\V02 без окремого рішення
НЕ дублювати базові документи ODIN_TREE_PROJECT_v1
НЕ змінювати ODIN_TREE_PROJECT_v1 випадково
НЕ робити V05.3 / V05.4 без карти звʼязків
```

---

## 4. Правильна модель

```text
ODIN_TREE_PROJECT_v1
    ↓ джерело істини / база / правила / шаблон / системні документи

dev\V02
    ↓ інтерфейс / live execution / кнопки / runtime-запуск

V05 execution
    ↓ міст між інтерфейсом V02 і базою ODIN_TREE_PROJECT_v1
```

---

## 5. Карта груп з дерева ODIN

| Група | Папка / рівень | Кількість елементів | Роль |
|---|---:|---:|---|
| SYSTEM | `ODIN_TREE_PROJECT_v1 ROOT` | 5 | кореневий статус, README, дерево, git push |
| 00 CORE | `00_CORE` | 16 | ядро, recovery, SON, правила архітектури, template router |
| 01 INTERFACE | `01_ODIN_INTERFACE` | 10 | інтерфейс ODIN, execution bridge, data/ui/export ready |
| 02 MODULES | `02_MODULES` | 10 | реєстр модулів: lesson, QA, export, header lock |
| 03 HEADER LOCK | `03_HEADER_LOCK` | 1 | окремий lock для header |
| 04 QA SYSTEM | `04_QA_SYSTEM` | 10 | QA структура, переклад, markup, audio, final gate |
| 05 LESSON SYSTEM | `05_LESSON_SYSTEM` | 9 | lesson engine, structure, interface, output |
| 06 ISSU / SSUDT | `06_ISSU_SSUDT` | 1 | звʼязок систем ІССУ / ССУДТ |
| 07 TEMPLATE | `07_UNIFIED_LESSON_TEMPLATE` | 15 | єдиний lesson template, інтеграція шаблону |
| 08 HIGHLIGHT | `08_HIGHLIGHT_SYSTEM` | 11 | highlight правила, markup, modes, QA |
| 09 TRANSLATION | `09_TRANSLATION_SYSTEM` | 11 | ДП/СД, literal/semantic, translation lock |
| 10 AUDIO VOICE | `10_AUDIO_VOICE_SYSTEM` | 9 | audio/voice engine, markup, QA |
| 11 EXPORT | `11_EXPORT_SYSTEM` | 11 | download/export, HTML standard, export ready gate |
| 12 GIT DEPLOYMENT | `12_GIT_DEPLOYMENT` | 12 | git, branches, rollback, push standard, deployment QA |
| 13 TEAM | `13_TEAM` | 11 | team roles, sync, clerk/critic/assembler protocols |
| 14 WORKFLOW | `14_WORKFLOW` | 15 | PLAN → BUILD → QA → EXPORT → PUSH → FIXATION |
| 15 PACKAGES | `15_PACKAGES` | 12 | стандарти пакетів, структура, naming, QA |
| 16 RULES | `16_RULES` | 13 | locked глобальні правила, no-break, quality, package-first |

---

## 6. Джерела істини для V05

### 6.1 Шаблон уроку

```text
ODIN_TREE_PROJECT_v1\07_UNIFIED_LESSON_TEMPLATE\TEMPLATE_BASE_v1.html
```

Статус: `LOCKED`  
Правило: це основний шаблон уроку. Його не дублювати в `dev\V02` без окремого рішення.

Супровідні документи:
```text
ODIN_TREE_PROJECT_v1\07_UNIFIED_LESSON_TEMPLATE\TEMPLATE_INTEGRATION.md
ODIN_TREE_PROJECT_v1\07_UNIFIED_LESSON_TEMPLATE\TEMPLATE_INTERFACE.md
ODIN_TREE_PROJECT_v1\07_UNIFIED_LESSON_TEMPLATE\TEMPLATE_BASE_LOCK.md
ODIN_TREE_PROJECT_v1\00_CORE\ODIN_TEMPLATE_ROUTER_v1.md
ODIN_TREE_PROJECT_v1\00_CORE\ODIN_TEMPLATE_PRIORITY_POLICY_v1.md
```

### 6.2 Lesson system

```text
ODIN_TREE_PROJECT_v1\05_LESSON_SYSTEM\LESSON_ENGINE.md
ODIN_TREE_PROJECT_v1\05_LESSON_SYSTEM\LESSON_STRUCTURE.md
ODIN_TREE_PROJECT_v1\05_LESSON_SYSTEM\LESSON_INTERFACE.md
ODIN_TREE_PROJECT_v1\05_LESSON_SYSTEM\LESSON_OUTPUT.md
```

### 6.3 QA system

```text
ODIN_TREE_PROJECT_v1\04_QA_SYSTEM\QA_SYSTEM_OVERVIEW.md
ODIN_TREE_PROJECT_v1\04_QA_SYSTEM\QA_STRUCTURE.md
ODIN_TREE_PROJECT_v1\04_QA_SYSTEM\QA_TRANSLATION.md
ODIN_TREE_PROJECT_v1\04_QA_SYSTEM\QA_MARKUP.md
ODIN_TREE_PROJECT_v1\04_QA_SYSTEM\QA_AUDIO.md
ODIN_TREE_PROJECT_v1\04_QA_SYSTEM\QA_FINAL_GATE.md
```

### 6.4 Highlight system

```text
ODIN_TREE_PROJECT_v1\08_HIGHLIGHT_SYSTEM\GRAMMAR_HIGHLIGHT_RULES.md
ODIN_TREE_PROJECT_v1\08_HIGHLIGHT_SYSTEM\LM_MARKUP_STANDARD.md
ODIN_TREE_PROJECT_v1\08_HIGHLIGHT_SYSTEM\HIGHLIGHT_IN_TEMPLATE.md
ODIN_TREE_PROJECT_v1\08_HIGHLIGHT_SYSTEM\HIGHLIGHT_QA.md
```

### 6.5 Translation system

```text
ODIN_TREE_PROJECT_v1\09_TRANSLATION_SYSTEM\TRANSLATION_LOCK.md
ODIN_TREE_PROJECT_v1\09_TRANSLATION_SYSTEM\LITERAL_SEMANTIC_RULES.md
ODIN_TREE_PROJECT_v1\09_TRANSLATION_SYSTEM\RN_DP_SD_STANDARD.md
ODIN_TREE_PROJECT_v1\09_TRANSLATION_SYSTEM\TRANSLATION_QA.md
```

### 6.6 Export system

```text
ODIN_TREE_PROJECT_v1\11_EXPORT_SYSTEM\EXPORT_SYSTEM_OVERVIEW.md
ODIN_TREE_PROJECT_v1\11_EXPORT_SYSTEM\DOWNLOAD_LOGIC.md
ODIN_TREE_PROJECT_v1\11_EXPORT_SYSTEM\EXPORT_READY_GATE.md
ODIN_TREE_PROJECT_v1\11_EXPORT_SYSTEM\HTML_EXPORT_STANDARD.md
```

### 6.7 Interface / execution bridge

```text
ODIN_TREE_PROJECT_v1\01_ODIN_INTERFACE\ODIN_EXECUTION_BRIDGE.md
ODIN_TREE_PROJECT_v1\01_ODIN_INTERFACE\ODIN_INTERFACE_CORE.md
ODIN_TREE_PROJECT_v1\01_ODIN_INTERFACE\ODIN_DATA_LAYER.md
ODIN_TREE_PROJECT_v1\01_ODIN_INTERFACE\ODIN_UI_LAYER.md
```

---

## 7. Що V02 має робити

`dev\V02` має бути live-інтерфейсом, який:

1. показує UI ODIN;
2. запускає дії користувача;
3. викликає execution layer;
4. бере правила / шаблон / QA / export із `ODIN_TREE_PROJECT_v1`;
5. не створює другий ODIN всередині себе.

---

## 8. Що V05 має робити

V05 — це не окремий продукт.  
V05 — це execution layer, який звʼязує:

```text
UI у dev\V02
з
системною базою ODIN_TREE_PROJECT_v1
```

V05 не повинен:
- дублювати template base;
- вигадувати новий lesson standard;
- обходити QA;
- обходити export;
- створювати паралельні правила.

---

## 9. Правильний наступний крок після цього пакету

Після V05.0 SYNC MAP правильний наступний технічний крок:

```text
V05.3_REAL_TEMPLATE_CONNECT
```

Але тільки після перевірки:

1. V02 відкривається через Live Server / localhost.
2. Live Server запускається з кореня репозиторію:
   ```text
   C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface
   ```
3. `TEMPLATE_BASE_v1.html` існує в базі:
   ```text
   ODIN_TREE_PROJECT_v1\07_UNIFIED_LESSON_TEMPLATE\TEMPLATE_BASE_v1.html
   ```
4. Ми точно знаємо, які плейсхолдери або блоки шаблону треба заповнювати.

---

## 10. Рішення по попередніх V05.3 / V05.3.1

Попередні пакети V05.3 / V05.3.1 не впроваджувати автоматично.

Причина:
- вони були створені до повної синхронізації з `ODIN_TREE_PROJECT_v1`;
- існував ризик паралельної системи;
- шаблон має братись із бази, а не створюватись заново в `dev\V02`.

---

## 11. Контроль перед новим пакетом

Перед кожним наступним пакетом ODIN:

- пакет має містити `README.md`;
- у README мають бути точні шляхи;
- користувач не повинен нічого редагувати вручну;
- якщо потрібен `index.html`, він має бути в пакеті;
- якщо потрібні тестові файли, вони мають бути в пакеті;
- Git-команди подаються трьома рядками.

---

## 12. Git

```text
git add ODIN_TREE_PROJECT_v1/
git commit -m "V05.0 add sync map for V02 and ODIN tree"
git push origin dev
```
