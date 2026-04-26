# GIT ROLLBACK

## Що це
Повернення до стабільної точки.

## Відновити файл з commit
```bash
git checkout <HASH> -- path/to/file
```

## Подивитись історію
```bash
git log --oneline --all --decorate
```

## Знайти commit
```bash
git log --oneline --all --decorate --grep="v3.22"
```

## Важливо
Rollback робити точково, не ламати весь repo.
