import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../entities/user.entity';

type Dependencies = {
    userRepository: UserRepository,
}

export class DeleteUserUseCase
{
    private readonly repository: UserRepository;

    constructor({ userRepository }: Dependencies)
    {
        this.repository = userRepository;
    }

    async handle(id: string, deletePermanently: boolean): Promise<User>
    {
        return this.repository.delete(id, !deletePermanently, deletePermanently);
    }
}
