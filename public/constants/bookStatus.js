export const BOOK_STATUS = {
    NON_BORROWABLE: 0,
    AVAILABLE: 1,
    BOOKED: 2,
    BORROWED: 3,
    HOME_ONLY: 4
};

export const BOOK_STATUS_LABELS = {
    [BOOK_STATUS.NON_BORROWABLE]: 'Non empruntable',
    [BOOK_STATUS.AVAILABLE]: 'Disponible',
    [BOOK_STATUS.BOOKED]: 'Réservé',
    [BOOK_STATUS.BORROWED]: 'Indisponible',
    [BOOK_STATUS.HOME_ONLY]: 'Disponible (sur place uniquement)'
};