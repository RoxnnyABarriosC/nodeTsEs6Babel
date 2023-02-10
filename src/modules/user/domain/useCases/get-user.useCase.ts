import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../entities/user.entity';

type Dependencies = {
    userRepository: UserRepository,
}

export class GetUserUseCase
{
    private readonly repository: UserRepository;

    constructor({ userRepository }: Dependencies)
    {
        this.repository = userRepository;
    }

    async handle(id: string, partialRemove: boolean): Promise<User>
    {
        return this.repository.getOne(id, partialRemove);
    }
}
