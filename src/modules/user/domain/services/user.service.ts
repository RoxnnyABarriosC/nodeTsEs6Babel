import { PasswordValueObject } from '../../../../shared/domain/valueObjects/password.valueObject';
import { UniqueService } from '../../../../shared/infrastructure/services/unique.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../entities/user.entity';
import {
    SuperAdminCantBeDeletedOrUpdatedException
} from '../exceptions/super-admin-cant-be-deleted-or-updated.exception';

type Dependencies = {
    uniqueService: UniqueService,
}

export class UserService
{
    private readonly uniqueService: UniqueService;

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

    async preparePassword(password: string)
    {
        return  await (new PasswordValueObject(password, 5, 20)).ready();
    }

    checkSuperAdmin(user: User): void
    {
        if (user.isSuperAdmin)
        {
            throw new SuperAdminCantBeDeletedOrUpdatedException();
        }
    }
}
