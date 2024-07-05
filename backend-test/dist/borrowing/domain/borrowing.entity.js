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
exports.Borrowing = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const book_entity_1 = require("../../book/domain/book.entity");
const member_entity_1 = require("../../member/domain/member.entity");
let Borrowing = class Borrowing {
};
exports.Borrowing = Borrowing;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'The ID of the borrowing' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Borrowing.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => book_entity_1.Book, description: 'The borrowed book' }),
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book),
    (0, typeorm_1.JoinColumn)({ name: 'bookCode' }),
    __metadata("design:type", book_entity_1.Book)
], Borrowing.prototype, "book", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B001', description: 'The code of the borrowed book' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Borrowing.prototype, "bookCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => member_entity_1.Member, description: 'The member who borrowed the book' }),
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member),
    (0, typeorm_1.JoinColumn)({ name: 'memberCode' }),
    __metadata("design:type", member_entity_1.Member)
], Borrowing.prototype, "member", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'M001', description: 'The code of the member who borrowed the book' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Borrowing.prototype, "memberCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-07-05T00:00:00Z', description: 'The date when the book was borrowed' }),
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Borrowing.prototype, "borrowDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, description: 'The date when the book was returned' }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Borrowing.prototype, "returnDate", void 0);
exports.Borrowing = Borrowing = __decorate([
    (0, typeorm_1.Entity)()
], Borrowing);
//# sourceMappingURL=borrowing.entity.js.map