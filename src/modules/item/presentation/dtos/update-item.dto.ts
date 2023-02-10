import { IsOptional, IsString } from 'class-validator';
import { SaveItemDto } from './save-item.dto';


export class UpdateItemDto extends SaveItemDto
{
    @IsString()
    @IsOptional()
    public description: string;
}
