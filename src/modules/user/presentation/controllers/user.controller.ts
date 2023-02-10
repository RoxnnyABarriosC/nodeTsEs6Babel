import { StatusCode } from '@digichanges/shared-experience';
import {  POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { DtoValidator } from '../../../../shared/presentation/shared/dto-validator';
import { Responder } from '../../../../shared/presentation/shared/responder';
import { SaveUserUseCase } from '../../domain/useCases/save-user.useCase';
import { SaveUserDto } from '../dtos/save-user.dto';

type Dependencies = {
    saveUserUseCase: SaveUserUseCase
}

@route('/users')
export default class UserController
{
    private responder: Responder;
    private saveUseCase: SaveUserUseCase;

    constructor({ saveUserUseCase }: Dependencies)
    {
        this.saveUseCase = saveUserUseCase;
        this.responder = new Responder();
    }

    @POST()
    async createUser(req: Request, res: Response)
    {
        const dto = new SaveUserDto(req.body);
        await DtoValidator.handle(dto);
        const data = await this.saveUseCase.handle(dto);
        return await this.responder.send(data, req, res, StatusCode.HTTP_CREATED);
    }
}
