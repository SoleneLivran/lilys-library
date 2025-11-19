import db from '../db/db.js';

export const booksRepository = {
    all() {
        return db.prepare("SELECT * FROM books").all();
    }
};