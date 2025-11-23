'use strict';

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

            container.appendChild(div);
        });
    } catch (err) {
        container.innerText = 'Error loading genres.';
        console.error(err);
    }
}

loadGenres();
