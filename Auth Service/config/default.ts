
export default {

    host: "localhost",
    port: 5001,
    // for cors
    origin: '*',
    baseUrl: 'http://localhost:3000',
    serviceUrl: 'http://localhost:5001',
    saltWorkFactor: 10,
    // for messaging
    rabitMqUri: '',
    // for jwt token
    privateKey: 'amitisgood',
    accessTokenTtl: "40m",
    refreshTokenTtl: "1y",
    redisDb: {
        port: 6379,
        host: '',
        password: ""
    },

    // for reset password token
    resetTokenTtl: '5m',

    // for nodemailer
    nodemailerOptions: {
        service: "gmail",
        auth: {
            user: 'amitwebdev2019@gmail.com',
            pass: ''
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    adminMail: 'amitwebdev2019@gmail.com',

    // aws
    aws_access_key: "",
    aws_private_key: "",
    s3_bucket: "amitvideos"
}