import { Book } from '../domain/book.entity';
import { BookRepository } from '../infrastructure/book.repository';
export declare class BookService {
    private bookRepository;
    constructor(bookRepository: BookRepository);
    getAllBooks(): Promise<Book[]>;
    getBookByCode(code: string): Promise<Book>;
    createBook(book: Book): Promise<Book>;
    updateBook(code: string, bookData: Partial<Book>): Promise<Book>;
    deleteBook(code: string): Promise<void>;
}
