import { ModuleMetadata } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../errors/validation-error';

export const AppModuleProviders: ModuleMetadata['providers'] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];
