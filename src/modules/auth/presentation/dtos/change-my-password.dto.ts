import { IsString, Length } from 'class-validator';
import { PasswordDto } from '../../../user/presentation/dtos/password.dto';

export class ChangeMyPasswordDto extends PasswordDto
{
    @IsString()
    @Length(5, 20)
    public currentPassword: string;

    constructor(data: ChangeMyPasswordDto)
    {
        super();
        Object.assign(this, data);
    }
}
