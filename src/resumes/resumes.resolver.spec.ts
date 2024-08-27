import { Test, TestingModule } from '@nestjs/testing';
import { ResumesResolver } from './resumes.resolver';

describe('ResumesResolver', () => {
  let resolver: ResumesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumesResolver],
    }).compile();

    resolver = module.get<ResumesResolver>(ResumesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
