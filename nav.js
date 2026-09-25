// Load the shared sidebar navigation into #nav-placeholder
fetch('/navigation.html')
    .then(response => response.text())
    .then(html => {
        const insert = () => {
            document.getElementById('nav-placeholder').outerHTML = html;
        };
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', insert);
        } else {
            insert();
        }
    });
