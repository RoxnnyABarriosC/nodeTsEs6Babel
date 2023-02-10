import { StatusCode } from '@digichanges/shared-experience';
import { AwilixContainer } from 'awilix/lib/container';
import { NextFunction, Request, Response } from 'express';
import { HttpErrorException } from '../../../../shared/presentation/exceptions/http-error.exception';
import { AuthService } from '../../domain/services/auth.service';

export const RefreshTokenMiddleware = async(req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        const container: AwilixContainer = (req as any).container;
        const authService = container.resolve<AuthService>('authService');

        const refreshToken = req.headers?.cookie?.split('refreshToken=')[1] ?? null;

        if (refreshToken)
        {
            authService.validateRefreshToken(refreshToken);
            (req as any).refreshToken = refreshToken;
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

