import { User } from '../../../user/domain/entities/user.entity';
import { UserService } from '../../../user/domain/services/user.service';
import { UserRepository } from '../../../user/infrastructure/repositories/user.repository';
import { MeDto } from '../../presentation/dtos/me.dto';

type Dependencies = {
    userRepository: UserRepository,
    userService: UserService,
    authUser: User
}

export class UpdateMeUseCase
{
    private readonly repository: UserRepository;
    private readonly service: UserService;
    private readonly authUser: User;

    constructor({ userRepository, userService, authUser }: Dependencies)
    {
        this.repository = userRepository;
        this.service = userService;
        this.authUser = authUser;
    }

    async handle(dto: MeDto): Promise<User>
    {
        this.authUser.build(dto);

        await this.service.validate(this.authUser, this.repository);

        return await this.repository.update(this.authUser);
    }
}
