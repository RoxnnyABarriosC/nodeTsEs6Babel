import { NotFoundException } from '../../../../shared/domain/exceptions/not-found.exception';
import { BaseRepository } from '../../../../shared/infrastructure/repositories/base.repository';
import { Paginator } from '../../../../shared/infrastructure/shared/paginator';
import { PgSqlFilter } from '../../../../shared/infrastructure/shared/pg-sql-filter.helper';
import { CriteriaBuilder } from '../../../../shared/presentation/criterias/citeria';
import { Item } from '../../domain/entities/item.entity';
import { ItemFilter, ItemFilters } from '../../presentation/criterias/item.filter';
import { ItemSchema } from '../schemas/item.schema';

export class ItemRepository extends BaseRepository<Item>
{
    constructor()
    {
        super(Item.name, ItemSchema);
    }

    async list(criteria: CriteriaBuilder, authUserId: string)
    {
        const queryBuilder = this.repository.createQueryBuilder('i');

        const filter = new PgSqlFilter(criteria.getFilter<ItemFilter>(), queryBuilder);

        queryBuilder.where('1 = 1');

        void await filter.customFilter(async(fltr, qb) =>
        {
            if (fltr.has(ItemFilters.WITH_PARTIAL_REMOVED))
            {
                const withDeleted = fltr.get<boolean>(ItemFilters.WITH_PARTIAL_REMOVED);

                if (withDeleted)
                {
                    qb.withDeleted();
                }
            }

            qb.andWhere('i.createdBy_id = :id', { id: authUserId });
        });


        void filter.is({
            attribute: ItemFilters.PARTIAL_REMOVED,
            isBoolean: true,
            dbAttribute: 'deletedAt'
        }, 'andWhere', 'IS NOT NULL');
        void filter.filter(ItemFilters.NAME, 'andWhere', 'ilike');
        void filter.filter(ItemFilters.DESCRIPTION, 'andWhere', 'ilike');
        void await filter.search(ItemFilters.SEARCH, {
            partialMatch: true,
            attributesDB: [
                { name: 'name', setWeight: 'A' },
                { name: 'description', setWeight: 'A' }
            ]
        }, 'andWhere');

        queryBuilder.innerJoinAndSelect('i.createdBy', 'createdBy');

        return new Paginator(queryBuilder, criteria);
    }


    async checkOwnerAndDelete(id: string, softDelete = true, withDeleted = false, checkOwner: (createdById: string) => void): Promise<Item>
    {
        const item = await this.repository.findOne({ withDeleted, where: { _id: id } as any });

        if (!item)
        {
            throw new NotFoundException(this.entityName);
        }

        checkOwner(item.createdBy.Id);

        if (softDelete)
        {
            await this.repository.softDelete(id);
        }
        else
        {
            await this.repository.delete(id);
        }

        item.deletedAt = new Date();

        return item;
    }
}
