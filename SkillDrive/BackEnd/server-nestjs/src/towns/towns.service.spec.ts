import { Test, TestingModule } from '@nestjs/testing';
import { TownsService } from './towns.service';

describe('TownsService', () => {
  let service: TownsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TownsService],
    }).compile();

    service = module.get<TownsService>(TownsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
