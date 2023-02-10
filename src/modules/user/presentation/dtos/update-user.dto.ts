import { IsBoolean } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserDto extends UserDto
{
    @IsBoolean()
    public readonly enable: boolean;

    @IsBoolean()
    public readonly verify: string;

    constructor(data: UpdateUserDto)
    {
        super();
        Object.assign(this, data);
    }
}
