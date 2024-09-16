import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const UsersConfig = (
  configService: ConfigService, // The configService injects environment variables
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'), // Fetches DB host from .env
  port: configService.get<number>('DB_PORT'), // Fetches DB port from .env
  username: configService.get<string>('DB_USERNAME'), // Fetches DB username from .env
  password: configService.get<string>('DB_PASSWORD'), // Fetches DB password from .env

  // Dynamically switch between the default and test database based on NODE_ENV
  database: configService.get<string>(
    process.env.NODE_ENV === 'userTest' ? 'DB_NAME_TEST' : 'DB_NAME', // Switch between test and default DB
  ),

  entities: ['dist/users/entities/user.entity{.ts,.js}'], // Use the compiled User entity for TypeORM

  synchronize: true, // Set to true for development, disable in production

  logging: true, // Logs all SQL queries for debugging

  autoLoadEntities: true, // Automatically loads all entities defined in the application
});
