import pool from '../db/db.js';
import { BOOK_STATUS } from '../../public/constants/bookStatus.js';

export const genresRepository = {
    async allWithBorrowableBooks() {
        const result = await pool.query(`
            SELECT DISTINCT g.*
            FROM genres g
            JOIN books_genres bg ON g.id = bg.genre_id
            JOIN books b ON bg.book_id = b.id
            WHERE b.status != $1
            ORDER BY g.name
        `, [BOOK_STATUS.NON_BORROWABLE]);

        return result.rows;
    }
};