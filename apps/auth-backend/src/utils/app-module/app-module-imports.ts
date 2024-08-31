import { ModuleMetadata } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { AuthModule } from '../../modules/auth/auth.module';

export const AppModuleImports: ModuleMetadata['imports'] = [
  LoggerModule,
  AuthModule,
];
