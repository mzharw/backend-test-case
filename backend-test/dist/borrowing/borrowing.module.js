"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const borrowing_entity_1 = require("./domain/borrowing.entity");
const borrowing_repository_1 = require("./infrastructure/borrowing.repository");
const borrowing_service_1 = require("./application/borrowing.service");
const borrowing_controller_1 = require("./presentation/borrowing.controller");
const book_module_1 = require("../book/book.module");
const member_module_1 = require("../member/member.module");
let BorrowingModule = class BorrowingModule {
};
exports.BorrowingModule = BorrowingModule;
exports.BorrowingModule = BorrowingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([borrowing_entity_1.Borrowing]),
            book_module_1.BookModule,
            member_module_1.MemberModule,
        ],
        providers: [
            borrowing_repository_1.BorrowingRepository,
            borrowing_service_1.BorrowingService,
        ],
        controllers: [borrowing_controller_1.BorrowingController],
        exports: [borrowing_service_1.BorrowingService],
    })
], BorrowingModule);
//# sourceMappingURL=borrowing.module.js.map