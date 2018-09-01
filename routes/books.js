import express from 'express';
import verifyToken from '../auth/verifyToken';
import db from '../database/db';

const router = express.Router();

/* GET a book. */
router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
        if (err) {
            throw err;
        }
        res.json(row);
    });
});

/* GET all books. */
router.get('/', verifyToken, function (req, res, next) {
    // Return books.
    db.all('SELECT * FROM books WHERE owner = ?', req.userId, (err, rows) => {
        if (err) {
            throw err;
        }
        res.send({ books: rows });
    });
});

/* POST to books. */
router.post('/', verifyToken, function (req, res, next) {
    const title = req.body.title;
    const genre = req.body.genre;
    const author = req.body.author;

    if (title && genre && author) {
        db.run('INSERT INTO books (title, genre, author, owner) VALUES (?, ?, ?, ?)', [title, genre, author, req.userId], (err) => {
            if (err) {
                throw err;
            }
        });
        res.sendStatus(201);
    }
    else {
        res.sendStatus(400);
    }
});


/* UPDATE a book. */
router.put('/:id', verifyToken, function (req, res, next) {
    const id = +req.params.id;
    const title = req.body.title;
    const genre = req.body.genre;
    const author = req.body.author;
    // Updating is allowed if either exists.
    const propertyExists = ((title !== undefined) || genre !== undefined) || (author !== undefined);

    if (id && propertyExists) {
        Object.keys(req.body).forEach(key => {
            const value = req.body[key];
            db.run(`UPDATE books SET ${key} = ? WHERE id = ?`, [value, id], (err) => {
                if (err) {
                    throw err;
                }
            });
        });
        res.sendStatus(204);
    }
    else {
        res.sendStatus(400);
    }
});

/* DELETE a book. */
router.delete('/:id', verifyToken, function (req, res, next) {
    const id = +req.params.id;
    if (id) {
        db.run("DELETE FROM books WHERE id = ?", id);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(400);
    }
});

module.exports = router;
