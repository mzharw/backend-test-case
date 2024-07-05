import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../domain/member.entity';

@Injectable()
export class MemberRepository {
    constructor(
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
    ) {}

    async findAll(): Promise<Member[]> {
        return this.memberRepository.find();
    }

    async findByCode(code: string): Promise<Member | null> {
        return this.memberRepository.findOne({ where: { code } });
    }

    async save(member: Member): Promise<Member> {
        return this.memberRepository.save(member);
    }

    async update(member: Member): Promise<Member> {
        await this.memberRepository.update(member.code, member);
        return member;
    }

    async delete(code: string): Promise<void> {
        await this.memberRepository.delete(code);
    }
}