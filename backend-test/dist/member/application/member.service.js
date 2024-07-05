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
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const member_repository_1 = require("../infrastructure/member.repository");
let MemberService = class MemberService {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async getAllMembers() {
        return this.memberRepository.findAll();
    }
    async getMemberByCode(code) {
        const member = await this.memberRepository.findByCode(code);
        if (!member) {
            throw new common_1.NotFoundException(`Member with code ${code} not found`);
        }
        return member;
    }
    async createMember(member) {
        return this.memberRepository.save(member);
    }
    async updateMember(code, memberData) {
        const member = await this.getMemberByCode(code);
        Object.assign(member, memberData);
        return this.memberRepository.update(member);
    }
    async deleteMember(code) {
        await this.getMemberByCode(code);
        await this.memberRepository.delete(code);
    }
    async penalizeMember(code, days = 3) {
        const member = await this.getMemberByCode(code);
        if (member) {
            member.isPenalized = true;
            member.penaltyEndDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
            return await this.memberRepository.update(member);
        }
        else {
            throw new Error(`Member with code ${code} not found.`);
        }
    }
    async removePenalty(code) {
        const member = await this.getMemberByCode(code);
        member.isPenalized = false;
        member.penaltyEndDate = null;
        return this.memberRepository.update(member);
    }
};
exports.MemberService = MemberService;
exports.MemberService = MemberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [member_repository_1.MemberRepository])
], MemberService);
//# sourceMappingURL=member.service.js.map