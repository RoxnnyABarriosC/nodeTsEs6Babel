import { IsString  } from 'class-validator';

export class SaveItemDto
{
    @IsString()
    public readonly name: string;

    @IsString()
    public readonly description: string;

    constructor(data: SaveItemDto)
    {
        Object.assign(this, data);
    }
}
