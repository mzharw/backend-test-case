import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
    @ApiProperty({ example: 'B001', description: 'The code of the book' })
    @PrimaryColumn()
    code: string;

    @ApiProperty({ example: 'The Great Gatsby', description: 'The title of the book' })
    @Column()
    title: string;

    @ApiProperty({ example: 'F. Scott Fitzgerald', description: 'The author of the book' })
    @Column()
    author: string;

    @ApiProperty({ example: 10, description: 'The stock of the book' })
    @Column()
    stock: number;
}
