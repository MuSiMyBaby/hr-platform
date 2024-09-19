import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service'; // 用來驗證使用者資料CRUD
import { User } from '@users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // 取得使用者資料
    private jwtService: JwtService, // 生成和驗證 JWT
  ) {}
}

// 驗證使用者是否存在，並且密碼是否正確
async function validatorUser(
  emailOrPhone: string,
  password: string,
): Promise<void> {
  const user = await this.usersService.findOne();
}
