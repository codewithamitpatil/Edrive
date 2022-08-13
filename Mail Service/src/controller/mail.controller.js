const express = require('express');
const router = express.Router();

const {
    SendMail
} = require('../helpers/nodemailer');

const {
    defaultTemp
} = require('../templates/index.template');

const {
    MailHandler
} = require('../services/mail.service');

const mailValidation = require('../schema/mail.schema');
const asyncHandler = require('../middlewares/asyncHandler');

router.post('/sendmail', asyncHandler(async (req, res) => {

    const valData = await mailValidation.validateAsync(req.body);

    const {
        to,
        subject,
        title,
        message,
        uname
    } = valData;

    const data = {
        to,
        subject,
        type: 'default',
        options: {
            title,
            message,
            uname
        }
    }

    let result = await MailHandler(data);

    res.send({
        status: 200,
        message: 'Message Success Fully Sended'
    });

}));

// export 
module.exports = router;