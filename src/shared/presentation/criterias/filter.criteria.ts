import { Filter } from './filter';

export class FilterCriteria<E = any>
{
    private readonly filters: Map<string, any>;

    constructor(filter: Filter)
    {
        this.filters = new Map<string, any>();

        const queryFilters: any = filter?.Filter() ?? [];

        // TODO: es posible que esto genere un error al realizar el filter
        const defaultFilters: any = filter?.DefaultFilters;
        const keys: any = filter?.Fields();

        defaultFilters.forEach((defaultFilter: any) =>
        {
            const defaultKey: string = Object.keys(defaultFilter)[0];
            const defaultValue: string = defaultFilter[defaultKey];

            if (defaultValue)
            {
                this.filters.set(defaultKey, defaultValue);
            }
        });

        const newFilters = Object.keys(queryFilters).map((key: string) =>
        {
            const _filter: Record<string, any> = filter.Filter() as Record<string, any>;
            let value = {};

            if (_filter[key])
            {
                value = {
                    [key]: _filter[key]
                };
            }

            return value;
        }).filter((value =>
        {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        newFilters.forEach((newFilter: any) =>
        {
            const defaultKey: string = Object.keys(newFilter)[0];
            const defaultValue: string = newFilter[defaultKey];

            this.filters.set(defaultKey, defaultValue);
        });
    }

    get<F>(key: keyof E | F): string
    {
        return this.filters.has(<any>key) ? this.filters.get(<any>key) : '';
    }

    getArray(): any
    {
        return this.filters.entries();
    }

    has<F>(key: keyof E | F): boolean
    {
        return this.filters.has(<any>key);
    }

    isEmpty(): boolean
    {
        return this.filters.size === 0;
    }

    values(): Map<string, any>
    {
        return this.filters;
    }
}
