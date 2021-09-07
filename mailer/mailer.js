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
                <p>Please click this link to activate your account:</p>
                <h3><a target="_" href="${process.env.DOMAIN}/user/activate-acc/${hash}">LINK</a></h3>
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