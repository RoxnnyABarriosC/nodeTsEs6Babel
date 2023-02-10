import { Locales } from '../../presentation/shared/locales';
import { ErrorException } from './error.exception';

export class UniqueAttributeException extends ErrorException
{
    constructor(name: string | any, multi = false)
    {
        const locales = Locales.getInstance().getLocales();
        const key = multi ? 'app.presentation.exceptions.uniqueAttributes' : 'app.presentation.exceptions.uniqueAttribute';
        super({
            message: locales.__(key, { name }),
            errorCode: key
        }, UniqueAttributeException.name, { replace:{ name } });
    }
}
