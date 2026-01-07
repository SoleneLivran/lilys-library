import pool from '../db/db.js';
import { BOOK_STATUS } from '../../public/constants/bookStatus.js';

export const booksRepository = {
    async allBorrowable() {
        const books = await pool.query(`
            SELECT
                b.*,
                g.id as genre_id,
                g.name as genre_name
            FROM books b
            LEFT JOIN books_genres bg ON b.id = bg.book_id
            LEFT JOIN genres g ON bg.genre_id = g.id
            WHERE b.status != $1
            ORDER BY b.id
        `, [BOOK_STATUS.NON_BORROWABLE]);

        return mapGenresToBooks(books.rows);
    },

    async byGenre(genreId) {
        const books = await pool.query(`
            SELECT
                b.*,
                g.id as genre_id,
                g.name as genre_name
            FROM books b
            JOIN books_genres bg ON b.id = bg.book_id
            LEFT JOIN genres g ON bg.genre_id = g.id
            WHERE b.status != 0
            AND b.id IN (
                SELECT book_id FROM books_genres WHERE genre_id = $1
            )
            ORDER BY b.id
        `, [genreId]);

        return mapGenresToBooks(books.rows);
    }
};

function mapGenresToBooks(books) {
    const booksMap = {};
    for (const book of books) {
        if (!booksMap[book.id]) {
            booksMap[book.id] = {
                id: book.id,
                title: book.title,
                authors: book.authors,
                series: book.series,
                languages: book.languages,
                status: book.status,
                publication_date: book.publication_date,
                editor: book.editor,
                pages: book.pages,
                isbn: book.isbn,
                summary: book.summary,
                genres: []
            };
        }

        if (book.genre_id) {
            booksMap[book.id].genres.push({
                id: book.genre_id,
                name: book.genre_name
            });
        }
    }

    return Object.values(booksMap);
}