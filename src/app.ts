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
import { ItemService } from './modules/item/domain/services/item.service';
import { DeleteItemUseCase } from './modules/item/domain/useCases/delete-item.useCase';
import { GetItemUseCase } from './modules/item/domain/useCases/get-item.useCase';
import { ListItemsUseCase } from './modules/item/domain/useCases/list-items.useCase';
import { RestoreItemUseCase } from './modules/item/domain/useCases/restore-item.useCase';
import { SaveItemUseCase } from './modules/item/domain/useCases/save-item.useCase';
import { UpdateItemUseCase } from './modules/item/domain/useCases/update-item.useCase';
import { ItemRepository } from './modules/item/infrastructure/repositories/item.repository';
import { UserService } from './modules/user/domain/services/user.service';
import { DeleteUserUseCase } from './modules/user/domain/useCases/delete-user.useCase';
import { GetUserUseCase } from './modules/user/domain/useCases/get-user.useCase';
import { ListUsersUseCase } from './modules/user/domain/useCases/list-users.useCase';
import { RestoreUserUseCase } from './modules/user/domain/useCases/restore-user.useCase';
import { SaveUserUseCase } from './modules/user/domain/useCases/save-user.useCase';
import { UpdateUserUseCase } from './modules/user/domain/useCases/update-user.useCase';
import { UserRepository } from './modules/user/infrastructure/repositories/user.repository';
import { UniqueService } from './shared/infrastructure/services/unique.service';
import { DbCreateConnection } from './shared/infrastructure/shared/db-create-connection';
import { LoggerMiddleware } from './shared/presentation/middlewares/logger.middleware';
import { RedirectRouteNotFoundMiddleware } from './shared/presentation/middlewares/redirect-route-not-found.middleware';
import { ThrottleMiddleware } from './shared/presentation/middlewares/throttle.middleware';
import { ErrorHandler } from './shared/presentation/shared/error-handler';
import { Logger } from './utils/logger';
import { validateEnv } from './validate-env';

async function bootstrap(): Promise<string>
{
    validateEnv(process.env);

    const { server, db } = configuration();

    const _db = new DbCreateConnection(db);

    await _db.initConfig();
    await _db.create();

    hpropagate({ propagateInResponses: true });


    const userModule = {
        // UseCases
        saveUserUseCase: asClass(SaveUserUseCase),
        updateUserUseCase: asClass(UpdateUserUseCase),
        listUsersUseCase: asClass(ListUsersUseCase),
        deleteUserUseCase: asClass(DeleteUserUseCase),
        restoreUserUseCase: asClass(RestoreUserUseCase),
        getUserUseCase: asClass(GetUserUseCase),
        // Repositories
        userRepository: asClass(UserRepository).singleton(),
        // Services
        userService: asClass(UserService).singleton()
    };

    const itemModule = {
        // UseCases
        saveItemUseCase: asClass(SaveItemUseCase),
        updateItemUseCase: asClass(UpdateItemUseCase),
        listItemsUseCase: asClass(ListItemsUseCase),
        deleteItemUseCase: asClass(DeleteItemUseCase),
        restoreItemUseCase: asClass(RestoreItemUseCase),
        getItemUseCase: asClass(GetItemUseCase),
        // Repositories
        itemRepository: asClass(ItemRepository).singleton(),
        // Services
        itemService: asClass(ItemService).singleton()
    };

    const infrastructure = {
        uniqueService: asClass(UniqueService).singleton()
    };

    const container = createContainer()
        .register({
            ...userModule,
            ...itemModule,
            ...infrastructure
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
