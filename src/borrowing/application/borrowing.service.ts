import {Injectable, NotFoundException, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import {Borrowing} from '../domain/borrowing.entity';
import {BookService} from '../../book/application/book.service';
import {MemberService} from '../../member/application/member.service';
import {BorrowingRepository} from "../infrastructure/borrowing.repository";

@Injectable()
export class BorrowingService {
    constructor(
        private borrowingRepository: BorrowingRepository,
        private bookService: BookService,
        private memberService: MemberService,
    ) {
    }

    async getAllBorrowings(): Promise<Borrowing[]> {
        return this.borrowingRepository.findAll();
    }

    async getBorrowingById(id: number): Promise<Borrowing> {
        const borrowing = await this.borrowingRepository.findById(id);
        if (!borrowing) {
            throw new NotFoundException(`Borrowing with ID ${id} not found`);
        }
        return borrowing;
    }

    async borrowBook(memberCode: string, bookCode: string): Promise<Borrowing> {
        const member = await this.memberService.getMemberByCode(memberCode);
        const book = await this.bookService.getBookByCode(bookCode);

        if (member.isPenalized) {
            throw new BadRequestException('Member is currently penalized and cannot borrow books');
        }

        const activeBorrowings = await this.borrowingRepository.findByMemberCode(memberCode);
        if (activeBorrowings.filter(b => !b.returnDate).length >= 2) {
            throw new BadRequestException('Member has already borrowed the maximum number of books');
        }

        if (book.stock <= 0) {
            throw new BadRequestException('Book is not available for borrowing');
        }

        const borrowing = new Borrowing();
        borrowing.memberCode = memberCode;
        borrowing.bookCode = bookCode;
        borrowing.borrowDate = new Date();

        book.stock--;
        await this.bookService.updateBook(bookCode, {stock: book.stock});

        return this.borrowingRepository.save(borrowing);
    }

    async returnBook(id: number): Promise<Borrowing> {
        const borrowing = await this.getBorrowingById(id);
        if (borrowing.returnDate) {
            throw new BadRequestException('This book has already been returned');
        }

        borrowing.returnDate = new Date();
        const daysBorrowed = Math.ceil((borrowing.returnDate.getTime() - borrowing.borrowDate.getTime()) / (1000 * 3600 * 24));

        if (daysBorrowed > 7) {
            await this.memberService.penalizeMember(borrowing.memberCode, 3);
        }

        const book = await this.bookService.getBookByCode(borrowing.bookCode);
        book.stock++;
        await this.bookService.updateBook(borrowing.bookCode, {stock: book.stock});

        return this.borrowingRepository.update(borrowing);
    }

    async getActiveBorrowings(): Promise<Borrowing[]> {
        return this.borrowingRepository.findActiveBorrowings();
    }

    async getMemberBorrowings(memberCode: string): Promise<Borrowing[]> {
        try {
            await this.memberService.getMemberByCode(memberCode);
            return this.borrowingRepository.findByMemberCode(memberCode);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while fetching member borrowings');
        }
    }

    async getBookBorrowings(bookCode: string): Promise<Borrowing[]> {
        try {
            await this.bookService.getBookByCode(bookCode);
            return this.borrowingRepository.findByBookCode(bookCode);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while fetching book borrowings');
        }
    }
}