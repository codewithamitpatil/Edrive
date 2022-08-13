const multer = require( 'multer' );
// const { tracer,opentracing} = require('./tracingMiddleware');
const logger = require('../logger/logger');
// to handle 404 error 
const e404Handler = async (req, res, next) => {
 
//   const span = tracer.startSpan('say-hello', { childOf: req.span })
//   span.setTag(opentracing.Tags.ERROR, true)
//   span.log({ event: 'name',
//    message: `this is a log message for name ` })

//   span.finish()
  
   
    res.send({
        status: 404,
        message: 'Page not found'
    })

     logger.error( {
                    message: 'page not found',
                    Function: "centerlizeErrorHandler() ",
                    File: "errorHandler.js",
                    Purpose: '404',
                    Stack:err
    } );

}

// to handle all the error response form
// centrlize place
const centerlizeErrorHandler = async (err, req, res, next) => {

   logger.error( {
                    message: err.message,
                    Function: "centerlizeErrorHandler() ",
                    File: "errorHandler.js",
                    Purpose: 'operational errors',
                    Stack:err
    } );
   
    // handle joi validation errors
    if (err.isJoi) {
        return res.status(400).json({
            'status': 400,
            'message': err.message
        })
    }

    // to handle file upload error
    if (err instanceof multer.MulterError) {
         err.message = "sorry file is too large";
         err.status = 400;
    }



    // to handle uncacht error 
    err.status = err.status || 500;

    err.message = err.message || 'Internal server error';

   
    // final response
    res.status(err.status).send({
        status: err.status,
        message: err.message
    })

     logger.error( {
                    message: err.message,
                    Function: "centerlizeErrorHandler() ",
                    File: "errorHandler.js",
                    Purpose: 'client message',
                    Stack:err
    } );

}

// exports 
module.exports = { e404Handler, centerlizeErrorHandler };