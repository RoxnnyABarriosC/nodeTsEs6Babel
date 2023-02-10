// import { Inject, Injectable } from '@nestjs/common';
// import { UniqueService } from '../../../../shared/infrastructure/services/unique.service';
// import { UserRepository } from '../../infrastructure/repositories/user-repository.service';
// import { User } from '../entities/user.entity';
//
// @Injectable()
// export class UserService
// {
//     @Inject(UniqueService)
//     private readonly uniqueService: UniqueService;
//
//     async validate(entity: User): Promise<void>
//     {
//         void await this.uniqueService.validate<User>({
//             repository: UserRepository,
//             validate: {
//                 email: entity.email,
//                 userName: entity.userName
//             },
//             refValue: entity.Id
//         });
//     }
// }
