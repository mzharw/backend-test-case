import {Test, TestingModule} from '@nestjs/testing';
import {BorrowingService} from './borrowing.service';
import {Borrowing} from '../domain/borrowing.entity';
import {BookService} from '../../book/application/book.service';
import {MemberService} from '../../member/application/member.service';
import {NotFoundException, BadRequestException} from '@nestjs/common';
import {BorrowingRepository} from "../infrastructure/borrowing.repository";

const mockBooks = [
    {code: "JK-45", title: "Harry Potter", author: "J.K Rowling", stock: 1},
    {code: "SHR-1", title: "A Study in Scarlet", author: "Arthur Conan Doyle", stock: 1},
    {code: "TW-11", title: "Twilight", author: "Stephenie Meyer", stock: 1},
    {code: "HOB-83", title: "The Hobbit", author: "J.R.R. Tolkien", stock: 1},
    {code: "NRN-7", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", stock: 1},
];

const mockMembers = [
    {code: "M001", name: "Angga"},
    {code: "M002", name: "Ferry"},
    {code: "M003", name: "Putri"},
];

describe('BorrowingService', () => {
    let service: any | BorrowingService;
    let mockRepository;
    let mockBookService;
    let mockMemberService;

    beforeEach(async () => {
        mockRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            findByMemberCode: jest.fn(),
            findByBookCode: jest.fn(),
            findActiveBorrowings: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
        };

        mockBookService = {
            getBookByCode: jest.fn(),
            updateBook: jest.fn(),
        };

        mockMemberService = {
            getMemberByCode: jest.fn(),
            penalizeMember: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BorrowingService,
                {
                    provide: BorrowingRepository,
                    useValue: mockRepository,
                },
                {
                    provide: BookService,
                    useValue: mockBookService,
                },
                {
                    provide: MemberService,
                    useValue: mockMemberService,
                },
            ],
        }).compile();

        service = module.get<BorrowingService>(BorrowingService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllBorrowings', () => {
        it('should return an array of borrowings', async () => {
            const result = [new Borrowing()];
            mockRepository.findAll.mockResolvedValue(result);
            expect(await service.getAllBorrowings()).toBe(result);
        });
    });

    describe('getBorrowingById', () => {
        it('should return a borrowing if found', async () => {
            const result = new Borrowing();
            mockRepository.findById.mockResolvedValue(result);
            expect(await service.getBorrowingById(1)).toBe(result);
        });

        it('should throw NotFoundException if borrowing not found', async () => {
            mockRepository.findById.mockResolvedValue(null);
            await expect(service.getBorrowingById(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('borrowBook', () => {
        it('should successfully borrow a book', async () => {
            const member = {...mockMembers[0], isPenalized: false};
            const book = {...mockBooks[0]};
            const borrowing = new Borrowing();

            mockMemberService.getMemberByCode.mockResolvedValue(member);
            mockBookService.getBookByCode.mockResolvedValue(book);
            mockRepository.findByMemberCode.mockResolvedValue([]);
            mockRepository.save.mockResolvedValue(borrowing);

            expect(await service.borrowBook('M001', 'JK-45')).toBe(borrowing);
            expect(mockBookService.updateBook).toHaveBeenCalledWith('JK-45', {stock: 0});
        });

        it('should throw BadRequestException if member is penalized', async () => {
            const member = {...mockMembers[0], isPenalized: true};
            mockMemberService.getMemberByCode.mockResolvedValue(member);

            await expect(service.borrowBook('M001', 'JK-45')).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException if member has already borrowed 2 books', async () => {
            const member = {...mockMembers[0], isPenalized: false};
            mockMemberService.getMemberByCode.mockResolvedValue(member);
            mockRepository.findByMemberCode.mockResolvedValue([{}, {}]);

            await expect(service.borrowBook('M001', 'JK-45')).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException if book is not available', async () => {
            const member = {...mockMembers[0], isPenalized: false};
            const book = {...mockBooks[0], stock: 0};

            mockMemberService.getMemberByCode.mockResolvedValue(member);
            mockBookService.getBookByCode.mockResolvedValue(book);
            mockRepository.findByMemberCode.mockResolvedValue([]);

            await expect(service.borrowBook('M001', 'JK-45')).rejects.toThrow(BadRequestException);
        });
    });

    describe('returnBook', () => {
        it('should successfully return a book', async () => {
            const borrowing = new Borrowing();
            borrowing.id = 1;
            borrowing.bookCode = 'JK-45';
            borrowing.memberCode = 'M001';
            borrowing.borrowDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000); // 5 days ago

            const book = {...mockBooks[0], stock: 0};

            mockRepository.findById.mockResolvedValue(borrowing);
            mockBookService.getBookByCode.mockResolvedValue(book);
            mockRepository.update.mockResolvedValue(borrowing);

            const result = await service.returnBook(1);

            expect(result.returnDate).toBeDefined();
            expect(mockBookService.updateBook).toHaveBeenCalledWith('JK-45', {stock: 1});
        });

        it('should penalize member if book is returned late', async () => {
            const borrowing = new Borrowing();
            borrowing.id = 1;
            borrowing.bookCode = 'JK-45';
            borrowing.memberCode = 'M001';
            borrowing.borrowDate = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000); // 8 days ago

            const book = {...mockBooks[0], stock: 0};

            mockRepository.findById.mockResolvedValue(borrowing);
            mockBookService.getBookByCode.mockResolvedValue(book);
            mockRepository.update.mockResolvedValue(borrowing);

            await service.returnBook(1);

            expect(mockMemberService.penalizeMember).toHaveBeenCalledWith('M001', 3);
        });

        it('should throw BadRequestException if book has already been returned', async () => {
            const borrowing = new Borrowing();
            borrowing.id = 1;
            borrowing.returnDate = new Date();

            mockRepository.findById.mockResolvedValue(borrowing);

            await expect(service.returnBook(1)).rejects.toThrow(BadRequestException);
        });
    });

    describe('getActiveBorrowings', () => {
        it('should return all active borrowings', async () => {
            const activeBorrowings = [
                {id: 1, bookCode: 'JK-45', memberCode: 'M001', borrowDate: new Date(), returnDate: null},
                {id: 2, bookCode: 'SHR-1', memberCode: 'M002', borrowDate: new Date(), returnDate: null},
            ];

            mockRepository.findActiveBorrowings.mockResolvedValue(activeBorrowings);

            const result = await service.getActiveBorrowings();

            expect(result).toEqual(activeBorrowings);
            expect(result.length).toBe(2);
            expect(mockRepository.findActiveBorrowings).toHaveBeenCalled();
        });

        it('should return an empty array if there are no active borrowings', async () => {
            mockRepository.findActiveBorrowings.mockResolvedValue([]);

            const result = await service.getActiveBorrowings();

            expect(result).toEqual([]);
            expect(result.length).toBe(0);
            expect(mockRepository.findActiveBorrowings).toHaveBeenCalled();
        });
    });

    describe('getMemberBorrowings', () => {
        it('should return all borrowings for a specific member', async () => {
            const memberCode = 'M001';
            const memberBorrowings = [
                {id: 1, bookCode: 'JK-45', memberCode: 'M001', borrowDate: new Date(), returnDate: null},
                {id: 3, bookCode: 'HOB-83', memberCode: 'M001', borrowDate: new Date(), returnDate: new Date()},
            ];

            mockRepository.findByMemberCode.mockResolvedValue(memberBorrowings);

            const result = await service.getMemberBorrowings(memberCode);

            expect(result).toEqual(memberBorrowings);
            expect(result.length).toBe(2);
            expect(mockRepository.findByMemberCode).toHaveBeenCalledWith(memberCode);
        });

        it('should return an empty array if the member has no borrowings', async () => {
            const memberCode = 'M003';
            mockRepository.findByMemberCode.mockResolvedValue([]);

            const result = await service.getMemberBorrowings(memberCode);

            expect(result).toEqual([]);
            expect(result.length).toBe(0);
            expect(mockRepository.findByMemberCode).toHaveBeenCalledWith(memberCode);
        });

        it('should throw NotFoundException if member does not exist', async () => {
            const memberCode = 'NONEXISTENT';
            mockMemberService.getMemberByCode.mockRejectedValue(new NotFoundException('Member not found'));

            await expect(service.getMemberBorrowings(memberCode)).rejects.toThrow(NotFoundException);
            expect(mockMemberService.getMemberByCode).toHaveBeenCalledWith(memberCode);
        });
    });

    describe('getBookBorrowings', () => {
        it('should return all borrowings for a specific book', async () => {
            const bookCode = 'JK-45';
            const bookBorrowings = [
                {id: 1, bookCode: 'JK-45', memberCode: 'M001', borrowDate: new Date(), returnDate: null},
                {id: 4, bookCode: 'JK-45', memberCode: 'M002', borrowDate: new Date(), returnDate: new Date()},
            ];

            mockRepository.findByBookCode.mockResolvedValue(bookBorrowings);

            const result = await service.getBookBorrowings(bookCode);

            expect(result).toEqual(bookBorrowings);
            expect(result.length).toBe(2);
            expect(mockRepository.findByBookCode).toHaveBeenCalledWith(bookCode);
        });

        it('should return an empty array if the book has no borrowings', async () => {
            const bookCode = 'NRN-7';
            mockRepository.findByBookCode.mockResolvedValue([]);

            const result = await service.getBookBorrowings(bookCode);

            expect(result).toEqual([]);
            expect(result.length).toBe(0);
            expect(mockRepository.findByBookCode).toHaveBeenCalledWith(bookCode);
        });

        it('should throw NotFoundException if book does not exist', async () => {
            const bookCode = 'NONEXISTENT';
            mockBookService.getBookByCode.mockRejectedValue(new NotFoundException('Book not found'));

            await expect(service.getBookBorrowings(bookCode)).rejects.toThrow(NotFoundException);
            expect(mockBookService.getBookByCode).toHaveBeenCalledWith(bookCode);
        });
    });
});