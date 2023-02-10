import { IsUUID } from 'class-validator';

export class IdDto
{
    @IsUUID('4')
    public id: string;

    constructor(id: string)
    {
        this.id = id;
    }
}

