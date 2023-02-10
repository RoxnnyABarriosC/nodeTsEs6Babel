import { IsBoolean } from 'class-validator';
import Parse from '../../../utils/parse';
import { ParseBoolean } from '../decorators/parse-boolean.decorator';

export class PartialRemovedDto
{
    @ParseBoolean()
    @IsBoolean()
    public partialRemoved: boolean;

    constructor(partialRemoved = false)
    {
        this.partialRemoved = Boolean(Parse(partialRemoved));
    }
}

