import { ConfigService } from '@nestjs/config';

export const AuthConfig = (configService: ConfigService) => ({
  privateKey: configService.get<string>('JW_PRIVATE_KEY').replace(/\\n/g, '\n'),
  PublicKey: configService.get<string>('JW_PUBLIC_KEY').replace(/\\n/g, '\n'),
  expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '30m',
});
