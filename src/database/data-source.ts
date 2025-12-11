import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export function getDatabaseOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/database/entities/**/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    synchronize: false,
  };
}

export const AppDataSource = new DataSource(getDatabaseOptions());
