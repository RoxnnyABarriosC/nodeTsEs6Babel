import { Expose } from 'class-transformer';
import { DefaultSorts, Sort } from '../../../../shared/presentation/criterias/sort';
import { IsSort } from '../../../../shared/presentation/decorators/is-sort.decorator';
import { User } from '../../domain/entities/user.entity';
import GenderEnum from '../../domain/enums/gender.enum';

export class UserSort extends Sort
{
    @IsSort()
    public readonly userName: string;

    @IsSort()
    public readonly firstName: string;

    @IsSort()
    public readonly lastName: string;

    @IsSort()
    public readonly email: string;

    @IsSort()
    public readonly gender: GenderEnum;

    @IsSort()
    public readonly birthday: Date;

    @IsSort()
    public readonly enable: boolean;

    @IsSort()
    public readonly verify: boolean;

    @IsSort()

    public readonly createdAt: string;

    @IsSort()

    public readonly updatedAt: string;

    @IsSort()

    public readonly deletedAt: string;

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
