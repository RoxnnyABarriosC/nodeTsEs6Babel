import { Transformer } from '@digichanges/shared-experience';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { UserMinimalDataTransform } from '../../../user/presentation/transformers/user-minimal-data.transform';
import { Item } from '../../domain/entities/item.entity';

export class ItemTransform extends Transformer
{
    private readonly showCreatedBy: boolean;
    private userTransform: UserMinimalDataTransform;

    constructor(showCreatedBy = true)
    {
        super();
        this.showCreatedBy = showCreatedBy;
        this.userTransform = new UserMinimalDataTransform();
    }

    public async transform(item: Item)
    {
        dayjs.extend(utc);

        // const createdBy = item.createdBy;

        return {
            id: item.Id,
            name: item.name,
            description: item.description,
            // createdBy: createdBy && this.showCreatedBy ? await this.userTransform.handle(createdBy) : null,
            createdAt: dayjs(item.createdAt).utc().unix(),
            updatedAt: dayjs(item.updatedAt).utc().unix(),
            deletedAt: dayjs(item.deletedAt).utc().unix()
        };
    }
}

