
import { ValidationError } from 'class-validator';
import _ from 'lodash';

export class DtoErrorsModel
{
    property: string;
    constraints: any;
    children: DtoErrorsModel[];

    constructor(errors: ValidationError)
    {
        this.property = errors.property;
        this.constraints = errors.constraints;

        if (!_.isEmpty(errors.children))
        {
            this.children = [];
            errors.children.forEach(_children => this.children.push(new DtoErrorsModel(_children)));
        }
    }
}

