import jwt from 'jwt-simple';
import { configuration } from '../../../../config/configuration';
import { TokenExpiredHttpException } from '../../presentation/exceptions/token-expired-http.exception';
import { TokenNotFoundHttpException } from '../../presentation/exceptions/token-not-found-http.exception';
import { DecodeTokenInterface } from './decode-token.interface';

const config = configuration();

export class AuthService
{
    public decodeToken(token: string, bearer = true): DecodeTokenInterface
    {
        const _token = bearer ? token.split(' ')[1] : token;

        const { secret } = config.jwt;
        const { algorithm } = config.encryption.bcrypt;

        return jwt.decode(_token, secret, false, algorithm);
    }

    public validateToken(token: string): DecodeTokenInterface
    {
        if (!token || !token.includes('Bearer'))
        {
            throw new TokenExpiredHttpException();
        }

        const tokenArray = token.split(' ');
        const hash = tokenArray[1];

        if (!hash || !token)
        {
            throw new TokenNotFoundHttpException();
        }

        return this.decodeToken(token);
    }

    public validateRefreshToken(refreshToken: string): DecodeTokenInterface
    {
        if (!refreshToken)
        {
            throw new TokenNotFoundHttpException();
        }

        return this.decodeToken(refreshToken, false);
    }
}
