// import { config } from 'dotenv';
// import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
// config();
// const conf = new ConfigService();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 4040,
  username: 'test',
  password: 'test',
  database: 'test_db',
  migrations: ['dist/migration/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migration',
  migrationsRun: false,
  synchronize: false,
  logging: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
