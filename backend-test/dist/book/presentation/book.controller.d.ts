import { BookService } from '../application/book.service';
import { Book } from '../domain/book.entity';
import { CreateBookDto, UpdateBookDto } from './book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    getAllBooks(): Promise<Book[]>;
    getBookByCode(code: string): Promise<Book>;
    createBook(createBookDto: CreateBookDto): Promise<Book>;
    updateBook(code: string, updateBookDto: UpdateBookDto): Promise<Book>;
    deleteBook(code: string): Promise<void>;
}
