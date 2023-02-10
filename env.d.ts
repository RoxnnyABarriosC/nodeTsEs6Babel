declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        URL_API: string;
        URL_WEB: string;
        PREFIX: string;
        PORT: number;
        VERSION: string;
        DB_HOST: string;
        DB_PORT: number;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_SYNCHRONIZE: boolean;
        DB_DATABASE: string;
        DB_TYPE: 'postgres';
        PAGINATION_LIMIT: number;
    }
}
