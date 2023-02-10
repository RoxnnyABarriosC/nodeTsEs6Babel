import { UniqueService } from '../../../../shared/infrastructure/services/unique.service';
import { UserRepository } from '../../infrastructure/repositories/user-repository.service';
import { User } from '../entities/user.entity';

type Dependencies = {
    uniqueService: UniqueService,
}

export class UserService
{
    private uniqueService: UniqueService;

    constructor({ uniqueService }: Dependencies)
    {
        this.uniqueService = uniqueService;
    }

    async validate(entity: User, repository: UserRepository): Promise<void>
    {
        void await this.uniqueService.validate<User>({
            repository,
            validate: {
                email: entity.email,
                userName: entity.userName
            },
            refValue: entity.Id
        });
    }
}
