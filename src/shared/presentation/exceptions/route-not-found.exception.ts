import { StatusCode } from '@digichanges/shared-experience';
import { Locales } from '../shared/locales';
import { HttpErrorException } from './http-error.exception';

export class RouteNotFoundHttpException extends HttpErrorException
{
    constructor()
    {
        const locales = Locales.getInstance().getLocales();
        const key = 'app.presentation.exceptions.routeNotFound';
        super(StatusCode.HTTP_NOT_FOUND, {
            message: locales.__(key),
            errorCode: key
        });
    }
}
