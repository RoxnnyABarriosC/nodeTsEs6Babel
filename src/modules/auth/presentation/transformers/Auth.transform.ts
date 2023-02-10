import { Transformer } from '@digichanges/shared-experience';
import { UserTransform } from '../../../user/presentation/transformers/user.transform';
import { JwtModel } from '../../domain/models/jwt.model';

export class AuthTransform extends Transformer
{
    private userTransform: UserTransform;

    constructor()
    {
        super();
        this.userTransform = new UserTransform();
    }

    public async transform(token: JwtModel)
    {
        return {
            user: await this.userTransform.handle(token.getUser()),
            expires: token.getExpires(),
            token: token.getHash()
        };
    }
}

