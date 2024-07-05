import { Repository } from 'typeorm';
import { Borrowing } from '../domain/borrowing.entity';
export declare class BorrowingRepository {
    private borrowingRepository;
    constructor(borrowingRepository: Repository<Borrowing>);
    findAll(): Promise<Borrowing[]>;
    findById(id: number): Promise<Borrowing | null>;
    findByMemberCode(memberCode: string): Promise<Borrowing[]>;
    findByBookCode(bookCode: string): Promise<Borrowing[]>;
    findActiveBorrowings(): Promise<Borrowing[]>;
    save(borrowing: Borrowing): Promise<Borrowing>;
    update(borrowing: Borrowing): Promise<Borrowing>;
}
