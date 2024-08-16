export interface IConfig {
  EMAIL: {
    NO_REPLY: string;
  };
  DISCORD: {
    TOKEN: string;
    BOT_MANAGER_ID: string;
  };
  AWS: {
    REGION: string;
    ACCESS_KEY_ID: string;
    SECRET_ACCESS_KEY: string;
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
