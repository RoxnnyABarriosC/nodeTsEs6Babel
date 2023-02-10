import { StatusCode } from '@digichanges/shared-experience';
import { NotFoundException } from './shared/exceptions/not-found.exception';

const exceptions = {
    [NotFoundException.name]: StatusCode.HTTP_NOT_FOUND
};

export default exceptions;
