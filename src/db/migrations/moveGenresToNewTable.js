import db from '../db.js';

function migrateGenres() {
    console.log('Starting genres migration...');

    try {
        const books = db.prepare("SELECT id, genres FROM books WHERE genres IS NOT NULL AND genres != ''").all();

        const insertGenre = db.prepare("INSERT OR IGNORE INTO genres (name) VALUES (?)");
        const getGenreId = db.prepare("SELECT id FROM genres WHERE name = ?");
        const linkBookGenre = db.prepare("INSERT OR IGNORE INTO books_genres (book_id, genre_id) VALUES (?, ?)");

        for (const book of books) {
            if (!book.genres) continue;

            const genreNames = book.genres.split(',').map(g => g.trim()).filter(g => g.length > 0);
            for (const genreName of genreNames) {
                insertGenre.run(genreName);

                const genre = getGenreId.get(genreName);
                if (genre) {
                    linkBookGenre.run(book.id, genre.id);
                }
            }
        }

        console.log(`Migrated ${books.length} books with genres`);

        db.prepare('ALTER TABLE books DROP COLUMN genres').run();

        console.log('Migration completed successfully!');

        const genreCount = db.prepare("SELECT COUNT(*) as count FROM genres").get();
        const linkCount = db.prepare("SELECT COUNT(*) as count FROM books_genres").get();
        console.log(`Total genres: ${genreCount.count}`);
        console.log(`Total book-genre links: ${linkCount.count}`);

    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    }
}

migrateGenres();