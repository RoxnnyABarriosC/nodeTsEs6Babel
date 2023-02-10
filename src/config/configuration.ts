import { ConfigInterface } from './config.interface';

export default (): ConfigInterface => ({
    server: {
        url: {
            api: process.env.URL_API,
            web: process.env.URL_WEB
        },
        prefix: process.env.PREFIX,
        port: process.env.PORT,
        version: process.env.VERSION
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        synchronize: process.env.DB_SYNCHRONIZE,
        database: process.env.DB_DATABASE,
        type: process.env.DB_TYPE,
        logging: true,
        migrationsRun: false
    },
    pagination: {
        limit: process.env.PAGINATION_LIMIT
    }
});
