import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
    @ApiProperty({ example: 'M001', description: 'The code of the member' })
    code: string;

    @ApiProperty({ example: 'John Doe', description: 'The name of the member' })
    name: string;
}

export class UpdateMemberDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the member' })
    name?: string;
}