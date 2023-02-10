import { Locales } from '../../presentation/shared/locales';
import { ErrorException } from './error.exception';

export class InvalidPasswordException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'app.domain.exceptions.invalidPassword';
        super({
            message: locales.__(key),
            errorCode: key
        }, InvalidPasswordException.name);
    }
}
