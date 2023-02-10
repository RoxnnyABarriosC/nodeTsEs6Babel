import { UserRepository } from '../../infrastructure/repositories/user-repository.service';
import { SaveUserDto } from '../../presentation/dtos/save-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

type Dependencies = {
    userRepository: UserRepository,
    userService: UserService
}

export class UpdateUserUseCase
{
    private repository: UserRepository;

    private service: UserService;

    constructor({ userRepository, userService }: Dependencies)
    {
        this.repository = userRepository;
        this.service = userService;
    }

    async handle(id: string, dto: SaveUserDto): Promise<User>
    {
        const user = await this.repository.getOne(id);

        user.build(dto);

        await this.service.validate(user, this.repository);

        return await this.repository.update(user);
    }
}
