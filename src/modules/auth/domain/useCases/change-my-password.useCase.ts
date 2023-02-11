import { BcryptEncryptionStrategy } from '../../../../shared/domain/strategies/bcrypt-encryption.strategy';
import { User } from '../../../user/domain/entities/user.entity';
import { UserService } from '../../../user/domain/services/user.service';
import { UserRepository } from '../../../user/infrastructure/repositories/user.repository';
import { ChangeMyPasswordDto } from '../../presentation/dtos/change-my-password.dto';
import { PasswordWrongException } from '../exceptions/password-wrong.execption';

type Dependencies = {
    userRepository: UserRepository,
    userService: UserService,
    authUser: User
}

export class ChangeMyPasswordUseCase
{
    private readonly repository: UserRepository;
    private readonly service: UserService;
    private readonly authUser: User;
    private readonly encryption: BcryptEncryptionStrategy;

    constructor({ userRepository, userService, authUser }: Dependencies)
    {
        this.encryption = new BcryptEncryptionStrategy();
        this.repository = userRepository;
        this.service = userService;
        this.authUser = authUser;
    }

    async handle(dto: ChangeMyPasswordDto): Promise<User>
    {
        if (!await this.encryption.compare(dto.currentPassword.toString(), this.authUser.password.toString()))
        {
            throw new PasswordWrongException();
        }

        this.authUser.password = await this.service.preparePassword(dto.password);

        return await this.repository.update(this.authUser);
    }
}
