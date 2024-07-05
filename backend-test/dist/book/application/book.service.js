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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const book_repository_1 = require("../infrastructure/book.repository");
let BookService = class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async getAllBooks() {
        return this.bookRepository.findAll();
    }
    async getBookByCode(code) {
        const book = await this.bookRepository.findByCode(code);
        if (!book) {
            throw new common_1.NotFoundException(`Book with code ${code} not found`);
        }
        return book;
    }
    async createBook(book) {
        return this.bookRepository.save(book);
    }
    async updateBook(code, bookData) {
        const book = await this.getBookByCode(code);
        Object.assign(book, bookData);
        return this.bookRepository.update(book);
    }
    async deleteBook(code) {
        await this.getBookByCode(code);
        await this.bookRepository.delete(code);
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [book_repository_1.BookRepository])
], BookService);
//# sourceMappingURL=book.service.js.map