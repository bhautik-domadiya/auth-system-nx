export interface ISecretManager {
  db: {
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  };
  app: {
    APP_HOST: string;
    APP_PORT: number;
    FRONTEND_URL: string;
  };
  jwt: {
    ACCESS_SECRET: string;
    REFRESH_SECRET: string;
    ACCESS_EXPIRE: string;
    CRYPTO_SALT: string;
  };
  email: {
    EMAIL_HOST: string;
    EMAIL_HOST_USER: string;
    EMAIL_HOST_PASSWORD: string;
  };
}
