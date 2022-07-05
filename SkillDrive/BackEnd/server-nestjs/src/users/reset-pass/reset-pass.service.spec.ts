import { Test, TestingModule } from '@nestjs/testing';
import { ResetPassService } from './reset-pass.service';

describe('ResetPassService', () => {
  let service: ResetPassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetPassService],
    }).compile();

    service = module.get<ResetPassService>(ResetPassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
