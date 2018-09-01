import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database/db';

const router = express.Router();

/* POST to login. */
router.post('/', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        // Find user.
        db.get('SELECT * FROM users WHERE email = ?', email, (err, user) => {
            if (err) {
                res.status(500).end('Failed to find user');
            }
            if (!user) {
                res.status(404).end('User does not exist');
            }
            // Check passwords.
            const passwordValid = bcrypt.compareSync(password, user.password);

            if (!passwordValid) {
                res.status(401).send({ auth: false, token: null });
            }
            else {
                // Create a token
                const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });

                res.status(200).send({ auth: true, token: token });
            }
        });
    }
    else {
        res.status(400).end('Missing email and password');
    }
});

module.exports = router;