


const httpError = require( 'http-errors' );
const requiresUser = async (
    req, res, next
) => {

    const user = req?.user;

    if ( !user ) {
        return next( new httpError.Unauthorized() );
    }

    return next();
};

// export
module.exports = requiresUser;