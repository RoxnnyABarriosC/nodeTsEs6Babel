import { NotFoundException } from '../../../../shared/domain/exceptions/not-found.exception';
import { BaseRepository } from '../../../../shared/infrastructure/repositories/base.repository';
import { Paginator } from '../../../../shared/infrastructure/shared/paginator';
import { PgSqlFilter } from '../../../../shared/infrastructure/shared/pg-sql-filter.helper';
import { CriteriaBuilder } from '../../../../shared/presentation/criterias/citeria';
import { User } from '../../domain/entities/user.entity';
import { UserFilter, UserFilters } from '../../presentation/criterias/user.filter';
import { UserSchema } from '../schemas/user.schema';


export class UserRepository extends BaseRepository<User>
{
    constructor()
    {
        super(User.name, UserSchema);
    }

    async list(criteria: CriteriaBuilder, authUserId: string)
    {
        const queryBuilder = this.repository.createQueryBuilder('i');

        const filter = new PgSqlFilter(criteria.getFilter<UserFilter>(), queryBuilder);

        queryBuilder.where('1 = 1');

        void await filter.customFilter(async(fltr, qb) =>
        {
            if (fltr.has(UserFilters.WITH_PARTIAL_REMOVED))
            {
                const withDeleted = fltr.get<boolean>(UserFilters.WITH_PARTIAL_REMOVED);

                if (withDeleted)
                {
                    qb.withDeleted();
                }
            }
        });

        void await filter.customFilter(async(fltr, qb) =>
        {
            qb.andWhere('i._id <> :id', { id: authUserId });
        });

        void filter.is({
            attribute: UserFilters.PARTIAL_REMOVED,
            isBoolean: true,
            dbAttribute: 'deletedAt'
        }, 'andWhere', 'IS NOT NULL');

        void filter.filter({
            attribute: UserFilters.VERIFY,
            isBoolean: true
        }, 'andWhere', '=');

        void filter.filter({
            attribute: UserFilters.ENABLE,
            isBoolean: true
        }, 'andWhere', '=');

        void filter.filter({
            attribute: UserFilters.IS_SUPER_ADMIN,
            isBoolean: true
        }, 'andWhere', '=');

        void await filter.search(UserFilters.SEARCH, {
            partialMatch: true,
            attributesDB: [
                { name: 'userName', setWeight: 'A' },
                { name: 'email', setWeight: 'A' },
                { name: 'firstName', setWeight: 'B' },
                { name: 'lastName', setWeight: 'B' },
                { name: 'birthday', setWeight: 'B' },
                { name: 'gender', setWeight: 'C' }
            ]
        }, 'andWhere');


        return new Paginator(queryBuilder, criteria);
    }

    async getOneByEmail(email: string): Promise<User>
    {
        const user = await this.repository.findOne({ withDeleted: false, where: { email } as any });

        if (!user)
        {
            throw new NotFoundException(this.entityName);
        }

        return user;
    }

    async checkSuperAdminDelete(id: string, softDelete = true, withDeleted = false, checkSuperAdmin: (user: User) => void): Promise<User>
    {
        const entity: any = await this.repository.findOne({ withDeleted, where: { _id: id } as any });

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        void checkSuperAdmin(entity);

        if (softDelete)
        {
            await this.repository.softDelete(id);
        }
        else
        {
            await this.repository.delete(id);
        }

        entity.deletedAt = Date.now();

        return entity;
    }
}
