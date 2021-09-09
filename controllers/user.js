const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {sendConfirmationEmail} = require('../mailer/mailer');
const { use } = require('../routes/users');
const { json } = require('body-parser');

const secret = 'testJWTtoken';

const signup = async (req, res) => {
    const {email, name, surname, password } = req.body;

    try {
        const oldUser = await User.findOne({email})
        if (oldUser) return res.status(400).json({message: "User with email address already exists!"});
        const newName = `${name}${surname}`;
        const hashedPass = await bcrypt.hash(password, 12);
        const token = jwt.sign({email, hashedPass, newName}, secret, {expiresIn: "2h"});

        const result = await User.create({email, name, surname, password: hashedPass});
        await sendConfirmationEmail({toUser: email, hash: token, name: name});

       return res.status(201).json({result, token});
    } catch (error) {
        res.status(500).json({message: `Something went wrong: ${error}`})
    }
}

const signin = async(req, res) => {
    
    const {email, password} = req.body;

    try {
        const noUser = await User.findOne({email});
        if(!noUser) return res.status(404).json({message: "User with this email doesn't exist!"});

        const correctPass = await bcrypt.compare(password, noUser.password);
        if(!correctPass) return res.status(400).json({message: "Wrong password!"})

        if(!noUser.confirmed) return res.status(400).json({message: "Please activate account first!"});

        const token = jwt.sign({name: noUser.name, email: noUser.email, id: noUser._id }, secret, {expiresIn: "2h"});

        res.status(200).json({result: noUser, token});
    } catch (error) {
        res.status(500).json({message: `${error}`});
    }

}

const activateAccount = async(req, res) => {
    const { token } = req.params;
    try {
        if(token){
            jwt.verify(token, secret, async function(error, decodedToken) {
                if(error) return res.status(400).json({message: "Expiried link!"});

                const {email, hashedPass, newName} = decodedToken;
                const oldUser = await User.findOne({email}, function(err, doc ) {
                    if(err) return res.status(400).json({message: err.message});
                    doc.confirmed = true;
                    doc.save();
                });
                
                res.redirect(`http://localhost:8080`);
                return alert('Account activated successfully! Please login now.');
            })
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "No user with this email!"});
        await User.findByIdAndDelete(user._id);
        return res.status(200).json({message: `User deleted success! ${user}`});
    } catch (error) {
        return res.status(400).json({error});
    }

}

module.exports = {signup, signin, deleteUser, activateAccount}