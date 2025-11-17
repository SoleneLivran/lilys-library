import { loadBooks } from '../services/csvService.js';

export async function getBooks() {
    const books = await loadBooks();

    return books.map(b => (
        {
            title: b.title,
            authors: b.authors,
            status: b.availability ? b.availability : 'available',
            genres: b.genres,
            series: b.series,
        }
    ));
}