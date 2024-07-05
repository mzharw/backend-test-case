import { Borrowing } from '../domain/borrowing.entity';
import { BookService } from '../../book/application/book.service';
import { MemberService } from '../../member/application/member.service';
import { BorrowingRepository } from "../infrastructure/borrowing.repository";
export declare class BorrowingService {
    private borrowingRepository;
    private bookService;
    private memberService;
    constructor(borrowingRepository: BorrowingRepository, bookService: BookService, memberService: MemberService);
    getAllBorrowings(): Promise<Borrowing[]>;
    getBorrowingById(id: number): Promise<Borrowing>;
    borrowBook(memberCode: string, bookCode: string): Promise<Borrowing>;
    returnBook(id: number): Promise<Borrowing>;
    getActiveBorrowings(): Promise<Borrowing[]>;
    getMemberBorrowings(memberCode: string): Promise<Borrowing[]>;
    getBookBorrowings(bookCode: string): Promise<Borrowing[]>;
}
