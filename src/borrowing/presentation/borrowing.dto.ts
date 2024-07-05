import { ApiProperty } from '@nestjs/swagger';

export class BorrowBookDto {
    @ApiProperty({ example: 'M001', description: 'The code of the member' })
    memberCode: string;

    @ApiProperty({ example: 'B001', description: 'The code of the book' })
    bookCode: string;
}

export class ReturnBookDto {
    @ApiProperty({ example: 1, description: 'The ID of the borrowing' })
    id: number;
}
