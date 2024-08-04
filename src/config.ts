import 'dotenv/config';
import IConfig from '../IConfig';

const Config: IConfig = {
    MAILSENDER: {
        APIKEY: process.env.MAILSENDER_APIKEY ?? '',
        FROM_EMAIL: process.env.MAILSENDER_FROM_EMAIL ?? '',
        FROM_PASSWORD: process.env.MAILSENDER_FROM_PASSWORD ?? ''
    },
    DB: {
        NAME: process.env.DB_NAME ?? '',
        HOST: process.env.DB_HOST ?? '',
        PORT: parseInt(process.env.DB_PORT ?? '3306') ?? 3306,
        USERNAME: process.env.DB_USERNAME ?? '',
        PASSWORD: process.env.DB_PASSWORD ?? '',
        DATABASE: process.env.DB_DATABASE ?? ''
    },
    COMMUNITY_GUILD: {
        unverifyRole: '1261606735471181854',
        colaboratorRole: '1261157414099615784'
    }
};

export default Config;
