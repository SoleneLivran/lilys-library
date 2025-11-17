'use strict';

import fs from 'fs';
import { parse } from 'csv-parse';

export async function loadBooks() {
    const fileContent = fs.readFileSync('./data/books.csv', 'utf-8');

    return new Promise((resolve, reject) => {
        parse(
            fileContent,
            {
                columns: true, // Use header row as keys
                skip_empty_lines: true,
            },
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}