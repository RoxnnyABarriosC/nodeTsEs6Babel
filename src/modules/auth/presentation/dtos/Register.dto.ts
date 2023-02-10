import { IsEmail,  IsString, Length } from 'class-validator';
import { Mixin } from 'ts-mixer';
import { PasswordDto } from '../../../user/presentation/dtos/password.dto';
import { UserDto } from '../../../user/presentation/dtos/user.dto';

export class RegisterDto extends Mixin(UserDto, PasswordDto)
{
    @IsEmail()
    public readonly email: string;

    @IsString()
    @Length(5, 20)
    public password: string;

    constructor(data: RegisterDto)
    {
        super();
        Object.assign(this, data);
    }
}
