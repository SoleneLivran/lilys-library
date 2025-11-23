import { booksRepository } from '../services/booksRepository.js';

export async function getBooks() {
    return booksRepository.all();
}

export async function getBooksByGenre(request, h) {
    const genreId = request.params.genreId;
    return booksRepository.byGenre(genreId);
}