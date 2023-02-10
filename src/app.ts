import { asClass, createContainer } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-express';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import Express from 'express';
import helmet from 'helmet';
import hpropagate from 'hpropagate';
import { SaveUserUseCase } from './modules/user/domain/useCases/save-user.useCase';
import { ErrorHandler } from './shared/presentation/shared/error-handler';
import { Logger } from './utils/logger';


async function bootstrap(): Promise<string>
{
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
        .use(loadControllers('modules/**/presentation/controllers/*.controller.ts', { cwd: __dirname }))
        .use(ErrorHandler.handle)
        .listen(3000);

    return `http://localhost:${3000}`;
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
        Logger.error(error, 'Bootstrap');
    }
})();
