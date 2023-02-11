import { UniqueService } from '../../../../shared/infrastructure/services/unique.service';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { Item } from '../entities/item.entity';
import { NotOwnerItemException } from '../exceptions/not-owner-item.exception';

type Dependencies = {
    uniqueService: UniqueService,
}

export class ItemService
{
    private readonly uniqueService: UniqueService;

    constructor({ uniqueService }: Dependencies)
    {
        this.uniqueService = uniqueService;
    }

    async validate(entity: Item, repository: ItemRepository): Promise<void>
    {
        void await this.uniqueService.validate<Item>({
            repository,
            validate: {
                name: entity.name
            },
            refValue: entity.Id
        });
    }

    checkOwner(authUserID: string): (createdByIdP: string) => void
    {
        return (createdById: string) =>
        {
            if (authUserID !== createdById)
            {
                throw new  NotOwnerItemException();
            }
        };
    }
}
