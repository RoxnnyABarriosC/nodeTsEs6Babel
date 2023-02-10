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
            fullName: user.fullName,
            email: user.email,
            gender: user.gender
        };
    }
}

