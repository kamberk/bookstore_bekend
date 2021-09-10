const nodemailer = require('nodemailer');

exports.sendResetPassEmail = function({toUser, token, name}) {
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
            subject: 'Restart your password!',
            html: `
                <h1>Hello ${name}, Please follow link to restart your password:</h1>
                <p>Please click this link to restart your password:</p>
                <h3>
                <a style="
                    text-decoration: none;
                    color: red;
                " target="_" href="${process.env.DOMAIN}/new-pass/${token}">LINK</a>
                </h3>
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