import { Module } from '@nestjs/common'; // Importing NestJS's Module decorator, which is used to define a module.
import { JwtModule } from '@nestjs/jwt'; // Importing JwtModule, which allows you to create and manage JWTs (tokens).
import { PassportModule } from '@nestjs/passport'; // Importing PassportModule, used to manage various authentication strategies.

import { AuthService } from './auth.service'; // AuthService handles the authentication logic (login, token generation, etc.).
import { JwtStrategy } from './jwt.strategy'; // JWT strategy is used for validating JWT tokens during requests.

import { GoogleStrategy } from './google.strategy'; // Google OAuth strategy for authenticating users via Google.
import { FacebookStrategy } from './facebook.strategy'; // Facebook OAuth strategy for authenticating users via Facebook.
import { InstagramStrategy } from './instagram.strategy'; // Instagram OAuth strategy for authenticating users via Instagram.

import { UsersModule } from '../users/users.module'; // UsersModule is where user-related operations, such as user lookup, are managed.
import { AuthResolver } from './auth.resolver'; // AuthResolver is the GraphQL resolver that handles authentication-related requests like login.

@Module({
  // The `imports` section specifies external modules that are imported into the `AuthModule`.
  imports: [
    // PassportModule is used to manage authentication strategies like JWT, Google, Facebook, etc.
    PassportModule.register({ defaultStrategy: 'jwt' }), // Registering Passport with JWT as the default strategy for authentication.

    // JwtModule configures the JWT secret and other settings like expiration time for tokens.
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Secret used to sign JWT tokens; it's pulled from the environment variables or uses a default if not set.
      signOptions: { expiresIn: '30m' }, // Token expiration time is set to 30 minutes.
    }),

    UsersModule, // Import UsersModule to access user data (e.g., fetching user information during login).
  ],

  // The `providers` section lists the classes (services, strategies, resolvers) that this module will provide.
  providers: [
    AuthService, // Provides the AuthService, which handles the core authentication logic (login, token generation).

    JwtStrategy, // Provides the JwtStrategy, which validates JWT tokens.

    GoogleStrategy, // Provides the GoogleStrategy, which handles OAuth-based authentication via Google.

    FacebookStrategy, // Provides the FacebookStrategy, which handles OAuth-based authentication via Facebook.

    InstagramStrategy, // Provides the InstagramStrategy, which handles OAuth-based authentication via Instagram.

    AuthResolver, // Provides the AuthResolver, responsible for handling GraphQL mutations like login.
  ],

  // The `exports` section allows other modules to access the AuthService (e.g., if another module needs to validate tokens).
  exports: [AuthService], // Exporting AuthService for use in other parts of the application if needed.
})
export class AuthModule {} // Exporting the AuthModule, which contains all the necessary logic for handling authentication.
