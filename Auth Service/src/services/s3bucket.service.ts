
import { autoInjectable } from "tsyringe";
import { get, omit } from 'lodash';
import httpError from 'http-errors';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import config from 'config';
import AWS from 'aws-sdk';


// for messaging rabit mq
import Publish from "../utils/publisher";



@autoInjectable()
export default class S3Service {

    private aws = AWS;
    private s3;
    private bucket = config.get( 's3_bucket' ) as string;
    private accessKey = config.get( 'aws_access_key' ) as string;
    private privateKey = config.get( 'aws_private_key' ) as string;


    constructor(
    ) {
        //configuring the AWS environment
        this.aws.config.update( {
            accessKeyId: this.accessKey,
            secretAccessKey: this.privateKey
        } );

        // configure bucket
        this.s3 = new this.aws.S3();

    }

    // upload files to bucket
    upload = async ( content, name, path?) => {

        const params = {
            Bucket: this.bucket,
            Body: content,
            Key: name
        }

        const data = await this.s3.upload( params ).promise();
        return data;
    }

    // get all the files
    getAll = async () => {
        return await this.s3.getAll();

    }

}