const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = 'testJWTtoken';

const signup = async (req, res) => {
    const {email, name, surname, password } = req.body;

    try {
        const oldUser = await User.findOne({email})
        if (oldUser) return res.status(400).json({message: "User with this email address already exists!"});
        const newName = `${name}${surname}`;
        const hashedPass = await bcrypt.hash(password, 12);
        const token = jwt.sign({email, hashedPass, newName}, secret, {expiresIn: "2h"});

        const result = await User.create({email, name, surname, password: hashedPass});

       return res.status(201).json({result, token});
    } catch (error) {
        res.status(500).json({message: `Something went wrong: ${error}`})
    }
}

module.exports = {signup}