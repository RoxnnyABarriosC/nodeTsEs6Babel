import { BcryptEncryptionStrategy } from '../../../../shared/domain/strategies/bcrypt-encryption.strategy';
import { TokenFactory } from '../../../../shared/infrastructure/factories/token.factory';
import { UserRepository } from '../../../user/infrastructure/repositories/user.repository';
import { LoginDto } from '../../presentation/dtos/login.dto';
import { BadCredentialsException } from '../exceptions/bad-credentials.exception';
import { UnverifiedUserException } from '../exceptions/unverified-user.exception';
import { UserDisabledException } from '../exceptions/user-disabled.exception';
import { JwtModel } from '../models/jwt.model';

type Dependencies = {
    userRepository: UserRepository
}

export class LoginUseCase
{
    private tokenFactory: TokenFactory;
    private encryption: BcryptEncryptionStrategy;
    private readonly repository: UserRepository;

    constructor({ userRepository }: Dependencies)
    {
        this.encryption = new BcryptEncryptionStrategy();
        this.tokenFactory = new TokenFactory();
        this.repository = userRepository;
    }

    async handle(dto: LoginDto): Promise<JwtModel>
    {
        const email = dto.email;
        const password = dto.password;

        const user = await this.repository.getOneBy({ email });

        if (!user)
        {
            throw new BadCredentialsException();
        }

        if (!user.verify)
        {
            throw new UnverifiedUserException();
        }

        if (!user.enable)
        {
            throw new UserDisabledException();
        }

        if (! await this.encryption.compare(password, user.password.toString()))
        {
            throw new BadCredentialsException();
        }

        return this.tokenFactory.createToken(user);
    }
}
