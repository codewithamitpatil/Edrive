
const mongoose = require( 'mongoose' );
const mongoosePaginate = require( 'mongoose-paginate-v2' );
const StorageSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['PUBLIC', 'PRIVATE'],
        default: 'PRIVATE'
    }

} );

StorageSchema.plugin( mongoosePaginate );

const Storage = mongoose.model( "storage", StorageSchema );

// export
module.exports = Storage;