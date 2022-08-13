
const storageModel = require( '../models/storage' );

class StorageService {

    constructor() {

    }

    // create
    create = async ( input ) => {
        return await storageModel.create( input );
    }

    // update
    updateOne = async ( query, update ) => {
        return await storageModel.findOneAndUpdate( query, update, {
            new: true,
        } );
    };

    // delete    
    removeOne = async ( query ) => {
        return await storageModel.findOneAndDelete( query );
    };

    // find many
    find = async ( query, offset, limit ) => {
        return await storageModel.paginate( query, { offset, limit } );
    };

   // findOne
    findOne = async ( query) => {
        return await storageModel.findOne( query);
    };

    // paginated
    getPaginatedUserFiles = async ( query ) => {
        return await storageModel.find( query );
    }
}


// export
module.exports = StorageService;