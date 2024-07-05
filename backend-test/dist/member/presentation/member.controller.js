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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const member_service_1 = require("../application/member.service");
const member_entity_1 = require("../domain/member.entity");
const member_dto_1 = require("./member.dto");
let MemberController = class MemberController {
    constructor(memberService) {
        this.memberService = memberService;
    }
    async getAllMembers() {
        return this.memberService.getAllMembers();
    }
    async getMemberByCode(code) {
        return this.memberService.getMemberByCode(code);
    }
    async createMember(createMemberDto) {
        return this.memberService.createMember(createMemberDto);
    }
    async updateMember(code, updateMemberDto) {
        return this.memberService.updateMember(code, updateMemberDto);
    }
    async deleteMember(code) {
        await this.memberService.deleteMember(code);
    }
    async penalizeMember(code, days) {
        return this.memberService.penalizeMember(code, days);
    }
    async removePenalty(code) {
        return this.memberService.removePenalty(code);
    }
};
exports.MemberController = MemberController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all members' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all members.', type: [member_entity_1.Member] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "getAllMembers", null);
__decorate([
    (0, common_1.Get)(':code'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a member by code' }),
    (0, swagger_1.ApiParam)({ name: 'code', required: true, description: 'Member code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return a member.', type: member_entity_1.Member }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Member not found.' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "getMemberByCode", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new member' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The member has been successfully created.', type: member_entity_1.Member }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.CreateMemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "createMember", null);
__decorate([
    (0, common_1.Put)(':code'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a member' }),
    (0, swagger_1.ApiParam)({ name: 'code', required: true, description: 'Member code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The member has been successfully updated.', type: member_entity_1.Member }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Member not found.' }),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, member_dto_1.UpdateMemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "updateMember", null);
__decorate([
    (0, common_1.Delete)(':code'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a member' }),
    (0, swagger_1.ApiParam)({ name: 'code', required: true, description: 'Member code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The member has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Member not found.' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "deleteMember", null);
__decorate([
    (0, common_1.Put)(':code/penalize'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Body)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "penalizeMember", null);
__decorate([
    (0, common_1.Put)(':code/remove-penalty'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "removePenalty", null);
exports.MemberController = MemberController = __decorate([
    (0, swagger_1.ApiTags)('members'),
    (0, common_1.Controller)('members'),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberController);
//# sourceMappingURL=member.controller.js.map