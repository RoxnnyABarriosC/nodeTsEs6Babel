import { Transformer } from '@digichanges/shared-experience';

export class DefaultTransform extends Transformer
{
    public async transform(data: any)
    {
        return data;
    }
}

