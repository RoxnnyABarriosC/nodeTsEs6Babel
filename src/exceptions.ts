import { StatusCode } from '@digichanges/shared-experience';
import { NotFoundException } from './shared/domain/exceptions/not-found.exception';
import { UniqueAttributeException } from './shared/domain/exceptions/unique-attribute.exception';

const exceptions = {
    [NotFoundException.name]: StatusCode.HTTP_NOT_FOUND,
    [UniqueAttributeException.name]: StatusCode.HTTP_UNPROCESSABLE_ENTITY
};

export default exceptions;
