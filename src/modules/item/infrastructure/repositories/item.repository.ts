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

    async list(criteria: CriteriaBuilder)
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


        return new Paginator(queryBuilder, criteria);
    }
}
