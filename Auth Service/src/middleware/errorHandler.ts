import {
    NextFunction,
    Request,
    Response
} from "express";
import { get } from "lodash";
import httpError from 'http-errors';

// centrlize error handler
export const errorHandler = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction ) => {

    console.log( "errr =>", err );

    if ( err.isJoi ) {
        return res.status( 400 ).json( {
            'status': 400,
            'message': err.message
        } )
    }

    // // for mongoose confilict error 
    // if ( err.name === "ValidationError" ) {
    //     return handleValidationError( err, res );
    // }

    // // for mongoose confilict error 
    // if ( err.code && err.code == 11000 ) {
    //     return handleDuplicateKeyError( err, res );
    // }

    err.status = err.status || 500;
    if ( err.code == 'ER_DUP_ENTRY' ) {
        err.status = 409;
        err.message = "Duplicate Key"
    }

    return res.status( err.status ).send( {
        status: err.status,
        message: err.message
    } )
};

// 404 error handler
export async function NotFoundPage( req: Request, res: Response, next: NextFunction ) {
    return next( new httpError.NotFound( 'Requested Page Not Found' ) );
}
