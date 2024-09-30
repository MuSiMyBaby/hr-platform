/**
 * User Service Functions Overview:
 *
 * 1. **createUserBasics()** - Creates a new user with basic information (Registration).
 *    - Encrypts the user's password before saving.
 *    - Sets `isBasicInfoComplete` to true and advances `registrationStep` to 2.
 *    - Front-end: This method is called when a new user signs up, and the user needs to fill out basic information (email, password, etc.).
 *      - The front-end should have a registration form that collects these details.
 *    - After this, the user is prompted to complete security questions.
 *
 * 2. **createUserSecurity()** - Completes the user's security questions setup.
 *    - Hashes the user's security answers before saving.
 *    - Ensures that security questions are unique.
 *    - Front-end: This method is called after the user selects and answers their security questions.
 *      - The front-end should allow the user to choose three security questions and provide answers.
 *      - After this step, the `registrationStep` is updated to 3, indicating the completion of the registration.
 *
 * 3. **removeUser()** - Permanently deletes a user.
 *    - Used for hard deletion of user data.
 *    - Front-end: This is primarily used by an admin or in a user management dashboard.
 *      - You will need an admin page where the admin can select and delete a user.
 *
 * 4. **updateUser()** - Updates user data.
 *    - Can update sensitive information such as the password or security answers after verifying the current password.
 *    - Front-end: The user needs to first validate their identity through `validateUserForUpdate()`.
 *      - After successful validation, the user can then update personal details (password, security questions, etc.) on a profile update page.
 *
 * 5. **findUserByEmailOrPhone()** - Finds a user for login.
 *    - Retrieves user data based on email or phone, mainly used for authentication.
 *    - Ensures that the user has completed security questions and the registration process before proceeding.
 *    - Front-end: This is part of the login process, where the user provides their email or phone, and the backend verifies the details.
 *
 * 6. **updatePasswords()** - Updates the user's password (Forgot/Reset password).
 *    - Requires the user to enter the current password (if changing password from profile settings) or verifies security answers (if resetting).
 *    - Front-end: This method is used when users want to reset their password either from the account settings page or from the forgot password flow.
 *
 * 7. **verifySecurityAnswers()** - Verifies the user's security answers.
 *    - Compares the answers provided by the user with the stored hashed answers in the database.
 *    - Front-end: This is typically used in the forgot password flow. The front-end collects the user's answers and submits them for verification.
 *
 * 8. **requestSecurityQuestions()** - Returns the user's stored security questions.
 *    - Retrieves the questions based on the user's email or phone.
 *    - Front-end: This is used in the account recovery process, where the front-end displays the user's security questions after verifying their identity (email/phone).
 *
 * 9. **getAllSecurityQuestions()** - Returns all available security questions.
 *    - Provides a list of predefined security questions.
 *    - Front-end: This is used during the registration process, where the front-end displays available security questions for the user to choose from.
 *
 * 10. **findOneUser()** - Retrieves detailed user information.
 *     - Retrieves more detailed information about the user, including related entities like user IPs and devices.
 *     - Front-end: This is used to display user details on a profile or admin page.
 *
 * 11. **findAllUsers()** - Retrieves all users (excluding soft-deleted ones).
 *     - Returns a list of active users with selected fields like email, profile picture, and timestamps.
 *     - Front-end: This is typically used for admin panels or dashboards that list all users.
 *
 * 12. **findAllUsersWithDeleted()** - Retrieves all users, including soft-deleted ones.
 *     - Used to list both active and soft-deleted users.
 *     - Front-end: This is also part of an admin dashboard, where admins can see both active and soft-deleted users.
 *
 * 13. **softRemove()** - Soft deletes a user (marks as deleted without actual deletion).
 *     - Marks a user as deleted, allowing for future restoration.
 *     - Front-end: Used in admin dashboards to manage user deletion.
 *
 * 14. **generateVerificationCode()** - Generates a verification code and saves it.
 *     - This code is used for phone or email verification during account recovery or registration.
 *     - Front-end: This is part of the phone/email verification process, where the front-end triggers the generation of a verification code.
 *     - You will need a third-party service to send this code to the user's phone or email.
 *
 * 15. **verifyUserCode()** - Verifies the user's verification code.
 *     - Checks if the provided code matches the one saved in the database and is still valid.
 *     - Front-end: This is part of the phone/email verification process, where the user enters the received code and the backend validates it.
 *
 * 16. **incrementFailedLoginAttempts()** - Increases the user's failed login attempts.
 *     - This is used during the authentication process to count failed login attempts.
 *     - If the failed login attempts reach a threshold (e.g., 5), the account is locked by setting `accountLocked` to true.
 *     - Front-end: This method is called after a failed login attempt, and the front-end may display an error message to the user if the account is locked.
 *
 * 17. **resetFailedLoginAttempts()** - Resets the user's failed login attempts.
 *     - This is used to unlock the user's account after a successful login or after the user has reset their password.
 *     - It resets `failedLoginAttempts` to 0 and sets `accountLocked` to false.
 *     - Front-end: After successful login or password reset, this method is called to unlock the user's account.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { AuthService } from '@auth/auth.service'; // Import AuthService for hashing and validation
import { IsPhoneNumber } from 'class-validator';

@Injectable() // Injectable decorator for NestJS services
export class UsersService {
  constructor(
    @InjectRepository(User) // Inject repository for the User entity
    private usersRepository: Repository<User>, // TypeORM repository for User entity
    private authService: AuthService, // AuthService for hashing passwords and validating credentials
  ) {}

  // Predefined security questions
  private securityQuestionsMap = {
    1: 'What was the name of your first pet?',
    2: 'What was the name of your elementary school?',
    3: 'What is your mother’s maiden name?',
    4: 'What is the model of your first car?',
    5: 'In what city were you born?',
    6: 'What was the name of your childhood best friend?',
    7: 'What was the name of your first teacher?',
    8: 'What was the first concert you attended?',
    9: 'What was the name of your first roommate?',
    10: 'What is the name of the town where your grandparents lived?',
    11: 'What was your childhood nickname?',
    12: 'What was the name of your first boss?',
  };
  /**
   * registrationStep values:
   * 1: Basic information is incomplete.
   * 2: Basic information is complete, but security questions are not completed.
   * 3: Registration is fully completed.
   */
  async createUserBasics(userData: Partial<User>): Promise<User> {
    try {
      const { password, email, phoneNumber, ...restUserData } = userData;
      const normalizedEmail = email?.toLowerCase();
      const normalizedPhoneNumber = phoneNumber?.toLowerCase();

      const existingUser = await this.findUserByEmailOrPhone(
        normalizedEmail || normalizedPhoneNumber,
        // 檢查用戶是否已經註冊
      );
      if (existingUser && existingUser.isRegistered) {
        throw new Error('User is already registered');
      }
      // Hash the password
      const hashedPassword = await this.authService.hashValue(password);

      // Create a new user object with basic info and password
      const newUser = this.usersRepository.create({
        ...restUserData,
        email: normalizedEmail,
        phoneNumber: normalizedPhoneNumber,
        password: hashedPassword,
        isBasicInfoComplete: true, // 表示基本資料已完成
        registrationStep: 2, // 下一步是填寫安全問題
      });

      // Save the new user to the database
      return this.usersRepository.save(newUser);
    } catch (error) {
      console.error(
        `Error creating user with email ${userData.email}: ${error.message}`,
      );
      throw new Error('Failed to create user due to an internal server error');
    }
  }

  async createUserSecurity(
    userId: string,
    securityData: Partial<User>,
  ): Promise<User> {
    try {
      const {
        securityAnswer1,
        securityAnswer2,
        securityAnswer3,
        securityQuestion1,
        securityQuestion2,
        securityQuestion3,
      } = securityData;
      // Make sure questions are different
      const questions = [
        securityQuestion1,
        securityQuestion2,
        securityQuestion3,
      ];
      const uniqueQuestions = new Set(questions);
      if (uniqueQuestions.size !== questions.length) {
        throw new Error('Security questions must be different!');
      }

      // Hash security answers
      const hashedAnswer1 = await this.authService.hashValue(securityAnswer1);
      const hashedAnswer2 = await this.authService.hashValue(securityAnswer2);
      const hashedAnswer3 = await this.authService.hashValue(securityAnswer3);

      // Find the existing user
      const existingUser = await this.usersRepository.findOneBy({ id: userId });
      if (!existingUser) {
        throw new Error('User not found');
      }

      // Update security questions and answers
      existingUser.securityQuestion1 = securityQuestion1;
      existingUser.securityQuestion2 = securityQuestion2;
      existingUser.securityQuestion3 = securityQuestion3;
      existingUser.securityAnswer1 = hashedAnswer1;
      existingUser.securityAnswer2 = hashedAnswer2;
      existingUser.securityAnswer3 = hashedAnswer3;
      existingUser.isSecurityQuestionsComplete = true; // 安全問題已完成
      existingUser.registrationStep = 3; // 註冊完成
      existingUser.registrationCompletedAt = new Date(); // 註冊完成時間

      // Save the updated user
      return this.usersRepository.save(existingUser);
    } catch (error) {
      console.error(
        `Error updating security answers for user ${userId}: ${error.message}`,
      );
      throw new Error('Failed to update security answers');
    }
  }
  /**
   * Get all users with selected fields.
   * This function returns basic user information such as name, email, and profile details.
   * Front-end: This data can be displayed in a user management dashboard.
   */
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
      console.error(`Error finding all users: ${error.message}`);
      throw new Error('Failed to find users');
    }
  }

  /**
   * Find a specific user by their ID.
   * This function retrieves detailed user information for profile or admin use.
   * Front-end: This data can be displayed on the user's profile page.
   */
  async findOneUser(id: string): Promise<User> {
    try {
      return this.usersRepository.findOneOrFail({
        where: { id },
        relations: ['userIps', 'userDevices'], // Relations with user IP and device information
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
      console.error(`Error finding user by ID ${id}: ${error.message}`);
      throw new Error('Failed to find user');
    }
  }

  /**
   * Find user for login based on email or phone number.
   * This function retrieves the user information and password for login validation.
   * Note: Password is not sent to the front-end, only used for back-end validation.
   */

  async findUserByEmailOrPhone(
    emailOrPhone: string,
  ): Promise<User | undefined> {
    try {
      const normalizedEmailOrPhone = emailOrPhone.toLowerCase(); // Normalize case
      const user = await this.usersRepository.findOne({
        where: [
          { email: normalizedEmailOrPhone },
          { phoneNumber: normalizedEmailOrPhone },
        ],
        select: [
          'id',
          'email',
          'phoneNumber',
          'password',
          'isRegistered',
          'isSecurityQuestionsComplete',
          'accountLocked',
        ], // Only return essential fields for validation
      });
      if (!user) throw new Error('User not found');
      if (!user.isSecurityQuestionsComplete || user.registrationStep < 3) {
        throw new Error(
          'Security questions not completed. Redirect to security setup.',
        );
      }
      if (user.accountLocked) {
        throw new Error(
          'Account is locked due to too many failed login attempts',
        );
      }
      if (!user.isRegistered) {
        throw new Error('User not registered. Redirect to registration.');
      }
      return user;
    } catch (error) {
      console.error(
        `Error finding user for login ${emailOrPhone}: ${error.message}`,
      );
      console.error(error.message);
      throw new Error('Failed to find user for login');
    }
  }

  /**
   * Get random security questions for user registration or account recovery.
   * Front-end: Use this function to display 6 random security questions when users are setting up their account.
   */
  async getAllSecurityQuestions(): Promise<{ id: number; question: string }[]> {
    return Object.keys(this.securityQuestionsMap).map((key) => ({
      id: +key,
      question: this.securityQuestionsMap[+key],
    }));
    // Return 6 random security questions
  }

  /**
   * Return stored security questions based on the user's email or phone.
   * This function retrieves the security question IDs and returns the corresponding questions.
   * Front-end: Display these questions when a user is recovering their account.
   */
  async requestSecurityQuestions(
    emailOrPhone: string,
  ): Promise<{ question1: string; question2: string; question3: string }> {
    try {
      const normalizedEmailOrPhone = emailOrPhone.toLowerCase();
      const user = await this.usersRepository.findOne({
        where: [
          { email: normalizedEmailOrPhone },
          { phoneNumber: normalizedEmailOrPhone },
        ],
        select: [
          'id',
          'securityQuestion1',
          'securityQuestion2',
          'securityQuestion3',
        ], // Return security question IDs
      });

      if (!user) throw new Error('User not found');
      if (!user.isSecurityQuestionsComplete) {
        throw new Error(
          'Security questions not completed. Redirect to security setup.',
        );
      }
      return {
        question1: this.securityQuestionsMap[user.securityQuestion1], // Convert ID to question text
        question2: this.securityQuestionsMap[user.securityQuestion2],
        question3: this.securityQuestionsMap[user.securityQuestion3],
      };
    } catch (error) {
      console.error(
        `Error fetching security questions for ${emailOrPhone}: ${error.message}`,
      );
      throw new Error('Failed to fetch security questions');
    }
  }

  /**
   * Verify security answers provided by the user.
   * This function compares the provided answers with the stored hashed answers.
   * Front-end: The user answers the security questions before resetting their password or recovering the account.
   */
  async verifySecurityAnswers(
    emailOrPhone: string,
    answers: { answer1: string; answer2: string; answer3: string },
  ): Promise<boolean> {
    try {
      const normalizedEmailOrPhone = emailOrPhone.toLowerCase();
      const user = await this.usersRepository.findOne({
        where: [
          { email: normalizedEmailOrPhone },
          { phoneNumber: normalizedEmailOrPhone },
        ],
        select: [
          'id',
          'securityAnswer1',
          'securityAnswer2',
          'securityAnswer3',
          'failedSecurityAnswerAttempts',
          'securityAnswerLocked',
        ], // Fetch stored answers and attempts count
      });

      if (!user) throw new Error('User not found');

      // Check if security answers are locked
      if (user.securityAnswerLocked) {
        throw new Error('Account locked due to too many failed attempts.');
      }

      // Ensure security questions are set up
      if (!user.isSecurityQuestionsComplete) {
        throw new Error('Security questions not set up.');
      }

      // Validate answers using AuthService
      const areAnswersValid = await this.authService.validateSecurityAnswers(
        answers,
        {
          answer1: user.securityAnswer1,
          answer2: user.securityAnswer2,
          answer3: user.securityAnswer3,
        },
      );

      if (!areAnswersValid) {
        user.failedSecurityAnswerAttempts += 1;
        if (user.failedSecurityAnswerAttempts >= 5) {
          user.securityAnswerLocked = true; // Lock account after 5 failed attempts
        }
        await this.usersRepository.save(user);
        return false;
      }

      // Reset failed attempts on success
      user.failedSecurityAnswerAttempts = 0;
      user.securityAnswerLocked = false; // Unlock if previously locked
      await this.usersRepository.save(user);

      return true; // Return success
    } catch (error) {
      console.error(`Error verifying security answers: ${error.message}`);
      throw new Error('Failed to verify security answers');
    }
  }

  /**
   * Update user password by validating the current password.
   * Front-end: The user enters their current password, and upon validation, can update to a new password.
   */
  async updatePasswords(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    try {
      const user = await this.findOneUser(id);
      const isCurrentPasswordValid =
        await this.authService.validateUserCredentials(
          currentPassword,
          user.password,
        );
      if (!isCurrentPasswordValid) {
        throw new Error('Current password is incorrect');
      }

      const hashedPassword = await this.authService.hashValue(newPassword);

      await this.usersRepository.update(id, { password: hashedPassword });
    } catch (error) {
      console.error(`Error updating password for user ${id}: ${error.message}`);
      throw new Error('Failed to update password');
    }
  }

  /**
   * Validate user's password before allowing profile update.
   * Front-end: The user must enter their current password to unlock the profile editing form.
   */
  async validateUserForUpdate(
    id: string,
    currentPassword: string,
  ): Promise<void> {
    try {
      const user = await this.findOneUser(id);

      if (!user) throw new Error('User not found');

      // Ensure security questions are set up
      if (!user.isSecurityQuestionsComplete) {
        throw new Error(
          'Security questions not set up. Redirect to security setup.',
        );
      }
      const isCurrentPasswordValid =
        await this.authService.validateUserCredentials(
          currentPassword,
          user.password,
        );
      if (!isCurrentPasswordValid) {
        throw new Error('Current password is incorrect');
      }

      // If validation passes, allow further updates in the front-end
    } catch (error) {
      console.error(`Error validating user ${id} for update: ${error.message}`);
      throw new Error('Failed to validate user');
    }
  }

  /**
   * Update user profile data. Password and security answers are re-hashed before saving.
   * Front-end: After password validation, the user can update their profile details.
   */
  async updateUser(id: string, updateData: Partial<User>): Promise<void> {
    try {
      if (updateData.password) {
        updateData.password = await this.authService.hashValue(
          updateData.password,
        );
      }
      if (
        updateData.securityAnswer1 ||
        updateData.securityAnswer2 ||
        updateData.securityAnswer3
      ) {
        updateData.securityAnswer1 = await this.authService.hashValue(
          updateData.securityAnswer1,
        );
        updateData.securityAnswer2 = await this.authService.hashValue(
          updateData.securityAnswer2,
        );
        updateData.securityAnswer3 = await this.authService.hashValue(
          updateData.securityAnswer3,
        );
      }
      await this.usersRepository.update(id, updateData);
    } catch (error) {
      console.error(`Error updating user ${id}: ${error.message}`);
      throw new Error('Failed to update user');
    }
  }

  /**
   * 軟刪除使用者，標記為已刪除狀態而不刪除實際資料
   * 前端流程：後台管理者可以執行此操作來停用帳戶。
   */
  async removeUser(id: string): Promise<void> {
    try {
      const user = await this.findOneUser(id);
      await this.usersRepository.softRemove(user);
    } catch (error) {
      console.error(`Error soft removing user ${id}: ${error.message}`);
      throw new Error('Failed to remove user');
    }
  }

  /**
   * 查詢包含軟刪除的所有使用者
   * 前端流程：管理者可以看到被軟刪除的用戶。
   */
  async findAllUsersWithDeleted(): Promise<User[]> {
    try {
      return this.usersRepository.find({ withDeleted: true });
    } catch (error) {
      console.error(
        `Error finding all users including deleted: ${error.message}`,
      );
      throw new Error('Failed to find users with deleted');
    }
  }

  async incrementFailedLoginAttempts(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= 5) {
      user.accountLocked = true;
    }
    await this.usersRepository.save(user);
  }

  async resetFailedLoginAttempts(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({});
    if (!user) throw new Error('User not found');

    user.failedLoginAttempts = 0;
    user.accountLocked = false; // 解鎖帳號
    await this.usersRepository.save(user);
  }

  /**
   * 清空所有使用者資料 (僅用於開發或測試環境)
   * 生產環境應該避免使用該方法。
   */
  async clearAllUsers(): Promise<void> {
    try {
      await this.usersRepository.clear();
    } catch (error) {
      console.error(`Error clearing all users: ${error.message}`);
      throw new Error('Failed to clear all users');
    }
  }

  //**以下目前尚未實作**

  // 用於生成驗證碼並保存到資料庫
  async generateVerificationCode(userId: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    // 生成6位數隨機驗證碼
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    //追蹤驗證碼發送次數並鎖定超過次數限制的情況
    user.verificationSentCount += 1;
    user.lastVerificationSentDate = new Date();
    if (user.verificationSentCount >= 5) {
      user.verificationCodeLocked = true;
    }

    // 設置驗證碼和過期時間（例如5分鐘後過期）
    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5分鐘

    // 保存到資料庫
    await this.usersRepository.save(user);

    // 在這裡發送驗證碼到用戶的手機/郵箱，這部分你可以使用第三方 API 實現
  }

  // 驗證用戶輸入的驗證碼是否正確
  async verifyUserCode(userId: string, code: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }
    //追蹤失敗次數並鎖定。
    user.failedVerificationCodeAttempts += 1;
    if (user.failedVerificationCodeAttempts >= 5) {
      user.verificationCodeLocked = true;
    }
    // 檢查驗證碼是否匹配以及是否過期
    if (
      user.verificationCode === code &&
      user.verificationCodeExpiry > new Date()
    ) {
      // 驗證通過，清空驗證碼
      user.verificationCode = null;
      user.verificationCodeExpiry = null;
      await this.usersRepository.save(user);
      return true;
    } else {
      throw new Error('Invalid or expired verification code');
    }
  }

  /* 下述部分被移到 auth.service 繼續實作 JWT / 其他 OAuth

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
  */
}
/**
 * Create a new user with encrypted password and security answers.
 * This method accepts user data, hashes the password and security answers,
 * and stores the user in the database.
 */
/*   async createUserBasics(userData: Partial<User>): Promise<User> {
    try {
      const {
        password,
        securityAnswer1,
        securityAnswer2,
        securityAnswer3,
        securityQuestion1,
        securityQuestion2,
        securityQuestion3,
        ...restUserData
      } = userData;

      // Hash password and security answers using AuthService
      const hashedPassword = await this.authService.hashValue(password);
      const hashedAnswer1 = await this.authService.hashValue(securityAnswer1);
      const hashedAnswer2 = await this.authService.hashValue(securityAnswer2);
      const hashedAnswer3 = await this.authService.hashValue(securityAnswer3);

      // Create a new user object
      const newUser = this.usersRepository.create({
        ...restUserData,
        password: hashedPassword,
        securityAnswer1: hashedAnswer1,
        securityAnswer2: hashedAnswer2,
        securityAnswer3: hashedAnswer3,
        securityQuestion1, // Save question IDs
        securityQuestion2,
        securityQuestion3,
      });

      // Save new user to the database
      return this.usersRepository.save(newUser);
    } catch (error) {
      console.error(
        `Error creating user with email ${userData.email}: ${error.message}`,
      );
      throw new Error('Failed to create user due to an internal server error');
    }
  } */
//Check SecurityQuestions finished

/**
 * registrationStep values:
 * 1: Basic information is incomplete.
 * 2: Basic information is complete, but security questions are not completed.
 * 3: Registration is fully completed.
 */
