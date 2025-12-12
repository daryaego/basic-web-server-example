import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseOptions } from './database/data-source';
import { DddModuleModule } from './ddd-module/ddd-module.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseOptions,
    }),
    DddModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
