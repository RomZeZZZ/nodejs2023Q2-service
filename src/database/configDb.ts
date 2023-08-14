import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
config();
const conf = new ConfigService();
export const configDb: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: conf.get('POSTGRESS_PORT'),
  username: conf.get('POSTGRESS_USERNAME'),
  password: conf.get('POSTGRESS_PASSWORD'),
  database: conf.get('POSTGRESS_DB'),
  synchronize: false,
  logging: false,
  migrations: ['dist/migration/**/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
};
