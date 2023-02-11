import { ErrorException } from '../../../../shared/domain/exceptions/error.exception';
import { Locales } from '../../../../shared/presentation/shared/locales';

export class SuperAdminCantBeDeletedOrUpdatedException extends ErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'user.domain.exceptions.superAdminCantBeDeletedOrUpdatedException';
        super({
            message: locales.__(key),
            errorCode: key
        }, SuperAdminCantBeDeletedOrUpdatedException.name);
    }
}
