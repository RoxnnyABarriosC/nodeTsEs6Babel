import { StatusCode } from '@digichanges/shared-experience';
import { RouteNotFoundHttpException } from '../exceptions/route-not-found.exception';
import { Responder } from '../shared/responder';

export const RedirectRouteNotFoundMiddleware = (req: any, res: any) =>
{
    const responder = new Responder();

    responder.error(new RouteNotFoundHttpException(), req, res, StatusCode.HTTP_NOT_FOUND);
};

