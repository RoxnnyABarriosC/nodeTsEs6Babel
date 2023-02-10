import { IsDateString, IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { decorate } from 'ts-mixer';
import GenderEnum from '../../domain/enums/gender.enum';

export class UserDto
{
    @decorate(IsString())
    @decorate(Length(5, 20))
    public readonly userName: string;

    @decorate(IsString())
    @decorate(Length(3, 20))
    public readonly firstName: string;

    @decorate(IsString())
    @decorate(Length(3, 20))
    public readonly lastName: string;

    @decorate(IsEmail())
    public readonly email: string;

    @decorate(IsEnum(GenderEnum))
    public readonly gender: GenderEnum;

    @decorate(IsDateString())
    public readonly birthday: Date;
}
