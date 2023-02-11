import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

type Dependencies = {
    userRepository: UserRepository,
    userService: UserService
}

export class DeleteUserUseCase
{
    private readonly repository: UserRepository;
    private readonly  userService: UserService;

    constructor({ userRepository, userService }: Dependencies)
    {
        this.repository = userRepository;
        this.userService = userService;
    }

    async handle(id: string, deletePermanently: boolean): Promise<User>
    {
        return this.repository.checkSuperAdminAndDelete(id, !deletePermanently, deletePermanently, this.userService.checkSuperAdmin);
    }
}
