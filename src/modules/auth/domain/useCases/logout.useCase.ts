import { LocalMessageInterface } from '../../../../shared/interfaces/local-message.interface';
import { Locales } from '../../../../shared/presentation/shared/locales';
import { UserRepository } from '../../../user/infrastructure/repositories/user.repository';
import { AuthService } from '../services/auth.service';
import { DecodeTokenInterface } from '../services/decode-token.interface';

type Dependencies = {
    userRepository: UserRepository,
    authService: AuthService
}

export class LogoutUseCase
{
    private readonly repository: UserRepository;
    private readonly authService: AuthService;

    constructor({ userRepository, authService }: Dependencies)
    {
        this.repository = userRepository;
        this.authService = authService;
    }

    async handle(refreshToken: string, decodeToken: DecodeTokenInterface): Promise<LocalMessageInterface>
    {
        // const tokenId = decodeToken.id;

        // TODO: buscar el token con el id y setearlo en la backList de redis

        if (refreshToken)
        {
            // const refreshTokenDecode = this.authService.decodeToken(refreshToken, false);
            // TODO: buscar el refreshToken en redis y pasarlo a la backList
        }

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.logout';

        return { message: locales.__(key), messageCode: key };
    }
}
