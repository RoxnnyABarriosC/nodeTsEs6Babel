import { ErrorException } from '../../../../shared/domain/exceptions/error.exception';
import { Locales } from '../../../../shared/presentation/shared/locales';

export class BadCredentialsException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.exceptions.badCredentials';
        super({
            message: locales.__(key),
            errorCode: key
        }, BadCredentialsException.name);
    }
}
