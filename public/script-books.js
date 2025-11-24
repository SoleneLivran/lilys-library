'use strict';

import { formatAuthors, formatLanguages, getStatusLabel } from './utils.js';
import { AVAILABLE_STATUSES, UNAVAILABLE_STATUSES } from "./constants/bookStatus.js";

let allBooks = [];

async function loadBooks() {
    const container = document.getElementById('book-list');

    try {
        const res = await fetch('/api/books');
        allBooks = await res.json();

        displayBooks(allBooks);
    } catch (err) {
        container.innerText = 'Error loading books.';
        console.error(err);
    }
}

function displayBooks(books) {
    const container = document.getElementById('book-list');

    if (books.length === 0) {
        container.innerHTML = '<p>Aucun livre ne correspond aux filtres.</p>';
        return;
    }

    container.innerHTML = '';

    books.forEach(book => {
        const div = document.createElement('div');
        const isAvailable = AVAILABLE_STATUSES.includes(book.status);

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
}

function filterBooks() {
    const languageFilter = document.getElementById('filter-language').value;
    const statusFilter = document.getElementById('filter-status').value;

    let filtered = allBooks;

    if (languageFilter) {
        filtered = filtered.filter(book =>
            book.languages && book.languages.includes(languageFilter)
        );
    }

    if (statusFilter === 'available') {
        filtered = filtered.filter(book =>
            AVAILABLE_STATUSES.includes(book.status)
        );
    } else if (statusFilter === 'unavailable') {
        filtered = filtered.filter(book =>
            UNAVAILABLE_STATUSES.includes(book.status)
        );
    }

    displayBooks(filtered);
}

function clearFilters() {
    document.getElementById('filter-language').value = '';
    document.getElementById('filter-status').value = '';
    displayBooks(allBooks);
}

document.getElementById('filter-language').addEventListener('change', filterBooks);
document.getElementById('filter-status').addEventListener('change', filterBooks);
document.getElementById('clear-filters').addEventListener('click', clearFilters);


loadBooks();
