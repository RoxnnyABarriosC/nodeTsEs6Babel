import { IsNotEmpty, IsString  } from 'class-validator';

export class SaveItemDto
{
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly description: string;

    constructor(data: SaveItemDto)
    {
        Object.assign(this, data);
    }
}
