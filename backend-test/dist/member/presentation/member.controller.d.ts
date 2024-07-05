import { MemberService } from '../application/member.service';
import { Member } from '../domain/member.entity';
import { CreateMemberDto, UpdateMemberDto } from './member.dto';
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    getAllMembers(): Promise<Member[]>;
    getMemberByCode(code: string): Promise<Member>;
    createMember(createMemberDto: CreateMemberDto): Promise<Member>;
    updateMember(code: string, updateMemberDto: UpdateMemberDto): Promise<Member>;
    deleteMember(code: string): Promise<void>;
    penalizeMember(code: string, days: number): Promise<Member>;
    removePenalty(code: string): Promise<Member>;
}
