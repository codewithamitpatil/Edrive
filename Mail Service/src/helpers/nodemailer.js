const nodemailer = require('nodemailer');


const {
    adminMail,
    nodemailerOptions
} = require('../../config/default');

// mail sender
const sendMail = async (
    to,
    subject,
    template) => {

    // transport
    const transport = nodemailer.createTransport(nodemailerOptions);

    // send mail 
    transport.sendMail({
        from: adminMail,
        to: to,
        subject: subject,
        html: template
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });

};

module.exports = {
    sendMail
};