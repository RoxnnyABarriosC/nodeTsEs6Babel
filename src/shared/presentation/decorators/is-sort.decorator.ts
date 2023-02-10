import { IsEnum, IsOptional } from 'class-validator';
import { applyDecorators } from '../../decorators/apply.decorator';
import { SortEnum } from '../enums/sort.enum';

export function IsSort()
{
    return applyDecorators(IsOptional(), IsEnum(SortEnum));
}
