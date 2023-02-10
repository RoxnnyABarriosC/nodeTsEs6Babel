import { PasswordValueObject } from '../../../../shared/domain/valueObjects/password.valueObject';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { SaveUserDto } from '../../presentation/dtos/save-user.dto';
import { UserDto } from '../../presentation/dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

type Dependencies = {
    userRepository: UserRepository,
    userService: UserService
}

export class SaveUserUseCase
{
    private readonly repository: UserRepository;
    private readonly service: UserService;

    constructor({ userRepository, userService }: Dependencies)
    {
        this.repository = userRepository;
        this.service = userService;
    }

    async handle(dto: SaveUserDto): Promise<User>
    {
        const password = dto.password;

        delete dto.password;
        delete dto.passwordConfirmation;

        const user = new User(dto as UserDto);

        await this.service.validate(user, this.repository);

        user.password = await (new PasswordValueObject(password, 5, 20)).ready();

        return await this.repository.save(user);
    }
}
