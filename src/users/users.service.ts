import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable() //它可以作為 DI 使用，也就是引入其他類裡面。
export class UsersService {
  constructor(
    @InjectRepository(User) //把 @InjectRepository(User) 裝飾器+DI 可以操作USERs CRUD
    private usersRepository: Repository<User>,
  ) {} // 省略了  this.usersRepository = @InjectRepository(User) // TS不需要寫這句

  create(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
