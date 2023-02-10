import { Expose } from 'class-transformer';
import { DefaultSorts, Sort } from '../../../../shared/presentation/criterias/sort';
import { IsSort } from '../../../../shared/presentation/decorators/is-sort.decorator';
import { SortEnum } from '../../../../shared/presentation/enums/sort.enum';
import { User } from '../../domain/entities/user.entity';

export class UserSort extends Sort
{
    @IsSort()
    public readonly userName: SortEnum;

    @IsSort()
    public readonly firstName: SortEnum;

    @IsSort()
    public readonly lastName: SortEnum;

    @IsSort()
    public readonly email: SortEnum;

    @IsSort()
    public readonly gender: SortEnum;

    @IsSort()
    public readonly birthday: SortEnum;

    @IsSort()
    public readonly enable: SortEnum;

    @IsSort()
    public readonly verify: SortEnum;

    @IsSort()
    public readonly createdAt: SortEnum;

    @IsSort()
    public readonly updatedAt: SortEnum;

    @IsSort()
    public readonly deletedAt: SortEnum;

    constructor(partial: Partial<UserSort> | any)
    {
        super();
        Object.assign(this, partial ?? {});
    }

    @Expose()
    get DefaultSorts(): DefaultSorts<User>
    {
        return [
            { createdAt: 'desc' }
        ];
    }
}
