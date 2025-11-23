'use strict';

import { getBooks, getBooksByGenre } from '../controllers/booksController.js';

export default [
    {
        method: 'GET',
        path: '/api/books',
        handler: getBooks,
    },
    {
        method: 'GET',
        path: '/api/books/genre/{genreId}',
        handler: getBooksByGenre,
    },
];