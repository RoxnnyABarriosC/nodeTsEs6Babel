import { User } from '../../../user/domain/entities/user.entity';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { SaveItemDto } from '../../presentation/dtos/save-item.dto';
import { Item } from '../entities/item.entity';
import { ItemService } from '../services/item.service';

type Dependencies = {
    itemRepository: ItemRepository,
    itemService: ItemService,
    authUser: User
}

export class SaveItemUseCase
{
    private readonly repository: ItemRepository;
    private readonly service: ItemService;
    private readonly authUser: User;

    constructor({ itemRepository, itemService, authUser }: Dependencies)
    {
        this.repository = itemRepository;
        this.service = itemService;
        this.authUser = authUser;
    }

    async handle(dto: SaveItemDto): Promise<Item>
    {
        const item = new Item(dto);
        item.createdBy = this.authUser;

        await this.service.validate(item, this.repository);

        return await this.repository.save(item);
    }
}
