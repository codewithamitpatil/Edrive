import express, { Express } from 'express';

class App {

    app: Express;
    port: Number;

    constructor( appInit: any ) {

        // intialize app
        this.app = express();

        // intialize port
        this.port = appInit.port;

        // intialize middleware
        this.middleware( appInit.middlewares );

        // intialize all the routes
        this.route( appInit.controllers );

        // intialize mysql connection
        this.dbInit( appInit.dbconn );

        // intialize redis
        this.redisInit( appInit.rediscon );

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

    // to handler 404 and all error responses
    errorHandler = ( handlers ) => {
        handlers.forEach( handler => {
            this.app.use( handler );
        } )
    };

    // start mysql db
    dbInit = async ( AppDataSource ) => {

        try {
            AppDataSource
                .initialize()
                .then( async () => {
                    console.log( 'Mysql Is Connected' );
                } )

        } catch ( e ) {
            console.log( e );
        }
    }

    // redis init
    redisInit = async ( client ) => {
        await client.connect();
    }

    // server listen
    listen = () => {
        this.app.listen( this.port, () => {
            console.log( `Server is listening at http://localhost:${ this.port }` );
        } );
    }


}

// export app
export default App;
