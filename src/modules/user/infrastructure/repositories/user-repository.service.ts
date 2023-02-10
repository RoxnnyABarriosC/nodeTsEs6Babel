import { BaseRepository } from '../../../../shared/infrastructure/repositories/base.repository';
import { User } from '../../domain/entities/user.entity';
import { UserSchema } from '../schemas/user.schema';

export class UserRepository extends BaseRepository<User>
{
    constructor()
    {
        super(User.name, UserSchema);
    }
}
