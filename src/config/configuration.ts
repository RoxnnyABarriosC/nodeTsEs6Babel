// eslint-disable-next-line import/order
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { ConfigInterface } from './config.interface';

export const configuration = (): ConfigInterface => ({
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
    },
    locale: process.env.LOCALE,
    setCookieSecure: process.env.SET_COOKIE_SECURE,
    setCookieSameSite: process.env.SET_COOKIE_SAME_SITE as any,
    jwt: {
        aud: process.env.JWT_AUD,
        iss: process.env.JWT_ISS,
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES
    },
    encryption: {
        default: process.env.ENCRYPTION_DEFAULT,
        bcrypt: {
            type: 'bcrypt',
            saltRounds: 10,
            algorithm: 'HS512'
        }
    }
});
