
const development = {
    // for env
  isProduction:false,
  env:'development',
  // service name
  service:'storage service',

  port: process.env.PORT || 5001,

  // for logger
  logLevel:'silly',
  logPath : './logs/', 

   // for logger
  loggerConfig:{
    logLevel:process.env.logLevel || "silly",
    logPath:process.env.logPath||"./logs/",
    service:process.env.service || "storage service"
  },

  // for mongodb
  mongodb: 'mongodb://localhost:27017/Social_Auth',

  // for redis
  redisDb:{
    port:6379,
    host:'127.0.0.1'
  },
 
  timeDelay:30,
    // for jaeger
  jaegerHost:'',
  jaegerPort:6832,

};

const production = {
      // for env
  isProduction:false,
  env:'development',
  // service name
  service:'storage service',

  port: process.env.PORT || 5001,

  // for logger
  logLevel:'error',
  logPath : './logs/', 
   // for logger
  loggerConfig:{
    logLevel:process.env.logLevel || "error",
    logPath:process.env.logPath||"./logs/",
    service:process.env.service || ""
  },

  // for mongodb
  mongodb: 'mongodb://localhost:27017/Social_Auth',

  // for redis
  redisDb:{
    port:6379,
    host:''
  },
 
  timeDelay:30,
    // for jaeger
  jaegerHost:'',
  jaegerPort:6832,

};

module.exports = development;

