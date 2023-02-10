import { IsDateString, IsEmail, IsEnum, IsString, Length } from 'class-validator';
import GenderEnum from '../../domain/enums/gender.enum';


export class SaveUserDto
{
    @IsString()
    @Length(5, 20)
    public userName: string;

    @IsString()
    @Length(3, 20)
    public firstName: string;

    @IsString()
    @Length(3, 20)
    public lastName: string;

    @IsEmail()
    public email: string;

    @IsEnum(GenderEnum)
    public gender: GenderEnum;

    @IsDateString()
    public birthday: Date;

    constructor(data: SaveUserDto)
    {
        Object.assign(this, data);
    }
}
