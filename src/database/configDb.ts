import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
config();
const conf = new ConfigService();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: conf.get('POSTGRESS_HOST'),
  port: conf.get('POSTGRESS_PORT'),
  username: conf.get('POSTGRES_USER'),
  password: conf.get('POSTGRESS_PASSWORD'),
  database: conf.get('POSTGRESS_DB'),
  migrations: ['dist/migration/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migration',
  migrationsRun: false,
  synchronize: false,
  logging: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
