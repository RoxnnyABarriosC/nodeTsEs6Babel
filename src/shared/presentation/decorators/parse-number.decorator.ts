import { Transform } from 'class-transformer';
import { applyDecorators } from '../../decorators/apply.decorator';

export function ParseNumber()
{
    return applyDecorators(Transform(({ value }) =>
    {
        return parseFloat(value);
    }));
}
