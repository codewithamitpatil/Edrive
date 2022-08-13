import {
    NextFunction,
    Request,
    Response
} from "express";
import { get } from "lodash";
import httpError from 'http-errors';
import { container } from 'tsyringe';

import JwtService from "../services/jwt.service";

// create instance
const jwtService = container.resolve( JwtService );

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    let refreshToken = get( req, "headers.x-refresh" ) || get( req, "cookies.refreshToken" );

    let accessToken = get( req, "headers.authorization", "" ).replace( /^Bearer\s/, "" );

    // console.log( "=====>", refreshToken );
    console.log( "=====>", accessToken );


    // access token check
    if ( !accessToken ) return next();

    let { decoded, expired } = jwtService.decode( accessToken );

    if ( decoded ) {
        //@ts-ignore
        //  
        req.user = decoded;
        return next();
    }

    if ( expired && !refreshToken ) {
        return next( new httpError.Unauthorized( 'access token is expired' ) );
    }

    return next()


};

// export
export default deserializeUser;