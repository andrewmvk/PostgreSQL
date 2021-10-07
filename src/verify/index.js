const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
    async verifyJWT (req, res, next) {
        const token = req.headers['x-acess-token']
        jwt.verify(token, secret, (err, decoded) => {
            if(err) return res.status(401).end();
    
            req.userId = decoded.userId;
            next();
        })
    }
}