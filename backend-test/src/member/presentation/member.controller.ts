import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { MemberService } from '../application/member.service';
import { Member } from '../domain/member.entity';
import { CreateMemberDto, UpdateMemberDto } from './member.dto';

@ApiTags('members')
@Controller('members')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Get()
    @ApiOperation({ summary: 'Get all members' })
    @ApiResponse({ status: 200, description: 'Return all members.', type: [Member] })
    async getAllMembers(): Promise<Member[]> {
        return this.memberService.getAllMembers();
    }

    @Get(':code')
    @ApiOperation({ summary: 'Get a member by code' })
    @ApiParam({ name: 'code', required: true, description: 'Member code' })
    @ApiResponse({ status: 200, description: 'Return a member.', type: Member })
    @ApiResponse({ status: 404, description: 'Member not found.' })
    async getMemberByCode(@Param('code') code: string): Promise<Member> {
        return this.memberService.getMemberByCode(code);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new member' })
    @ApiResponse({ status: 201, description: 'The member has been successfully created.', type: Member })
    async createMember(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
        return this.memberService.createMember(createMemberDto as Member);
    }

    @Put(':code')
    @ApiOperation({ summary: 'Update a member' })
    @ApiParam({ name: 'code', required: true, description: 'Member code' })
    @ApiResponse({ status: 200, description: 'The member has been successfully updated.', type: Member })
    @ApiResponse({ status: 404, description: 'Member not found.' })
    async updateMember(@Param('code') code: string, @Body() updateMemberDto: UpdateMemberDto): Promise<Member> {
        return this.memberService.updateMember(code, updateMemberDto);
    }

    @Delete(':code')
    @ApiOperation({ summary: 'Delete a member' })
    @ApiParam({ name: 'code', required: true, description: 'Member code' })
    @ApiResponse({ status: 200, description: 'The member has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Member not found.' })
    async deleteMember(@Param('code') code: string): Promise<void> {
        await this.memberService.deleteMember(code);
    }

    @Put(':code/penalize')
    async penalizeMember(@Param('code') code: string, @Body('days') days: number): Promise<Member> {
        return this.memberService.penalizeMember(code, days);
    }

    @Put(':code/remove-penalty')
    async removePenalty(@Param('code') code: string): Promise<Member> {
        return this.memberService.removePenalty(code);
    }
}