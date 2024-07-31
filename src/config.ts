import 'dotenv/config';

export const MAILSENDER_APIKEY = process.env.MAILSENDER_APIKEY ?? '';
export const MAILSENDER_FROM_EMAIL = process.env.MAILSENDER_FROM_EMAIL ?? '';
export const MAILSENDER_FROM_PASSWORD = process.env.MAILSENDER_FROM_PASSWORD ?? '';

export const DB_NAME = process.env.DB_NAME ?? '';
export const DB_HOST = process.env.DB_HOST ?? '';
export const DB_PORT = parseInt(process.env.DB_PORT ?? '3306') ?? 3306;
export const DB_USERNAME = process.env.DB_USERNAME ?? '';
export const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
export const DB_DATABASE = process.env.DB_DATABASE ?? '';

export const COMMUNITY_GUILD = {
  unverifyRole: '1261606735471181854',
  colaboratorRole: '1261157414099615784'
};
