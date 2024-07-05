import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './domain/member.entity';
import { MemberRepository } from './infrastructure/member.repository';
import { MemberService } from './application/member.service';
import { MemberController } from './presentation/member.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Member])],
    providers: [
        MemberRepository,
        MemberService,
    ],
    controllers: [MemberController],
    exports: [MemberService],
})
export class MemberModule {}