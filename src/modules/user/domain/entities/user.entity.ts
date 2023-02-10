import { BaseEntity } from '../../../../shared/domain/base.entity';
import { PasswordValueObject } from '../../../../shared/domain/valueObjects/password.valueObject';
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
    public password: PasswordValueObject;
    public isSuperAdmin: boolean;

    constructor(partial: Partial<User>)
    {
        super();
        this.build(partial);
    }

    get fullName()
    {
        return `${this.firstName} ${this.lastName}`;
    }
}
