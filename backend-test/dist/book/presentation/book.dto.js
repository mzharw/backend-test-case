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
exports.UpdateBookDto = exports.CreateBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateBookDto {
}
exports.CreateBookDto = CreateBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B001', description: 'The code of the book' }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'The Great Gatsby', description: 'The title of the book' }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'F. Scott Fitzgerald', description: 'The author of the book' }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'The stock of the book' }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "stock", void 0);
class UpdateBookDto {
}
exports.UpdateBookDto = UpdateBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'The Great Gatsby', description: 'The title of the book', required: false }),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'F. Scott Fitzgerald', description: 'The author of the book', required: false }),
    __metadata("design:type", String)
], UpdateBookDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'The stock of the book', required: false }),
    __metadata("design:type", Number)
], UpdateBookDto.prototype, "stock", void 0);
//# sourceMappingURL=book.dto.js.map