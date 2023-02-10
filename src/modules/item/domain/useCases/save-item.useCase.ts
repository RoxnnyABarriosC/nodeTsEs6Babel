import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { SaveItemDto } from '../../presentation/dtos/save-item.dto';
import { Item } from '../entities/item.entity';
import { ItemService } from '../services/item.service';

type Dependencies = {
    itemRepository: ItemRepository,
    itemService: ItemService
}

export class SaveItemUseCase
{
    private readonly repository: ItemRepository;
    private readonly service: ItemService;

    constructor({ itemRepository, itemService }: Dependencies)
    {
        this.repository = itemRepository;
        this.service = itemService;
    }

    async handle(dto: SaveItemDto): Promise<Item>
    {
        const item = new Item(dto);

        await this.service.validate(item, this.repository);

        return await this.repository.save(item);
    }
}
