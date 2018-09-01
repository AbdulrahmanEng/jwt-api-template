import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    // Define token.
    const token = req.headers['x-access-token'];

    // Check is token exists.
    if (!token) {
        // Send a 403.
        res.status(403).send({ auth: false, message: 'No token provided' });
    }
    else {

        // Attempt verification.
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                // If error occurs send a 500.
                res.status(500).end('Failed to authenticate token');
            }
            // Assign the decoded id to request for use by other routes.
            req.userId = decoded.id;
            // Invoke next.
            next();
        });

    }
}