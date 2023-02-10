import { Expose } from 'class-transformer';
import { DefaultSorts, Sort } from '../../../../shared/presentation/criterias/sort';
import { IsSort } from '../../../../shared/presentation/decorators/is-sort.decorator';
import { SortEnum } from '../../../../shared/presentation/enums/sort.enum';
import { Item } from '../../domain/entities/item.entity';

export class ItemSort extends Sort
{
    @IsSort()
    public readonly name: SortEnum;

    @IsSort()
    public readonly description: SortEnum;

    @IsSort()
    public readonly createdAt: SortEnum;

    @IsSort()

    public readonly updatedAt: SortEnum;

    @IsSort()

    public readonly deletedAt: SortEnum;

    constructor(partial: Partial<ItemSort> | any = {})
    {
        super();
        Object.assign(this, partial);
    }

    @Expose()
    get DefaultSorts(): DefaultSorts<Item>
    {
        return [
            { createdAt: 'desc' }
        ];
    }
}
