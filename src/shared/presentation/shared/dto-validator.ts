import { StatusCode } from '@digichanges/shared-experience';
import { validate } from 'class-validator';
import _ from 'lodash';
import { HttpErrorException } from '../exceptions/http-error.exception';

export class DtoValidator
{
    static async handle(dtos: object[])
    {
        const errors = [];

        for await (const dto of dtos)
        {
            errors.push(...await validate(dto, {
                whitelist: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true
            }));
        }

        if (!_.isEmpty(errors))
        {
            throw new HttpErrorException(StatusCode.HTTP_UNPROCESSABLE_ENTITY, { message: 'Failed Request.' }, errors as any);
        }
    }
}

