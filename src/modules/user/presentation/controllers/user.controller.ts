import { StatusCode } from '@digichanges/shared-experience';
import { GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { CriteriaBuilder } from '../../../../shared/presentation/criterias/citeria';
import { PaginationFilter } from '../../../../shared/presentation/criterias/paginationFilter';
import { IdDto } from '../../../../shared/presentation/dtos/id.dto';
import { DtoValidator } from '../../../../shared/presentation/shared/dto-validator';
import { Responder } from '../../../../shared/presentation/shared/responder';
import { GetUris } from '../../../../utils/get-uris';
import { ListUsersUseCase } from '../../domain/useCases/list-users.useCase';
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
    listUsersUseCase: ListUsersUseCase
}

@route('/users')
export default class UserController
{
    private responder: Responder;
    private saveUseCase: SaveUserUseCase;
    private updateUseCase: UpdateUserUseCase;
    private listUseCase: ListUsersUseCase;

    constructor({ saveUserUseCase, updateUserUseCase, listUsersUseCase }: Dependencies)
    {
        this.saveUseCase = saveUserUseCase;
        this.updateUseCase = updateUserUseCase;
        this.listUseCase = listUsersUseCase;
        this.responder = new Responder();
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
        const idDto = new IdDto(req?.params?.id ?? null);
        const dto = new UpdateUserDto(req.body);
        await DtoValidator.handle([idDto, dto]);
        const data = await this.updateUseCase.handle(idDto.id, dto);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }
}
