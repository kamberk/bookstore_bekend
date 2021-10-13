const nodemailer = require('nodemailer');

exports.sendContactResponse = function({toUser, name}) {
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
            subject: 'Primili smo vasu poruku!',
            html: `
                <h1>Zdravo ${name}! Vasa poruka je primljena.</h1>
                <h3>
                Ovo je automatski odgovor, uskoro ocekujte odgovor nekog od admina nase stranice!
                </h3>
                <p>Hvala Vam sto kupujete kod nas!</p>
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