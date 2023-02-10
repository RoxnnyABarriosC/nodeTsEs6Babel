import { Mixin } from 'ts-mixer';
import { PasswordDto } from './password.dto';
import { UserDto } from './user.dto';

export class SaveUserDto extends Mixin(UserDto, PasswordDto)
{
    constructor(data: SaveUserDto)
    {
        super();
        Object.assign(this, data);
    }
}
