const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const secret = 'testJWTtoken';

const signup = async (req, res) => {
    const {email, name, surname, password } = req.body;

    try {
        const oldUser = UserModel.findOne({ email });
        if (oldUser) return res.status(400).json({message: "User with this email already exists!"});
        const newName = `${name}${surname}`;
        const hashedPass = await bcrypt.hash(password, 12);
        const token = jwt.sign({email, hashedPass, newName}, secret, {expiresIn: "2h"});

        const result = await UserModel.create({email, name, surname, password: hashedPass});

       return res.status(201).json({result, token});
    } catch (error) {
        res.status(500).json({message: `Something went wrong: ${error}`})
    }
}

module.exports = {signup}