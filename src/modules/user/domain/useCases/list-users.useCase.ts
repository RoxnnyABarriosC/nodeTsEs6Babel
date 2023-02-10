import { CriteriaBuilder } from '../../../../shared/presentation/criterias/citeria';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

type Dependencies = {
    userRepository: UserRepository,
}

export class ListUsersUseCase
{
    private readonly repository: UserRepository;

    constructor({ userRepository }: Dependencies)
    {
        this.repository = userRepository;
    }

    async handle(criteria: CriteriaBuilder)
    {
        return await this.repository.list(criteria);
    }
}
