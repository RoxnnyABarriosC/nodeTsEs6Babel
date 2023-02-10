import { IsEmail,  IsString, Length } from 'class-validator';

export class LoginDto
{
    @IsEmail()
    public readonly email: string;

    @IsString()
    @Length(5, 20)
    public password: string;

    constructor(data: LoginDto)
    {
        Object.assign(this, data);
    }
}
