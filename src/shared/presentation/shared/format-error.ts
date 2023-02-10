import { StatusCode } from '@digichanges/shared-experience';
import _ from 'lodash';
import { HttpErrorException } from '../exceptions/http-error.exception';
import { DtoErrorsModel } from './dto-errors.model';

export class FormatError
{
    getFormat = (errorHttpException: HttpErrorException): any =>
    {
        const { statusCode, message, errors, metadata, errorCode } = errorHttpException;
        const dtoErrorsModels: DtoErrorsModel[] = [];

        if (!_.isEmpty(errors))
        {
            for (const error of errors)
            {
                const dtoErrorsModel = new DtoErrorsModel(error);
                dtoErrorsModels.push(dtoErrorsModel);
            }
        }

        return {
            message: statusCode.code === StatusCode.HTTP_INTERNAL_SERVER_ERROR.code ? 'Internal Error Server' : message,
            errorCode,
            errors: dtoErrorsModels ?? null,
            metadata
        };
    };
}

