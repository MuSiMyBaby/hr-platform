import { Injectable } from '@nestjs/common'; // 引入 NestJS 的 Injectable 裝飾器，用於依賴注入
import { InjectRepository } from '@nestjs/typeorm'; // 引入 InjectRepository 裝飾器，用於將 Repository 注入 Service
import { Repository } from 'typeorm'; // 引入 TypeORM 的 Repository
import { User } from './entities/users.entity'; // 引入 User 實體
import * as bcrypt from 'bcrypt';

@Injectable() // Injectable 裝飾器讓該類可以被依賴注入
export class UsersService {
  constructor(
    @InjectRepository(User) // InjectRepository 裝飾器將 User Repository 注入，允許操作 User 實體的 CRUD
    private usersRepository: Repository<User>,
  ) {} // Constructor 中省略了 this.usersRepository = @InjectRepository(User)  這類代碼，TypeScript 不需要明確寫出

  // 創建新的使用者
  create(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData); // 使用 create 方法生成一個新的 User 實體
    return this.usersRepository.save(newUser); // 將新實體保存到資料庫
  }

  // 查詢所有使用者
  findAll(): Promise<User[]> {
    return this.usersRepository.find(); // 使用 find 方法獲取所有 User 實體
  }

  // 根據 ID 查詢單一使用者
  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } }); // 使用 findOne 方法根據 ID 獲取指定的 User 實體
  }

  // 更新使用者資料
  async update(id: string, updateData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, updateData); // 使用 update 方法更新 User 資料
    return this.findOne(id); // 更新後返回更新的 User 實體
  }

  // 軟刪除使用者
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id); // 首先找到使用者
    await this.usersRepository.softRemove(user); // 使用 softRemove 進行軟刪除（實際上不會從資料庫刪除，只會標記為刪除狀態）
  }
  // 找到包含被軟刪除的使用者
  async findAllWithDeleted(): Promise<User[]> {
    return this.usersRepository.find({ withDeleted: true }); // 包含軟刪除的資料
  }
  // 刪除所有資料
  async clearAllUsers(): Promise<void> {
    await this.usersRepository.clear();
  }
}
