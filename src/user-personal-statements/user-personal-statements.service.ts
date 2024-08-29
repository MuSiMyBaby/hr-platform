import { Injectable } from '@nestjs/common';
import { CreateUserPersonalStatementInput } from './dto/create-user-personal-statement.input';
import { UpdateUserPersonalStatementInput } from './dto/update-user-personal-statement.input';

@Injectable()
export class UserPersonalStatementsService {
  create(createUserPersonalStatementInput: CreateUserPersonalStatementInput) {
    return 'This action adds a new userPersonalStatement';
  }

  findAll() {
    return `This action returns all userPersonalStatements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPersonalStatement`;
  }

  update(id: number, updateUserPersonalStatementInput: UpdateUserPersonalStatementInput) {
    return `This action updates a #${id} userPersonalStatement`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPersonalStatement`;
  }
}
