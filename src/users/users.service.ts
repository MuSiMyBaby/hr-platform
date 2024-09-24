import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { AuthService } from '@auth/auth.service'; // 引入 AuthService

@Injectable() //可注入其他module
export class UsersService {
  constructor(
    @InjectRepository(User) //前面有imports: [TypeOrmModule.forFeature([User])],告訴 NestJS userService需要DI，我們需要實例化/DI/跟typeorm溝通
    private usersRepository: Repository<User>,  //TypeORM提供的類型
    private authService: AuthService, // 注入 AuthService 用於加密等操作
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

      // 將密碼和安全回答加密，通過 AuthService 進行加密操作
      const hashedPassword = await this.authService.hashValue(password);
      const hashedAnswer1 = await this.authService.hashValue(securityAnswer1);
      const hashedAnswer2 = await this.authService.hashValue(securityAnswer2);
      const hashedAnswer3 = await this.authService.hashValue(securityAnswer3);

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
      console.error(Error creating user with email ${userData.email}: ${error.message});
      throw new Error('Failed to create user due to an internal server error');
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
      console.error(Error finding all users: ${error.message});
      throw new Error('Failed to find users');
    }
  }

  // 根據 ID 查詢單一使用者，並選擇特定欄位
  async findOneUser(id: string): Promise<User> {
    try {
      return this.usersRepository.findOneOrFail({
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
      console.error(Error finding user by ID ${id}: ${error.message});
      throw new Error('Failed to find user');
    }
  }

  // 查詢使用者以進行登入，返回包括密碼的使用者資料
  async findUserForLogin(emailOrPhone: string): Promise<User | undefined> {
    try {
      const normalizedEmailOrPhone = emailOrPhone.toLowerCase(); // 處理大小寫
      return this.usersRepository.findOne({
        where: [{ email: normalizedEmailOrPhone }, { phoneNumber: normalizedEmailOrPhone }],
        select: ['id', 'email', 'phoneNumber', 'password'], // 密碼是登入所需的敏感資料
      });
    } catch (error) {
      console.error(Error finding user for login ${emailOrPhone}: ${error.message});
      throw new Error('Failed to find user for login');
    }
  }

  // 忘記密碼或重設密碼時，根據信箱或電話號碼查詢使用者並返回安全回答
  async findUserForPassword(emailOrPhone: string): Promise<User | undefined> {
    try {
      const normalizedEmailOrPhone = emailOrPhone.toLowerCase();
      return this.usersRepository.findOne({
        where: [{ email: normalizedEmailOrPhone }, { phoneNumber: normalizedEmailOrPhone }],
        select: ['id', 'securityAnswer1', 'securityAnswer2', 'securityAnswer3'],
      });
    } catch (error) {
      console.error(Error finding user for password reset ${emailOrPhone}: ${error.message});
      throw new Error('Failed to find user for password reset');
    }
  }

  // 更新密碼，將新密碼加密後更新到資料庫
  async updatePasswords(id: string, newPassword: string): Promise<void> {
    try {
      const hashedPassword = await this.authService.hashValue(newPassword);
      await this.usersRepository.update(id, { password: hashedPassword });
    } catch (error) {
      console.error(Error updating password for user ${id}: ${error.message});
      throw new Error('Failed to update password');
    }
  }

  // 更新使用者資料，若有新密碼則加密後儲存
  async updateUser(id: string, updateData: Partial<User>): Promise<void> {
    try {
      if (updateData.password) {
        updateData.password = await this.authService.hashValue(updateData.password);
      }
      await this.usersRepository.update(id, updateData);
    } catch (error) {
      console.error(Error updating user ${id}: ${error.message});
      throw new Error('Failed to update user');
    }
  }

  // 軟刪除使用者，標記為已刪除狀態而不刪除實際資料
  async removeUser(id: string): Promise<void> {
    try {
      const user = await this.findOneUser(id);
      await this.usersRepository.softRemove(user);
    } catch (error) {
      console.error(Error soft removing user ${id}: ${error.message});
      throw new Error('Failed to remove user');
    }
  }

  // 查詢包含軟刪除的所有使用者
  async findAllUsersWithDeleted(): Promise<User[]> {
    try {
      return this.usersRepository.find({ withDeleted: true });
    } catch (error) {
      console.error(Error finding all users including deleted: ${error.message});
      throw new Error('Failed to find users with deleted');
    }
  }

  // 清空所有使用者資料
  async clearAllUsers(): Promise<void> {
    try {
      await this.usersRepository.clear();
    } catch (error) {
      console.error(Error clearing all users: ${error.message});
      throw new Error('Failed to clear all users');
    }
  }
}