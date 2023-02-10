import { Request } from 'express';
import { configuration } from '../config/configuration';
import { UrisInterface } from '../shared/presentation/criterias/pagination.criteria';

const { server: { prefix } } = configuration();

export const GetUris =
    (req: Request): UrisInterface =>
    {
        return {
            fullUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
            base: `${req.protocol}://${req.get('host')}${prefix}`
        };
    };

