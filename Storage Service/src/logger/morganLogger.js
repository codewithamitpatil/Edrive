// for logging each http requests

const morgan = require('morgan');
const moment = require('moment');
const fsr    = require('file-stream-rotator');

// including configs
const { logPath,isProduction} 
= require('../../config/config'); 

const logger = require('./logger');

morgan.token('date', (req, res) => moment().format('YYYY-MM-DD HH:MM:SS'));

morgan.format('LogFormat', '[:date]":remote-addr :method :url" :status  - :response-time ms');


const accessLogStream = fsr.getStream({
  filename: logPath + 'access-%DATE%.logs',
  frequency: 'daily', 
  verbose: false
});

// export
module.exports ={
    morgonWinston:morgan(function (tokens, req, res) {
      
        logger.http({
            message:'Logging Http Requests',
            method:tokens.method(req, res),
            url:tokens.url(req, res),
            status:tokens.status(req, res),
            restime: tokens['response-time'](req, res),
            addr:tokens['remote-addr'](req, res)
         });

    }),
    morgonFile:morgan('LogFormat', {stream: accessLogStream})
}