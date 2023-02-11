import { UserDto } from '../../../user/presentation/dtos/user.dto';

export class MeDto extends UserDto
{
    constructor(data: MeDto)
    {
        super();
        Object.assign(this, data);
    }
}
