import { StatusCode } from '@digichanges/shared-experience';
import { BadCredentialsException } from './modules/auth/domain/exceptions/bad-credentials.exception';
import { PasswordWrongException } from './modules/auth/domain/exceptions/password-wrong.execption';
import { UnverifiedUserException } from './modules/auth/domain/exceptions/unverified-user.exception';
import { UserDisabledException } from './modules/auth/domain/exceptions/user-disabled.exception';
import { NotOwnerItemException } from './modules/item/domain/exceptions/not-owner-item.exception';
import {
    SuperAdminCantBeDeletedOrUpdatedException
} from './modules/user/domain/exceptions/super-admin-cant-be-deleted-or-updated.exception';
import { DecryptForbiddenException } from './shared/domain/exceptions/decrypt-forbidden.exception';
import { NotFoundException } from './shared/domain/exceptions/not-found.exception';
import { UniqueAttributeException } from './shared/domain/exceptions/unique-attribute.exception';

const exceptions = {
    [NotFoundException.name]: StatusCode.HTTP_NOT_FOUND,
    [UniqueAttributeException.name]: StatusCode.HTTP_UNPROCESSABLE_ENTITY,
    [DecryptForbiddenException.name]:  StatusCode.HTTP_FORBIDDEN,
    [BadCredentialsException.name]:  StatusCode.HTTP_FORBIDDEN,
    [UserDisabledException.name]:  StatusCode.HTTP_FORBIDDEN,
    [PasswordWrongException.name]:  StatusCode.HTTP_FORBIDDEN,
    [UnverifiedUserException.name]:  StatusCode.HTTP_FORBIDDEN,
    [NotOwnerItemException.name]: StatusCode.HTTP_FORBIDDEN,
    [SuperAdminCantBeDeletedOrUpdatedException.name]:StatusCode.HTTP_FORBIDDEN
};

export default exceptions;
