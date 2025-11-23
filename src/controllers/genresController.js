import { genresRepository } from '../services/genresRepository.js';

export async function getGenres() {
    return genresRepository.allWithBorrowableBooks();
}