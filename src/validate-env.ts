import { bool, cleanEnv, host, num, port, str, url } from 'envalid';

export function validateEnv(config: Record<string, any>): Record<string, any>
{
    const clean = cleanEnv(config, {
        NODE_ENV: str({
            choices: ['development', 'test', 'production', 'staging']
        }),
        PORT: port(),
        URL_API: str(),
        URL_WEB: url(),
        PREFIX: str(),
        VERSION: str(),
        DB_HOST: host(),
        DB_USER: str(),
        DB_DATABASE: str(),
        DB_PASSWORD: str(),
        DB_PORT: port(),
        DB_SYNCHRONIZE: bool(),
        PAGINATION_LIMIT: num()
    });

    config = { ...config, ...clean };

    process.env = <any>config;

    return config;
}
