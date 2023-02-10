import { User } from '../entities/user.entity';

export class SaveUserUseCase
{
    async handle(dto: any): Promise<User>
    {
        return new User(dto);
    }
}
