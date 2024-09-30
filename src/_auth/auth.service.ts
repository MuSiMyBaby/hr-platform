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

/* 登入失敗次數的紀錄和處理邏輯，例如增加登入失敗次數、檢查是否需要鎖定帳號、則可以放在 AuthService 裡，
當使用者的密碼驗證失敗時調用 incrementFailedLoginAttempts。
成功登入後，應在 AuthService 中重置登入失敗次數 (resetFailedLoginAttempts) 並生成 JWT。 */
