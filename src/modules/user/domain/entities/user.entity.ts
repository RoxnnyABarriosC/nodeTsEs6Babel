import { BaseEntity } from '../../../../shared/domain/base.entity';
import GenderEnum from '../enums/gender.enum';

export class User extends BaseEntity
{
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public gender: GenderEnum;
    public birthday: Date;
    public enable = false;
    public verify = false;

    constructor(partial: Partial<User>)
    {
        super();
        Object.assign(this, partial);
    }
}
