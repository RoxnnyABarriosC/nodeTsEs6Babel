import { StatusCode } from '@digichanges/shared-experience';
import { POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { IdDto } from '../../../../shared/presentation/dtos/id.dto';
import { DtoValidator } from '../../../../shared/presentation/shared/dto-validator';
import { Responder } from '../../../../shared/presentation/shared/responder';
import { SaveUserUseCase } from '../../domain/useCases/save-user.useCase';
import { UpdateUserUseCase } from '../../domain/useCases/update-user.useCase';
import { SaveUserDto } from '../dtos/save-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserTransformer } from '../transformers/user.transform';

type Dependencies = {
    saveUserUseCase: SaveUserUseCase,
    updateUserUseCase: UpdateUserUseCase
}

@route('/users')
export default class UserController
{
    private responder: Responder;
    private saveUseCase: SaveUserUseCase;
    private updateUseCase: UpdateUserUseCase;

    constructor({ saveUserUseCase, updateUserUseCase }: Dependencies)
    {
        this.saveUseCase = saveUserUseCase;
        this.updateUseCase = updateUserUseCase;
        this.responder = new Responder();
    }

    @POST()
    async save(req: Request, res: Response)
    {
        const dto = new SaveUserDto(req.body);
        await DtoValidator.handle([dto]);
        const data = await this.saveUseCase.handle(dto);
        return await this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @PUT()
    @route('/:id')
    async update(req: Request, res: Response)
    {
        const idDto = new IdDto(req?.params?.id ?? null);
        const dto = new UpdateUserDto(req.body);
        await DtoValidator.handle([idDto, dto]);
        const data = await this.updateUseCase.handle(idDto.id, dto);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }
}
