import { TokenFactory } from '../../../../shared/infrastructure/factories/token.factory';
import { UserRepository } from '../../../user/infrastructure/repositories/user.repository';
import { JwtModel } from '../models/jwt.model';
import { AuthService } from '../services/auth.service';

type Dependencies = {
    userRepository: UserRepository,
    authService: AuthService
}

export class RefreshTokenUseCase
{
    private tokenFactory: TokenFactory;
    private readonly repository: UserRepository;
    private readonly authService: AuthService;

    constructor({ userRepository, authService }: Dependencies)
    {
        this.tokenFactory = new TokenFactory();
        this.repository = userRepository;
        this.authService = authService;
    }

    async handle(refreshToken: string): Promise<JwtModel>
    {
        const tokenDecode = this.authService.decodeToken(refreshToken, false);

        const email = tokenDecode.email;
        // const tokenId = tokenDecode.id;

        const user = await this.repository.getOneByEmail(email);
        // TODO: optener el token con el id del refreshToken decodificado y setearlo en la black list de redis

        return await this.tokenFactory.createToken(user);
    }
}
