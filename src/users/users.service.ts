import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 創建新使用者，並加密密碼和安全回答
  async create(userData: Partial<User>): Promise<User> {
    try {
      const {
        password,
        securityAnswer1,
        securityAnswer2,
        securityAnswer3,
        ...restUsesData
      } = userData;

      // 加密密碼和安全回答
      const hashedPassword = await this.hashValue(password);
      const hashedAnswer1 = await this.hashValue(securityAnswer1);
      const hashedAnswer2 = await this.hashValue(securityAnswer2);
      const hashedAnswer3 = await this.hashValue(securityAnswer3);

      // 創建新使用者物件
      const newUser = this.usersRepository.create({
        ...restUsesData,
        password: hashedPassword,
        securityAnswer1: hashedAnswer1,
        securityAnswer2: hashedAnswer2,
        securityAnswer3: hashedAnswer3,
      });

      // 儲存新使用者到資料庫
      return this.usersRepository.save(newUser);
    } catch (error) {
      // 捕獲錯誤，並可能拋出異常
      throw new Error('Failed to create user');
    }
  }

  // 查詢所有使用者，選擇必要欄位
  async findAllUsers(): Promise<User[]> {
    try {
      return this.usersRepository.find({
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'phoneNumber',
          'profilePicture',
          'nickname',
          'createdAt',
          'updatedAt',
        ],
      });
    } catch (error) {
      throw new Error('Failed to find users');
    }
  }

  // 根據 ID 查詢單一使用者，並選擇特定欄位
  async findOneUser(id: string): Promise<User> {
    try {
      return this.usersRepository.findOne({
        where: { id },
        relations: ['userIps', 'userDevices'], // 包含IP和裝置關聯
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'phoneNumber',
          'profilePicture',
          'nickname',
          'mailCountry',
          'mailCity',
          'mailDistrict',
          'mailAddress',
          'residentialCountry',
          'residentialCity',
          'residentialDistrict',
          'residentialAddress',
          'createdAt',
          'updatedAt',
          'lastLogin',
        ],
      });
    } catch (error) {
      throw new Error('Failed to find user');
    }
  }

  // 查詢使用者以進行登入，返回包括密碼的使用者資料
  async findUserForLogin(emailOrPhone: string): Promise<User | undefined> {
    try {
      return this.usersRepository.findOne({
        where: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
        select: ['id', 'email', 'phoneNumber', 'password'], // 密碼是登入所需的敏感資料
      });
    } catch (error) {
      throw new Error('Failed to find user for login');
    }
  }

  // 忘記密碼或重設密碼時，根據信箱或電話號碼查詢使用者並返回安全回答
  async findUserForPassword(emailOrPhone: string): Promise<User | undefined> {
    try {
      return this.usersRepository.findOne({
        where: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
        select: ['id', 'securityAnswer1', 'securityAnswer2', 'securityAnswer3'],
      });
    } catch (error) {
      throw new Error('Failed to find user for password reset');
    }
  }

  // 更新密碼，將新密碼加密後更新到資料庫
  async updatePasswords(id: string, newPasswords: string): Promise<void> {
    try {
      const hashedPassword = await this.hashValue(newPasswords);
      await this.usersRepository.update(id, { password: hashedPassword });
    } catch (error) {
      throw new Error('Failed to update password');
    }
  }

  // 更新安全回答，將新答案加密後儲存
  async updateSecurityAnswers(
    id: string,
    newAnswers: { answer1: string; answer2: string; answer3: string },
  ): Promise<void> {
    try {
      const hashedAnswer1 = await this.hashValue(newAnswers.answer1);
      const hashedAnswer2 = await this.hashValue(newAnswers.answer2);
      const hashedAnswer3 = await this.hashValue(newAnswers.answer3);

      await this.usersRepository.update(id, {
        securityAnswer1: hashedAnswer1,
        securityAnswer2: hashedAnswer2,
        securityAnswer3: hashedAnswer3,
      });
    } catch (error) {
      throw new Error('Failed to update security answers');
    }
  }

  // 更新使用者資料，若有新密碼則加密後儲存
  async updateUser(id: string, updateData: Partial<User>): Promise<void> {
    try {
      if (updateData.password) {
        updateData.password = await this.hashValue(updateData.password);
      }
      await this.usersRepository.update(id, updateData);
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  // 軟刪除使用者，標記為已刪除狀態而不刪除實際資料
  async removeUser(id: string): Promise<void> {
    try {
      const user = await this.findOneUser(id);
      await this.usersRepository.softRemove(user);
    } catch (error) {
      throw new Error('Failed to remove user');
    }
  }

  // 查詢包含軟刪除的所有使用者
  async findAllUsersWithDeleted(): Promise<User[]> {
    try {
      return this.usersRepository.find({ withDeleted: true });
    } catch (error) {
      throw new Error('Failed to find users with deleted');
    }
  }

  // 清空所有使用者資料
  async clearAllUsers(): Promise<void> {
    try {
      await this.usersRepository.clear();
    } catch (error) {
      throw new Error('Failed to clear all users');
    }
  }

  // === 身份驗證相關邏輯，準備移到 auth.service.ts ===

  // 驗證使用者登入憑證
  async validateUserCredentials(
    emailOrPhone: string,
    plainPassword: string,
  ): Promise<boolean> {
    const user = await this.findUserForLogin(emailOrPhone);
    if (!user) {
      return false;
    }
    return await bcrypt.compare(plainPassword, user.password);
  }

  // 驗證安全回答
  async validateSecurityAnswers(
    emailOrPhone: string,
    answers: { answer1: string; answer2: string; answer3: string },
  ): Promise<boolean> {
    const user = await this.findUserForPassword(emailOrPhone);
    if (!user) return false;

    const isAnswer1Valid = await bcrypt.compare(
      answers.answer1,
      user.securityAnswer1,
    );
    const isAnswer2Valid = await bcrypt.compare(
      answers.answer2,
      user.securityAnswer2,
    );
    const isAnswer3Valid = await bcrypt.compare(
      answers.answer3,
      user.securityAnswer3,
    );

    return isAnswer1Valid && isAnswer2Valid && isAnswer3Valid;
  }

  // 加密方法，用於所有加密操作
  private async hashValue(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }
}
