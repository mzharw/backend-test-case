import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Book} from './domain/book.entity';
import {BookRepository} from './infrastructure/book.repository';
import {BookService} from './application/book.service';
import {BookController} from './presentation/book.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [
        BookRepository,
        BookService,
    ],
    controllers: [BookController],
    exports: [BookService],
})
export class BookModule {
}