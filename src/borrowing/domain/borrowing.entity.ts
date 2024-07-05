import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../book/domain/book.entity';
import { Member } from '../../member/domain/member.entity';

@Entity()
export class Borrowing {
    @ApiProperty({ example: 1, description: 'The ID of the borrowing' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: () => Book, description: 'The borrowed book' })
    @ManyToOne(() => Book)
    @JoinColumn({ name: 'bookCode' })
    book: Book;

    @ApiProperty({ example: 'B001', description: 'The code of the borrowed book' })
    @Column()
    bookCode: string;

    @ApiProperty({ type: () => Member, description: 'The member who borrowed the book' })
    @ManyToOne(() => Member)
    @JoinColumn({ name: 'memberCode' })
    member: Member;

    @ApiProperty({ example: 'M001', description: 'The code of the member who borrowed the book' })
    @Column()
    memberCode: string;

    @ApiProperty({ example: '2023-07-05T00:00:00Z', description: 'The date when the book was borrowed' })
    @Column({ type: 'timestamp' })
    borrowDate: Date;

    @ApiProperty({ example: null, description: 'The date when the book was returned' })
    @Column({ type: 'timestamp', nullable: true })
    returnDate: Date | null;
}
