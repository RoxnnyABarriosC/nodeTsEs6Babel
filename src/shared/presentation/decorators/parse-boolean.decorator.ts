import { Transform } from 'class-transformer';
import Parse from '../../../utils/parse';
import { applyDecorators } from '../../infrastructure/decorators/apply.decorator';

export function ParseBoolean()
{
    return applyDecorators(Transform(({ value }) =>
    {
        return Boolean(Parse(value));
    }));
}
