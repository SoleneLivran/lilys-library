'use strict';

import { getBooks } from '../controllers/booksController.js';

export default [
    {
        method: 'GET',
        path: '/api/books',
        handler: getBooks,
    },
];