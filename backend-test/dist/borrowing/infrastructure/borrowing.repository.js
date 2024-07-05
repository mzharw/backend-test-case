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
exports.BorrowingRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const borrowing_entity_1 = require("../domain/borrowing.entity");
let BorrowingRepository = class BorrowingRepository {
    constructor(borrowingRepository) {
        this.borrowingRepository = borrowingRepository;
    }
    async findAll() {
        return this.borrowingRepository.find({ relations: ['book', 'member'] });
    }
    async findById(id) {
        return this.borrowingRepository.findOne({ where: { id }, relations: ['book', 'member'] });
    }
    async findByMemberCode(memberCode) {
        return this.borrowingRepository.find({ where: { memberCode }, relations: ['book'] });
    }
    async findByBookCode(bookCode) {
        return this.borrowingRepository.find({ where: { bookCode }, relations: ['member'] });
    }
    async findActiveBorrowings() {
        return this.borrowingRepository.find({ where: { returnDate: (0, typeorm_2.IsNull)() }, relations: ['book', 'member'] });
    }
    async save(borrowing) {
        return this.borrowingRepository.save(borrowing);
    }
    async update(borrowing) {
        await this.borrowingRepository.update(borrowing.id, borrowing);
        return borrowing;
    }
};
exports.BorrowingRepository = BorrowingRepository;
exports.BorrowingRepository = BorrowingRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(borrowing_entity_1.Borrowing)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BorrowingRepository);
//# sourceMappingURL=borrowing.repository.js.map