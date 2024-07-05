import { Repository } from 'typeorm';
import { Book } from '../domain/book.entity';
export declare class BookRepository {
    private bookRepository;
    constructor(bookRepository: Repository<Book>);
    findAll(): Promise<Book[]>;
    findByCode(code: string): Promise<Book | null>;
    save(book: Book): Promise<Book>;
    update(book: Book): Promise<Book>;
    delete(code: string): Promise<void>;
}
