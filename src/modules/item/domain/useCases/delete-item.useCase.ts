import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { Item } from '../entities/item.entity';

type Dependencies = {
    itemRepository: ItemRepository,
}

export class DeleteItemUseCase
{
    private readonly repository: ItemRepository;

    constructor({ itemRepository }: Dependencies)
    {
        this.repository = itemRepository;
    }

    async handle(id: string, deletePermanently: boolean): Promise<Item>
    {
        return this.repository.delete(id, !deletePermanently, deletePermanently);
    }
}
