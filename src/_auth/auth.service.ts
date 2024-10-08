import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); // Initialize logger

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // 驗證使用者登入憑證
  async validateUserCredentials(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    this.logger.log('Validating user credentials');
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // 驗證安全回答
  async validateSecurityAnswers(
    answers: { answer1: string; answer2: string; answer3: string },
    storedAnswers: { answer1: string; answer2: string; answer3: string },
  ): Promise<boolean> {
    this.logger.log('Validating security answers');
    const isAnswer1Valid = await bcrypt.compare(
      answers.answer1,
      storedAnswers.answer1,
    );
    const isAnswer2Valid = await bcrypt.compare(
      answers.answer2,
      storedAnswers.answer2,
    );
    const isAnswer3Valid = await bcrypt.compare(
      answers.answer3,
      storedAnswers.answer3,
    );

    return isAnswer1Valid && isAnswer2Valid && isAnswer3Valid;
  }

  // 加密方法，用於所有加密操作
  async hashValue(value: string): Promise<string> {
    this.logger.log('Hashing value');
    return await bcrypt.hash(value, 10);
  }

  // 產生 JWT Token 給使用者
  generateJwtToken(payload: { userId: string; email: string }): string {
    this.logger.log('Generating JWT token');
    return this.jwtService.sign(payload); // 生成 JWT Token
  }

  // 驗證 JWT Token 是否有效
  verifyJwtToken(token: string): any {
    try {
      this.logger.log('Verifying JWT token');
      return this.jwtService.verify(token);
    } catch (error) {
      this.logger.error(`Invalid token: ${error.message}`);
      throw new Error('Token Verification failed');
    }
  }

  // 登入邏輯，透過 findUserByEmailOrPhone 成功登入返回 JWT token
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    this.logger.log(`User login attempt with email: ${email}`);

    const user = await this.usersService.findUserByEmailOrPhone(email);
    if (!user) {
      this.logger.warn(`Login failed: User not found for email: ${email}`);
      throw new Error('User not found');
    }

    // 檢查是否帳號已經被鎖定
    if (user.accountLocked) {
      this.logger.warn(`Login failed: Account locked for email: ${email}`);
      throw new Error(
        'Account is locked due to too many failed login attempts',
      );
    }

    const isPasswordValid = await this.validateUserCredentials(
      password,
      user.password,
    );

    //檢查失敗次數 並檢查是否該鎖定帳號
    if (!isPasswordValid) {
      this.logger.warn(`Invalid credentials for email: ${email}`);
      await this.usersService.incrementFailedLoginAttempts(user.id);
      throw new Error('Invalid credentials');
    }

    //重置失敗次數
    await this.usersService.unlockAccount(user.id);

    //更新最後一次登入時間
    user.lastLogin = new Date();
    await this.usersService.updateUser(user.id, { lastLogin: user.lastLogin });

    //生成JWT Token返回
    const payload = { userId: user.id, email: user.email };
    const accessToken = this.generateJwtToken(payload);

    this.logger.log(`Login successful for email: ${email}`);
    return { accessToken };
  }
}
