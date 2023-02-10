import { Logger } from '../../../utils/logger';

export const LoggerMiddleware = (req: any, res: any, next: any) =>
{
    Logger.debug(`${req.method}: ${req.path} - ${req.ip}`);
    next();
};
