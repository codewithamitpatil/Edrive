const amqp = require('amqplib');
const {
    channel
} = require('diagnostics_channel');
const process = require('process');

//config
const {
    rabitUri
} = require('../config/default.js');

const {
    MailHandler
} = require('./services/mail.service');

const MessageQueue = async () => {

    const quename = "mail";
    const connection = await amqp.connect(rabitUri);
    const channel = await connection.createChannel();
    const que = await channel.assertQueue(quename, {
        durable: false
    });

    channel.consume(quename, msg => {
        console.log(msg.content.toString());
        let temp = msg.content.toString();
        let data = JSON.parse(temp);
        MailHandler(data);
        channel.ack(msg);
    });


    process.on('exit', (code) => {
        console.log('process exit nde', code);
        connection.close();
    });


}


// export
module.exports = MessageQueue;