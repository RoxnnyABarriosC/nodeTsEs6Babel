import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { DefaultFilters, Filter } from '../../../../shared/presentation/criterias/filter';
import { ParseBoolean } from '../../../../shared/presentation/decorators/parse-boolean.decorator';
import { User } from '../../domain/entities/user.entity';

export enum UserFilters {
    SEARCH = 'search',
    PARTIAL_REMOVED = 'partialRemoved',
    WITH_PARTIAL_REMOVED = 'withPartialRemoved',
    ENABLE = 'enable',
    VERIFY = 'verify'
}

export class UserFilter extends Filter
{
    @IsOptional()
    public readonly search: string;

    @IsOptional()
    @ParseBoolean()
    public readonly withPartialRemoved: boolean;

    @IsOptional()
    @ParseBoolean()
    public readonly partialRemoved: boolean;

    @IsOptional()
    @ParseBoolean()
    public readonly enable: boolean;

    @IsOptional()
    @ParseBoolean()
    public readonly verify: boolean;

    constructor(partial: Partial<UserFilter> | any = {})
    {
        super();
        Object.assign(this, partial);
    }

    @Expose()
    get DefaultFilters(): DefaultFilters<User>
    {
        return [];
    }
}
