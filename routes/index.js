import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => res.end('Welcome to the Address Book'));

module.exports = router;
