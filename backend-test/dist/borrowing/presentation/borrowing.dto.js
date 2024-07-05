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
exports.ReturnBookDto = exports.BorrowBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BorrowBookDto {
}
exports.BorrowBookDto = BorrowBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'M001', description: 'The code of the member' }),
    __metadata("design:type", String)
], BorrowBookDto.prototype, "memberCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B001', description: 'The code of the book' }),
    __metadata("design:type", String)
], BorrowBookDto.prototype, "bookCode", void 0);
class ReturnBookDto {
}
exports.ReturnBookDto = ReturnBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'The ID of the borrowing' }),
    __metadata("design:type", Number)
], ReturnBookDto.prototype, "id", void 0);
//# sourceMappingURL=borrowing.dto.js.map