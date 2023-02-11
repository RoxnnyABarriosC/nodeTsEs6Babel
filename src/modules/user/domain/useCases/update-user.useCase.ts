import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UpdateUserDto } from '../../presentation/dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

type Dependencies = {
    userRepository: UserRepository,
    userService: UserService
}

export class UpdateUserUseCase
{
    private readonly repository: UserRepository;
    private readonly service: UserService;

    constructor({ userRepository, userService }: Dependencies)
    {
        this.repository = userRepository;
        this.service = userService;
    }

    async handle(id: string, dto: UpdateUserDto): Promise<User>
    {
        const user = await this.repository.getOne(id);

        void this.service.checkSuperAdmin(user);

        user.build(dto);

        await this.service.validate(user, this.repository);

        return await this.repository.update(user);
    }
}
