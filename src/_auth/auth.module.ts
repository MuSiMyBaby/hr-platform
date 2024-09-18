import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { InstagramStrategy } from './instagram.strategy';
import { UsersModule } from '@users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthConfig } from '@validators/auth.validator'; // 引入配置文件

@Module({
  imports: [
    ConfigModule, // 確保可以使用環境變數
    PassportModule.register({ defaultStrategy: 'jwt' }), // 默認使用 JWT 策略
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...AuthConfig(configService), // 從 auth.config.ts 獲取配置
        signOptions: {
          algorithm: 'RS256',
          expiresIn: AuthConfig(configService).expiresIn,
        }, // 設定簽名選項
      }),
    }),
    UsersModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    InstagramStrategy,
    AuthResolver,
  ],
  exports: [AuthService],
})
export class AuthModule {}
