import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookRepository } from '../infrastructure/book.repository';
import { Book } from '../domain/book.entity';
import { NotFoundException } from '@nestjs/common';

const mockBooks: Book[] = [
    {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1
    },
    {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1
    },
    {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1
    },
    {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1
    },
    {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1
    },
];

describe('BookService', () => {
    let service: any | BookService;
    let mockRepository: Partial<BookRepository>;

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
                BookService,
                {
                    provide: BookRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<BookService>(BookService);
    });

    describe('getAllBooks', () => {
        it('should return an array of books', async () => {
            (mockRepository.findAll as jest.Mock).mockResolvedValue(mockBooks);
            const result = await service.getAllBooks();
            expect(result).toEqual(mockBooks);
            expect(result.length).toBe(5);
        });
    });

    describe('getBookByCode', () => {
        it('should return a book if found', async () => {
            const expectedBook = mockBooks[0];
            (mockRepository.findByCode as jest.Mock).mockResolvedValue(expectedBook);
            const result = await service.getBookByCode('JK-45');
            expect(result).toEqual(expectedBook);
        });

        it('should throw NotFoundException if book not found', async () => {
            (mockRepository.findByCode as jest.Mock).mockResolvedValue(null);
            await expect(service.getBookByCode('NONEXISTENT')).rejects.toThrow(NotFoundException);
        });
    });

    describe('createBook', () => {
        it('should successfully create a book', async () => {
            const newBook: Book = {
                code: "NEW-1",
                title: "New Book",
                author: "New Author",
                stock: 1
            };
            (mockRepository.save as jest.Mock).mockResolvedValue(newBook);
            const result = await service.createBook(newBook);
            expect(result).toEqual(newBook);
        });
    });

    describe('updateBook', () => {
        it('should successfully update a book', async () => {
            const bookToUpdate = { ...mockBooks[0], title: "Updated Harry Potter" };
            (mockRepository.findByCode as jest.Mock).mockResolvedValue(mockBooks[0]);
            (mockRepository.update as jest.Mock).mockResolvedValue(bookToUpdate);
            const result = await service.updateBook('JK-45', { title: "Updated Harry Potter" });
            expect(result).toEqual(bookToUpdate);
        });

        it('should throw NotFoundException if book not found', async () => {
            (mockRepository.findByCode as jest.Mock).mockResolvedValue(null);
            await expect(service.updateBook('NONEXISTENT', { title: "New Title" })).rejects.toThrow(NotFoundException);
        });
    });

    describe('deleteBook', () => {
        it('should successfully delete a book', async () => {
            (mockRepository.findByCode as jest.Mock).mockResolvedValue(mockBooks[0]);
            await service.deleteBook('JK-45');
            expect(mockRepository.delete).toHaveBeenCalledWith('JK-45');
        });

        it('should throw NotFoundException if book not found', async () => {
            (mockRepository.findByCode as jest.Mock).mockResolvedValue(null);
            await expect(service.deleteBook('NONEXISTENT')).rejects.toThrow(NotFoundException);
        });
    });
});