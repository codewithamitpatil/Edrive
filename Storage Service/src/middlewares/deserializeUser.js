const {get} = require('lodash');
const jwt = require('jsonwebtoken');
const httpError = require( 'http-errors' );
// decode token
const  decode = ( token)=> {

        try {

            const decoded = jwt.verify( token, "amit" );

            return {
                decoded,
                valid: true,
                expired: false
            }
        } catch ( error ) {
            return {
                decoded: null,
                valid: false,
                expired: true
            }
        }

}

// deserialize 
const deserializeUser = async (req,res,next ) => {

    let accessToken = get( req, "headers.authorization", "" ).replace( /^Bearer\s/, "" );

    // access token check
    if ( !accessToken ) return next();

    let { decoded, expired } = decode( accessToken );

    if ( decoded ) {
        req.user = decoded;
        return next();
    }

    if ( expired ) {

        return next( new httpError.Forbidden('access token is expired') );
    }


};

module.exports = deserializeUser;
