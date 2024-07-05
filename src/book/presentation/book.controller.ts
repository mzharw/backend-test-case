import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BookService } from '../application/book.service';
import { Book } from '../domain/book.entity';
import { CreateBookDto, UpdateBookDto } from './book.dto';

@ApiTags('books')
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    @ApiOperation({ summary: 'Get all books' })
    @ApiResponse({ status: 200, description: 'Return all books.', type: [Book] })
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.getAllBooks();
    }

    @Get(':code')
    @ApiOperation({ summary: 'Get a book by code' })
    @ApiParam({ name: 'code', required: true, description: 'Book code' })
    @ApiResponse({ status: 200, description: 'Return a book.', type: Book })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    async getBookByCode(@Param('code') code: string): Promise<Book> {
        const book = await this.bookService.getBookByCode(code);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    @Post()
    @ApiOperation({ summary: 'Create a new book' })
    @ApiResponse({ status: 201, description: 'The book has been successfully created.', type: Book })
    async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.createBook(createBookDto as Book);
    }

    @Put(':code')
    @ApiOperation({ summary: 'Update a book' })
    @ApiParam({ name: 'code', required: true, description: 'Book code' })
    @ApiResponse({ status: 200, description: 'The book has been successfully updated.', type: Book })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    async updateBook(@Param('code') code: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.bookService.updateBook(code, updateBookDto);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    @Delete(':code')
    @ApiOperation({ summary: 'Delete a book' })
    @ApiParam({ name: 'code', required: true, description: 'Book code' })
    @ApiResponse({ status: 200, description: 'The book has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Book not found.' })
    async deleteBook(@Param('code') code: string): Promise<void> {
        await this.bookService.deleteBook(code);
    }
}
