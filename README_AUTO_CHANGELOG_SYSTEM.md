# ODIN AUTO CHANGELOG SYSTEM

## Що це

Це оновлена система релізів ODIN.

Вона автоматично робить:

```text
1. читає VERSION
2. піднімає версію
3. оновлює CHANGELOG.md
4. git add .
5. git commit
6. git push
7. git tag
8. git push origin tag
```

---

## Куди покласти

У корінь репозиторію:

```text
odin-interface/
├── VERSION
├── CHANGELOG.md
├── README_AUTO_CHANGELOG_SYSTEM.md
└── scripts/
    └── release.ps1
```

Якщо `scripts/release.ps1` уже є — заміни його новим файлом.

---

## Як запускати

### Маленький фікс

```powershell
./scripts/release.ps1 patch -Message "fix lesson menu"
```

Було:

```text
3.21.0
```

Стане:

```text
3.21.1
```

У CHANGELOG.md додасться:

```text
## v3.21.1 — 2026-04-25
- fix lesson menu
```

---

### Новий функціонал

```powershell
./scripts/release.ps1 minor -Message "add course stats engine"
```

Було:

```text
3.21.1
```

Стане:

```text
3.22.0
```

---

### Великий архітектурний стрибок

```powershell
./scripts/release.ps1 major -Message "start ODIN v4 architecture"
```

Було:

```text
3.22.0
```

Стане:

```text
4.0.0
```

---

## Правило версій

```text
patch = bug fix / дрібне виправлення
minor = новий шар / новий функціонал
major = велика архітектурна зміна
```

---

## Важливо

Команда:

```powershell
./scripts/release.ps1 patch -Message "..."
```

тепер замінює ручний набір:

```text
git add
git commit
git push
git tag
git push origin tag
```

---

## Якщо PowerShell блокує запуск

Один раз виконай:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Потім знову:

```powershell
./scripts/release.ps1 patch -Message "test release"
```
