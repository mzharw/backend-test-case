"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowingService = void 0;
const common_1 = require("@nestjs/common");
const borrowing_entity_1 = require("../domain/borrowing.entity");
const book_service_1 = require("../../book/application/book.service");
const member_service_1 = require("../../member/application/member.service");
const borrowing_repository_1 = require("../infrastructure/borrowing.repository");
let BorrowingService = class BorrowingService {
    constructor(borrowingRepository, bookService, memberService) {
        this.borrowingRepository = borrowingRepository;
        this.bookService = bookService;
        this.memberService = memberService;
    }
    async getAllBorrowings() {
        return this.borrowingRepository.findAll();
    }
    async getBorrowingById(id) {
        const borrowing = await this.borrowingRepository.findById(id);
        if (!borrowing) {
            throw new common_1.NotFoundException(`Borrowing with ID ${id} not found`);
        }
        return borrowing;
    }
    async borrowBook(memberCode, bookCode) {
        const member = await this.memberService.getMemberByCode(memberCode);
        const book = await this.bookService.getBookByCode(bookCode);
        if (member.isPenalized) {
            throw new common_1.BadRequestException('Member is currently penalized and cannot borrow books');
        }
        const activeBorrowings = await this.borrowingRepository.findByMemberCode(memberCode);
        if (activeBorrowings.filter(b => !b.returnDate).length >= 2) {
            throw new common_1.BadRequestException('Member has already borrowed the maximum number of books');
        }
        if (book.stock <= 0) {
            throw new common_1.BadRequestException('Book is not available for borrowing');
        }
        const borrowing = new borrowing_entity_1.Borrowing();
        borrowing.memberCode = memberCode;
        borrowing.bookCode = bookCode;
        borrowing.borrowDate = new Date();
        book.stock--;
        await this.bookService.updateBook(bookCode, { stock: book.stock });
        return this.borrowingRepository.save(borrowing);
    }
    async returnBook(id) {
        const borrowing = await this.getBorrowingById(id);
        if (borrowing.returnDate) {
            throw new common_1.BadRequestException('This book has already been returned');
        }
        borrowing.returnDate = new Date();
        const daysBorrowed = Math.ceil((borrowing.returnDate.getTime() - borrowing.borrowDate.getTime()) / (1000 * 3600 * 24));
        if (daysBorrowed > 7) {
            await this.memberService.penalizeMember(borrowing.memberCode, 3);
        }
        const book = await this.bookService.getBookByCode(borrowing.bookCode);
        book.stock++;
        await this.bookService.updateBook(borrowing.bookCode, { stock: book.stock });
        return this.borrowingRepository.update(borrowing);
    }
    async getActiveBorrowings() {
        return this.borrowingRepository.findActiveBorrowings();
    }
    async getMemberBorrowings(memberCode) {
        try {
            await this.memberService.getMemberByCode(memberCode);
            return this.borrowingRepository.findByMemberCode(memberCode);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An error occurred while fetching member borrowings');
        }
    }
    async getBookBorrowings(bookCode) {
        try {
            await this.bookService.getBookByCode(bookCode);
            return this.borrowingRepository.findByBookCode(bookCode);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An error occurred while fetching book borrowings');
        }
    }
};
exports.BorrowingService = BorrowingService;
exports.BorrowingService = BorrowingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [borrowing_repository_1.BorrowingRepository,
        book_service_1.BookService,
        member_service_1.MemberService])
], BorrowingService);
//# sourceMappingURL=borrowing.service.js.map