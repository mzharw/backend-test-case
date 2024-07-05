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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const borrowing_service_1 = require("../application/borrowing.service");
const borrowing_entity_1 = require("../domain/borrowing.entity");
const borrowing_dto_1 = require("./borrowing.dto");
let BorrowingController = class BorrowingController {
    constructor(borrowingService) {
        this.borrowingService = borrowingService;
    }
    async getAllBorrowings() {
        return this.borrowingService.getAllBorrowings();
    }
    async getBorrowingById(id) {
        const borrowing = await this.borrowingService.getBorrowingById(id);
        if (!borrowing) {
            throw new common_1.NotFoundException('Borrowing not found');
        }
        return borrowing;
    }
    async borrowBook(borrowBookDto) {
        return this.borrowingService.borrowBook(borrowBookDto.memberCode, borrowBookDto.bookCode);
    }
    async returnBook(id) {
        const borrowing = await this.borrowingService.returnBook(id);
        if (!borrowing) {
            throw new common_1.NotFoundException('Borrowing not found');
        }
        return borrowing;
    }
    async getActiveBorrowings() {
        return this.borrowingService.getActiveBorrowings();
    }
    async getMemberBorrowings(memberCode) {
        return this.borrowingService.getMemberBorrowings(memberCode);
    }
    async getBookBorrowings(bookCode) {
        return this.borrowingService.getBookBorrowings(bookCode);
    }
};
exports.BorrowingController = BorrowingController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all borrowings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all borrowings.', type: [borrowing_entity_1.Borrowing] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BorrowingController.prototype, "getAllBorrowings", null);
__decorate([
    (0, common_1.Get)('find/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a borrowing by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Borrowing ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a borrowing.', type: borrowing_entity_1.Borrowing }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Borrowing not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BorrowingController.prototype, "getBorrowingById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Borrow a book' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The book has been successfully borrowed.', type: borrowing_entity_1.Borrowing }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [borrowing_dto_1.BorrowBookDto]),
    __metadata("design:returntype", Promise)
], BorrowingController.prototype, "borrowBook", null);
__decorate([
    (0, common_1.Put)('return/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Return a borrowed book' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Borrowing ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The book has been successfully returned.', type: borrowing_entity_1.Borrowing }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Borrowing not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BorrowingController.prototype, "returnBook", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active borrowings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all active borrowings.', type: [borrowing_entity_1.Borrowing] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BorrowingController.prototype, "getActiveBorrowings", null);
__decorate([
    (0, common_1.Get)('member/:memberCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Get borrowings by member code' }),
    (0, swagger_1.ApiParam)({ name: 'memberCode', required: true, description: 'Member code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return borrowings by member code.', type: [borrowing_entity_1.Borrowing] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Borrowings not found for this member.' }),
    __param(0, (0, common_1.Param)('memberCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowingController.prototype, "getMemberBorrowings", null);
__decorate([
    (0, common_1.Get)('book/:bookCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Get borrowings by book code' }),
    (0, swagger_1.ApiParam)({ name: 'bookCode', required: true, description: 'Book code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return borrowings by book code.', type: [borrowing_entity_1.Borrowing] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Borrowings not found for this book.' }),
    __param(0, (0, common_1.Param)('bookCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowingController.prototype, "getBookBorrowings", null);
exports.BorrowingController = BorrowingController = __decorate([
    (0, swagger_1.ApiTags)('borrowings'),
    (0, common_1.Controller)('borrowings'),
    __metadata("design:paramtypes", [borrowing_service_1.BorrowingService])
], BorrowingController);
//# sourceMappingURL=borrowing.controller.js.map