// Configuration pour le token

const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify( /*token*/ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmMwMTJhNDg4OGY1MmJhZjIzMTk3YjMiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU2OTY2MjMzLCJleHAiOjE2NTcwNTI2MzN9.HrF0C95SqrlryBF8n-9NuVebKVvDcq-JNTj5YLfPk1o', 'RANDOM_TOKEN_SECRET');
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