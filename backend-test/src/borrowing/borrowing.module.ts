import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowing } from './domain/borrowing.entity';
import { BorrowingRepository } from './infrastructure/borrowing.repository';
import { BorrowingService } from './application/borrowing.service';
import { BorrowingController } from './presentation/borrowing.controller';
import { BookModule } from '../book/book.module';
import { MemberModule } from '../member/member.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Borrowing]),
        BookModule,
        MemberModule,
    ],
    providers: [
        BorrowingRepository,
        BorrowingService,
    ],
    controllers: [BorrowingController],
    exports: [BorrowingService],
})
export class BorrowingModule {}