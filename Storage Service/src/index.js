
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
require('events').EventEmitter.defaultMaxListeners = 15;
dotenv.config();

// app
const App = require('./app');

// utilities
const db = require('./db/mongocon');



// controllers
const StorageController = require('./controllers/storage');

// middlewares
const errorHandler = require('./middlewares/errorHandler');
const deserializeUser = require('./middlewares/deserializeUser');
const tracer = require('./tracer/tracer');

const config = require('../config/config');

// bootstrap server
const bootstrap = () => {

    // intialize controllers and services object

    const storageController = new StorageController(); 

    // intialize app
    const app = new App({
        port: process.env.PORT || 7000,
        middlewares: [
            cors( {
                origin: ['http://localhost:3000',
                    'http://localhost:8000'],
                credentials: true
            } ),// enable cors
            express.json(),// json parsing
            express.urlencoded({ extended: true }),//url encoded data parsing
            // jager tracing
            tracer,
            // tracingMiddleWare
            deserializeUser,

        ],
        controllers: [
         storageController
        ],

        // db connection
        dbconnection:db,

        // error handlers
        errorHandlers: [
            errorHandler.e404Handler,
            errorHandler.centerlizeErrorHandler
        ]
    });

    // start server
    app.listen();

}


bootstrap();
