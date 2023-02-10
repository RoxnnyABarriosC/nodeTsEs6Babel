import { StatusCode } from '@digichanges/shared-experience';
import { DELETE, GET, PATCH, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { CriteriaBuilder } from '../../../../shared/presentation/criterias/citeria';
import { PaginationFilter } from '../../../../shared/presentation/criterias/paginationFilter';
import { DeletePermanentlyDto } from '../../../../shared/presentation/dtos/delete-permanently.dto';
import { IdDto } from '../../../../shared/presentation/dtos/id.dto';
import { PartialRemovedDto } from '../../../../shared/presentation/dtos/partial-removed.dto';
import { DtoValidator } from '../../../../shared/presentation/shared/dto-validator';
import { Responder } from '../../../../shared/presentation/shared/responder';
import { GetUris } from '../../../../utils/get-uris';
import { DeleteUserUseCase } from '../../domain/useCases/delete-user.useCase';
import { GetUserUseCase } from '../../domain/useCases/get-user.useCase';
import { ListUsersUseCase } from '../../domain/useCases/list-users.useCase';
import { RestoreUserUseCase } from '../../domain/useCases/restore-user.useCase';
import { SaveUserUseCase } from '../../domain/useCases/save-user.useCase';
import { UpdateUserUseCase } from '../../domain/useCases/update-user.useCase';
import { UserFilter } from '../criterias/user.filter';
import { UserSort } from '../criterias/user.sort';
import { SaveUserDto } from '../dtos/save-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserTransformer } from '../transformers/user.transform';

type Dependencies = {
    saveUserUseCase: SaveUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    listUsersUseCase: ListUsersUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    restoreUserUseCase: RestoreUserUseCase,
    getUserUseCase: GetUserUseCase
}

@route('/users')
export default class UserController
{
    private responder: Responder;
    private saveUseCase: SaveUserUseCase;
    private updateUseCase: UpdateUserUseCase;
    private listUseCase: ListUsersUseCase;
    private deleteUseCase: DeleteUserUseCase;
    private restoreUseCase: RestoreUserUseCase;
    private getUseCase: GetUserUseCase;

    constructor({ saveUserUseCase, updateUserUseCase, listUsersUseCase, deleteUserUseCase, restoreUserUseCase, getUserUseCase }: Dependencies)
    {
        this.responder = new Responder();
        this.saveUseCase = saveUserUseCase;
        this.updateUseCase = updateUserUseCase;
        this.listUseCase = listUsersUseCase;
        this.deleteUseCase = deleteUserUseCase;
        this.restoreUseCase = restoreUserUseCase;
        this.getUseCase = getUserUseCase;
    }

    @GET()
    async list(req: Request, res: Response)
    {
        const filters = new UserFilter(req?.query?.filter);
        const sorts = new UserSort(req?.query?.sort);
        const pagination = new PaginationFilter(req?.query?.pagination);

        await DtoValidator.handle([filters, sorts, pagination]);

        const criteria = new CriteriaBuilder(filters, sorts, pagination, GetUris(req));

        const paginator = await this.listUseCase.handle(criteria);

        return await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new UserTransformer());
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
        const idDto = new IdDto(req?.params?.id);
        const dto = new UpdateUserDto(req.body);
        await DtoValidator.handle([idDto, dto]);
        const data = await this.updateUseCase.handle(idDto.id, dto);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @DELETE()
    @route('/:id')
    async delete(req: Request, res: Response)
    {
        const idDto = new IdDto(req?.params?.id);
        const deleteDto = new DeletePermanentlyDto(req?.query?.deletePermanently as unknown as boolean);
        await DtoValidator.handle([idDto, deleteDto]);
        const data = await this.deleteUseCase.handle(idDto.id, deleteDto.deletePermanently);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @PATCH()
    @route('/:id/restore')
    async restore(req: Request, res: Response)
    {
        const idDto = new IdDto(req?.params?.id);
        await DtoValidator.handle([idDto]);
        const data = await this.restoreUseCase.handle(idDto.id);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @GET()
    @route('/:id')
    async getOne(req: Request, res: Response)
    {
        const idDto = new IdDto(req?.params?.id);
        const partialDto = new PartialRemovedDto(req?.query?.partialRemoved as unknown as boolean);
        await DtoValidator.handle([idDto, partialDto]);
        const data = await this.getUseCase.handle(idDto.id, partialDto.partialRemoved);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }
}
