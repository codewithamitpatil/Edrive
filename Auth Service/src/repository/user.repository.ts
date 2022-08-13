
import { User } from "../entity/user.entity";
import { UserDocument } from "../interface/user.interface";
import { get } from 'lodash';
import { getConnection, MoreThan } from "typeorm";
import { AppDataSource } from "../data-source";

export class UserRepository {

    private readonly _model = User;

    async createUser( user: Partial<User> ) {
        return await this._model.create( user ).save();
    }

    async updateUser(
        query: object,
        user: object ) {
        return await this._model.update( query, user );
    }

    async getUserByEmail( email: User["email"] ) {
        return await this._model.findOne( { where: { email } } );
    }

    async getUserById( uid: UserDocument["uid"] ) {
        const user = await this._model.findOne( {
            where: { uid }
        } );
        return user;
    }

    async getUserByToken( token: string, exp: Date ) {
        const user = await this._model.findOne( {
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: MoreThan( exp )
            }
        } );
        return user;
    }

    async getUsersAcVerificationToken( token: string, exp: Date ) {
        const user = await this._model.findOne( {
            where: {
                verifyAccountToken: token,
                verifyAccountExpires: MoreThan( exp )
            }
        } );
        return user;
    }


    async isEmailExist( email: UserDocument["email"] ) {
        const user = await this._model.findOne( {
            where: { email }
        } );
        if ( !user ) {
            return false;
        } else {
            return true;
        }
    }

    async isUsernameExist( uname: UserDocument["uname"] ) {
        const user = await this._model.findOne( {
            where: { uname }
        } );
        if ( !user ) {
            return false;
        } else {
            return true;
        }
    }



    async getUserWithProfile( uid: UserDocument['uid'] ) {

        const firstUser = await AppDataSource
            .getRepository( User )
            .query( "SELECT user.uname,user.email,user.uid,profile.* FROM user LEFT JOIN profile ON user.uid = profile.uid WHERE user.uid = ?", [1] );

        return firstUser;
    }

}
