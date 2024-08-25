import 'dotenv/config';
import { IConfig } from './ts';

const Config: IConfig = {
  EMAIL: {
    NO_REPLY: 'no-reply@mtocommunity.com'
  },
  DISCORD: {
    TOKEN: process.env.DISCORD_BOT_TOKEN ?? '',
    BOT_MANAGER_ID: process.env.DISCORD_BOT_MANAGER_ID ?? '',
    ADMINISTRATORS_ID: ['1261146736064204932'] // First ID is the main administrator
  },
  AWS: {
    REGION: process.env.AWS_REGION ?? 'us-east-2',
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? ''
  },
  DB: {
    HOST: process.env.DB_HOST ?? '',
    PORT: parseInt(process.env.DB_PORT ?? '3306') ?? 3306,
    USERNAME: process.env.DB_USERNAME ?? '',
    PASSWORD: process.env.DB_PASSWORD ?? '',
    DATABASE: process.env.DB_DATABASE ?? ''
  },
  COMMUNITY_GUILD: {
    unverifyRole: '1261606735471181854',
    colaboratorRole: '1261157414099615784'
  },
  ENV_DEV: process.env.ENV_DEV ? true : false
};

export default Config;
