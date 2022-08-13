
import { SessionDocument } from '../interface/session.interface';

import { FilterQuery } from 'typeorm';
import { autoInjectable } from 'tsyringe';
import Session from '../entity/session.entity';

@autoInjectable()
export default class SessionRepository {

    private readonly _model = Session;

    async createSession( session: Partial<Session> ) {
        return await this._model.create( session ).save();
    }

    async updateSession(
        sid: SessionDocument['sid'],
        session: SessionDocument ) {
        return await this._model.update( { sid }, session );
    }

    async getSession( query: object ) {
        return await this._model.findOne( query );
    }

    async getSessions( query: object ) {
        return await this._model.find( query );
    }

    async deleteSession( query: object ) {
        return await this._model.delete( query );
    }

}

