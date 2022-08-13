
const AWS = require( 'aws-sdk' );
const multer = require( 'multer' );
const multerS3 = require( 'multer-s3' );
const { S3Client } = require( '@aws-sdk/client-s3' );
const shortId = require( 'shortid' );
const path = require( 'path' );
const httpError = require( 'http-errors' );




//configuring the AWS environment
AWS.config.update( {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
  //  region: process.env.AWS_REGION,
} );

// configure bucket
const s3client = new AWS.S3();

let s3 = new S3Client( {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_PRIVATE_KEY
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
} );


// to upload files into s3 bucket
const uploader = multer( {
    storage: multerS3( {
        s3,
        acl: "public-read",
        bucket: process.env.AWS_S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function ( req, file, cb ) {
            // genrate salt
            const filename = shortId.generate() + '-' + file.originalname;
        console.log(filename)
            cb( null, filename )
        }
    } ),
    //limits
    limits: {
        fileSize: 100000,
    },
    // filer out invalid filetypes
    fileFilter: function ( req, file, cb ) {
        checkFileType( file, cb );

    },

} );


// file filteration
function checkFileType( file, cb ) {
    const filetypes = /jpeg|jpg|jpng|gif|text|png/;
    //check the file extention
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase() );

    const mimetype = filetypes.test( file.mimetype );

    if ( mimetype && extname ) return cb( null, true );

    // handle error here
    cb( new httpError.BadRequest( 'only jpeg, png, jpng, gif and text files are allowed ' ) );
}


// get s3 bucket file stream
const getFileStream = async ( fileKey ) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: process.env.AWS_S3_BUCKET
    }
    return s3client.getObject( downloadParams ).createReadStream()
}

// delete files in s3 bucket
const deleteFile = async ( fileKey ) => {
    return await s3client.deleteObject( { Bucket: process.env.AWS_S3_BUCKET, Key: fileKey } ).promise();
}

// export
module.exports = { uploader, getFileStream, deleteFile };