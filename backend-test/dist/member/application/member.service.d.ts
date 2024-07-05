import { Member } from '../domain/member.entity';
import { MemberRepository } from "../infrastructure/member.repository";
export declare class MemberService {
    private memberRepository;
    constructor(memberRepository: MemberRepository);
    getAllMembers(): Promise<Member[]>;
    getMemberByCode(code: string): Promise<Member>;
    createMember(member: Member): Promise<Member>;
    updateMember(code: string, memberData: Partial<Member>): Promise<Member>;
    deleteMember(code: string): Promise<void>;
    penalizeMember(code: string, days?: number): Promise<Member>;
    removePenalty(code: string): Promise<Member>;
}
