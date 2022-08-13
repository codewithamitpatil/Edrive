
import { get } from "lodash";
import { autoInjectable } from 'tsyringe';
import httpError from 'http-errors';
import joi from 'joi';
import parser from 'ua-parser-js';
import ip from 'ip';
import express, {
    NextFunction,
    Request,
    Response
} from "express";


import { Role } from '../constant/role.constant';


import SessionService from '../services/session.service';
import UserService from '../services/user.service';
import JwtService from '../services/jwt.service';
import client from "../helpers/rediscon";
import { UserDocument } from '../interface/user.interface';


import asyncHandler from '../middleware/asyncHandler';
import requiresUser from '../middleware/requireUser';


@autoInjectable()
export default class UserController {

    public path = "/auth";
    public router = express.Router();

    private readonly sessionService: SessionService;
    private readonly userService: UserService;
    private readonly jwtService: JwtService;

    constructor(
        sessionService: SessionService,
        userService: UserService,
        jwtService: JwtService
    ) {
        this.sessionService = sessionService;
        this.userService = userService;
        this.jwtService = jwtService;

        // intialize routes
        this.routes();
    }

    // routes 
    routes = () => {

        this.router.post( '/signup',
            this.validateRequest( "signup" ),
            this.createAcHandler );

        this.router.post( '/signin',
            this.validateRequest( 'signin' ),
            asyncHandler( this.createUserSessionHandler ) );

        this.router.delete( '/logout',
            requiresUser,
            asyncHandler( this.invalidateUserSessionHandler ) );

        this.router.get( '/loggedin',
            requiresUser,
            asyncHandler( this.curLoggedInUserHandler ) );

        this.router.post( '/verifyLink',
            asyncHandler( this.sendAcVerifyLink ) );

        this.router.get( '/verifyac/:uid/:token',
            asyncHandler( this.verifyAcByLink ) );

        this.router.post( '/changepass',
            this.validateRequest( 'changepass' ),
            requiresUser,
            asyncHandler( this.changeAcPassHandler ) );

        this.router.post( '/forgetpass',
            this.validateRequest( 'forgetpass' ),
            asyncHandler( this.forgotPassHandler ) );

        this.router.post( '/reset/:token',
            this.validateRequest( 'resetpass' ),
            asyncHandler( this.resetPassHandler ) );

        this.router.get( '/session',
            requiresUser,
            asyncHandler( this.getUserSessionsHandler ) );

        this.router.post( '/refresh',
            asyncHandler( this.getRefreshTokenHandler ) );

    }

    // validations
    validateRequest = ( key ) => async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        console.log( 'key ', key )

        try {
            // schema for validating request
            var schema;

            switch ( key ) {

                case 'signup':
                    schema = joi.object( {
                        body: joi.object( {
                            uname: joi.string()
                                .required(),
                            email: joi.string()
                                .email()
                                .required(),
                            role: joi.string()
                                .valid( Role.USER, Role.ADMIN )
                                .error( new httpError.BadRequest( 'Invalid Role' ) ),
                            password: joi.string()
                                .min( 6 )
                                .max( 12 )
                                .required()
                        } )

                    } );
                    break;

                case 'signin':
                    schema = joi.object( {
                        body: joi.object( {
                            email: joi.string()
                                .email()
                                .required()
                                .error( new httpError.BadRequest( 'All Fields Are Required' ) ),
                            password: joi.string()
                                .required()
                                .error( new httpError.BadRequest( 'All Fields Are Required' ) )
                        } )

                    } );
                    break;

                case 'changepass':
                    schema = joi.object( {
                        body: joi.object( {
                            password: joi.string()
                                .required()
                                .error( new httpError.BadRequest( 'Old Password is required' ) ),
                            newpassword: joi.string()
                                .min( 6 )
                                .max( 12 )
                                .required()
                        } )
                    } );
                    break;
                case 'forgetpass':
                    schema = joi.object( {
                        body: joi.object( {
                            email: joi.string()
                                .email()
                                .required()
                        } )
                    } );
                    break;

                case 'resetpass':
                    schema = joi.object( {
                        body: joi.object( {
                            password: joi.string()
                                .min( 6 )
                                .max( 12 )
                                .required()
                        } )
                    } );
                    break;

                default:
                    break;
            }

            await schema.validateAsync( {
                body: req.body
            } );

            return next();

        } catch ( error ) {
            return next( error );
        }

    }

    // signup
    private createAcHandler = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        const data = req.body;

        const emailCheck = await this.userService.emailCheck( data.email );
        if ( emailCheck ) {
            return next( new httpError.BadRequest( 'Email Is Already Exist' ) );
        }

        const unameCheck = await this.userService.unameCheck( data.uname );
        if ( unameCheck ) {
            return next( new httpError.BadRequest( 'Username Is Already Exist' ) );
        }

        // create user 
        const user = await this.userService.createUser( data );

        // send verfication link
        const link = await this.userService.VerifyLink( data.email );

        res.send( { status: 200, email: req.body.email, message: "Account Created SuccessFully .Plz verify your email" } );

    }

    //  verify account 
    private verifyAcByLink = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        const { uid, token } = req.params;

        const data = await this.userService.VerifyAcByLink( parseInt( uid ), token );

        if ( !data ) {
            // return res.redirect( 'http://localhost:3000/verify/fail' );
            return next( new httpError.BadRequest( 'Invalid Link' ) )
        }

        //  return res.redirect( 'http://localhost:3000/verify/sucess' );
        res.send( { status: 200, message: "Account Verified SuccessFully .Now You Can Signin" } );

    }

    // send verification link on email
    private sendAcVerifyLink = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        const { email } = req.body;


        // send verfication link
        const link = await this.userService.
            VerifyLink( email );

        if ( !link || get( link, 'status' ) ) {
            return next( link );
        }

        res.send( { status: 200, message: "Verification link has been send on your registered email id" } );

    }

    // change password with old password
    private changeAcPassHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const email = get( req, "user.email" );
        const { password, newpassword } = get( req, "body" );

        const data = await this.userService.
            changePassword( email, password, newpassword );

        if ( !data || get( data, 'status' ) ) {
            return next( data );
        }

        res.send( { status: 200, message: "Password Updated SuccessFully" } );

    }

    // forgot pass
    private forgotPassHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { email } = req.body;

        const data = await this.userService.
            forgetPassword( email );

        if ( !data || get( data, 'status' ) ) {
            return next( data );
        }


        res.send( {
            status: 200,
            message: `An Reset Password E-Mail Has Been Sent To ${ email } With Further Instructions.`
        } );


    }

    // to set new password after forgot pass
    private resetPassHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const token = get( req, "params.token" );
        const password = get( req, "body.password" );


        const data = await this.userService.
            resetPassword( token, password );

        if ( !data || get( data, 'status' ) ) {
            return next( data );
        }

        res.send( {
            status: 200,
            message: `Success! Your password has been changed.`
        } );

    }

    // to get decoded access token
    private curLoggedInUserHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const data = get( req, "user" );

        res.send( {
            status: 200,
            message: 'success',
            docs: {
                loggedin: true,
                data
            }

        } );
    }

    // Login
    private createUserSessionHandler = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        const { email, password } = req.body;

        // check for email and password
        const user = await this.userService.
            validateCredentials(
                email,
                password
            );

        if ( !user || get( user, "message" ) ) return next( user );

        // to get user meta data
        const ua = parser( req.headers['user-agent'] );
        const browser = ua.browser.name || "";
        const os = ua.os.name || "";
        const ip4 = ip.address() || "";

        // session obj
        const sessionObj = {
            uid: user.uid,
            browser,
            os,
            ip4
        };



        // create session 
        const session = await this.sessionService.
            create( sessionObj );

        // create access token
        const accessToken = await this.jwtService.
            createAccessToken( user, session );

        // create refresh token
        const refreshToken = await this.jwtService.
            createRefreshToken( session );

        // return tokens


        // res.cookie( "accessToken", accessToken, {
        //     maxAge: 900000, // 15 mins
        //     httpOnly: true,
        //     domain: "localhost",
        //     path: "/",
        //     sameSite: "strict",
        //     secure: false,
        // } );

        res.cookie( "refreshToken", refreshToken, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            domain: "localhost",
            path: "/",
            secure: false,
            sameSite: 'lax'
        } );


        return res.send( {
            status: 200,
            message: 'login success',
            role: user.role,
            accessToken,
            refreshToken,

        } );
    }

    // logout
    private invalidateUserSessionHandler = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {


        const sid = get( req, "user.sid" );

        await this.sessionService.update( sid, { valid: false } );

        await client.del( sid.toString() );

        res.clearCookie( 'refreshToken' );
        res.send( {
            status: 200,
            message: 'logout success'
        } );

    }

    // previous login
    public getUserSessionsHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const uid = get( req, "user.uid" );
        const sid = get( req, "user.sid" );

        const session = await this.sessionService.
            getAll( uid );

        res.send( {
            status: 200,
            message: "session success",
            current: sid,
            data: session
        } );

    }

    // to get new access token with refresh token 
    public getRefreshTokenHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const { refreshtoken } = req.body;
        const refreshTokens = get( req, "cookies.refreshToken" ) || refreshtoken;

        const token = await this.jwtService.reIssueAccessToken( refreshTokens );

        if ( !token ) {
            return next( new httpError.BadRequest( 'Plz Login' ) );
        }

        res.send( {
            accessToken: token?.accessToken,
            role: token?.role,
            status: 200,
            message: "success"
        } );


    }

}


