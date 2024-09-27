/**
 * Users Resolver Functions Overview:
 *
 * 1. **findAll()** - Retrieves all users from the database.
 *    - Calls `findAllUsers()` from the `UsersService` to fetch all users.
 *    - Front-end: This query is used in an admin panel or dashboard to display all users.
 *
 * 2. **findAllUserWithDeleted()** - Retrieves all users, including soft-deleted ones.
 *    - Calls `findAllUsersWithDeleted()` from the `UsersService`.
 *    - Front-end: This query is typically used in an admin panel to view both active and soft-deleted users.
 *
 * 3. **findOne()** - Fetches a single user by their ID.
 *    - Calls `findOneUser()` from the `UsersService` to retrieve a user's details.
 *    - Front-end: This query is used to display individual user profiles.
 *
 * 4. **createUser()** - Creates a new user.
 *    - Calls `createUser()` from the `UsersService` to create a user with the provided `CreateUserInput`.
 *    - Front-end: This mutation is triggered when a user registers on the platform.
 *
 * 5. **updateUser()** - Updates a user's information.
 *    - Calls `updateUser()` from the `UsersService` to update the details of an existing user.
 *    - Front-end: This mutation is used in profile update forms or admin edit screens.
 *
 * 6. **removeUser()** - Soft-deletes a user by their ID.
 *    - Calls `removeUser()` from the `UsersService` to mark a user as deleted (soft deletion).
 *    - Front-end: This mutation is used in admin panels where an admin can remove a user.
 *
 * 7. **generateVerificationCode()** - Generates a verification code for a user.
 *    - Calls `generateVerificationCode()` from the `UsersService`.
 *    - Front-end: This mutation is called during registration or account recovery to send a verification code to the user.
 *
 * 8. **verifyUserCode()** - Verifies a user's verification code.
 *    - Calls `verifyUserCode()` from the `UsersService` to check if the code is correct and still valid.
 *    - Front-end: This mutation is used to confirm the verification code entered by the user during registration or account recovery.
 *
 * 9. **incrementFailedLoginAttempts()** - Increases the failed login attempts for a user.
 *    - Calls `incrementFailedLoginAttempts()` from the `UsersService`.
 *    - Front-end: This method is called after a failed login attempt.
 *
 * 10. **resetFailedLoginAttempts()** - Resets the failed login attempts for a user.
 *    - Calls `resetFailedLoginAttempts()` from the `UsersService`.
 *    - Front-end: This method is called after a successful login or after unlocking a user's account.
 *
 * 11. **createUserBasics()** - Creates a user with basic information and advances the registration process.
 *    - Calls `createUserBasics()` from the `UsersService` to create a user and set `registrationStep` to 2.
 *    - Front-end: This mutation is triggered when a user registers and fills out basic information.
 *
 * 12. **createUserSecurity()** - Sets up security questions for a user.
 *    - Calls `createUserSecurity()` from the `UsersService` to store security questions and answers.
 *    - Front-end: This mutation is called after a user completes the security questions setup.
 *
 * 13. **findUserByEmailOrPhone()** - Finds a user for login purposes.
 *    - Calls `findUserByEmailOrPhone()` from the `UsersService` to retrieve a user's login details.
 *    - Front-end: This query is used during the login process where a user provides their email or phone.
 *
 * 14. **verifySecurityAnswers()** - Verifies a user's security answers.
 *    - Calls `verifySecurityAnswers()` from the `UsersService` to compare the user's answers with stored hashed answers.
 *    - Front-end: This mutation is used in the forgot password flow to verify the user's identity.
 *
 * 15. **getAllSecurityQuestions()** - Returns a list of all available security questions.
 *    - Calls `getAllSecurityQuestions()` from the `UsersService`.
 *    - Front-end: This query is used during registration to allow the user to select security questions.
 *
 * 16. **requestSecurityQuestions()** - Retrieves the stored security questions for a user.
 *    - Calls `requestSecurityQuestions()` from the `UsersService` to fetch a user's security questions.
 *    - Front-end: This query is used in the forgot password flow where the user is prompted with their security questions.
 */

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service'; // Import UsersService for handling database interaction
import { User } from './entities/users.entity'; // Import User entity for GraphQL types
import { CreateUserInput } from './dto/create-user.input'; // Input DTO for creating users
import { UpdateUserInput } from './dto/update-user.input'; // Input DTO for updating users
//import { LoginUserInput } from './dto/login-user.input'; // Input DTO for login
import { AuthService } from '@auth/auth.service'; // Import AuthService for login and token creation

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, // Inject UsersService
    private readonly authService: AuthService, // Inject AuthService for login and token operations
  ) {}

  // Query to get all users
  @Query(() => [User])
  findAll() {
    return this.usersService.findAllUsers();
  }

  // Query to get all users including soft-deleted ones
  @Query(() => [User])
  findAllUserWithDeleted() {
    return this.usersService.findAllUsersWithDeleted();
  }

  // Query to get a single user by ID
  @Query(() => User)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOneUser(id);
  }

  // Mutation to create a new user (user registration)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUserBasics(createUserInput);
  }

  /*   // Mutation to login user and return a JWT token
  @Mutation(() => String)
  async loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const user = await this.authService.validateUserCredentials(
      loginUserInput.emailOrPhone,
      loginUserInput.password,
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token if credentials are valid
    return this.authService.generateJwtToken(user);
  } */

  // Mutation to update user details
  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.updateUser(id, updateUserInput);
  }

  // Mutation to remove a user (soft delete)
  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.removeUser(id).then(() => true);
  }

  // Mutation to reset failed login attempts (for unlocking account)
  @Mutation(() => Boolean)
  resetFailedLoginAttempts(@Args('id', { type: () => String }) id: string) {
    return this.usersService.resetFailedLoginAttempts(id).then(() => true);
  }

  // Mutation to increment failed login attempts (used for account locking after too many failed attempts)
  @Mutation(() => Boolean)
  incrementFailedLoginAttempts(@Args('id', { type: () => String }) id: string) {
    return this.usersService.incrementFailedLoginAttempts(id).then(() => true);
  }

  // Mutation to complete user security questions setup
  @Mutation(() => User)
  completeUserSecurity(
    @Args('id', { type: () => String }) id: string,
    @Args('securityInput') securityInput: UpdateUserInput, // Assuming security questions are part of the update input
  ) {
    return this.usersService.createUserSecurity(id, securityInput);
  }

  // Query to get all security questions
  @Query(() => [String])
  getAllSecurityQuestions() {
    return this.usersService.getAllSecurityQuestions();
  }

  // Mutation to verify security answers
  @Mutation(() => Boolean)
  verifySecurityAnswers(
    @Args('emailOrPhone', { type: () => String }) emailOrPhone: string,
    @Args('answers')
    answers: { answer1: string; answer2: string; answer3: string },
  ) {
    return this.usersService.verifySecurityAnswers(emailOrPhone, answers);
  }

  //** not ready to work */
  /* 
  // Mutation to generate verification code for email/phone verification
  @Mutation(() => Boolean)
  generateVerificationCode(@Args('id', { type: () => String }) id: string) {
    return this.usersService.generateVerificationCode(id).then(() => true);
  }

  // Mutation to verify the user's verification code
  @Mutation(() => Boolean)
  verifyUserCode(
    @Args('id', { type: () => String }) id: string,
    @Args('code', { type: () => String }) code: string,
  ) {
    return this.usersService.verifyUserCode(id, code);
  } */
}
