import { IsBoolean } from 'class-validator';
import Parse from '../../../utils/parse';
import { ParseBoolean } from '../decorators/parse-boolean.decorator';

export class DeletePermanentlyDto
{
    @ParseBoolean()
    @IsBoolean()
    public deletePermanently: boolean;

    constructor(deletePermanently = false)
    {
        this.deletePermanently = Boolean(Parse(deletePermanently));
    }
}

