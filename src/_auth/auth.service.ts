import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // 驗證使用者登入憑證
  async validateUserCredentials(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // 驗證安全回答
  async validateSecurityAnswers(
    answers: { answer1: string; answer2: string; answer3: string },
    storedAnswers: { answer1: string; answer2: string; answer3: string },
  ): Promise<boolean> {
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
    return await bcrypt.hash(value, 10);
  }
}
