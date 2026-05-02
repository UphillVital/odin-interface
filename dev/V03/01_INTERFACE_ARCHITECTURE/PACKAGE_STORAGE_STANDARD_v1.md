# PACKAGE STORAGE STANDARD v1

## Призначення

Цей документ фіксує стандарт зберігання службових файлів пакетів ODIN V03.

## Основне правило

Усі службові файли пакетів зберігаються в окремому розділі:

```text
dev/V03/_packages/PACKAGE_<NUMBER>/
```

## Приклад

```text
dev/V03/_packages/PACKAGE_23/
├─ README_PACKAGE_23_COMMIT_BUILDER.md
├─ CHANGELOG_PACKAGE_23_ENTRY.md
└─ QA_REPORT_PACKAGE_23.md
```

## Робочі файли

Робочі файли пакету завжди кладуться в свої реальні системні папки:

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/
dev/V03/14_PREVIEW_SYSTEM/
dev/V03/05_FILE_WORKSPACE/
```

## Заборонено

- кидати README пакету прямо в `dev/V03/`;
- кидати changelog-entry пакету прямо в `dev/V03/`;
- створювати службові файли поруч із робочим кодом без потреби;
- змішувати історію пакетів із робочими модулями.

## CHANGELOG

Головний changelog завжди один:

```text
dev/V03/CHANGELOG.md
```

Окремий `CHANGELOG_PACKAGE_<NUMBER>_ENTRY.md` використовується як джерело, з якого запис переноситься або синхронізується в головний changelog.

## Статус

LOCKED STANDARD для майбутніх пакетів ODIN V03.
