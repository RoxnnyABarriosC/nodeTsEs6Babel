// import { UniqueAttributeException } from '../../exceptions/unique-attribute.exception';
// import { BaseRepository } from '../repositories/base.repository';
//
// interface IUniqueConfig<T = any>
// {
//     repository: any;
//     validate: { [P in keyof T]?: T[P] }
//     refValue?: string;
// }
//
// @Injectable()
// export class UniqueService
// {
//     @Inject(ModuleRef)
//     private moduleRef: ModuleRef;
//
//     async validate<T = any>(config: IUniqueConfig<T>): Promise<void>
//     {
//         const { repository, validate, refValue } = config;
//
//         const _repository: BaseRepository<T> = this.moduleRef.get(repository);
//
//         const attrs = Object.keys(validate);
//
//         for await (const attr of attrs)
//         {
//             if (validate[<keyof T> attr])
//             {
//                 const exist = await _repository.exist({ [attr]: validate[<keyof T> attr] }, ['_id'], false);
//
//                 if (refValue && exist && exist._id !== refValue)
//                 {
//                     throw new UniqueAttributeException(attr);
//                 }
//                 else if (!refValue && exist)
//                 {
//                     throw new UniqueAttributeException(attr);
//                 }
//             }
//         }
//     }
//
//     async validateMulti<T = any>(config: IUniqueConfig<T>): Promise<void>
//     {
//         const { repository, validate, refValue } = config;
//
//         const _repository: BaseRepository<T> = this.moduleRef.get(repository);
//
//         const attrs = Object.keys(validate);
//
//         const validateObj = {};
//         const props = [];
//
//         for await (const attr of attrs)
//         {
//             props.push(attr);
//             Object.assign(validateObj, { [attr]: validate[<keyof T> attr] ?? null });
//         }
//
//         const exist = await _repository.exist(validateObj, ['_id'], false);
//
//         if (refValue && exist && exist._id !== refValue)
//         {
//             throw new UniqueAttributeException(props.join(), true);
//         }
//         else if (!refValue && exist)
//         {
//             throw new UniqueAttributeException(props.join(), true);
//         }
//     }
// }
//
