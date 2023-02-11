import { User } from '../../../user/domain/entities/user.entity';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { Item } from '../entities/item.entity';
import { ItemService } from '../services/item.service';

type Dependencies = {
    itemRepository: ItemRepository,
    authUser: User,
    itemService: ItemService
}

export class DeleteItemUseCase
{
    private readonly authUser: User;
    private readonly repository: ItemRepository;
    private readonly itemService: ItemService;

    constructor({ itemRepository, authUser, itemService }: Dependencies)
    {
        this.authUser = authUser;
        this.repository = itemRepository;
        this.itemService = itemService;
    }

    async handle(id: string, deletePermanently: boolean): Promise<Item>
    {
        return this.repository.checkOwnerAndDelete(id, !deletePermanently, deletePermanently, this.itemService.checkOwner(this.authUser.Id));
    }
}
