import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../entities/user.entity';

type Dependencies = {
    userRepository: UserRepository,
}

export class RestoreUserUseCase
{
    private readonly repository: UserRepository;

    constructor({ userRepository }: Dependencies)
    {
        this.repository = userRepository;
    }

    async handle(id: string): Promise<User>
    {
        return this.repository.restore(id);
    }
}
