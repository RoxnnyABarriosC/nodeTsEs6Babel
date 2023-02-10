import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import jwt from 'jwt-simple';
import { JwtConfigInterface } from '../../../../config/config.interface';
import { User } from '../../../user/domain/entities/user.entity';
import { DecodeTokenInterface } from '../services/decode-token.interface';

export class JwtModel
{
    private readonly expires: number;
    private readonly hash: string;
    private readonly refreshHash: string;
    private readonly user: User;
    private readonly payload: DecodeTokenInterface;
    private readonly payloadRefreshToken: DecodeTokenInterface;

    constructor(id: string, user: User, jwtConfig: JwtConfigInterface)
    {
        dayjs.extend(utc);

        const { secret, expires, iss, aud } = jwtConfig;
        this.user = user;
        this.expires = dayjs().utc().add(expires, 'minute').unix();
        this.payload = {
            id,
            iss,
            aud,
            sub: user.email,
            iat: this.expires,
            exp: this.expires,
            userId: user.Id,
            email: user.email
        };

        const expiresRefreshToken = dayjs().utc().add(expires + 1, 'minute').unix();

        this.payloadRefreshToken = {
            ...this.payload,
            iat: expiresRefreshToken,
            exp: expiresRefreshToken
        };

        this.hash = jwt.encode(this.payload, secret, 'HS512');
        this.refreshHash = jwt.encode(this.payloadRefreshToken, secret, 'HS512');
    }

    getExpires(): number
    {
        return this.expires;
    }

    getHash(): string
    {
        return this.hash;
    }

    getRefreshHash(): string
    {
        return this.refreshHash;
    }

    getPayload(): any
    {
        return this.payload;
    }

    getUser(): User
    {
        return this.user;
    }
}

