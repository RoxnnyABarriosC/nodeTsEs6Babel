import { asValue } from 'awilix';
import { AwilixContainer } from 'awilix/lib/container';
import { UserRepository } from '../../../user/infrastructure/repositories/user.repository';
import { AuthService } from '../../domain/services/auth.service';
import { ForbiddenHttpException } from '../exceptions/forbidden-http.exception';

export const AuthenticateMiddleware = (checkSuperAdmin = false) =>
{
    return async(req: any, res: any, next: any) =>
    {
        try
        {
            const container: AwilixContainer = req.container;
            const authService = container.resolve<AuthService>('authService');
            const userRepository = container.resolve<UserRepository>('userRepository');

            const token = req.get('Authorization');

            req.decodeToken = authService.validateToken(token);

            // TODO: agregar validacion para cunado un usuario es super admin
            const authUser = await userRepository.getOneByEmail(req.decodeToken.email);

            if (checkSuperAdmin && !authUser.isSuperAdmin)
            {
                throw new ForbiddenHttpException();
            }

            req.container.register({
                authUser: asValue(authUser)
            });

            next();
        }
        catch (error)
        {
            next(error);
        }
    };
};

