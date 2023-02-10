import { IsDateString, IsEmail, IsEnum, IsString, Length } from 'class-validator';
import GenderEnum from '../../domain/enums/gender.enum';


export class SaveUserDto
{
    @IsString()
    @Length(5, 20)
    public readonly userName: string;

    @IsString()
    @Length(3, 20)
    public readonly firstName: string;

    @IsString()
    @Length(3, 20)
    public readonly lastName: string;

    @IsEmail()
    public readonly email: string;

    @IsEnum(GenderEnum)
    public readonly gender: GenderEnum;

    @IsDateString()
    public readonly birthday: Date;

    constructor(data: SaveUserDto)
    {
        Object.assign(this, data);
    }
}
