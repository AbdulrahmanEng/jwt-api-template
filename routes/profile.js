import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../database/db';
import verifyToken from '../auth/verifyToken';

const router = express.Router();

/* Get user profile. */
router.get('/', verifyToken, function (req, res) {
    //   Find user.
    db.get('SELECT * FROM users WHERE id = ?', req.userId, (err, row) => {
        if (err) {
            res.status(500).end('Failed to find user');
        }
        if (!row) {
            res.status(404).end('User does not exist');
        }
        else {
            // Define the user object without the password.
            const user = Object.assign({}, { id: row.id, username: row.username, email: row.email });
            res.status(200).send(user);
        }
    });
});

module.exports = router;