import { Transformer } from '@digichanges/shared-experience';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { User } from '../../domain/entities/user.entity';

export class UserTransformer extends Transformer
{
    public async transform(user: User)
    {
        dayjs.extend(utc);

        return {
            id: user.Id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: user.birthday,
            gender: user.gender,
            enable: user.enable,
            verify: user.verify,
            createdAt: dayjs(user.createdAt).utc().unix(),
            updatedAt: dayjs(user.updatedAt).utc().unix()
        };
    }
}

