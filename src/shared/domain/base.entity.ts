import { v4 as uuidV4 } from 'uuid';
import { CloneDeepMap } from '../../utils/clone-deep-map';

export abstract class BaseEntity
{
    protected _id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt?: Date | null;

    protected constructor()
    {
        this._id = uuidV4();
    }

    get Id(): string
    {
        return this._id;
    }

    set Id(id: string)
    {
        this._id = id;
    }

    clone(newId = false): this
    {
        const clone = CloneDeepMap(this, true);

        if (newId)
        {
            clone.Id = uuidV4();
        }

        return clone;
    }
}
