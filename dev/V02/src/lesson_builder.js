
function buildLesson(data) {
    return `
    <html>
    <head><title>${data.topic}</title></head>
    <body>
        <h1>${data.topic}</h1>
        <p>${data.description}</p>
    </body>
    </html>`;
}
