import { autoInjectable } from "tsyringe";
import httpError from 'http-errors';
import { get } from "lodash";

import express, {
    NextFunction,
    Request,
    Response
} from "express";

import asyncHandler from '../middleware/asyncHandler';
import requiresAdmin from '../middleware/requiresAdmin';

import AdminService from "../services/admin.service";


@autoInjectable()
export default class AdminController {


    path = "/admin";
    router = express.Router();

    private readonly adminService: AdminService;

    constructor(
        adminService: AdminService
    ) {
        this.adminService = adminService;

        // intialize routes
        this.routes();
    }

    // routes
    routes = () => {

        // all below routes need to be admin
        this.router.use( requiresAdmin );

        this.router.get( '/sessions',
            asyncHandler( this.getAllUsersSessions ) );

        this.router.get( '/users',
            asyncHandler( this.getAllUsersData ) );

        this.router.get( '/block/:uid',
            asyncHandler( this.BlockUser ) );

        this.router.get( '/unblock/:uid',
            asyncHandler( this.unBlockUser ) );

        this.router.get( '/dashboard',
            asyncHandler( this.dashBoard ) );

    }

    //  all users  
    public getAllUsersSessions = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        const data = await this.adminService.
            getAllUsersSessions();

        if ( !data || get( data, 'status' ) ) {
            return next( data );
        }

        return res.send( {
            status: 200,
            message: "success",
            data: data
        } )
    }


    public getAllUsersData = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        const data = await this.adminService.
            getAllUsersData();

        if ( !data || get( data, 'status' ) ) {
            return next( data );
        }
        res.send( {
            status: 200,
            message: "success",
            data: data
        } )

    }

    // get users
    public dashBoard = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        const user = await this.adminService.
            getDashBoard();

        if ( !user ) {
            return res.send( {
                status: 400,
                message: "fail"
            } );
        }

        return res.send( {
            status: 200,
            message: "success",
            data: user
        } );

    }

    // block user by uid
    public BlockUser = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        const uid = get( req, 'params.uid' );

        const user = await this.adminService.
            blockUser( uid );

        if ( !user ) {
            return res.send( {
                status: 400,
                message: "fail"
            } )
        }

        return res.send( {
            status: 200,
            message: "success"
        } )

    }

    // ubblock user by uid
    public unBlockUser = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        const uid = get( req, 'params.uid' );

        const user = await this.adminService.
            unBlockUser( uid );

        return res.send( {
            status: 200,
            message: "success"
        } )

    }

}