import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../domain/book.entity';

@Injectable()
export class BookRepository {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async findAll(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    async findByCode(code: string): Promise<Book | null> {
        return this.bookRepository.findOne({ where: { code } });
    }

    async save(book: Book): Promise<Book> {
        return this.bookRepository.save(book);
    }

    async update(book: Book): Promise<Book> {
        await this.bookRepository.update(book.code, book);
        return book;
    }

    async delete(code: string): Promise<void> {
        await this.bookRepository.delete(code);
    }
}