import db from '../db/db.js';

export const booksRepository = {
    all() {
        const books = db.prepare(`
        SELECT
            b.*,
            g.id as genre_id,
            g.name as genre_name
        FROM books b
        LEFT JOIN books_genres bg ON b.id = bg.book_id
        LEFT JOIN genres g ON bg.genre_id = g.id
        ORDER BY b.id
    `).all();

        const booksMap = {};
        for (const book of books) {
            if (!booksMap[book.id]) {
                booksMap[book.id] = {
                    id: book.id,
                    title: book.title,
                    authors: book.authors,
                    series: book.series,
                    loan: book.loan,
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
    },
};