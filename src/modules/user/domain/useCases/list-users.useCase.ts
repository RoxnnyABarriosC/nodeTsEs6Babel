import { CriteriaBuilder } from '../../../../shared/presentation/criterias/citeria';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../entities/user.entity';

type Dependencies = {
    userRepository: UserRepository,
    authUser: User
}

export class ListUsersUseCase
{
    private readonly authUser: User;
    private readonly repository: UserRepository;

    constructor({ userRepository, authUser }: Dependencies)
    {
        this.repository = userRepository;
        this.authUser = authUser;
    }

    async handle(criteria: CriteriaBuilder)
    {
        return await this.repository.list(criteria, this.authUser.Id);
    }
}
