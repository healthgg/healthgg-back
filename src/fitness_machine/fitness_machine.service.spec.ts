import { Test, TestingModule } from '@nestjs/testing';
import { FitnessMachineService } from './fitness_machine.service';

describe('FitnessMachineService', () => {
  let service: FitnessMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FitnessMachineService],
    }).compile();

    service = module.get<FitnessMachineService>(FitnessMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
