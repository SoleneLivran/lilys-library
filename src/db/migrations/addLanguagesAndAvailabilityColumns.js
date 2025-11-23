import db from '../db.js';

db.exec(`
    ALTER TABLE books ADD COLUMN languages TEXT DEFAULT 'fr';
`);

db.exec(`
    ALTER TABLE books ADD COLUMN status INTEGER DEFAULT 1;
`);

console.log("Migration executed.");