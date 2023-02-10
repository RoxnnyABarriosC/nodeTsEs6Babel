import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { Item } from '../entities/item.entity';

type Dependencies = {
    itemRepository: ItemRepository,
}

export class GetItemUseCase
{
    private readonly repository: ItemRepository;

    constructor({ itemRepository }: Dependencies)
    {
        this.repository = itemRepository;
    }

    async handle(id: string, partialRemove: boolean): Promise<Item>
    {
        return this.repository.getOne(id, partialRemove);
    }
}
