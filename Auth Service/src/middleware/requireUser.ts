
import {
    NextFunction,
    Request,
    Response
} from "express";
import { get } from "lodash";
import httpError from 'http-errors';


const requiresUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const user = get( req, "user" );

    if ( !user ) {
        return next( new httpError.Unauthorized() );
    }

    return next();
};

// export
export default requiresUser;