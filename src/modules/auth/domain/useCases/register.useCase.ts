import { LocalMessageInterface } from '../../../../shared/interfaces/local-message.interface';
import { Locales } from '../../../../shared/presentation/shared/locales';
import { User } from '../../../user/domain/entities/user.entity';
import { UserService } from '../../../user/domain/services/user.service';
import { UserRepository } from '../../../user/infrastructure/repositories/user.repository';
import { UserDto } from '../../../user/presentation/dtos/user.dto';
import { RegisterDto } from '../../presentation/dtos/Register.dto';


type Dependencies = {
    userRepository: UserRepository,
    userService: UserService
}

export class RegisterUseCase
{
    private readonly repository: UserRepository;
    private readonly service: UserService;
    constructor({ userRepository, userService }: Dependencies)
    {
        this.repository = userRepository;
        this.service = userService;
    }

    async handle(dto: RegisterDto): Promise<LocalMessageInterface>
    {
        const password = dto.password;

        delete dto.password;
        delete dto.passwordConfirmation;

        const user = new User(dto as UserDto);

        user.enable = true;

        await this.service.validate(user, this.repository);

        user.password = await this.service.preparePassword(password);

        await this.repository.save(user);

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.register';

        return { message: locales.__(key), messageCode: key };
    }
}
