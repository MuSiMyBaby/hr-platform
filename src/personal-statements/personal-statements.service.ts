import { Injectable } from '@nestjs/common';
import { CreatePersonalStatementInput } from './dto/create-personal-statement.input';
import { UpdatePersonalStatementInput } from './dto/update-personal-statement.input';

@Injectable()
export class PersonalStatementsService {
  create(createPersonalStatementInput: CreatePersonalStatementInput) {
    return 'This action adds a new personalStatement';
  }

  findAll() {
    return `This action returns all personalStatements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalStatement`;
  }

  update(id: number, updatePersonalStatementInput: UpdatePersonalStatementInput) {
    return `This action updates a #${id} personalStatement`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalStatement`;
  }
}
