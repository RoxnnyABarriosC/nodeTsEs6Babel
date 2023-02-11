import { BaseEntity } from '../../../../shared/domain/base.entity';
import { User } from '../../../user/domain/entities/user.entity';

export class Item extends BaseEntity
{
    public name: string;
    public description: string;
    public createdBy: User;

    constructor(partial: Partial<Item>)
    {
        super();
        this.build(partial);
    }
}
