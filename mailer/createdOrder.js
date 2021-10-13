const nodemailer = require('nodemailer');

exports.sendOrderedInformation = function({toUser, total}) {
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
            subject: 'Uspesno kreirana porudzbina!',
            html: `
                <h1>Vasa porudzbina je uspesno kreirana!</h1>
                <h3>
                Ukupno za placanje: ${total}
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