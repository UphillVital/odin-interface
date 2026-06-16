# ODIN GIT / DEPLOYMENT SYSTEM

## Що це
Система фіксації, версійності та публікації ODIN через Git і GitHub.

## Призначення
- зберігати контрольні точки;
- фіксувати стабільні версії;
- відправляти зміни на GitHub;
- мати rollback у разі помилки;
- відділяти stable від experimental.

## Основний цикл
```text
change → git add → git commit → git push → verify
```
