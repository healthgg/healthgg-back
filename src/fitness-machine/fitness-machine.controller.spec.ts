import { Test, TestingModule } from '@nestjs/testing';
import { FitnessMachineController } from './fitness-machine.controller';

describe('FitnessMachineController', () => {
  let controller: FitnessMachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FitnessMachineController],
    }).compile();

    controller = module.get<FitnessMachineController>(FitnessMachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
