# ODIN V03.7.6 — RECOVERY FULL PACKAGE + SNAPSHOT FILE

## Що це

Це повний recovery-пакет на базі останньої стабільної V03.7.5.

Він відновлює:

```text
dev/V02/index.html
dev/V02/admin.html
усі потрібні JS-файли V03.7.5
```

і додає:

```text
dev/V02/snapshot_file.js
Snapshot File Export block у admin.html
```

---

## Чому цей пакет потрібен

Попередній V03.7.6 був неповним patch-пакетом.

Якщо після нього зʼявилось:

```text
Cannot GET /dev/V02/index.html
```

цей пакет відновлює повну структуру `dev/V02`.

---

## Куди класти

Розпакувати в корінь репозиторію:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface
```

---

## Тест 1 — відновлення index

Відкрити:

```text
http://127.0.0.1:5500/dev/V02/index.html
```

Очікувано:

```text
ODIN V03.4 — Content Extraction Engine
```

---

## Тест 2 — admin

Відкрити:

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

Очікувано є блок:

```text
Snapshot File Export
```

---

## Тест 3 — snapshot

У `admin.html` натиснути:

```text
EXPORT SNAPSHOT JSON
DOWNLOAD SNAPSHOT FILE
```

Очікувано:

```text
ODIN_SYSTEM_SNAPSHOT_v03_7_6.json
```

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Recover V03.7.6 full snapshot file package"
git push origin dev
