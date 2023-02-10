import { BcryptEncryptionStrategy } from '../../../../shared/domain/strategies/bcrypt-encryption.strategy';
import { TokenFactory } from '../../../../shared/infrastructure/factories/token.factory';
import { UserRepository } from '../../../user/infrastructure/repositories/user.repository';
import { LoginDto } from '../../presentation/dtos/loginDto';
import { BadCredentialsException } from '../exceptions/bad-credentials.exception';
import { UnverifiedUserException } from '../exceptions/unverified-user.exception';
import { UserDisabledException } from '../exceptions/user-disabled.exception';
import { JwtModel } from '../models/jwt.model';

type Dependencies = {
    userRepository: UserRepository
}

export class LoginUseCase
{
    private readonly repository: UserRepository;
    private encryption: BcryptEncryptionStrategy;
    private tokenFactory: TokenFactory;

    constructor({ userRepository }: Dependencies)
    {
        this.repository = userRepository;
        this.encryption = new BcryptEncryptionStrategy();
        this.tokenFactory = new TokenFactory();
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
