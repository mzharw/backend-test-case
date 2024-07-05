import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {IsNull, Repository} from 'typeorm';
import {Borrowing} from '../domain/borrowing.entity';
import {isNil} from "@nestjs/common/utils/shared.utils";

@Injectable()
export class BorrowingRepository {
    constructor(
        @InjectRepository(Borrowing)
        private borrowingRepository: Repository<Borrowing>,
    ) {
    }

    async findAll(): Promise<Borrowing[]> {
        return this.borrowingRepository.find({relations: ['book', 'member']});
    }

    async findById(id: number): Promise<Borrowing | null> {
        return this.borrowingRepository.findOne({where: {id}, relations: ['book', 'member']});
    }

    async findByMemberCode(memberCode: string): Promise<Borrowing[]> {
        return this.borrowingRepository.find({where: {memberCode}, relations: ['book']});
    }

    async findByBookCode(bookCode: string): Promise<Borrowing[]> {
        return this.borrowingRepository.find({where: {bookCode}, relations: ['member']});
    }

    async findActiveBorrowings(): Promise<Borrowing[]> {
        return this.borrowingRepository.find({where: {returnDate: IsNull()}, relations: ['book', 'member']});
    }

    async save(borrowing: Borrowing): Promise<Borrowing> {
        return this.borrowingRepository.save(borrowing);
    }

    async update(borrowing: Borrowing): Promise<Borrowing> {
        await this.borrowingRepository.update(borrowing.id, borrowing);
        return borrowing;
    }
}