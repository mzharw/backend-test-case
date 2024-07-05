import { Repository } from 'typeorm';
import { Member } from '../domain/member.entity';
export declare class MemberRepository {
    private memberRepository;
    constructor(memberRepository: Repository<Member>);
    findAll(): Promise<Member[]>;
    findByCode(code: string): Promise<Member | null>;
    save(member: Member): Promise<Member>;
    update(member: Member): Promise<Member>;
    delete(code: string): Promise<void>;
}
