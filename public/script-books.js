'use strict';

async function loadBooks() {
    const container = document.getElementById('book-list');

    try {
        const res = await fetch('/api/books');
        const books = await res.json();

        container.innerHTML = '';

        books.forEach(book => {
            const div = document.createElement('div');
            const isAvailable = book.loan === null;

            div.className = 'book';

            div.innerHTML = `<div class="book-title">${book.title}</div>`

            if (book.series) {
                div.innerHTML += `<div class="book-series">${book.series}</div>`
            }

            div.innerHTML += `
                <div>${book.authors}</div>
                <div>${book.genres}</div>
                <div>
                  <span class="status ${isAvailable ? 'available' : ''}">
                    ${isAvailable ? 'Disponible' : 'Indisponible'}
                  </span>
                </div>
            `;

            container.appendChild(div);
        });
    } catch (err) {
        container.innerText = 'Error loading books.';
        console.error(err);
    }
}

loadBooks();
