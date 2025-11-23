'use strict';

import { getGenres } from '../controllers/genresController.js';

export default [
    {
        method: 'GET',
        path: '/api/genres',
        handler: getGenres,
    },
];