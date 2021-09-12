const nodemailer = require('nodemailer');

exports.sendConfirmationEmail = function({toUser, hash, name}) {
    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD,
                  }
        })

        const message = {
            from: process.env.GOOGLE_USER,
            to: toUser,
            subject: 'Activation email',
            html: `
                <h1>Hello ${name}, Please confirm your Email:</h1>
                <p>Please click the link below to prove that the mail is yours:</p>
                <h2><a target="_" href="${process.env.DOMAIN}/activate/${hash}">LINK</a></2>
            `
        }

        transporter.sendMail(message, function(err, info) {
            if(err) {
                rej(err)
            } else {
                res(info)
            }
        })

    })
}