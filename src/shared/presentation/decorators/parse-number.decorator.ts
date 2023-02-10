import { Transform } from 'class-transformer';
import { applyDecorators } from '../../infrastructure/decorators/apply.decorator';

export function ParseNumber()
{
    return applyDecorators(Transform(({ value }) =>
    {
        return parseFloat(value);
    }));
}
