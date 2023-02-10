import { StatusCode } from '@digichanges/shared-experience';
import exceptions from '../../../exceptions';
import { TokenExpiredHttpException } from '../../../modules/auth/presentation/exceptions/token-expired-http.exception';
import { DuplicateEntityHttpException } from '../exceptions/duplicate-entity-http.exception';
import { HttpErrorException } from '../exceptions/http-error.exception';

export class ExceptionFactory
{
    private static exceptionsMapper = {
        ...exceptions,
        Error: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        TypeError: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        [HttpErrorException.name]: StatusCode.HTTP_INTERNAL_SERVER_ERROR
    };

    public static getException(err: any): HttpErrorException
    {
        const statusCode = ExceptionFactory.exceptionsMapper[err?.name] ?? StatusCode.HTTP_INTERNAL_SERVER_ERROR;

        let exception = new HttpErrorException();

        exception.message = err?.message;
        exception.errorCode = err?.errorCode;
        exception.metadata = err?.metadata ?? {};
        exception.statusCode = err?.statusCode ?? statusCode;
        exception.errors = err?.errors ?? [];

        if (err instanceof Error && err.message === 'Token expired')
        {
            exception = new TokenExpiredHttpException();
        }
        else if (err?.name === 'QueryFailedError')
        {
            if (err.code === '23505')
            {
                exception = new DuplicateEntityHttpException();
            }
        }
        else if (err?.name === 'UniqueConstraintViolationException')
        {
            exception = new DuplicateEntityHttpException();
        }

        return exception;
    }
}
