CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    series TEXT,
    loan TEXT,
    publication_date TEXT,
    editor TEXT,
    pages INTEGER,
    isbn TEXT,
    summary TEXT,
    languages TEXT DEFAULT 'fr' NOT NULL,
    status INTEGER DEFAULT 1 NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS books_genres (
    book_id INTEGER NOT NULL,
    genre_id INTEGER NOT NULL,
    PRIMARY KEY (book_id, genre_id),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_books_status ON books(status);
CREATE INDEX IF NOT EXISTS idx_books_genres_book ON books_genres(book_id);
CREATE INDEX IF NOT EXISTS idx_books_genres_genre ON books_genres(genre_id);
CREATE INDEX IF NOT EXISTS idx_books_languages ON books(languages);