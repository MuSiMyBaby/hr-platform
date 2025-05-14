import { Logger, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '@users/users.service';
import { AuthConfig } from '@config/auth.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtSrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtSrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    const authConfig = AuthConfig(configService);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 從 Authorization header 提取 JWT
      ignoreExpiration: false,
      secretOrKey: authConfig.PublicKey, //使用公開鑰匙來驗證 JWT
      algorithms: ['RS256'],
    });
  }
}
