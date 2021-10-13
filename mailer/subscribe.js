const nodemailer = require('nodemailer');

exports.sendSubConf = function({toUser}) {
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
            subject: 'Uspesna prijava na Newsletter!',
            html: `
                <h1>Prijavili ste se na Newsletter eKnjizare!</h1>
                <h3>
                Ovo je automatski odgovor kao dokaz uspesne prijave na newsletter!
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