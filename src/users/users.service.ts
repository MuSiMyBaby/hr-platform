/**
 * User Service Functions Overview (Updated):
 *
 * 1. **createUserBasics()** - Creates a new user with basic information (Registration).
 *    - Encrypts the user's password before saving.
 *    - Sets `isBasicInfoComplete` to true and advances `registrationStep` to 2.
 *    - Front-end: This method is called when a new user signs up, and the user needs to fill out basic information (email, password, etc.).
 *      - The front-end should have a registration form that collects these details.
 *    - After this, the user is prompted to complete security questions using `createUserSecurity()`.
 *
 * 2. **createUserSecurity()** - Completes the user's security questions setup.
 *    - Hashes the user's security answers before saving.
 *    - Ensures that security questions are unique.
 *    - Front-end: This method is called after the user selects and answers their security questions.
 *      - The front-end should allow the user to choose three security questions and provide answers.
 *      - After this step, the `registrationStep` is updated to 3, indicating the completion of the registration.
 *
 * 3. **findUserByEmailOrPhone()** - Finds a user for login.
 *    - Retrieves user data based on email or phone, mainly used for authentication.
 *    - Ensures that the user has completed security questions and the registration process before proceeding.
 *    - Front-end: This is part of the login process, where the user provides their email or phone, and the backend verifies the details.
 *    - Calls `validateUserCredentials()` from AuthService after fetching user data.
 *
 * 4. **incrementFailedAttempts()** - Increases the user's failed attempts (login or security answers).
 *    - Tracks failed attempts for login and security answers and progressively locks the account.
 *    - Lockout times increase based on the number of failed attempts (e.g., 5 minutes, 15 minutes, 30 minutes, 24 hours).
 *    - Front-end: Shows an error message if the account is locked, explaining the lockout duration.
 *    - If lockout is reached, the account is locked and `unlockAccount()` is required to reset the failed attempts after the lockout period.
 *
 * 5. **unlockAccount()** - Unlocks the user’s account after a successful operation (login, password reset, or correct security answers).
 *    - Resets the `failedLoginAttempts` and `failedSecurityAnswerAttempts`.
 *    - Sets `accountLocked` to false and clears `lockedUntil`.
 *    - Front-end: No direct interaction, called after a successful login, reset password, or correct security answers.
 *
 * 6. **verifySecurityAnswers()** - Verifies the user's security answers.
 *    - Compares the answers provided by the user with the stored hashed answers in the database.
 *    - Increments failed attempts if the answers are incorrect.
 *    - Unlocks the account if the answers are correct by calling `unlockAccount()`.
 *    - Front-end: This is used in the forgot password flow. The front-end collects the user's answers and submits them for verification.
 *
 * 7. **updatePasswords()** - Updates the user's password (Forgot/Reset password).
 *    - Requires the user to enter the current password (if changing password from profile settings) or verifies security answers (if resetting).
 *    - Resets the failed login attempts and unlocks the account after a successful password reset.
 *    - Front-end: This method is used when users want to reset their password either from the account settings page or from the forgot password flow.
 *
 * 8. **getAllSecurityQuestions()** - Returns all available security questions.
 *    - Provides a list of predefined security questions.
 *    - Front-end: This is used during the registration process, where the front-end displays available security questions for the user to choose from.
 *
 * 9. **requestSecurityQuestions()** - Returns the user's stored security questions.
 *    - Retrieves the questions based on the user's email or phone for account recovery.
 *    - Front-end: This is part of the account recovery process. The front-end displays the user’s security questions after verifying their identity (email/phone).
 *
 * 10. **updateUser()** - Updates the user's personal data, including sensitive information like passwords and security answers.
 *     - Hashes new passwords or security answers before saving them.
 *     - Front-end: After successful validation of the user’s identity (via password or security answers), this method allows the user to update profile data.
 *
 * 11. **findAllUsers()** - Retrieves all users with selected fields (e.g., name, email, profile).
 *     - Used for user management dashboards.
 *     - Front-end: Display users on an admin dashboard.
 *
 * 12. **findOneUser()** - Retrieves detailed user information, including relationships with devices or IPs.
 *     - Front-end: This data is used on a profile page or admin management page.
 *
 * 13. **findAllUsersWithDeleted()** - Retrieves all users, including soft-deleted ones.
 *     - Used to show both active and deleted users on admin dashboards.
 *     - Front-end: Display all users including soft-deleted ones in an admin panel.
 *
 * 14. **removeUser()** - Soft deletes a user, marking the account as deleted without full data removal.
 *     - Front-end: This method is used in admin dashboards or when a user deactivates their account.
 *
 * 15. **clearAllUsers()** - Clears all user data (used for testing or development environments only).
 *     - Front-end: This is an admin-only method used to reset a testing environment.
 *
 * 16. **generateVerificationCode()** - Generates a verification code for email or phone verification.
 *     - Used for account recovery or registration verification processes.
 *     - Front-end: This method is called when a verification code is needed for phone/email verification during account setup or recovery.
 *
 * 17. **verifyUserCode()** - Verifies the user's submitted verification code.
 *     - Compares the code provided by the user with the one stored in the database.
 *     - Front-end: This method is used to verify a code sent to the user's email or phone during account recovery or two-factor authentication.
 *
 * 18. **validateUserForUpdate()** - Validates the current password before allowing updates to the user profile.
 *     - Front-end: The user must enter their current password to unlock the profile editing form. Once validated, the user can update personal details.
 *
 * Relationships between methods:
 * - `createUserBasics()` leads to `createUserSecurity()` for completing the registration.
 * - `findUserByEmailOrPhone()` is used for both login and recovery.
 * - Failed login attempts and incorrect security answers increment through `incrementFailedAttempts()`, leading to potential account lockout.
 * - `unlockAccount()` is called when a user successfully logs in or resets their password.
 * - `verifySecurityAnswers()` handles account recovery and calls `unlockAccount()` if successful.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { AuthService } from '@auth/auth.service'; // Import AuthService for hashing and validation
import { IsPhoneNumber } from 'class-validator';
import { Logger } from '@nestjs/common';
@Injectable() // Injectable decorator for NestJS services
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    // @InjectRepository(User) 是一個依賴注入（DI）裝飾器，用來將 TypeORM 的 Repository 注入到 UserService 中
    // 它將 Repository<User> 注入，以便我們可以在此服務中使用它進行與 User 實體相關的資料庫操作
    // @InjectRepository(User) 本身不執行資料庫操作，它只負責將 Repository<User> 傳遞給我們的服務
    @InjectRepository(User)
    private usersRepository: Repository<User>, //保存Repository<User> DI
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
      this.logger.log(
        `User with email: ${email} successfully created at ${new Date().toISOString()}`,
      );
      return this.usersRepository.save(newUser);
    } catch (error) {
      this.logger.error(
        `Failed to create user with email ${userData.email}: ${error.message}`,
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
      this.logger.log(
        `Security questions set up for user: ${userId} at ${new Date().toISOString()}`,
      );

      return this.usersRepository.save(existingUser);
    } catch (error) {
      this.logger.error(
        `Failed to create user with email ${userId}: ${error.message}`,
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
      this.logger.log(
        `Successfully retrieved all users at ${new Date().toISOString()}`,
      );
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
      this.logger.warn(`Error finding all users: ${error.message}`);
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

  async findUserByEmailOrPhone(emailOrPhone: string): Promise<User> {
    try {
      // 正規化電子郵件或電話號碼
      const normalizedEmailOrPhone = emailOrPhone.toLowerCase();

      // 查詢數據庫，使用者可能用 email 或 phoneNumber
      const user = await this.usersRepository.findOne({
        where: [
          { email: normalizedEmailOrPhone },
          { phoneNumber: normalizedEmailOrPhone },
        ],
        // 僅返回必要的字段
        select: [
          'id',
          'email',
          'phoneNumber',
          'password',
          'isRegistered',
          'isSecurityQuestionsComplete',
          'accountLocked',
        ],
      });

      // 如果未找到用戶，拋出錯誤
      if (!user) {
        this.logger.warn(`User not found for email/phone: ${emailOrPhone}`);
        throw new Error('User not found');
      }

      // 檢查安全問題是否完成
      if (!user.isSecurityQuestionsComplete || user.registrationStep < 3) {
        throw new Error(
          'Security questions not completed. Redirect to security setup.',
        );
      }

      // 檢查帳戶是否已鎖定
      if (user.accountLocked) {
        throw new Error(
          'Account is locked due to too many failed login attempts',
        );
      }

      // 檢查使用者是否已完成註冊
      if (!user.isRegistered) {
        throw new Error('User not registered. Redirect to registration.');
      }

      // 如果所有檢查都通過，返回使用者資料
      this.logger.log(`All passed!`);
      return user;
    } catch (error) {
      // 捕獲異常並記錄錯誤
      this.logger.error(
        `Error finding user for login ${emailOrPhone}: ${error.message}`,
      );

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
      this.logger.log(`Security questions retrieved for user: ${emailOrPhone}`);
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

      // **先檢查 failedSecurityAnswerAttempts 是否已達上限**
      if (user.failedSecurityAnswerAttempts >= 5 || user.securityAnswerLocked) {
        throw new Error('Account locked due to too many failed attempts.');
      }

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
        this.incrementFailedAttempts(user.id, 'security');
        return false;
      }

      await this.unlockAccount(user.id);
      await this.usersRepository.save(user);

      this.logger.log(`Security answers verified for user: ${user.id}`);
      return true; // Return success
    } catch (error) {
      this.logger.warn(`Failed security answers attempt for user: ${error}`);
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
      this.logger.log(
        `Password updated for user: ${id} at ${new Date().toISOString()}`,
      );

      await this.usersRepository.update(id, { password: hashedPassword });
    } catch (error) {
      this.logger.error(
        `Error updating password for user ${id}: ${error.message}`,
      );

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
      this.logger.log(
        `User soft deleted: ${id} at ${new Date().toISOString()}`,
      );
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
      this.logger.log(
        `Successfully retrieved all users including deleted ones at ${new Date().toISOString()}`,
      );
      return this.usersRepository.find({ withDeleted: true });
    } catch (error) {
      this.logger.error(
        `Error finding all users including deleted: ${error.message}`,
      );
      throw new Error('Failed to find users with deleted');
    }
  }

  async incrementFailedAttempts(
    userId: string,
    attemptType: 'login' | 'security',
  ): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    if (attemptType === 'login') {
      user.failedLoginAttempts += 1;
      this.logger.warn(
        `Incrementing failed login attempts for user: ${user.id}. Current attempts: ${user.failedLoginAttempts}`,
      );
    } else if (attemptType === 'security') {
      user.failedSecurityAnswerAttempts += 1;
      this.logger.warn(
        `Incrementing failed security answer attempts for user: ${user.id}. Current attempts: ${user.failedSecurityAnswerAttempts}`,
      );
    }

    // 累進鎖定時間邏輯
    let lockoutDuration: number;
    if (
      user.failedLoginAttempts === 5 ||
      user.failedSecurityAnswerAttempts === 5
    ) {
      lockoutDuration = 5 * 60 * 1000; // 鎖定5分鐘
    } else if (
      user.failedLoginAttempts === 10 ||
      user.failedSecurityAnswerAttempts === 8
    ) {
      lockoutDuration = 15 * 60 * 1000; // 鎖定15分鐘
    } else if (
      user.failedLoginAttempts === 15 ||
      user.failedSecurityAnswerAttempts === 11
    ) {
      lockoutDuration = 30 * 60 * 1000; // 鎖定30分鐘
    } else if (
      user.failedLoginAttempts >= 8 ||
      user.failedSecurityAnswerAttempts >= 14
    ) {
      lockoutDuration = 24 * 60 * 60 * 1000; // 鎖定24小時
    }

    // 如果達到失敗次數上限，鎖定帳號
    if (
      user.failedLoginAttempts >= 5 ||
      user.failedSecurityAnswerAttempts >= 5
    ) {
      user.accountLocked = true;
      user.lockedUntil = new Date(Date.now() + lockoutDuration); // 設置累進鎖定時間
      this.logger.warn(
        `Account locked for user: ${user.id} for ${lockoutDuration / (60 * 1000)} minutes.`,
      );
    }

    await this.usersRepository.save(user);
  }

  // 解鎖帳號
  async unlockAccount(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    this.logger.log(
      `Failed login attempts reset for user: ${id} at ${new Date().toISOString()}`,
    );

    user.failedLoginAttempts = 0; //Clear up attempts time
    user.accountLocked = false; // 解鎖帳號
    user.lockedUntil = null; //時間清空
    user.unlockAt = new Date(); //紀錄解鎖時間
    await this.usersRepository.save(user);
  }

  /**
   * 清空所有使用者資料 (僅用於開發或測試環境)
   * 生產環境應該避免使用該方法。
   */
  async clearAllUsers(confirm: boolean, sure: boolean): Promise<void> {
    try {
      if (!confirm) {
        this.logger.warn(
          'Clear all users operation was attempted but not confirmed',
        );
        throw new Error('Clear operation was not confirmed');
      }
      if (!sure) {
        this.logger.warn(
          'Clear all users operation was attempted but not sure',
        );
        throw new Error('Clear operation was not sure');
      }
      this.logger.log(
        `All users cleared from the database at ${new Date().toISOString()}`,
      );

      await this.usersRepository.clear();
      this.logger.log('All users cleared from the database');
    } catch (error) {
      this.logger.error(`Error clearing all users: ${error.message}`);
      throw new Error('Failed to clear all users');
    }
  }

  //**以下目前尚未實作**

  // 用於生成驗證碼並保存到資料庫
  async generateVerificationCode(userId: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      this.logger.error(
        `User not found while generating verification code for: ${userId}`,
      );
      throw new Error('User not found');
    }

    // 生成6位數隨機驗證碼
    this.logger.log(
      `Verification code generated for user: ${userId} at ${new Date().toISOString()}`,
    );

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
      this.logger.error(`User not found while verifying code for: ${userId}`);
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
      this.logger.log(
        `Verification code verified for user: ${userId} at ${new Date().toISOString()}`,
      );

      return true;
    } else {
      this.logger.warn(`Failed verification code attempt for user: ${userId}`);
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
