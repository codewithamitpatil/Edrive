
import { get } from "lodash";
import { autoInjectable } from 'tsyringe';

import express, {
    NextFunction,
    Request,
    Response
} from "express";


@autoInjectable()
export default class CommonController {

    public path = "/check";
    public router = express.Router();

    constructor(

    ) {
        // intialize routes
        this.routes();
    }

    // routes 
    routes = () => {
        this.router.get( '/health', this.helthCheck );
    }

    // health check

    // health route
    helthCheck = async ( req: Request, res: Response ) => {
        res.send( {
            status: 200,
            message: 'Auth Service is up and running'
        } )
    }

}
