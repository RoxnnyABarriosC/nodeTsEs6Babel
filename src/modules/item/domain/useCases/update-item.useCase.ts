import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { SaveItemDto } from '../../presentation/dtos/save-item.dto';
import { Item } from '../entities/item.entity';
import { ItemService } from '../services/item.service';

type Dependencies = {
    itemRepository: ItemRepository,
    itemService: ItemService
}

export class UpdateItemUseCase
{
    private readonly repository: ItemRepository;
    private readonly service: ItemService;

    constructor({ itemRepository, itemService }: Dependencies)
    {
        this.repository = itemRepository;
        this.service = itemService;
    }

    async handle(id: string, dto: SaveItemDto): Promise<Item>
    {
        const item = await this.repository.getOne(id);

        item.build(dto);

        await this.service.validate(item, this.repository);

        return await this.repository.update(item);
    }
}
