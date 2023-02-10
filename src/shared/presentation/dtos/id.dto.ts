import { IsUUID } from 'class-validator';

export class IdDto
{
    @IsUUID('4')
    public id: string;

    constructor(id: string = null)
    {
        this.id = id;
    }
}

