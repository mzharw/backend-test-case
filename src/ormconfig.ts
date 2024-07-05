import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';

export const ormConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: false,
    dropSchema: false,
    logging: false,
    logger: 'file',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    migrationsTableName: 'migration_table',
});