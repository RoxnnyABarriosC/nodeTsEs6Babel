import { IsBoolean } from 'class-validator';
import { SaveUserDto } from './save-user.dto';


export class UpdateUserDto extends SaveUserDto
{
    @IsBoolean()
    public enable: boolean;

    @IsBoolean()
    public verify: string;

    constructor(data: UpdateUserDto)
    {
        super(data);
        Object.assign(this, data);
    }
}
