import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseHelper } from './database.helper';

@Module({
  providers: [
    DatabaseHelper,
    ...databaseProviders
  ],
  exports: [
    ...databaseProviders
  ],
})
export class DatabaseModule {}
