export interface UriInterface {
    api: string;
    web: string;
}

export interface ServerInterface {
    url: UriInterface;
    prefix: string;
    version: string;
    port: number;
}

export interface PaginationInterface {
    limit: number;
}

export interface DBInterface {
    type: 'postgres';
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    synchronize: boolean;
    migrationsRun: boolean;
    logging: boolean;
}

export interface ConfigInterface {
    server: ServerInterface;
    db: DBInterface;
    pagination: PaginationInterface;
}
