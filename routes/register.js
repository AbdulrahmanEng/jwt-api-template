import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../database/db';

const router = express.Router();

/* POST to register. */
router.post('/', function (req, res, next) {

    const username = req.body.username.split(' ').join('');
    const email = req.body.email;
    const password = req.body.password;

    if (username && email && password) {
        // If username does not exist save user.
        db.get('SELECT * FROM users WHERE username = ?', username, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                // Hash password.
                const hashedPassword = bcrypt.hashSync(password, 8);
                // Save user.
                db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
                    if (err) {
                        throw err;
                    }

                    // Get user id.
                    db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
                        if (err) {
                            throw err;
                        }
                        // Create a token.
                        const token = jwt.sign({ id: row.id }, process.env.SECRET, {
                            expiresIn: 86400 // 24 hours
                        });
                        res.status(201).send({ auth: true, token: token });
                    });
                });
            }
            else {
                res.status(409).end('User already exists');
            }
        });
    }
    else {
        res.sendStatus(400);
    }
});

module.exports = router;
