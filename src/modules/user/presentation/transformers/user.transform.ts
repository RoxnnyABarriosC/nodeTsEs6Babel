import { Transformer } from '@digichanges/shared-experience';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { User } from '../../domain/entities/user.entity';

export class UserTransform extends Transformer
{
    public async transform(user: User)
    {
        dayjs.extend(utc);

        return {
            id: user.Id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: dayjs(user.birthday).utc().unix(),
            gender: user.gender,
            enable: user.enable,
            verify: user.verify,
            isSuperAdmin: user.isSuperAdmin,
            createdAt: dayjs(user.createdAt).utc().unix(),
            updatedAt: dayjs(user.updatedAt).utc().unix(),
            deletedAt: dayjs(user.deletedAt).utc().unix()
        };
    }
}

