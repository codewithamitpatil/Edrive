const express = require( 'express' );
const logger = require( './logger/logger.js' );
const morgon = require( './logger/morganLogger' );

class App {

    app;
    port;

    constructor( appInit ) {

        // intialize app
        this.app = express();

        // intialize port
        this.port = appInit.port;

        // intialize middleware
        this.middleware( appInit.middlewares );
        // initalize morgon logger
        this.morgonInit()

        // intialize all the routes
        this.route( appInit.controllers );

        // intialize mongo connection
        this.mongoInit( appInit.dbconnection );



        // intialize all error handlers
        this.errorHandler( appInit.errorHandlers );
    }

    // intialize routes
    route = ( routes ) => {
        routes.forEach( controller => {
            this.app.use( controller.path, controller.router );
        } );
    }

    // intialize middlewares
    middleware = ( middlewares ) => {
        middlewares.forEach( middleware => {
            this.app.use( middleware );
        } );
    }

    // intialize morgon logger
    morgonInit = () => {
        this.app.use( morgon.morgonFile );
        this.app.use( morgon.morgonWinston )
    }

    // to handler 404 and all error responses
    errorHandler = ( handlers ) => {
        handlers.forEach( handler => {
            this.app.use( handler );
        } )
    };

    // start mongodb db
    mongoInit = ( db ) => {
        db()
            .on( "error", ( error ) => {
                logger.error( {
                    message: `Failed to connect to mongo`,
                    Function: "mongoInit() -> db()",
                    File: "app.js",
                    Purpose: error,
                } );
            } )
            .on( "disconnect", () => {
                logger.info( {
                    message: `mongodb disconnect`,
                    Function: "mongoInit() ->  db()",
                    File: "app.js",
                    Purpose: 'disconnect',
                } );
            } )
            .once( "open", () => {
                logger.info( {
                    message: `MongoDB connected Successfully!!!`,
                    Function: "mongoInit() ->  db()",
                    File: "app.js",
                    Purpose: "To check mongodb is connected  or not",
                } );
            } );
    }

    // server listen
    listen = () => {
        this.app.listen( this.port, () => {
            logger.info( {
                message: `Express Server Started Successfully!!! at http://localhost:${ this.port }`,
                Function: "listen()",
                File: "app.js",
                Purpose: "To check server is up and running",
            } );
        } );
    }

}


// export
module.exports = App;