import { StatusCode } from '@digichanges/shared-experience';
import { Locales } from '../shared/locales';
import { HttpErrorException } from './http-error.exception';

export class DuplicateEntityHttpException extends HttpErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'app.presentation.exceptions.duplicateEntity';
        super(StatusCode.HTTP_BAD_REQUEST, {
            message: locales.__(key),
            errorCode: key
        });
    }
}

