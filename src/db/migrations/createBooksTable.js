import db from '../db.js';

db.exec(`
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    series TEXT,
    genres TEXT,
    loan TEXT,
    publication_date TEXT,
    editor TEXT,
    pages INTEGER,
    isbn TEXT,
    summary TEXT
);
`);

console.log("Migration executed.");