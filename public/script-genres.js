'use strict';

import { formatAuthors } from './utils.js';

async function loadGenres() {
    const container = document.getElementById('genres-list');

    try {
        const res = await fetch('/api/genres');
        const genres = await res.json();

        container.innerHTML = '';

        genres.forEach(genre => {
            const div = document.createElement('div');

            div.className = 'genre';
            div.innerHTML = `<div class="genre-name">${genre.name}</div>`

            div.addEventListener('click', () => {
                showBooksForGenre(genre.id, genre.name);
            });

            container.appendChild(div);
        });
    } catch (err) {
        container.innerText = 'Error loading genres.';
        console.error(err);
    }
}

async function showBooksForGenre(genreId, genreName) {
    document.getElementById('genres-list').classList.add('hidden');
    document.getElementById('books-section').classList.remove('hidden');
    document.getElementById('books-genre').textContent = `Livres - ${genreName}`;

    const booksContainer = document.getElementById('books-list');
    booksContainer.innerHTML = 'Chargement...';

    try {
        const res = await fetch(`/api/books/genre/${genreId}`);
        const books = await res.json();

        booksContainer.innerHTML = '';

        if (books.length === 0) {
            booksContainer.innerHTML = '<p>Aucun livre dans ce genre.</p>';
            return;
        }

        books.forEach(book => {
            const div = document.createElement('div');
            div.className = 'book';

            div.innerHTML = `
                <div class="book-title"><strong>${book.title}</strong></div>
                <div class="book-authors">Par : ${formatAuthors(book.authors)}</div>
            `;

            if (book.series) {
                div.innerHTML += `<div>Série: ${book.series}</div>`;
            }

            // if the book has other genres than the selected one, display all the genres
            if (book.genres && book.genres.length > 1) {
                const bookGenres = book.genres.map(g => g.name).join(', ');
                div.innerHTML += `<div>Genres: ${bookGenres}</div>`;
            }

            booksContainer.appendChild(div);
        });
    } catch (err) {
        booksContainer.innerHTML = 'Erreur lors du chargement des livres.';
        console.error(err);
    }
}

function showGenresList() {
    document.getElementById('genres-list').classList.remove('hidden');
    document.getElementById('books-section').classList.add('hidden');
}

document.getElementById('back-to-genres').addEventListener('click', showGenresList);

loadGenres();
