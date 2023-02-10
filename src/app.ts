// eslint-disable-next-line import/order
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { asClass, createContainer } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-express';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import Express from 'express';
import helmet from 'helmet';
import hpropagate from 'hpropagate';
import * as process from 'process';
import { configuration } from './config/configuration';
import { SaveUserUseCase } from './modules/user/domain/useCases/save-user.useCase';
import { LoggerMiddleware } from './shared/presentation/middlewares/logger.middleware';
import { RedirectRouteNotFoundMiddleware } from './shared/presentation/middlewares/redirect-route-not-found.middleware';
import { ThrottleMiddleware } from './shared/presentation/middlewares/throttle.middleware';
import { ErrorHandler } from './shared/presentation/shared/error-handler';
import { Logger } from './utils/logger';
import { validateEnv } from './validate-env';


async function bootstrap(): Promise<string>
{
    validateEnv(process.env);

    const { server } = configuration();

    hpropagate({ propagateInResponses: true });

    const container = createContainer()
        .register({
            saveUserUseCase: asClass(SaveUserUseCase)
        });

    const whitelist = ['http://localhost:3000'];

    const app = Express();

    app
        .use(bodyParser.urlencoded({
            extended: true,
            limit: '5mb'
        }))
        .use(bodyParser.json({
            limit: '5mb'
        }))
        .use(compression())
        .use(cors({
            origin: process.env.NODE_ENV === 'production' ? (origin, callback) =>
            {
                if (!origin || whitelist.indexOf(origin) !== -1)
                {
                    callback(null, true);
                }
                else
                {
                    callback(new Error('Not allowed by CORS'));
                }
            } : undefined
        }))
        .use(helmet())
        .use(scopePerRequest(container))
        // Loads all controllers in the `routes` folder
        // relative to the current working directory.
        // This is a glob pattern.
        .use(`${server.prefix}${server.version}`, loadControllers('modules/**/presentation/controllers/*.controller.ts', { cwd: __dirname }))
        .use(ErrorHandler.handle)
        .use(LoggerMiddleware)
        .use(ThrottleMiddleware)
        .use(RedirectRouteNotFoundMiddleware)
        .listen(server.port);

    return server.url.api
        .replace('<protocol>', 'http')
        .replace('<domain>', 'localhost')
        .replace('<port>', `:${server.port}`)
        .replace('<prefix>', `${server.prefix}`)
        .replace('<version>', `${server.version}`);
}

(async(): Promise<void> =>
{
    try
    {
        const url = await bootstrap();
        Logger.trace(url);
    }
    catch (error)
    {
        Logger.debug(error, 'Bootstrap');
    }
})();
