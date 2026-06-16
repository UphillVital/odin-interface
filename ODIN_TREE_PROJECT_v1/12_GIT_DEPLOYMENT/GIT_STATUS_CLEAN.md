# GIT STATUS CLEAN

## Що перевіряємо
```bash
git status
```

## Ідеальний стан
```text
nothing to commit, working tree clean
```

## Якщо є untracked files
Не додавати їх автоматично.

## Якщо треба прибрати untracked
```bash
git clean -f
```

## Якщо треба зняти staged
```bash
git restore --staged .
```
