# ODIN AUTO VERSION SYSTEM

## Що це

Автоматична система версій для ODIN.

Вона робить:

```text
1. читає VERSION
2. піднімає версію
3. git add .
4. git commit
5. git push
6. git tag
7. git push origin tag
```

---

## Куди покласти

У корінь репозиторію:

```text
odin-interface/
├── VERSION
├── scripts/
│   └── release.ps1
```

---

## Команди

### Patch

```powershell
./scripts/release.ps1 patch
```

Було:

```text
3.21.0
```

Стане:

```text
3.21.1
```

---

### Minor

```powershell
./scripts/release.ps1 minor
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

### Major

```powershell
./scripts/release.ps1 major
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

## Команда з власним повідомленням

```powershell
./scripts/release.ps1 patch -Message "v3.21.1 fix header controls"
```

---

## Правило

```text
patch = фікс
minor = новий шар / нова функція
major = великий перелом архітектури
```

---

## Приклад для ODIN

```powershell
./scripts/release.ps1 patch -Message "v3.21.1 fix lesson header"
```

або

```powershell
./scripts/release.ps1 minor -Message "v3.22 add course stats"
```
