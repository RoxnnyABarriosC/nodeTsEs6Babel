import { IsOptional } from 'class-validator';

export class PaginationFilter
{
    @IsOptional()
    readonly limit: number;

    @IsOptional()
    readonly offset: number;

    constructor(partial: Partial<PaginationFilter> | any)
    {
        Object.assign(this, partial);
    }
}
