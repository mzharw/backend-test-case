import {Injectable, NotFoundException} from '@nestjs/common';
import {Member} from '../domain/member.entity';
import {MemberRepository} from "../infrastructure/member.repository";

@Injectable()
export class MemberService {
    constructor(private memberRepository: MemberRepository) {
    }

    async getAllMembers(): Promise<Member[]> {
        return this.memberRepository.findAll();
    }

    async getMemberByCode(code: string): Promise<Member> {
        const member = await this.memberRepository.findByCode(code);
        if (!member) {
            throw new NotFoundException(`Member with code ${code} not found`);
        }
        return member;
    }

    async createMember(member: Member): Promise<Member> {
        return this.memberRepository.save(member);
    }

    async updateMember(code: string, memberData: Partial<Member>): Promise<Member> {
        const member = await this.getMemberByCode(code);
        Object.assign(member, memberData);
        return this.memberRepository.update(member);
    }

    async deleteMember(code: string): Promise<void> {
        await this.getMemberByCode(code);
        await this.memberRepository.delete(code);
    }

    async penalizeMember(code: string, days: number = 3): Promise<Member> {
        const member = await this.getMemberByCode(code);

        if (member) {
            member.isPenalized = true;
            member.penaltyEndDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
            return await this.memberRepository.update(member);
        } else {
            throw new Error(`Member with code ${code} not found.`);
        }
    }


    async removePenalty(code: string): Promise<Member> {
        const member = await this.getMemberByCode(code);
        member.isPenalized = false;
        member.penaltyEndDate = null;
        return this.memberRepository.update(member);
    }
}