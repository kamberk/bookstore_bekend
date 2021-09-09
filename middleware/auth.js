const jwt = require('jsonwebtoken');

const secret = 'testJWTtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if(token) {
            decodedData = jwt.verify(token, secret);
            req.email = decodedData?.email;
        } else {
            decodedData = jwt.decode(token);
            req.email = decodedData?.email;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {auth}