import { IsBoolean } from 'class-validator';
import { SaveUserDto } from './save-user.dto';


export class UpdateUserDto extends SaveUserDto
{
    @IsBoolean()
    public readonly enable: boolean;

    @IsBoolean()
    public readonly verify: string;
}
