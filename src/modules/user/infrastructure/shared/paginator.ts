import { SelectQueryBuilder } from 'typeorm';
import { CriteriaBuilder } from '../../../../shared/presentation/criterias/citeria';
import { BasePaginator } from './base-paginator';

export class Paginator<E = any> extends BasePaginator
{
    private readonly queryBuilder: SelectQueryBuilder<E>;

    constructor(queryBuilder: SelectQueryBuilder<E>, criteria: CriteriaBuilder, config = { metadata: {}, helper: undefined })
    {
        super(criteria, config);
        this.queryBuilder = queryBuilder;
    }

    public async paginate(): Promise<E[]>
    {
        if (this.queryBuilder.expressionMap.queryType === 'soft-delete')
        {
            this.queryBuilder.expressionMap.withDeleted = true;
        }

        this.total = await this.queryBuilder.getCount();

        this.addOrderBy();
        this.addPagination();

        this._perPage = await this.queryBuilder.getCount();
        this.setPerPage(this._perPage);
        this.setCurrentPage();
        this.setLasPage();
        this.setFrom();
        this.setTo();

        let data = await this.queryBuilder.getMany();

        if (this.helper)
        {
            data = await this.helper(data);
        }

        return data;
    }

    private addOrderBy()
    {
        const sorts = this.sort.get();

        sorts.forEach((value: string, key: string) =>
        {
            let order = value.toUpperCase();
            order = (order === 'DESC') ? 'DESC' : 'ASC';

            const [_alias, _key] = key.split('.');

            if (!_key)
            {
                const { alias } = this.queryBuilder;
                this.queryBuilder.addOrderBy(`${alias}.${key}`, order as any);
                return;
            }

            const existAlias = this.queryBuilder.expressionMap.aliases.some(alias => alias.name === _alias);

            if (existAlias)
            {
                this.queryBuilder.addOrderBy(key, order as any);
                return;
            }

            throw new Error(`alias "${_alias}" is not defined in the query`);
        });
    }

    private addPagination()
    {
        const exist = this.pagination.getExist();

        if (exist)
        {
            void this.queryBuilder
                .offset(this.pagination.getOffset())
                .limit(this.pagination.getLimit());
        }
    }
}
