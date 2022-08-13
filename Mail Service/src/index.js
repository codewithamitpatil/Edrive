//require('./app.js');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');

const mailRoutes = require('./controller/mail.controller');

const {
    ErrorResponse
} = require('./middlewares/errorHandler');

const {
    port
} = require('../config/default');

const MessageQueue = require('./app');

const app = express();

// enable cors
app.use(cors('*'));

// json parse
app.use(express.json());

// urlencoded data parse
app.use(express.urlencoded({
    extended: true
}));

// csrf protection
app.use(helmet({
    contentSecurityPolicy: false
}));

// query paramter polution protect
app.use(hpp());

// initialize routes
app.use('', mailRoutes);

// health check
app.get('/health', (req, res) => {
    res.send('Mail Service Is Up And Running');
});

// centrlize error handler
app.use(ErrorResponse);


// main server
const server = () => {
    app.listen(port, () => {
        // start listening message
        MessageQueue();
        console.log(`Mail Server is listening on port ${port}`);
    });
}

server();