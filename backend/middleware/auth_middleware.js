// Configuration pour le token

const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify( /*token*/ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmMwMTJhNDg4OGY1MmJhZjIzMTk3YjMiLCJpYXQiOjE2NTcxOTg1MzQsImV4cCI6MTY1NzI4NDkzNH0.W-sUBdOFrnqcYLznXSodCd5x2J5yOIlRK57DUcMDsXs', 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId
    req.auth = {
        userId
    };
    next()
    /*try {
    } catch (error) { 
        res.status(401).json({ message : error.message });
    }*/
};