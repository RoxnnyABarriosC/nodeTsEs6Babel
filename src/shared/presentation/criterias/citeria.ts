import { Filter } from './filter';
import { FilterCriteria } from './filter.criteria';
import { PaginationCriteria, UrisInterface } from './pagination.criteria';
import { PaginationFilter } from './paginationFilter';
import { Sort } from './sort';
import { SortCriteria } from './sort.criteria';

export class CriteriaBuilder
{
    private readonly sort: SortCriteria;
    private readonly filter: FilterCriteria;
    private readonly pagination: PaginationCriteria;

    constructor(filters: Filter, sorts: Sort, pagination: PaginationFilter, uris: UrisInterface)
    {
        this.filter = new FilterCriteria(filters);
        this.sort = new SortCriteria(sorts);
        this.pagination = new PaginationCriteria(pagination, uris);
    }

    getFilter<T = any>(): FilterCriteria<T>
    {
        return this.filter;
    }

    getSort<T = any>(): SortCriteria<T>
    {
        return this.sort;
    }

    getPagination(): PaginationCriteria
    {
        return this.pagination;
    }
}
