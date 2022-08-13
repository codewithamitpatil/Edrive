const joi = require('@hapi/joi');

const mail_post = joi.object({
    to: joi.string().email().required(),
    subject: joi.string().required(),
    message: joi.string().required(),
    uname: joi.string(),
    title: joi.string(),

});

// export 
module.exports = mail_post;