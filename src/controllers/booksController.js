import { booksRepository } from '../services/booksRepository.js';

export async function getBooks() {
    return await booksRepository.allBorrowable();
}

export async function getBooksByGenre(request) {
    const genreId = request.params.genreId;
    return await booksRepository.byGenre(genreId);
}