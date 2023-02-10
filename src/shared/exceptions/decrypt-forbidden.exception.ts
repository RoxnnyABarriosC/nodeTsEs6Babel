import { Locales } from '../presentation/shared/locales';
import { ErrorException } from './error.exception';

export class DecryptForbiddenException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'shared.exceptions.decryptForbidden';
        super({
            message: locales.__(key),
            errorCode: key
        }, DecryptForbiddenException.name);
    }
}

