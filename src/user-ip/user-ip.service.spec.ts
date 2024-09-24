import { Test, TestingModule } from '@nestjs/testing';
import { UserIpService } from './user-ip.service';

describe('UserIpService', () => {
  let service: UserIpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserIpService],
    }).compile();

    service = module.get<UserIpService>(UserIpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
