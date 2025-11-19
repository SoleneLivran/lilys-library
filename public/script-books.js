'use strict';

/**
 * @typedef {Object} Book
 * @property {number} id
 * @property {string} title
 * @property {string[]} authors
 * @property {string|null} [series]
 * @property {string[]} genres
 * @property {string|null} [loan]
 * @property {string|null} [publication_date]
 * @property {string|null} [editor]
 * @property {number|null} [pages]
 * @property {string|null} [isbn]
 * @property {string|null} [summary]
 */

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
                <br/>
            `;

            if (book.summary) {
                div.innerHTML += `<div class="book-summary">${book.summary}</div>
                <br/>`
            }

            if (book.pages) {
                div.innerHTML += `<div class="book-pages">${book.pages} pages</div>`
            }

            if (book.editor) {
                div.innerHTML += `<div class="book-editor">Edité par : ${book.editor}</div>`
            }

            if (book.publication_date) {
                div.innerHTML += `<div class="book-pub-date">Date de publication : ${book.publication_date}</div>`
            }

            if (book.isbn) {
                div.innerHTML += `<div class="book-isbn">ISBN : ${book.isbn}</div>`
            }

            container.appendChild(div);
        });
    } catch (err) {
        container.innerText = 'Error loading books.';
        console.error(err);
    }
}

loadBooks();
