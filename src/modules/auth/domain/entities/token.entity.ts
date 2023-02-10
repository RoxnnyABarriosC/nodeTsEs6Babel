import { BaseEntity } from '../../../../shared/domain/base.entity';

export class Token extends BaseEntity
{
    public hash: string;
    public expires: number;
    public payload: any;
    public blackListed: boolean;

    constructor()
    {
        super();
        this.hash = '';
        this.payload = {};
        this.expires = 0;
        this.blackListed = false;
    }
}

