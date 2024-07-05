import { BorrowingService } from '../application/borrowing.service';
import { Borrowing } from '../domain/borrowing.entity';
import { BorrowBookDto } from './borrowing.dto';
export declare class BorrowingController {
    private readonly borrowingService;
    constructor(borrowingService: BorrowingService);
    getAllBorrowings(): Promise<Borrowing[]>;
    getBorrowingById(id: number): Promise<Borrowing>;
    borrowBook(borrowBookDto: BorrowBookDto): Promise<Borrowing>;
    returnBook(id: number): Promise<Borrowing>;
    getActiveBorrowings(): Promise<Borrowing[]>;
    getMemberBorrowings(memberCode: string): Promise<Borrowing[]>;
    getBookBorrowings(bookCode: string): Promise<Borrowing[]>;
}
