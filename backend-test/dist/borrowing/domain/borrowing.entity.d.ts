import { Book } from '../../book/domain/book.entity';
import { Member } from '../../member/domain/member.entity';
export declare class Borrowing {
    id: number;
    book: Book;
    bookCode: string;
    member: Member;
    memberCode: string;
    borrowDate: Date;
    returnDate: Date | null;
}
