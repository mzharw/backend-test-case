import { Controller, Get, Post, Put, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BorrowingService } from '../application/borrowing.service';
import { Borrowing } from '../domain/borrowing.entity';
import { BorrowBookDto, ReturnBookDto } from './borrowing.dto';

@ApiTags('borrowings')
@Controller('borrowings')
export class BorrowingController {
    constructor(private readonly borrowingService: BorrowingService) {}

    @Get()
    @ApiOperation({ summary: 'Get all borrowings' })
    @ApiResponse({ status: 200, description: 'Return all borrowings.', type: [Borrowing] })
    async getAllBorrowings(): Promise<Borrowing[]> {
        return this.borrowingService.getAllBorrowings();
    }

    @Get('find/:id')
    @ApiOperation({ summary: 'Get a borrowing by ID' })
    @ApiParam({ name: 'id', required: true, description: 'Borrowing ID' })
    @ApiResponse({ status: 200, description: 'Return a borrowing.', type: Borrowing })
    @ApiResponse({ status: 404, description: 'Borrowing not found.' })
    async getBorrowingById(@Param('id') id: number): Promise<Borrowing> {
        const borrowing = await this.borrowingService.getBorrowingById(id);
        if (!borrowing) {
            throw new NotFoundException('Borrowing not found');
        }
        return borrowing;
    }

    @Post()
    @ApiOperation({ summary: 'Borrow a book' })
    @ApiResponse({ status: 201, description: 'The book has been successfully borrowed.', type: Borrowing })
    async borrowBook(@Body() borrowBookDto: BorrowBookDto): Promise<Borrowing> {
        return this.borrowingService.borrowBook(borrowBookDto.memberCode, borrowBookDto.bookCode);
    }

    @Put('return/:id')
    @ApiOperation({ summary: 'Return a borrowed book' })
    @ApiParam({ name: 'id', required: true, description: 'Borrowing ID' })
    @ApiResponse({ status: 200, description: 'The book has been successfully returned.', type: Borrowing })
    @ApiResponse({ status: 404, description: 'Borrowing not found.' })
    async returnBook(@Param('id') id: number): Promise<Borrowing> {
        const borrowing = await this.borrowingService.returnBook(id);
        if (!borrowing) {
            throw new NotFoundException('Borrowing not found');
        }
        return borrowing;
    }

    @Get('active')
    @ApiOperation({ summary: 'Get all active borrowings' })
    @ApiResponse({ status: 200, description: 'Return all active borrowings.', type: [Borrowing] })
    async getActiveBorrowings(): Promise<Borrowing[]> {
        return this.borrowingService.getActiveBorrowings();
    }

    @Get('member/:memberCode')
    @ApiOperation({ summary: 'Get borrowings by member code' })
    @ApiParam({ name: 'memberCode', required: true, description: 'Member code' })
    @ApiResponse({ status: 200, description: 'Return borrowings by member code.', type: [Borrowing] })
    @ApiResponse({ status: 404, description: 'Borrowings not found for this member.' })
    async getMemberBorrowings(@Param('memberCode') memberCode: string): Promise<Borrowing[]> {
        return this.borrowingService.getMemberBorrowings(memberCode);
    }

    @Get('book/:bookCode')
    @ApiOperation({ summary: 'Get borrowings by book code' })
    @ApiParam({ name: 'bookCode', required: true, description: 'Book code' })
    @ApiResponse({ status: 200, description: 'Return borrowings by book code.', type: [Borrowing] })
    @ApiResponse({ status: 404, description: 'Borrowings not found for this book.' })
    async getBookBorrowings(@Param('bookCode') bookCode: string): Promise<Borrowing[]> {
        return this.borrowingService.getBookBorrowings(bookCode);
    }
}
