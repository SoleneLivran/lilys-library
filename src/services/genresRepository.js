import db from '../db/db.js';

export const genresRepository = {
    all() {
        return db.prepare("SELECT * FROM genres ORDER BY name").all();
    },
};