import { User } from '../../../user/domain/entities/user.entity';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { UpdateItemDto } from '../../presentation/dtos/update-item.dto';
import { Item } from '../entities/item.entity';
import { ItemService } from '../services/item.service';

type Dependencies = {
    itemRepository: ItemRepository,
    itemService: ItemService,
    authUser: User
}

export class UpdateItemUseCase
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

    async handle(id: string, dto: UpdateItemDto): Promise<Item>
    {
        const item = await this.repository.getOne(id);

        void this.service.checkOwner(this.authUser.Id)(item.createdBy.Id);

        item.build(dto);

        item.description = dto?.description ?? item.description;

        await this.service.validate(item, this.repository);

        return await this.repository.update(item);
    }
}
