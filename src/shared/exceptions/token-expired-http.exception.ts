import { Locales } from '../presentation/shared/locales';
import { ErrorException } from './error.exception';

export class TokenExpiredHttpException extends ErrorException
{
    constructor(name: string | any)
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'general.exceptions.tokenExpired';
        super({
            message: locales.__(key, { name }),
            errorCode: key
        }, TokenExpiredHttpException.name);
    }
}
