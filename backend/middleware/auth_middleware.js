// Configuration pour le token

const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify( /*token*/ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmMwMTJhNDg4OGY1MmJhZjIzMTk3YjMiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU3MDI0NDM3LCJleHAiOjE2NTcxMTA4Mzd9.b__Wj9TMMxjjFk4bT_ynjK8-gHVvcsME4uJ_qYL2w3o', 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    req.auth = {
        userId,
        isAdmin
    };
    next()
    /*try {
    } catch (error) { 
        res.status(401).json({ message : error.message });
    }*/
};