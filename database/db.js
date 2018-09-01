const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/data.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Add data.
db.serialize(function () {
    const booksQuery = `
    CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL, 
    genre TEXT NOT NULL,
    author INT NOT NULL, 
    owner INT NOT NULL
    )
    `;
    db.run(booksQuery);
    const userQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username TEXT NOT NULL UNIQUE, 
    email TEXT NOT NULL, 
    password TEXT NOT NULL)
    `;
    db.run(userQuery);
});

module.exports = db;