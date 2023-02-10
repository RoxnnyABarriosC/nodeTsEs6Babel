import { IsString, Length } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Match } from '../../../../shared/presentation/decorators/match.decorator';

export class PasswordDto
{
    @decorate(IsString())
    @decorate(Length(5, 20))
    public password: string;

    @decorate(IsString())
    @decorate(Length(5, 20))
    @decorate(Match('password'))
    public passwordConfirmation: string;
}
