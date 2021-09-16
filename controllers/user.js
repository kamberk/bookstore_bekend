const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {sendConfirmationEmail} = require('../mailer/mailer');
const {sendResetPassEmail} = require('../mailer/resetPass');
const { use } = require('../routes/users');
const { json } = require('body-parser');
const alert = require('alert');

const secret = 'testJWTtoken';

const resetPass = async(req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "No user with this email"});
        const newName = `${user.name}${user.surname}`;
        const pass = user.password;
        const token = jwt.sign({email, pass, newName}, secret, {expiresIn: "2h"});
        await sendResetPassEmail({toUser: user.email, token: token, name: user.name});

        return res.status(201).json({message: "Please check your email and follow link to reset password!"});
    } catch (error) {
        return res.status(500).json({message: error});
    }
}



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

const newPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    try {
        const newPass = await bcrypt.hash(password, 12);
        if(token) {
            jwt.verify(token, secret, async function (error, decoded) {
                if(error) return res.status(400).json({message: "Expiried link!"});
                const {email, hashedPass, newName} = decoded;
                let filter = {email: email};
                let update = {password: newPass};
                const testUser = await User.findOne({email});
                const samePass = await bcrypt.compare(password, testUser.password);
                if (samePass) return res.status(400).json({message: "New password cannot be the same as your old password!"})
                let doc = await User.findOneAndUpdate(filter, update, {
                    new: true
                });
                console.log(doc);
                return res.status(201).json({message: "Password change success!"});
            })
        }
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

const activateAccount = async(req, res) => {
    const { token } = req.params;
    try {
        if(token){
            jwt.verify(token, secret, async function(error, decodedToken) {
                if(error) return res.status(400).json({message: "Expiried link!"});

                const {email, hashedPass, newName} = decodedToken;
                let filer = {email: email};
                let update = {confirmed: true};
                let doc = await User.findOneAndUpdate(filer, update, {
                    new: true
                });
                console.log(doc);
                return res.status(201).json({message: "Activated! You can login now.."});
            })
        } 
    } catch (error) {
       return res.status(400).json({message: error.message});
    }
}

const updateDeliveryInfo = async (req, res) => {
    const {ulica, opstina, zipcode} = req.body;
    try {
        const filter = {email: req.email};
        const update = {zipcode: zipcode, ulica: ulica, grad: opstina };
        let doc = await User.findOneAndUpdate(filter, update, {
            new: true
        });
        console.log(doc);
        return res.status(201).json({message: "Information saved successfully!"});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {    
    try {
        const filter = {email: req.email}
        const user = await User.findOne(filter);
        if(!user) return res.status(400).json({message: "No user with this email!"});
        await User.findByIdAndDelete(user._id);
        return res.status(200).json({message: `User deleted success!`});
    } catch (error) {
        return res.status(400).json({error});
    }

}

module.exports = {signup, signin, deleteUser, activateAccount, resetPass, newPassword, updateDeliveryInfo}