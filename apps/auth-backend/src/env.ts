import { ISecretEnv } from './core/environment/interfaces/env-interface';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { getOsEnv, getOsEnvOptional, toBool, toNumber } from './utils/env';

// Config the .Env
dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

const localEnv: ISecretEnv = {
  db: {
    mongoURL: getOsEnv('MONGO_URL'),
  },
  app: {
    host: getOsEnvOptional('APP_HOST') || 'localhost',
    port: toNumber(getOsEnvOptional('APP_PORT')) || 3000,
  },
  swagger: {
    enabled: toBool(getOsEnvOptional('SWAGGER_ENABLED')),
    route: getOsEnvOptional('SWAGGER_ROUTE'),
    username: getOsEnvOptional('SWAGGER_USERNAME'),
    password: getOsEnvOptional('SWAGGER_PASSWORD'),
  },
  // JWT secrets for user authentication
  jwtSecret: {
    accessTokenSecret: getOsEnvOptional('ACCESS_SECRET'),
    refreshTokenSecret: getOsEnvOptional('REFRESH_SECRET'),
    accessTokenExpiry: getOsEnvOptional('ACCESS_TOKEN_EXPIRE'),
    refreshTokenExpiry: getOsEnvOptional('REFRESH_TOKEN_EXPIRE'),
    cryptoSalt: getOsEnvOptional('CRYPTO_SALT'),
  },
};

class Environment implements ISecretEnv {
  db: ISecretEnv['db'];
  app: ISecretEnv['app'];
  swagger: ISecretEnv['swagger'];
  jwtSecret: ISecretEnv['jwtSecret'];
  constructor(env: ISecretEnv) {
    Object.assign(this, env);
  }

  updateEnv(updateEnv: ISecretEnv) {
    Object.assign(this, updateEnv);
  }
}

export const env = new Environment(localEnv);
