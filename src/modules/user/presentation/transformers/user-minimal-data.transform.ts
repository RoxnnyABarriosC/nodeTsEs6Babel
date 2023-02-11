import { Transformer } from '@digichanges/shared-experience';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { User } from '../../domain/entities/user.entity';

export class UserMinimalDataTransform extends Transformer
{
    public async transform(user: User)
    {
        dayjs.extend(utc);

        return {
            id: user.Id,
            userName: user.userName,
            fullName: user.fullName,
            email: user.email,
            gender: user.gender,
            birthday: dayjs(user.birthday).utc().unix(),
            isSuperAdmin: user.isSuperAdmin,
            verify: user.verify,
            enable: user.enable
        };
    }
}

