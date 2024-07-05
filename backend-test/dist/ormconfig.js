"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const ormConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    synchronize: false,
    dropSchema: false,
    logging: false,
    logger: 'file',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    migrationsTableName: 'migration_table',
});
exports.ormConfig = ormConfig;
//# sourceMappingURL=ormconfig.js.map