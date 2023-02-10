import { StatusCode } from '@digichanges/shared-experience';
import { HttpErrorException } from '../../../../shared/presentation/exceptions/http-error.exception';
import { Locales } from '../../../../shared/presentation/shared/locales';

export class ForbiddenHttpException extends HttpErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'auth.presentation.exceptions.forbidden';
        super(StatusCode.HTTP_FORBIDDEN, {
            message: locales.__(key),
            errorCode: key
        });
    }
}

