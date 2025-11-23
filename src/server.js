'use strict';

import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import bookRoutes from './routes/books.js';
import genreRoutes from './routes/genres.js';

export async function createServer() {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.register(inert);

    // API routes
    server.route(bookRoutes);
    server.route(genreRoutes);

    // Serve the /books page
    server.route({
        method: 'GET',
        path: '/books',
        handler: (request, h) => {
            return h.file('public/books.html');
        }
    });

    // Serve the /genres page
    server.route({
        method: 'GET',
        path: '/genres',
        handler: (request, h) => {
            return h.file('public/genres.html');
        }
    });

    // Static files (for scripts, css, etc.)
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
            }
        }
    });

    return server;
}