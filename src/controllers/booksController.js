import { booksRepository } from '../services/booksRepository.js';

export async function getBooks() {
    return booksRepository.all();
}