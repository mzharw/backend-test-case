import {Test, TestingModule} from '@nestjs/testing';
import {MemberService} from './member.service';
import {Member} from '../domain/member.entity';
import {NotFoundException} from '@nestjs/common';
import {BookRepository} from "../../book/infrastructure/book.repository";
import {MemberRepository} from "../infrastructure/member.repository";

const mockMembers = [
    {
        code: "M001",
        name: "Angga",
    },
    {
        code: "M002",
        name: "Ferry",
    },
    {
        code: "M003",
        name: "Putri",
    },
]

describe('MemberService', () => {
    let service: any | MemberService;
    let mockRepository;

    beforeEach(async () => {
        mockRepository = {
            findAll: jest.fn(),
            findByCode: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MemberService,
                {
                    provide: MemberRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<MemberService>(MemberService);
    });

    describe('getAllMembers', () => {
        it('should return an array of members', async () => {
            mockRepository.findAll.mockResolvedValue(mockMembers);
            const result = await service.getAllMembers();
            expect(result).toEqual(mockMembers);
            expect(result.length).toBe(3);
        });
    });

    describe('getMemberByCode', () => {
        it('should return a member if found', async () => {
            const expectedMember = mockMembers[0];
            mockRepository.findByCode.mockResolvedValue(expectedMember);
            const result = await service.getMemberByCode('M001');
            expect(result).toEqual(expectedMember);
        });

        it('should throw NotFoundException if member not found', async () => {
            mockRepository.findByCode.mockResolvedValue(null);
            await expect(service.getMemberByCode('NONEXISTENT')).rejects.toThrow(NotFoundException);
        });
    });

    describe('createMember', () => {
        it('should successfully create a member', async () => {
            const newMember = {
                code: "M004",
                name: "New Member",
            };
            mockRepository.save.mockResolvedValue(newMember);
            const result = await service.createMember(newMember as Member);
            expect(result).toEqual(newMember);
        });
    });

    describe('updateMember', () => {
        it('should successfully update a member', async () => {
            const memberToUpdate = { ...mockMembers[0], name: "Updated Angga" };
            mockRepository.findByCode.mockResolvedValue(mockMembers[0]);
            mockRepository.update.mockResolvedValue(memberToUpdate);
            const result = await service.updateMember('M001', { name: "Updated Angga" });
            expect(result).toEqual(memberToUpdate);
        });

        it('should throw NotFoundException if member not found', async () => {
            mockRepository.findByCode.mockResolvedValue(null);
            await expect(service.updateMember('NONEXISTENT', { name: "New Name" })).rejects.toThrow(NotFoundException);
        });
    });

    describe('deleteMember', () => {
        it('should successfully delete a member', async () => {
            mockRepository.findByCode.mockResolvedValue(mockMembers[0]);
            await service.deleteMember('M001');
            expect(mockRepository.delete).toHaveBeenCalledWith('M001');
        });

        it('should throw NotFoundException if member not found', async () => {
            mockRepository.findByCode.mockResolvedValue(null);
            await expect(service.deleteMember('NONEXISTENT')).rejects.toThrow(NotFoundException);
        });
    });

    describe('penalizeMember', () => {
        it('should successfully penalize a member', async () => {
            const member = new Member();
            member.code = 'CODE';
            mockRepository.findByCode.mockResolvedValue(member);
            mockRepository.update.mockResolvedValue(member);
            const updatedMember = await service.penalizeMember('CODE', 3);
            expect(updatedMember.isPenalized).toBe(true);
            expect(updatedMember.penaltyEndDate).toBeDefined();
        });
    });

    describe('removePenalty', () => {
        it('should successfully remove penalty from a member', async () => {
            const member = new Member();
            member.code = 'CODE';
            member.isPenalized = true;
            member.penaltyEndDate = new Date();
            mockRepository.findByCode.mockResolvedValue(member);
            mockRepository.update.mockResolvedValue(member);
            const updatedMember = await service.removePenalty('CODE');
            expect(updatedMember.isPenalized).toBe(false);
            expect(updatedMember.penaltyEndDate).toBeNull();
        });
    });
});