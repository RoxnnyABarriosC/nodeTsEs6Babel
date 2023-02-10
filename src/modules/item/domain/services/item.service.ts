import { UniqueService } from '../../../../shared/infrastructure/services/unique.service';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { Item } from '../entities/item.entity';

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
}
