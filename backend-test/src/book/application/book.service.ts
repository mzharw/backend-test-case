import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '../domain/book.entity';
import { BookRepository } from '../infrastructure/book.repository';

@Injectable()
export class BookService {
    constructor(private bookRepository: BookRepository) {}

    async getAllBooks(): Promise<Book[]> {
        return this.bookRepository.findAll();
    }

    async getBookByCode(code: string): Promise<Book> {
        const book = await this.bookRepository.findByCode(code);
        if (!book) {
            throw new NotFoundException(`Book with code ${code} not found`);
        }
        return book;
    }

    async createBook(book: Book): Promise<Book> {
        return this.bookRepository.save(book);
    }

    async updateBook(code: string, bookData: Partial<Book>): Promise<Book> {
        const book = await this.getBookByCode(code);
        Object.assign(book, bookData);
        return this.bookRepository.update(book);
    }

    async deleteBook(code: string): Promise<void> {
        await this.getBookByCode(code);
        await this.bookRepository.delete(code);
    }
}