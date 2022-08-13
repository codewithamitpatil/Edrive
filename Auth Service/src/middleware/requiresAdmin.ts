
import {
    NextFunction,
    Request,
    Response
} from "express";
import { get } from "lodash";
import httpError from 'http-errors';

// requires admin 
const requiresAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const user = get( req, "user.role" );

    if ( user !== "ADMIN" ) {
        return next( new httpError.Unauthorized() );
    }

    return next();
};

// export
export default requiresAdmin;


