
import { v4 as uuidV4 } from 'uuid';
import { configuration } from '../../../config/configuration';
import { Token } from '../../../modules/auth/domain/entities/token.entity';
import { JwtModel } from '../../../modules/auth/domain/models/jwt.model';
import { User } from '../../../modules/user/domain/entities/user.entity';

const config = configuration();

export class TokenFactory
{
    public async createToken(user: User): Promise<JwtModel>
    {
        const jwtConfig = config.jwt;

        const id = uuidV4();
        const jWTToken = new JwtModel(id, user, jwtConfig);

        const token = new Token();

        token.Id = id;
        token.hash = jWTToken.getHash();
        token.payload = jWTToken.getPayload();
        token.expires = jWTToken.getExpires();

        // TODO: a futuro guardar el token en redis

        return jWTToken;
    }
}

