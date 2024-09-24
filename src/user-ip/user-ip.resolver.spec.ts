import { Test, TestingModule } from '@nestjs/testing';
import { UserIpResolver } from './user-ip.resolver';
import { UserIpService } from './user-ip.service';

describe('UserIpResolver', () => {
  let resolver: UserIpResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserIpResolver, UserIpService],
    }).compile();

    resolver = module.get<UserIpResolver>(UserIpResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
