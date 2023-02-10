import { TAlgorithm } from 'jwt-simple';

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


export interface BCryptTypeInterface {
    type: string;
    saltRounds: number;
    algorithm: TAlgorithm;
}

export interface EncryptionInterface {
    bcrypt: BCryptTypeInterface;
    default: string;
}

export interface JwtConfigInterface {
    secret: string;
    expires: number;
    iss: string;
    aud: string;
}

export interface ConfigInterface {
    setCookieSecure: boolean;
    setCookieSameSite: boolean | 'none' | 'lax' | 'strict';
    server: ServerInterface;
    db: DBInterface;
    pagination: PaginationInterface;
    encryption: EncryptionInterface;
    locale: string;
    jwt: JwtConfigInterface;
}
