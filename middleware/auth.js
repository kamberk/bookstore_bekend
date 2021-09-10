const jwt = require('jsonwebtoken');

const secret = 'testJWTtoken';

const auth = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
    try {
        const decoded = jwt.verify(token, secret);
        req.name = decoded?.name;
        req.email = decoded?.email;
    } catch (error) {
        return res.status(401).send("Invalid token!");
    }
    return next();  
}

module.exports = auth