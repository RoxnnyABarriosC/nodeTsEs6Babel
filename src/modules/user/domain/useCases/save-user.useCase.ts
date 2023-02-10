import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { SaveUserDto } from '../../presentation/dtos/save-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

type Dependencies = {
    userRepository: UserRepository,
    userService: UserService
}

export class SaveUserUseCase
{
    private repository: UserRepository;

    private service: UserService;

    constructor({ userRepository, userService }: Dependencies)
    {
        this.repository = userRepository;
        this.service = userService;
    }

    async handle(dto: SaveUserDto): Promise<User>
    {
        const user = new User(dto);

        await this.service.validate(user, this.repository);

        return await this.repository.save(user);
    }
}
