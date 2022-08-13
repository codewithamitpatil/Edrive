import "reflect-metadata";
import 'dotenv/config';
import { container } from 'tsyringe';
import express, { Express } from 'express';
import config from 'config';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';


import redisCon from './helpers/rediscon';

// db source
import { AppDataSource } from "./data-source";

import App from './app';


// import controllers
import AuthController from './controllers/user.controller';
import CommonController from "./controllers/common.controller";
import AdminController from "./controllers/admin.controller";
import S3Service from "./services/s3bucket.service";

// error handlers
import { errorHandler, NotFoundPage } from './middleware/errorHandler';

// middlewares
import deserializeUser from './middleware/deserializeUser';



const port = config.get( 'port' ) as number;


// bootstrap server
const bootstrap = () => {

    // resolve controllers
    const authController = container.resolve( AuthController );
    const commonController = container.resolve( CommonController );
    const adminController = container.resolve( AdminController );

    // intialize app
    const app = new App( {
        port: port,
        middlewares: [
            // enable cors
            cors( {
                origin: ['http://localhost:3000',
                    'http://localhost:8000'],
                credentials: true

            } ),
            // json parsing
            express.json(),
            // url encoded data parsing
            express.urlencoded( { extended: true } ),
            // hpp
            hpp(),
            // helemt for xss
            helmet( { contentSecurityPolicy: false } ),
            // to parse cookies
            cookieParser(),
            deserializeUser

        ],
        controllers: [
            authController,
            commonController,
            adminController
        ],
        //db data source
        dbconn: AppDataSource,
        // redis client
        rediscon: redisCon,
        // error handlers
        errorHandlers: [
            // 404 page
            NotFoundPage,
            // all errros
            errorHandler
        ]

    } );

    // start server
    app.listen();

}


bootstrap();


