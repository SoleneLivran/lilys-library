import Database from 'better-sqlite3';
import pool from '../db.js';

const sqlite = new Database('./data/library.sqlite');

async function migrate() {
    console.log('Starting migration from SQLite to PostgreSQL...\n');

    try {
        // Migrate books
        console.log('Migrating books...');
        const books = sqlite.prepare('SELECT * FROM books').all();

        for (const book of books) {
            await pool.query(`
                INSERT INTO books (id, title, authors, series, loan, publication_date, editor, pages, isbn, summary, languages, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            `, [
                book.id,
                book.title,
                book.authors,
                book.series,
                book.loan,
                book.publication_date,
                book.editor,
                book.pages,
                book.isbn,
                book.summary,
                book.languages,
                book.status
            ]);
        }
        console.log(`Migrated ${books.length} books`);

        // Migrate genres
        console.log('Migrating genres...');
        const genres = sqlite.prepare('SELECT * FROM genres').all();

        for (const genre of genres) {
            await pool.query(`
                INSERT INTO genres (id, name)
                VALUES ($1, $2)
            `, [genre.id, genre.name]);
        }
        console.log(`Migrated ${genres.length} genres`);

        // Migrate books_genres junction table
        console.log('Migrating book-genre relationships...');
        const booksGenres = sqlite.prepare('SELECT * FROM books_genres').all();

        for (const link of booksGenres) {
            await pool.query(`
                INSERT INTO books_genres (book_id, genre_id)
                VALUES ($1, $2)
            `, [link.book_id, link.genre_id]);
        }
        console.log(`Migrated ${booksGenres.length} book-genre links`);

        // Update sequences to match the max IDs (so new inserts start at correct ID)
        console.log('Updating ID sequences...');
        const maxBookId = await pool.query('SELECT MAX(id) FROM books');
        const maxGenreId = await pool.query('SELECT MAX(id) FROM genres');

        if (maxBookId.rows[0].max) {
            await pool.query(`SELECT setval('books_id_seq', $1)`, [maxBookId.rows[0].max]);
            console.log(`Set books_id_seq to ${maxBookId.rows[0].max}`);
        }
        if (maxGenreId.rows[0].max) {
            await pool.query(`SELECT setval('genres_id_seq', $1)`, [maxGenreId.rows[0].max]);
            console.log(`Set genres_id_seq to ${maxGenreId.rows[0].max}`);
        }

        console.log('\nMigration completed successfully!');

        // Show summary
        const bookCount = await pool.query('SELECT COUNT(*) FROM books');
        const genreCount = await pool.query('SELECT COUNT(*) FROM genres');
        const linkCount = await pool.query('SELECT COUNT(*) FROM books_genres');

        console.log('\nFinal counts:');
        console.log(`  Books: ${bookCount.rows[0].count}`);
        console.log(`  Genres: ${genreCount.rows[0].count}`);
        console.log(`  Book-Genre links: ${linkCount.rows[0].count}`);

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        sqlite.close();
        await pool.end();
    }
}

migrate();