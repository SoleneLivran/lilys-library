'use strict';

export function formatAuthors(authorsString) {
    if (!authorsString) return 'non spécifié';

    const authors = authorsString.split(';').map(author => author.trim());

    const formattedAuthors = authors.map(author => {
        const parts = author.split(',').map(part => part.trim());
        if (parts.length === 2) {
            return `${parts[1]} ${parts[0]}`;
        } else {
            return author;
        }
    });

    if (formattedAuthors.length === 1) {
        return formattedAuthors[0];
    } else {
        return formattedAuthors.join(' & '); // todo check
    }
}