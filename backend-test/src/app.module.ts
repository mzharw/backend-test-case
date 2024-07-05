import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule, TypeOrmModuleAsyncOptions} from '@nestjs/typeorm';
import {BookModule} from './book/book.module';
import {MemberModule} from './member/member.module';
import {BorrowingModule} from './borrowing/borrowing.module';
import {ormConfig} from './ormconfig';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ormConfig(configService),
            inject: [ConfigService],
        }),
        BookModule,
        MemberModule,
        BorrowingModule,
    ],
})
export class AppModule {
}