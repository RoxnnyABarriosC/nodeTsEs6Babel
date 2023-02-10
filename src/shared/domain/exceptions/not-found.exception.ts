import { Locales } from '../../presentation/shared/locales';
import { ErrorException } from './error.exception';

export class NotFoundException extends ErrorException
{
    constructor(entity: string)
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'shared.exceptions.notFound';
        super({
            message: `${entity} ${locales.__(key)}`,
            errorCode: key
        }, NotFoundException.name, { entity });
    }
}
