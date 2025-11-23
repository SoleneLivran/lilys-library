import db from '../db/db.js';
import { BOOK_STATUS } from '../../public/constants/bookStatus.js';

export const genresRepository = {
    allWithBorrowableBooks() {
        return db.prepare(`
            SELECT DISTINCT g.*
            FROM genres g
            JOIN books_genres bg ON g.id = bg.genre_id
            JOIN books b ON bg.book_id = b.id
            WHERE b.status != ?
            ORDER BY g.name
        `).all(BOOK_STATUS.NON_BORROWABLE);
    }
};