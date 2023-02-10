import { Logger } from '../../../utils/logger';
import { HttpErrorException } from '../exceptions/http-error.exception';
import { ExceptionFactory } from './exception.factory';
import { Responder } from './responder';

export class ErrorHandler
{
    static handle(err: any, req: any, res: any, next: any)
    {
        const responder = new Responder();
        const exception: HttpErrorException = ExceptionFactory.getException(err);

        if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test')
        {
            Logger.trace(err.stack);
        }

        responder.error(exception, req, res, exception.statusCode, exception.metadata);
    }
}
