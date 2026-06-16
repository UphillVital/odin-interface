# DOWNLOAD LOGIC

## Що це
Логіка скачування файлу з браузера.

## Типовий механізм
```js
const blob = new Blob([html], { type: "text/html;charset=utf-8" });
const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "lesson.html";
a.click();
URL.revokeObjectURL(a.href);
```

## Вимоги
- правильна назва файлу;
- UTF-8;
- без пошкодження HTML;
- після скачування файл відкривається.
