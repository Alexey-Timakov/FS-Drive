import { Test, TestingModule } from '@nestjs/testing';
import { ResetPassController } from './reset-pass.controller';

describe('ResetPassController', () => {
  let controller: ResetPassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPassController],
    }).compile();

    controller = module.get<ResetPassController>(ResetPassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
