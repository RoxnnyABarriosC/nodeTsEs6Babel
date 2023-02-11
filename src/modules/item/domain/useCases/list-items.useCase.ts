import { CriteriaBuilder } from '../../../../shared/presentation/criterias/citeria';
import { User } from '../../../user/domain/entities/user.entity';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';

type Dependencies = {
    itemRepository: ItemRepository,
    authUser: User
}

export class ListItemsUseCase
{
    private readonly authUser: User;
    private readonly repository: ItemRepository;

    constructor({ itemRepository, authUser }: Dependencies)
    {
        this.repository = itemRepository;
        this.authUser = authUser;
    }

    async handle(criteria: CriteriaBuilder)
    {
        return await this.repository.list(criteria, this.authUser.Id);
    }
}
