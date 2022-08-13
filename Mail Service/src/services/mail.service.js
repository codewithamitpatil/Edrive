const {
    sendMail
} = require('../helpers/nodemailer');
const {
    verificationTemp,
    resetPassTemp,
    resetPassSuccessTemp,
    welcomeTemp,
    accountVerifySuccessTemp,
    defaultTemp
} = require('../templates/index.template');

const MailHandler = async (data) => {

    const {
        to,
        subject,
        type,
        options
    } = data;

    console.log(data)

    let template = "";

    switch (type) {
        case 'resetpass':
            template = await resetPassTemp(options)
            break;
        case 'verifyAcMail':
            template = await verificationTemp(options);
            break;
        case 'resetpassSuccess':
            template = await resetPassSuccessTemp(options);
            break;
        case 'verifyAcSuccess':
            template = await accountVerifySuccessTemp(options);
            break;
        case 'welcome':
            template = await welcomeTemp(options);
            break;
        case 'default':
            template = await defaultTemp(options);
            break;
    }

    await sendMail(to, subject, template);
    return 'ok';
}

// export
module.exports = {
    MailHandler
};