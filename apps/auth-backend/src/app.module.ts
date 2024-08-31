import { Module } from '@nestjs/common';
import { AppModuleImports } from './utils/app-module/app-module-imports';
import { DatabaseModule } from './database/database.module';
import { AppModuleProviders } from './utils/app-module/app-module-providers';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [...AppModuleImports, DatabaseModule],
  providers: AppModuleProviders,
})
export class AppModule {}
