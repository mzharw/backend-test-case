import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
    @ApiProperty({ example: 'B001', description: 'The code of the book' })
    code: string;

    @ApiProperty({ example: 'The Great Gatsby', description: 'The title of the book' })
    title: string;

    @ApiProperty({ example: 'F. Scott Fitzgerald', description: 'The author of the book' })
    author: string;

    @ApiProperty({ example: 10, description: 'The stock of the book' })
    stock: number;
}

export class UpdateBookDto {
    @ApiProperty({ example: 'The Great Gatsby', description: 'The title of the book', required: false })
    title?: string;

    @ApiProperty({ example: 'F. Scott Fitzgerald', description: 'The author of the book', required: false })
    author?: string;

    @ApiProperty({ example: 10, description: 'The stock of the book', required: false })
    stock?: number;
}
