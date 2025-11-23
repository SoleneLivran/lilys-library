'use strict';

import { LANGUAGES } from "./constants/languages.js";
import { BOOK_STATUS_LABELS } from "./constants/bookStatus.js";

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
        return formattedAuthors.join(' & ');
    }
}

export function formatLanguages(languageString) {
    if (!languageString) return '';

    const codes = languageString.split(',').map(l => l.trim());
    const names = codes.map(code => LANGUAGES[code] || code);

    return names.join(', ');
}

export function getStatusLabel(statusCode) {
    return BOOK_STATUS_LABELS[statusCode] || 'Statut inconnu';
}