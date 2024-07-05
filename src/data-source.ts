import * as dotenv from 'dotenv';

dotenv.config();
import {DataSource} from "typeorm";

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    dropSchema: false,
    logging: false,
    logger: 'file',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    migrationsTableName: 'migration_table',
});

export default dataSource;
