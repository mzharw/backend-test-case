import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Member {
    @ApiProperty({ example: 'M001', description: 'The code of the member' })
    @PrimaryColumn()
    code: string;

    @ApiProperty({ example: 'John Doe', description: 'The name of the member' })
    @Column()
    name: string;

    @ApiProperty({ example: false, description: 'Whether the member is penalized' })
    @Column({ default: false })
    isPenalized: boolean;

    @ApiProperty({ example: null, description: 'The end date of the penalty' })
    @Column({ type: 'timestamp', nullable: true })
    penaltyEndDate: Date | null;
}