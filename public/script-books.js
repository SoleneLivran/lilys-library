'use strict';

import { formatAuthors, formatLanguages, getStatusLabel } from './utils.js';
import { BOOK_STATUS } from "./constants/bookStatus.js";

async function loadBooks() {
    const container = document.getElementById('book-list');

    try {
        const res = await fetch('/api/books');
        const books = await res.json();

        container.innerHTML = '';

        books.forEach(book => {
            const div = document.createElement('div');
            const isAvailable = [BOOK_STATUS.AVAILABLE, BOOK_STATUS.HOME_ONLY].includes(book.status);

            div.className = 'book';
            div.innerHTML = `<div class="book-title">${book.title}</div>`

            if (book.series) {
                div.innerHTML += `<div class="book-series">${book.series}</div>`
            }

            if (book.genres) {
                let bookGenres = '';
                for (const genre of book.genres) {
                    bookGenres += genre.name;
                    div.innerHTML += `
                `;
                }
            }

            div.innerHTML += `
                <div>${formatAuthors(book.authors)}</div>
                <div>${formatLanguages(book.languages)}</div>
            `;

            if (book.genres && book.genres.length > 0) {
                const bookGenres = book.genres.map(g => g.name).join(', ');
                div.innerHTML += `
                    <div>${bookGenres}</div>
                `;
            }

            div.innerHTML += `
                <div>
                  <span class="status ${isAvailable ? 'available' : 'unavailable'}">
                    ${getStatusLabel(book.status)}
                  </span>
                </div>
                <br/>
            `;

            let detailsDivHtml = '';
            let hasDetails = false;

            if (book.summary) {
                hasDetails = true;
                detailsDivHtml += `<div class="book-summary">${book.summary}</div><br/>`
            }

            if (book.pages) {
                hasDetails = true;
                detailsDivHtml += `<div class="book-pages">${book.pages} pages</div>`
            }

            if (book.editor) {
                hasDetails = true;
                detailsDivHtml += `<div class="book-editor">Edité par : ${book.editor}</div>`
            }

            if (book.publication_date) {
                hasDetails = true;
                detailsDivHtml += `<div class="book-pub-date">Date de publication : ${book.publication_date}</div>`
            }

            if (book.isbn) {
                hasDetails = true;
                detailsDivHtml += `<div class="book-isbn">ISBN : ${book.isbn}</div>`
            }

            if (hasDetails) {
                const detailsDiv = document.createElement('div');
                detailsDiv.className = 'book-details hidden';
                detailsDiv.innerHTML = detailsDivHtml;

                const toggleButton = document.createElement('span');
                toggleButton.className = 'toggle-details';
                toggleButton.textContent = 'Voir les détails';

                toggleButton.addEventListener('click', () => {
                    const isHidden = detailsDiv.classList.contains('hidden');
                    detailsDiv.classList.toggle('hidden');
                    toggleButton.textContent = isHidden ? 'Masquer les détails' : 'Voir les détails';
                });

                div.appendChild(toggleButton);
                div.appendChild(detailsDiv);
            }

            container.appendChild(div);
        });
    } catch (err) {
        container.innerText = 'Error loading books.';
        console.error(err);
    }
}

loadBooks();
