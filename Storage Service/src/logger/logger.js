// for logging 

const fs   = require('fs');
const path = require('path');


const {   createLogger,
          format,
          transports
          } = require('winston');
          
const {   combine,
          label,
          timestamp,
          prettyPrint,
          colorize,
          json,
          simple,errors,
          printf,
          splat
        } = format;

// importing config
const {
  loggerConfig,
  isProduction,
  mongodb,
  mongodbLogOptions,
  logLevel
} = require('../../config/config');

// file transport
const { File } = transports;


// to control logger settings
const config = loggerConfig;
// importing CloudWatch transport 
const CloudWatchTransport = require('./cloudwatchTransport');

// ensure log directory exists
fs.existsSync(config.logPath) || fs.mkdirSync(config.logPath)


// production logger
const prodLogger = () => {

// intialize logger
return createLogger({
    level:config.logLevel,
    format: combine(
                    timestamp({format:'YYYY-MM-DD HH:MM:SS'}),
                    errors({stack :true}) ,
                    splat(),
                    simple(),
                    json()
                ),
    defaultMeta: { service: config.service },
    transports: [
      
            // to send logs into Aws CloudWatch
     // CloudWatchTransport,
      // to write logs into file
        new File({ filename: path.join(config.logPath, `/${config.service}-error.log`), level: "error" }),
        new File({ filename: path.join(config.logPath, `/${config.service}-warn.log`), level: "warn" }),
        new File({ filename: path.join(config.logPath, `/${config.service}-info.log`), level: "info" }),
        new File({ filename: path.join(config.logPath, `/${config.service}-http.log`), level: "http" }),
        new File({ filename: path.join(config.logPath, `/${config.service}-verbose.log`), level: "verbose" }),
        new File({ filename: path.join(config.logPath, `/${config.service}-debug.log`), level: "debug" }),
        new File({ filename: path.join(config.logPath, `/${config.service}-silly.log`), level: "silly" }),
        new File({ filename: path.join(config.logPath, `/${config.service}-combined.log` )}),
         
      ],

      exceptionHandlers: [ 
          new File({ filename: path.join(config.logPath, `/${config.service}-Exception.log` )}),
      ],
      // for on exception we dont want stop server
      exitOnError: false
      
});

}

// development looger
const devLogger = () => {

// log format
const myFormat = printf(({  sta,method,url,
status,restime,addr,Function,
File,level,Purpose,message, 
timestamp , stack ,label }) => {
 
  if(sta){
      return ` ${level}: ${ stack || message} \n Service       : ${label}\n Status        : ${sta} \n \n Date And Time : ${timestamp}  `;
   }else{
      if(url){
        // for morgan req logs
        return ` ${level} : ${message} \n Service       : ${label} \n Method        : ${method} \n Url           : ${url} \n Status        : ${status} \n Result Time   : ${restime} \n Req Address   : ${addr} \n Date And Time : ${timestamp}  `;
      }else{
        // for other logs
        return ` ${level}: ${ stack || message} \n Service       : ${label} \n Function      : ${Function}\n File          : ${File} \n Purpose       : ${Purpose}\n Date And Time : ${timestamp}  `;
      }
   }

});


// intialize logger
return createLogger({
    level:config.logLevel,
    format:combine(
                    timestamp({format:'YYYY-MM-DD HH:MM:SS'}),
                    errors({stack :true}) ,
                    splat(),
                    simple(),
                    json()
                  ),
    defaultMeta: { service: config.service },
    transports: [
    
     // to print in console
      new transports.Console({ 
          format:combine(
                    label({ label :config.service }),
                    colorize(),
                    myFormat
                 ),
          handleExceptions:true
      }),
 
      // to write logs into file
      new File({ filename: path.join(config.logPath, `/${config.service}-error.log`), level: "error" }),
      new File({ filename: path.join(config.logPath, `/${config.service}-warn.log`), level: "warn" }),
      new File({ filename: path.join(config.logPath, `/${config.service}-info.log`), level: "info" }),
      new File({ filename: path.join(config.logPath, `/${config.service}-http.log`), level: "http" }),
      new File({ filename: path.join(config.logPath, `/${config.service}-verbose.log`), level: "verbose" }),
      new File({ filename: path.join(config.logPath, `/${config.service}-debug.log`), level: "debug" }),
      new File({ filename: path.join(config.logPath, `/${config.service}-silly.log`), level: "silly" }),
      new File({ filename: path.join(config.logPath, `/${config.service}-combined.log` )}),
   
    ],

    exceptionHandlers: [ 
      // Write Exception logs
      new File({ filename: path.join(config.logPath, `/${config.service}-Exception.log` )}),

    ],

   exitOnError: false
      
});

}

let logger = null;

if (!isProduction){
   logger = devLogger();
}else{
   logger = prodLogger(); 
}

// export logger
module.exports = logger;