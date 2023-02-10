import { CriteriaBuilder } from '../../../../shared/presentation/criterias/citeria';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';

type Dependencies = {
    itemRepository: ItemRepository,
}

export class ListItemsUseCase
{
    private readonly repository: ItemRepository;

    constructor({ itemRepository }: Dependencies)
    {
        this.repository = itemRepository;
    }

    async handle(criteria: CriteriaBuilder)
    {
        return await this.repository.list(criteria);
    }
}
