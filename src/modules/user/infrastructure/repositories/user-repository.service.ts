//
// import { Repository } from 'typeorm';
// import { BaseRepository } from '../../../../shared/infrastructure/repositories/base.repository';
// import { User } from '../../domain/entities/user.entity';
//
// export class UserRepository extends BaseRepository<User>
// {
//     constructor(@InjectRepository(UserSchema) repository: Repository<User>)
//     {
//         super(User.name, repository);
//     }
//
//     async list(criteria: CriteriaBuilder)
//     {
//         const queryBuilder = this.repository.createQueryBuilder('i');
//
//         const filter = new PgSqlFilter(criteria.getFilter<ItemFilter>(), queryBuilder);
//
//         queryBuilder.where('1 = 1');
//
//         void await filter.customFilter(async(fltr, qb) =>
//         {
//             if (fltr.has(ItemFilters.WITH_PARTIAL_REMOVED))
//             {
//                 const withDeleted = fltr.get<boolean>(ItemFilters.WITH_PARTIAL_REMOVED);
//
//                 if (withDeleted)
//                 {
//                     qb.withDeleted();
//                 }
//             }
//         });
//
//         void filter.is({
//             attribute: ItemFilters.PARTIAL_REMOVED,
//             isBoolean: true,
//             dbAttribute: 'deletedAt'
//         }, 'andWhere', 'IS NOT NULL');
//         void filter.filter(ItemFilters.NAME, 'andWhere', 'ilike');
//         void filter.filter(ItemFilters.DESCRIPTION, 'andWhere', 'ilike');
//         void await filter.search(ItemFilters.SEARCH, {
//             partialMatch: true,
//             attributesDB: [
//                 { name: 'name', setWeight: 'A' },
//                 { name: 'description', setWeight: 'A' }]
//         }, 'andWhere');
//
//
//         return new Paginator(queryBuilder, criteria);
//     }
// }
