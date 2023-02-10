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
import { DeleteItemUseCase } from '../../domain/useCases/delete-item.useCase';
import { GetItemUseCase } from '../../domain/useCases/get-item.useCase';
import { ListItemsUseCase } from '../../domain/useCases/list-items.useCase';
import { RestoreItemUseCase } from '../../domain/useCases/restore-item.useCase';
import { SaveItemUseCase } from '../../domain/useCases/save-item.useCase';
import { UpdateItemUseCase } from '../../domain/useCases/update-item.useCase';
import { ItemFilter } from '../criterias/item.filter';
import { ItemSort } from '../criterias/item.sort';
import { SaveItemDto } from '../dtos/save-item.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { ItemTransform } from '../transformers/item.transform';

type Dependencies = {
    saveItemUseCase: SaveItemUseCase,
    updateItemUseCase: UpdateItemUseCase,
    listItemsUseCase: ListItemsUseCase,
    deleteItemUseCase: DeleteItemUseCase,
    restoreItemUseCase: RestoreItemUseCase,
    getItemUseCase: GetItemUseCase
}

@route('/users/items')
export default class ItemController
{
    private responder: Responder;
    private saveUseCase: SaveItemUseCase;
    private updateUseCase: UpdateItemUseCase;
    private listUseCase: ListItemsUseCase;
    private deleteUseCase: DeleteItemUseCase;
    private restoreUseCase: RestoreItemUseCase;
    private getUseCase: GetItemUseCase;

    constructor({ saveItemUseCase, updateItemUseCase, listItemsUseCase, deleteItemUseCase, restoreItemUseCase, getItemUseCase }: Dependencies)
    {
        this.responder = new Responder();
        this.saveUseCase = saveItemUseCase;
        this.updateUseCase = updateItemUseCase;
        this.listUseCase = listItemsUseCase;
        this.deleteUseCase = deleteItemUseCase;
        this.restoreUseCase = restoreItemUseCase;
        this.getUseCase = getItemUseCase;
    }

    @GET()
    async list(req: Request, res: Response)
    {
        const filters = new ItemFilter(req?.query?.filter);
        const sorts = new ItemSort(req?.query?.sort);
        const pagination = new PaginationFilter(req?.query?.pagination);

        await DtoValidator.handle([filters, sorts, pagination]);

        const criteria = new CriteriaBuilder(filters, sorts, pagination, GetUris(req));

        const paginator = await this.listUseCase.handle(criteria);

        return await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new ItemTransform());
    }

    @POST()
    async save(req: Request, res: Response)
    {
        const dto = new SaveItemDto(req.body);
        await DtoValidator.handle([dto]);
        const data = await this.saveUseCase.handle(dto);
        return await this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new ItemTransform());
    }

    @PUT()
    @route('/:id')
    async update(req: Request, res: Response)
    {
        const idDto = new IdDto(req?.params?.id);
        const dto = new UpdateItemDto(req.body);
        await DtoValidator.handle([idDto, dto]);
        const data = await this.updateUseCase.handle(idDto.id, dto);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new ItemTransform());
    }

    @DELETE()
    @route('/:id')
    async delete(req: Request, res: Response)
    {
        const idDto = new IdDto(req?.params?.id);
        const deleteDto = new DeletePermanentlyDto(req?.query?.deletePermanently as unknown as boolean);
        await DtoValidator.handle([idDto, deleteDto]);
        const data = await this.deleteUseCase.handle(idDto.id, deleteDto.deletePermanently);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new ItemTransform());
    }

    @PATCH()
    @route('/:id/restore')
    async restore(req: Request, res: Response)
    {
        const idDto = new IdDto(req?.params?.id);
        await DtoValidator.handle([idDto]);
        const data = await this.restoreUseCase.handle(idDto.id);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new ItemTransform());
    }

    @GET()
    @route('/:id')
    async getOne(req: Request, res: Response)
    {
        const idDto = new IdDto(req?.params?.id);
        const partialDto = new PartialRemovedDto(req?.query?.partialRemoved as unknown as boolean);
        await DtoValidator.handle([idDto, partialDto]);
        const data = await this.getUseCase.handle(idDto.id, partialDto.partialRemoved);
        return await this.responder.send(data, req, res, StatusCode.HTTP_OK, new ItemTransform());
    }
}
