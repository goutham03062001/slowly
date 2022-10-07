const nodemailer = require("nodemailer");
exports.mailTransporter = nodemailer.createTransport({

    service:"gmail",
    auth:{
        user:'gouthamp0306@gmail.com',
        pass:"#Goutham@422"
    }
});

exports.mailDetails = {
    from : 'gouthamp0306@gmail.com',
    subject:'test email',
    body:"mail sent using nodemail"
}