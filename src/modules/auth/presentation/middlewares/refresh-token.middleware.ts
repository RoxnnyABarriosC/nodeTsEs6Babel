import { StatusCode } from '@digichanges/shared-experience';
import { AwilixContainer } from 'awilix/lib/container';
import { ConfigInterface } from '../../../../config/config.interface';
import { HttpErrorException } from '../../../../shared/presentation/exceptions/http-error.exception';
import { AuthService } from '../../domain/services/auth.service';

export const RefreshTokenMiddleware = async(req: any, response: any, next: any) =>
{
    try
    {
        const container: AwilixContainer = req.container;
        const authService = container.resolve<AuthService>('authService');
        const refreshToken = req.headers.cookie.split('refreshToken=')[1];
        // const config = container.resolve<ConfigInterface>('config');

        if (refreshToken)
        {
            authService.validateRefreshToken(refreshToken);
            req.refreshToken = refreshToken;
        }
        else
        {
            throw new HttpErrorException(StatusCode.HTTP_UNAUTHORIZED, { message: 'Missing refresh token' });
        }

        next();
    }
    catch (error)
    {
        next(error);
    }
};

