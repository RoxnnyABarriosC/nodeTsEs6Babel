import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { DefaultFilters, Filter } from '../../../../shared/presentation/criterias/filter';
import { ParseBoolean } from '../../../../shared/presentation/decorators/parse-boolean.decorator';
import { Item } from '../../domain/entities/item.entity';

export enum ItemFilters {
    NAME = 'name',
    DESCRIPTION = 'description',
    SEARCH = 'search',
    PARTIAL_REMOVED = 'partialRemoved',
    WITH_PARTIAL_REMOVED = 'withPartialRemoved'
}

export class ItemFilter extends Filter
{
    @IsOptional()
    public readonly name: string;

    @IsOptional()
    public readonly description: string;

    @IsOptional()
    public readonly search: string;

    @IsOptional()
    @ParseBoolean()
    public readonly withPartialRemoved: boolean;

    @IsOptional()
    @ParseBoolean()
    public readonly partialRemoved: boolean;

    constructor(partial: Partial<ItemFilter> | any = {})
    {
        super();
        Object.assign(this, partial);
    }

    @Expose()
    get DefaultFilters(): DefaultFilters<Item>
    {
        return [];
    }
}
