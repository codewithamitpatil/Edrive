const express = require( 'express' );
const httpErrors = require( 'http-errors' );
const joi = require( 'joi' );
const shortId = require( 'shortid' );
const { uploader, getFileStream, deleteFile } = require( '../helpers/s3Helper' );
let storageService = require( '../services/storage' );

const requiresUser = require( '../middlewares/requireUser' );




class StorageController {

    path = "/storage";
    router = express.Router();
    _storageService = new storageService();

    constructor() {

        // intialize routes
        this.routes();

        //this.seeds()

    }

    // mock data
    seeds = async () => {


        for ( var i = 0; i < 10; i++ ) {
            const code6 = shortId.generate().toString().slice( 0, 6 );

            const dataObj = {
                name: "amit-" + i,
                size: "45632",
                key: "PuOc_87hv-profile.png",
                contentType: "image/png",
                url: "https://amitvideos.s3.ap-south-1.amazonaws.com/PuOc_87hv-profile.png",
                userId: 4,
                pin: code6
            }

            const data = await this._storageService.create( dataObj );
            console.log( data )
        }


    }

    routes = () => {
        this.router.use( requiresUser );
        this.router.get( '/stream/:pin', this.streamFile );
        this.router.post( '/upload', uploader.single( 'file' ), this.storeFile );
        this.router.delete( '/remove/:pin', this.removeFile );
        this.router.get( '/user', this.fetchByUserId );
        this.router.get( '/', this.fetchAll );
        this.router.post( '/download/:pin', this.downloadFile );

    }

    // validations
    validateRequest = ( key ) => async (
        req, res, next
    ) => {

        try {
            // schema for validating request
            var schema;

            switch ( key ) {

                case 'upload':
                    // schema = joi.object( {
                    //     body: joi.object( {
                    //         file: joi.
                    //             .required(),
                    //     } )
                    // } );
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

    // upload files to s3
    storeFile = async ( req, res, next ) => {

        try {

            const code6 = shortId.generate().toString().slice( 0, 6 );

            const dataObj = {
                name: req.file.originalname,
                size: req.file.size,
                key: req.file.key,
                contentType: req.file.contentType,
                url: req.file.location,
                userId: req?.user?.uid,
                pin: code6
            }
            const data = await this._storageService.create( dataObj );

            res.send( { message: "file uploaded successfully", status: 200 } )
        } catch ( e ) {
            return next( e )
        }
    }

    // serve s3 files over a network
    streamFile = async ( req, res, next ) => {

        try {
            const data = await this._storageService.findOne( { pin: req.params.pin } );
            console.log( data )
            const stream = await getFileStream( data.key );
            stream.pipe( res );
        } catch ( e ) {
            return next( new httpErrors.BadRequest( 'File not found' ) );
        }

    }

    // download file by pin
    downloadFile = async ( req, res, next ) => {
        try {
            const data = await this._storageService.findOne( { pin: req.params.pin } );
            console.log( data )
            if ( !data ) return next( new httpErrors.BadRequest( 'Invalid pin' ) );
            const stream = await getFileStream( data.key );
         //   res.attachment( data.name );
            stream.pipe( res );

        } catch ( e ) {
            return next( e );
        }
    }

    // delete s3 files
    removeFile = async ( req, res, next ) => {

        try {
            const data = await this._storageService.removeOne( { pin: req.params.pin } );
            await deleteFile( data.key );
            res.send( { status: 200, message: 'File removed successfully' } )

        } catch ( e ) {
            next( new httpErrors.BadRequest( 'File is not removed' ) );
        }

    }

    // get all files
    fetchAll = async ( req, res, next ) => {
        const data = await this._storageService.find();
        res.send( data )
    }

    // get All files by userid
    fetchByUserId = async ( req, res, next ) => {
        const uid = req?.user?.uid;
        const offset = req?.query?._page || 0;
        const limit = req?.query?._limit || 100;
        const data = await this._storageService.find( { userId: uid }, offset, limit );
        if ( data.length == 0 ) {
            return res.send( { message: "no results found" } )
        }
        res.send( data )
    }

}

// export
module.exports = StorageController;