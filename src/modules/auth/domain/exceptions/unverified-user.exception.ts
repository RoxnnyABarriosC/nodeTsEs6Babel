import { ErrorException } from '../../../../shared/domain/exceptions/error.exception';
import { Locales } from '../../../../shared/presentation/shared/locales';

export class UnverifiedUserException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'user.domain.exceptions.unverifiedUser';
        super({
            message: locales.__(key),
            errorCode: key
        }, UnverifiedUserException.name);
    }
}

