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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const book_service_1 = require("../application/book.service");
const book_entity_1 = require("../domain/book.entity");
const book_dto_1 = require("./book.dto");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async getAllBooks() {
        return this.bookService.getAllBooks();
    }
    async getBookByCode(code) {
        const book = await this.bookService.getBookByCode(code);
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        return book;
    }
    async createBook(createBookDto) {
        return this.bookService.createBook(createBookDto);
    }
    async updateBook(code, updateBookDto) {
        const book = await this.bookService.updateBook(code, updateBookDto);
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        return book;
    }
    async deleteBook(code) {
        await this.bookService.deleteBook(code);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all books' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all books.', type: [book_entity_1.Book] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)(':code'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a book by code' }),
    (0, swagger_1.ApiParam)({ name: 'code', required: true, description: 'Book code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a book.', type: book_entity_1.Book }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Book not found.' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBookByCode", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new book' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The book has been successfully created.', type: book_entity_1.Book }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "createBook", null);
__decorate([
    (0, common_1.Put)(':code'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a book' }),
    (0, swagger_1.ApiParam)({ name: 'code', required: true, description: 'Book code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The book has been successfully updated.', type: book_entity_1.Book }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Book not found.' }),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)(':code'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a book' }),
    (0, swagger_1.ApiParam)({ name: 'code', required: true, description: 'Book code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The book has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Book not found.' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
exports.BookController = BookController = __decorate([
    (0, swagger_1.ApiTags)('books'),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map