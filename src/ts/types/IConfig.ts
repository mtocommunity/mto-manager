export interface IConfig {
  MAILSENDER: {
    APIKEY: string;
    FROM_EMAIL: string;
    FROM_PASSWORD: string;
  };
  DB: {
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    DATABASE: string;
  };
  COMMUNITY_GUILD: {
    unverifyRole: string;
    colaboratorRole: string;
  };
}
